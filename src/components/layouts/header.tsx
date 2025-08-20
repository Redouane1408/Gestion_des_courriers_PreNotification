import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserNav } from "./user-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { useNotifications } from '@/contexts/notification-context';
import { useAuth } from "@/contexts/auth-context"; // Add this import
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function Header() {
  const { unreadCount, notifications, markAsRead, markAllAsRead } = useNotifications();
  const { role } = useAuth(); // Add this line
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity based on scroll position
  const getHeaderOpacity = () => {
    if (scrollY === 0) return 1;
    return Math.max(0.7, 1 - (scrollY / 300));
  };

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
      case 'Archiver':
        return 'bg-sky-500 text-white border-sky-500/30';

      case 'Supprimer':
        return 'bg-red-500/20 text-red-300 border-red-500/30';

      case 'Modifier':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';

      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: getHeaderOpacity()
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'pt-2' : 'pt-4'
      }`}
      style={{
        opacity: getHeaderOpacity(),
        left: '18rem', // Account for sidebar width (md:ml-72 = 18rem)
        width: 'calc(100% - 18rem)' // Adjust width to not overlap sidebar
      }}
    >
      <div className="w-full max-w-screen-2xl mx-auto border border-white/10 bg-gradient-to-b from-blue-600 to-cyan-600 backdrop-blur-xl shadow-xl rounded-xl">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/40 to-cyan-600/40 backdrop-blur-sm rounded-xl pointer-events-none" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full pointer-events-none"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
            />
          ))}
        </div>
        
        <div className="relative container flex h-16 items-center justify-between mx-auto px-4">
          {/* Logo Section with Animation - Fixed to always show the same logo */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className=" relative flex items-center "
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* Fixed logo - no theme switching */}
              <img 
                src="logo courriel management-05.svg" 
                alt="Logo"
                className="h-8 w-auto drop-shadow-lg items-end" 
              />
              <motion.div 
                className="hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Section - Actions with Staggered Animation */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Notifications with Advanced Animation - Only show for ADMIN role */}
            {role === "ADMIN" && (
              <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <PopoverTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="relative h-10 w-10 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10"
                    >
                      <motion.div
                        animate={unreadCount > 0 ? { rotate: [0, 15, -15, 0] } : {}}
                        transition={{ duration: 0.5, repeat: unreadCount > 0 ? Infinity : 0, repeatDelay: 3 }}
                      >
                        <Bell className="h-4 w-4" />
                      </motion.div>
                      <AnimatePresence>
                        {unreadCount > 0 && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute -top-1 -right-1"
                          >
                            <Badge className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-lg">
                              <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                {unreadCount > 99 ? '99+' : unreadCount}
                              </motion.span>
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-96 p-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-white/10 shadow-2xl" 
                  align="end" 
                  sideOffset={8}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                      <h4 className="font-semibold text-white">Notifications</h4>
                      {unreadCount > 0 && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            onClick={markAllAsRead} 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-auto p-2 text-cyan-400 hover:text-white hover:bg-cyan-600/20"
                          >
                            Tout marquer
                          </Button>
                        </motion.div>
                      )}
                    </div>
                    
                    <ScrollArea className="h-80">
                      {notifications.length === 0 ? (
                        <motion.div 
                          className="flex flex-col items-center justify-center p-8 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <Bell className="h-8 w-8 text-white/30 mb-2" />
                          </motion.div>
                          <p className="text-sm text-white/60">Aucune notification</p>
                        </motion.div>
                      ) : (
                        <div className="divide-y divide-white/10">
                          {notifications.map((notif, index) => (
                            <motion.div 
                              key={notif.id} 
                              className="p-4 hover:bg-white/5 transition-all duration-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ x: 5 }}
                            >
                              <div className="flex items-start space-x-3">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-cyan-500/30">
                                    <AvatarImage alt={notif.email} />
                                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-semibold">
                                      {getInitials(notif.email)}
                                    </AvatarFallback>
                                  </Avatar>
                                </motion.div>
                                
                                <div className="flex-1 min-w-0 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium truncate text-white">
                                      {notif.email.split('@')[0]}
                                    </p>
                                    <span className="text-xs text-white/60">
                                      {formatTime(notif.time)}
                                    </span>
                                  </div>
                                  
                                  <p className="text-sm text-white/80 line-clamp-2">
                                    {notif.message}
                                  </p>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Badge 
                                        variant="outline" 
                                        className={`text-xs border ${getOperationBadgeStyle(notif.operation)}`}
                                      >
                                        {notif.operation}
                                      </Badge>
                                      <span className="text-xs text-white/60">
                                        {notif.courrielNumber}
                                      </span>
                                    </div>
                                    
                                    <motion.div
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => markAsRead(notif.id)}
                                        className="text-xs h-auto p-1 text-cyan-400 hover:text-white hover:bg-cyan-600/20 transition-all duration-200"
                                      >
                                        Marquer
                                      </Button>
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </motion.div>
                </PopoverContent>
              </Popover>
              )}


              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="[&>button]:h-10 [&>button]:w-10 [&>button]:text-white/80 [&>button]:hover:text-white [&>button]:hover:bg-white/20 [&>button]:transition-all [&>button]:duration-300 [&>button]:backdrop-blur-sm [&>button]:border [&>button]:border-white/10 [&>button]:rounded-full">
                  <ThemeToggle />
                </div>
              </motion.div>
              
              {/* User Navigation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserNav />
              </motion.div>
            </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
