import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';

import { EventSourcePolyfill } from 'event-source-polyfill';

// Types
interface Notification {
  id: number;
  email: string;
  message: string;
  type: string;
  readStatus: boolean;
  timestamp: string;
  relatedEntityId?: string;
  time: string;
  operation: string;
  courrielNumber: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

interface NotificationProviderProps {
  children: ReactNode;
  token: string;
  username: string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);



// Par celle-ci (utilise le proxy Vite)
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
// Pour le SSE, utilisez le chemin relatif pour passer par le proxy
const SSE_URL = '/api/notifications/sse'; // Endpoint for SSE stream via proxy

export const NotificationProvider = ({ token, username, children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (token && username) {
      connectSSE();
      fetchUnreadNotifications();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [token, username]);

  const connectSSE = () => {
    // Close existing connection if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    
    // Créer la connexion SSE avec des en-têtes personnalisés
    const eventSource = new EventSourcePolyfill(`${SSE_URL}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      heartbeatTimeout: 300000 // Increase timeout to 5 minutes (300000 ms)
    });
    
    // Add event listeners
    eventSource.onopen = () => {
      console.log('SSE connection established');
    };

    eventSource.onmessage = (event) => {
      try {
        const notif: Notification = JSON.parse(event.data);
        setNotifications((prev) => [notif, ...prev]);
        setUnreadCount((prev) => prev + 1);
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      // Attempt to reconnect after a delay
      setTimeout(() => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          connectSSE(); // Reconnect
        }
      }, 5000); // 5 second delay before reconnecting
    };

    eventSourceRef.current = eventSource;
  };

  const fetchUnreadNotifications = async () => {
    try {
      const res = await fetch(`${API_URL}/api/notifications/unread`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Notification[] = await res.json();
      setNotifications(data);
      setUnreadCount(data.length);
    } catch (err) {
      console.error('Failed to fetch unread notifications:', err);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch(`${API_URL}/api/notifications/${id}/mark-read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setUnreadCount((count) => count - 1);
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${API_URL}/api/notifications/mark-all-read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
