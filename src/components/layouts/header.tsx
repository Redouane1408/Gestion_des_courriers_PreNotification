import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const { theme } = useTheme();
  const { unreadCount, notifications, markAsRead, markAllAsRead } = useNotifications();

  // Helper function to get initials from email
  const getInitials = (email: string) => {
    return email
      .split("@")[0]
      .split(/[._]/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Helper function to format time
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString();
  };

  // Helper function to get operation badge styling
  const getOperationBadgeStyle = (operation: string) => {
    switch(operation) {
      case 'DELETE':
      case 'Supprimer':
        return 'bg-red-100 text-red-800';

      case 'ARCHIVE':
      case 'Archiver':
        return 'bg-blue-100 text-blue-800';

      case 'MODIFY':
      case 'Modifier':
        return 'bg-orange-100 text-orange-800';

      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
                <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-800 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 border rounded-lg shadow-lg" align="end" alignOffset={-20}>
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="text-base font-semibold">Notifications</h4>
            </div>
            
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6">
                  <Bell className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                  <p className="text-sm text-muted-foreground">Aucune notification</p>
                </div>
              ) : (
                <div className="py-1">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className="flex items-start p-3 hover:bg-muted/50 border-b border-border/50 last:border-0 transition-colors"
                    >
                      <Avatar className="h-9 w-9 mr-3 mt-1">
                        <AvatarImage src="/placeholder.svg" alt={notif.email} />
                        <AvatarFallback className="bg-cyan-100 text-cyan-800">
                          {getInitials(notif.email)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-bold text-cyan-700 truncate">
                            {notif.email.split('@')[0]}
                          </p>
                          <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                            {formatTime(notif.time)}
                          </span>
                        </div>
                        
                        <p className="text-sm mb-1">{notif.message}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOperationBadgeStyle(notif.operation)}`}>
                              {notif.operation}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {notif.courrielNumber}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end">
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => markAsRead(notif.id)}
                            className="text-xs text-cyan-700 hover:text-white hover:bg-cyan-700 h-6 my-3 "
                          >
                            Marquer comme lue
                          </Button>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            {unreadCount > 0 && (
              <div className="p-2 border-t text-center">
                <Button onClick={() => markAllAsRead()} variant="ghost" size="sm" className="text-xs w-full text-cyan-700 hover:text-cyan-800">
                  Voir toutes les notifications
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
