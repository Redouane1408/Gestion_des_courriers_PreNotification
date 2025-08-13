import { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layouts/sidebar";
import { Header } from "@/components/layouts/header";
import { useAuth } from "@/contexts/auth-context";
import { NotificationProvider } from "@/contexts/notification-context";
import { jwtDecode } from 'jwt-decode';

export function DashboardLayout() {
  const { isAuthenticated, userEmail, getToken, isLoading } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);

  // Smart token refresh that checks expiration
  const smartTokenRefresh = useCallback(async () => {
    try {
      const currentToken = await getToken();
      if (currentToken) {
        try {
          const decoded = jwtDecode<{ exp: number }>(currentToken);
          const expiresIn = decoded.exp * 1000 - Date.now();
          
          // Only refresh if token expires in less than 5 minutes AND it's different from current
          if (expiresIn < 5 * 60 * 1000 && currentToken !== token) {
            console.log('🔄 Token expiring soon, refreshing...');
            setToken(currentToken);
          } else if (currentToken !== token) {
            setToken(currentToken);
          }
        } catch (decodeError) {
          console.error('❌ Token decode error:', decodeError);
          if (currentToken !== token) {
            setToken(currentToken);
          }
        }
      }
    } catch (error) {
      console.error("🔐 Failed to refresh token:", error);
    }
  }, [getToken, token]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const validToken = await getToken();
        setToken(validToken);
        console.log('🔐 Initial token loaded');
      } catch (error) {
        console.error("🔐 Failed to load initial token:", error);
      } finally {
        setIsTokenReady(true);
      }
    };

    fetchToken();

    // Less frequent token refresh - every 5 minutes
    const tokenRefreshInterval = setInterval(smartTokenRefresh, 5 * 60 * 1000);

    // Only refresh on focus if user has been away for more than 1 minute
    let lastFocusTime = Date.now();
    const handleFocus = () => {
      const timeSinceLastFocus = Date.now() - lastFocusTime;
      if (timeSinceLastFocus > 60 * 1000) { // 1 minute
        console.log('👁️ Window focused after being away, refreshing token...');
        smartTokenRefresh();
      }
      lastFocusTime = Date.now();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleFocus();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(tokenRefreshInterval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [getToken, smartTokenRefresh]);

  if (isLoading || !isTokenReady || !token || !userEmail || !isAuthenticated) {
    return <div className="p-6">🔐 Chargement sécurisé... Veuillez patienter</div>;
  }

  return (
    <NotificationProvider token={token} username={userEmail}>
      <div className="flex min-h-screen w-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 md:ml-72">
          <div className="relative">
            <Header />
          </div>
          <main className="flex-1 overflow-auto p-4 pt-24 main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}