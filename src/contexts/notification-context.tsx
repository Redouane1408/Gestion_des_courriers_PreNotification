import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
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

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  connectionStatus: ConnectionStatus;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

interface NotificationProviderProps {
  children: ReactNode;
  token: string;
  username: string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
const SSE_URL = `${API_URL}/api/notifications/sse`;

export const NotificationProvider = ({ token, username, children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  
  // Refs for managing connections
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef<boolean>(false);
  const hasInitializedRef = useRef<boolean>(false);
  
  // Connection management
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000; // 3 seconds

  // Cleanup function
  const cleanup = useCallback(() => {
    console.log('🧹 Cleaning up SSE connection...');
    
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    isConnectingRef.current = false;
    setConnectionStatus('disconnected');
  }, []);

  // Fetch initial notifications
  const fetchInitialNotifications = useCallback(async () => {
    if (!token || hasInitializedRef.current) return;
    
    try {
      const response = await fetch(`${API_URL}/api/notifications/unread`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data: Notification[] = await response.json();
      setNotifications(data);
      setUnreadCount(data.length);
      hasInitializedRef.current = true;
      
      console.log(`📬 Loaded ${data.length} initial notifications`);
    } catch (error) {
      console.error('❌ Failed to fetch initial notifications:', error);
    }
  }, [token]);

  // SSE connection with proper error handling
  const connectSSE = useCallback(() => {
    if (!token || !username || isConnectingRef.current) {
      return;
    }
    
    // Cleanup existing connection
    cleanup();
    
    isConnectingRef.current = true;
    console.log(`🔌 Establishing SSE connection (attempt ${connectionAttempts + 1})...`);
    setConnectionStatus('connecting');
    
    try {
      const eventSource = new EventSourcePolyfill(SSE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Accept': 'text/event-stream',
        },
        heartbeatTimeout: 6000, // 6 seconds
        withCredentials: false,
      });
      
      eventSource.onopen = () => {
        console.log('✅ SSE connection established successfully');
        setConnectionStatus('connected');
        setConnectionAttempts(0);
        isConnectingRef.current = false;
        
        // Fetch initial notifications only once
        fetchInitialNotifications();
      };

      eventSource.onmessage = (event) => {
        try {
          console.log('📨 Raw SSE message received:', event.data);
          
          // Better keep-alive handling: Handle both 'keep-alive' and 'keeps alive' messages
          if (event.data === 'keep-alive' || event.data === 'keeps alive') {
            console.log('💓 Keep-alive received');
            return;
          }
          
          const notif: Notification = JSON.parse(event.data);
          console.log('📬 New notification received:', notif);
          
          setNotifications((prev) => {
            // Check for duplicates
            const exists = prev.some(n => n.id === notif.id);
            if (exists) {
              console.log('⚠️ Duplicate notification ignored:', notif.id);
              return prev;
            }
            return [notif, ...prev];
          });
          
          setUnreadCount((prev) => prev + 1);
          
          // Browser notification (if permission granted)
          if (Notification.permission === 'granted') {
            new Notification('Nouvelle notification', {
              body: notif.message,
              icon: '/logo-app.svg',
              tag: `notification-${notif.id}`,
              requireInteraction: false,
            });
          }
        } catch (error) {
          console.error('❌ Error parsing SSE message:', error, 'Raw data:', event.data);
        }
      };

      // Added custom event listener: Handle custom 'notification' events
      eventSource.addEventListener('notification', (event) => {
        try {
          console.log('📨 Custom notification event received:', (event as MessageEvent).data);
          const notif: Notification = JSON.parse((event as MessageEvent).data);
          console.log('📬 New notification from custom event:', notif);
          
          setNotifications((prev) => {
            // Check for duplicates
            const exists = prev.some(n => n.id === notif.id);
            if (exists) {
              console.log('⚠️ Duplicate notification ignored:', notif.id);
              return prev;
            }
            return [notif, ...prev];
          });
          
          setUnreadCount((prev) => prev + 1);
          
          // Browser notification (if permission granted)
          if (Notification.permission === 'granted') {
            new Notification('Nouvelle notification', {
              body: notif.message,
              icon: '/logo-app.svg',
              tag: `notification-${notif.id}`,
              requireInteraction: false,
            });
          }
        } catch (error) {
          console.error('❌ Error parsing notification event:', error, 'Raw data:', (event as MessageEvent).data);
        }
      });

      eventSource.onerror = (error) => {
        console.error('❌ SSE connection error:', error);
        setConnectionStatus('error');
        isConnectingRef.current = false;
        
        const newAttempts = connectionAttempts + 1;
        setConnectionAttempts(newAttempts);
        
        // Attempt reconnection with exponential backoff
        if (newAttempts < MAX_RECONNECT_ATTEMPTS) {
          const delay = Math.min(RECONNECT_DELAY * Math.pow(2, newAttempts - 1), 30000);
          console.log(`⏳ Scheduling reconnection in ${delay / 1000}s (attempt ${newAttempts})...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connectSSE();
          }, delay);
        } else {
          console.log('🚫 Max reconnection attempts reached');
          setConnectionStatus('disconnected');
        }
      };

      eventSourceRef.current = eventSource;
      
    } catch (error) {
      console.error('❌ Failed to create SSE connection:', error);
      setConnectionStatus('error');
      isConnectingRef.current = false;
    }
  }, [token, username, connectionAttempts, cleanup, fetchInitialNotifications]);

  // Effect to manage SSE connection
  useEffect(() => {
    if (token && username) {
      // Request notification permission
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          console.log('🔔 Notification permission:', permission);
        });
      }
      
      console.log('🔄 Starting SSE connection for user:', username);
      setConnectionAttempts(0);
      connectSSE();
    } else {
      cleanup();
      hasInitializedRef.current = false;
    }

    return cleanup;
  }, [token, username, connectSSE, cleanup]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('📱 Page hidden, maintaining SSE connection');
      } else {
        console.log('📱 Page visible, checking SSE connection');
        // Reconnect if connection was lost while page was hidden
        if (token && username && connectionStatus !== 'connected' && !isConnectingRef.current) {
          setConnectionAttempts(0);
          connectSSE();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [token, username, connectionStatus, connectSSE]);

  // Mark notification as read
  const markAsRead = useCallback(async (id: number) => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_URL}/api/notifications/${id}/mark-read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      // Optimistically update UI
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setUnreadCount((count) => Math.max(0, count - 1));
      
      console.log(`✅ Notification ${id} marked as read`);
    } catch (error) {
      console.error('❌ Failed to mark notification as read:', error);
    }
  }, [token]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_URL}/api/notifications/mark-all-read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      // Optimistically update UI
      setNotifications([]);
      setUnreadCount(0);
      
      console.log('✅ All notifications marked as read');
    } catch (error) {
      console.error('❌ Failed to mark all notifications as read:', error);
    }
  }, [token]);

  return (
    <NotificationContext.Provider
      value={{ 
        notifications, 
        unreadCount, 
        connectionStatus,
        markAsRead, 
        markAllAsRead 
      }}
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
