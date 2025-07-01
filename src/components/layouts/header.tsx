import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserNav } from "./user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { useNotifications } from '@/contexts/notification-context'; // Import useNotifications


export function Header() {
  const { theme } = useTheme();
  const { unreadCount, notifications, markAsRead, markAllAsRead } = useNotifications(); // Use the hook

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
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary text-xs text-white  items-center justify-center">
              {/* You might want a more sophisticated badge for numbers > 9 */}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
        {/* Add a dropdown/popover here to display notifications */}
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  )
}
