import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';

export const NotificationProviderGuard = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const [hasValidToken, setHasValidToken] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await authService.getValidAccessToken();
        if (token) {
          setHasValidToken(true);
        } else {
          console.warn('🔐 No valid access token found.');
        }
      } catch (error) {
        console.error('🔐 Error while checking token:', error);
      } finally {
        setIsReady(true);
      }
    };

    checkAuth();
  }, []);

  if (!isReady) {
    return <div className="p-4 text-muted-foreground">Chargement de l’authentification...</div>;
  }

  if (!hasValidToken) {
    return <div className="p-4 text-muted-foreground">🔒 Auth non disponible...</div>;
  }

  return <>{children}</>;
};
