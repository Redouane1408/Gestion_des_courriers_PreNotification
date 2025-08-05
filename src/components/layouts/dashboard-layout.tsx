import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layouts/sidebar";
import { Header } from "@/components/layouts/header";
import { useAuth } from "@/contexts/auth-context";
import { NotificationProvider } from "@/contexts/notification-context";

export function DashboardLayout() {
  const { isAuthenticated, userEmail, getToken, isLoading } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const validToken = await getToken();
        setToken(validToken);
      } catch (error) {
        console.error("🔐 Failed to load valid token:", error);
      } finally {
        setIsTokenReady(true);
      }
    };

    fetchToken();
  }, [getToken]);

  if (isLoading || !isTokenReady || !token || !userEmail || !isAuthenticated) {
    return <div className="p-6">🔐 Chargement sécurisé... Veuillez patienter</div>;
  }

  return (
    <NotificationProvider token={token} username={userEmail}>
      <div className="flex min-h-screen w-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 md:ml-72">
          <Header />
          <main className="flex-1 overflow-auto p-4 md:p-8 ">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}