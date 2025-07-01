import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context'; // Assuming you have an auth context
import { toast } from '@/hooks/use-toast'; // Your toast component

interface Notification {
  id: string;
  userId: string;
  message: string;
  type: string;
  readStatus: boolean;
  timestamp: string;
  relatedEntityId?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  // ... other actions like delete
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, userEmail, getToken } = useAuth(); // Corrected: use userEmail and getToken
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Function to fetch initial unread notifications
  const fetchUnreadNotifications = async () => {
    const token = getToken(); // Get token using the getToken method
    if (!isAuthenticated || !token) return;
    try {
      const response = await fetch('/api/notifications/unread', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data: Notification[] = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to fetch unread notifications:', error);
    }
  };

  // WebSocket connection logic
  useEffect(() => {
    const token = getToken(); // Get token using the getToken method
    if (!isAuthenticated || !userEmail || !token) return; // Use userEmail for user check

    fetchUnreadNotifications(); // Fetch on login

    const ws = new WebSocket(`ws://localhost:8080/ws/notifications?token=${token}`); // Adjust URL

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const newNotification: Notification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
      toast({
        title: "New Notification",
        description: newNotification.message,
      });
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [isAuthenticated, userEmail, getToken]); // Added getToken to dependency array

  const markAsRead = async (id: string) => {
    const token = getToken(); // Get token using the getToken method
    // API call to mark as read
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, readStatus: true } : notif))
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    const token = getToken(); // Get token using the getToken method
    // API call to mark all as read
    try {
      await fetch(`/api/notifications/mark-all-read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, readStatus: true }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const unreadCount = notifications.filter((notif) => !notif.readStatus).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};