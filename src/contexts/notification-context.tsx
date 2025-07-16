import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

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

// 💡 Adjust according to your env
const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8081/websocket';
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export const NotificationProvider = ({ token, username, children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (token && username) {
      connectWebSocket();
      fetchUnreadNotifications();
    }

    return () => {
      stompClientRef.current?.deactivate();
    };
  }, [token, username]);

  const connectWebSocket = () => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        const topic = `/topic/notifications/${username.toLowerCase()}`;
        client.subscribe(topic, (message) => {
          const notif: Notification = JSON.parse(message.body);
          setNotifications((prev) => [notif, ...prev]);
          setUnreadCount((prev) => prev + 1);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
    });

    client.activate();
    stompClientRef.current = client;
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
      await fetch(`${API_URL}/api/notifications/${id}/mark-read`, { //read/${id}
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
      await fetch(`${API_URL}/api/notifications/mark-all-read`, { //read-all
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
