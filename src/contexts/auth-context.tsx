// auth-context.tsx
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/services/authService';

type UserRole = 'ADMIN' | 'USER';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  userEmail: string | null;
  divisionId: string | null;
  directionId: string | null;
  sousdirectionId: string | null;
  isGlobalAdmin: () => boolean;
  isDirectionAdmin: () => boolean;
  isSousDirectionUser: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    role: null as UserRole | null,
    userEmail: null as string | null,
    divisionId: null as number | null,
    directionId: null as number | null,
    sousdirectionId: null as number | null,
  });

  const isGlobalAdmin = useCallback(() => {
    return authState.role === 'ADMIN' && !authState.directionId && !authState.sousdirectionId;
  }, [authState]);

  const isDirectionAdmin = useCallback(() => {
    return authState.role === 'ADMIN' && !!authState.directionId;
  }, [authState]);

  const isSousDirectionUser = useCallback(() => {
    return authState.role === 'USER' && !!authState.sousdirectionId; // Changed from sousDirectionId to sousdirectionId
  }, [authState]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = authService.getUser();
        if (user) {
          const decoded = jwtDecode<any>(user.accessToken);
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            role: user.role,
            userEmail: decoded.sub || user.email || null,
            divisionId: decoded.divisionId || null,
            directionId: decoded.directionId || null,
            sousdirectionId: decoded.sousdirectionId || null, // Changed from sousDirectionId to sousdirectionId
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        authService.clearAuthData();
        setAuthState(prev => ({ ...prev, isLoading: false, isAuthenticated: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const data = await authService.login({ email, password });
      const decoded = jwtDecode<any>(data.accessToken);
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        role: data.role,
        userEmail: decoded.sub || email,
        divisionId: data.divisionId || null,
        directionId: data.directionId || null,
        sousdirectionId: data.sousdirectionId || null, // Changed from sousDirectionId to sousdirectionId
      });
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    authService.clearAuthData();
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      role: null,
      userEmail: null,
      divisionId: null,
      directionId: null,
      sousdirectionId: null,
    });
  }, []);

  const getToken = useCallback(() => authService.getValidAccessToken(), []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.userEmail || null,
        ...authState,
        divisionId: authState.divisionId?.toString() || null,
        directionId: authState.directionId?.toString() || null,
        sousdirectionId: authState.sousdirectionId?.toString() || null,
        login,
        logout,
        getToken,
        isGlobalAdmin,
        isDirectionAdmin,
        isSousDirectionUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
