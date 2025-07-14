import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserNav } from "./user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { useNotifications } from '@/contexts/notification-context';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Header() {
  const { theme } = useTheme();
  const { unreadCount, notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 w-full">
      <div className="hidden md:block">
        <h1 className="text-lg font-semibold"></h1>
      </div>
      <div className="flex-1 md:grow-0">
        <form>
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <h1 className="flex h-full max-h-screen flex-row gap-2"> 
                {theme === 'dark' ? (
                  <img src="logo courriel management-05.svg" alt="Dark Logo" className="h-14 mx-8" />
                ) : (
                  <img src="logo courriel management-06.svg" alt="Light Logo" className="h-14 mx-8" />
                )}
                <span className="text-lg font-bold"></span>
              </h1>
            </div>
          </div>
        </form>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Notifications</h4>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-white bg-green-500 hover "
                >
                   Marquer toutes comme lues
                </button>
              )}
            </div>
            <ScrollArea className="h-64">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune notification</p>
              ) : (
                notifications.map((notif) => (
                  <Card 
                    key={notif.id} 
                    className="mb-2 transition-all hover:shadow-md"
                  >
                    <CardHeader className="p-3 pb-0">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium">
                          {notif.operation} — {notif.courrielNumber}
                        </CardTitle>
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          New
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notif.time).toLocaleString()}
                      </p>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(notif.id)}
                        className="text-xs text-white  h-6 px-2 bg-green-500 "
                      >
                        Marquer comme lue
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
