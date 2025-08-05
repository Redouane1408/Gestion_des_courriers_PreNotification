"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Home, Archive, Users, Settings, HelpCircle, Plus, Bell, Menu } from "lucide-react" 
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { useNotifications } from "@/contexts/notification-context"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Sidebar() {
  const { pathname } = useLocation()
  const { role } = useAuth()
  const { unreadCount } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      label: "Tableau de bord",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
      badge: null,
    },
    {
      label: "Archivage",
      icon: Archive,
      href: "/archive",
      active: pathname === "/archive",
      badge: null,
    },
    {
      label: "Utilisateurs",
      icon: Users,
      href: "/users",
      active: pathname === "/users",
      show: role !== "ADMIN",
      badge: null,
    },
  ]

  const quickActions = [
    {
      label: "Nouveau courrier",
      icon: Plus,
      href: "/archive",
      active: pathname === "/archive",
      variant: "default" as const,
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
      active: pathname === "/notifications",
      variant: "outline" as const,
      badge: unreadCount > 0 ? unreadCount.toString() : undefined,
    },
  ]

  const SidebarContent = () => (
    <div className="flex h-full max-h-screen flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider px-2">
              Actions rapides
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Button
                  key={action.href}
                  variant={action.active ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-11 transition-all duration-200 hover:scale-[1.02] border-0",
                    action.active 
                      ? "bg-white/20 text-white shadow-md backdrop-blur-sm" 
                      : "hover:bg-white/10 text-white/90 hover:text-white"
                  )}
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={action.href} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <action.icon className="mr-3 h-5 w-5" />
                      <span className="font-medium">{action.label}</span>
                    </div>
                    {action.badge && (
                      <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-white/30">
                        {action.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-4 bg-white/20" />

          {/* Main Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider px-2">
              Navigation
            </h3>
            <div className="space-y-1">
              {routes.map((route) =>
                route.show ? null : (
                  <Button
                    key={route.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-11 transition-all duration-200 hover:scale-[1.02] border-0",
                      route.active 
                        ? "bg-white/20 text-white border-l-4 border-white backdrop-blur-sm" 
                        : "hover:bg-white/10 text-white/90 hover:text-white"
                    )}
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={route.href} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <route.icon className="mr-3 h-5 w-5" />
                        <span className="font-medium">{route.label}</span>
                      </div>
                      {route.badge && (
                        <Badge variant="outline" className="ml-auto bg-white/20 text-white border-white/30">
                          {route.badge}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                ),
              )}
            </div>
          </div>

          <Separator className="my-4 bg-white/20" />

          {/* Settings & Help */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider px-2">
              Support
            </h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start h-11 transition-all duration-200 hover:scale-[1.02] border-0 hover:bg-white/10 text-white/90 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="mr-3 h-5 w-5" />
                <span className="font-medium">Paramètres</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-11 transition-all duration-200 hover:scale-[1.02] border-0 hover:bg-white/10 text-white/90 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                <span className="font-medium">Aide</span>
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-gradient-to-b from-blue-600 to-cyan-600 md:block md:w-72 shadow-lg fixed left-0 top-0 h-screen z-40">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 bg-gradient-to-b from-blue-600 to-cyan-600 border-r">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
