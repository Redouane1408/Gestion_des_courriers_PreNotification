import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

type User = {
    role: 'ADMIN' | 'USER';
    accessToken: string;
    refreshToken: string;
    email: string;
    divisionId?: string;
    directionId?: string;
    sousdirectionId?: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    role: 'ADMIN' | 'USER' | null;
    userEmail: string | null;
    divisionId: string | null;
    directionId: string | null;
    sousdirectionId: string | null;
    isGlobalAdmin: () => boolean;
    isDirectionAdmin: () => boolean;
    isSousDirectionUser: () => boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isLoading: true,
        role: null as 'ADMIN' | 'USER' | null,
        userEmail: null as string | null,
        divisionId: null as string | null,
        directionId: null as string | null,
        sousdirectionId: null as string | null,
    });

    const isGlobalAdmin = useCallback(() => {
        return authState.role === 'ADMIN' && !authState.directionId && !authState.sousdirectionId;
    }, [authState.role, authState.directionId, authState.sousdirectionId]);

    const isDirectionAdmin = useCallback(() => {
        return authState.role === 'ADMIN' && !!authState.directionId;
    }, [authState.role, authState.directionId]);

    const isSousDirectionUser = useCallback(() => {
        return authState.role === 'USER' && !!authState.sousdirectionId;
    }, [authState.role, authState.sousdirectionId]);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const user: User = JSON.parse(userData);
                    if (!user.accessToken || typeof user.accessToken !== 'string') {
                        throw new Error('Invalid or missing access token in stored user data');
                    }
                    
                    const decodedToken = jwtDecode<{ 
                        divisionId?: string; 
                        directionId?: string;
                        sousdirectionId?: string;
                    }>(user.accessToken);
                    
                    setAuthState({
                        isAuthenticated: true,
                        isLoading: false,
                        role: user.role,
                        userEmail: user.email,
                        divisionId: decodedToken.divisionId || null,
                        directionId: decodedToken.directionId || null,
                        sousdirectionId: decodedToken.sousdirectionId || null,
                    });
                } else {
                    setAuthState(prev => ({
                        ...prev,
                        isLoading: false,
                    }));
                }
            } catch (error) {
                console.error('Failed to initialize auth:', error);
                localStorage.removeItem('user');
                setAuthState(prev => ({ 
                    ...prev, 
                    isLoading: false,
                    isAuthenticated: false 
                }));
            }
        };

        initializeAuth();
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            
            if (!data.accessToken || typeof data.accessToken !== 'string') {
                throw new Error('Invalid access token received from server');
            }
            if (!data.refreshToken || typeof data.refreshToken !== 'string') {
                throw new Error('Invalid refresh token received from server');
            }

            const user: User = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                role: data.role,
                email: data.email,
                divisionId: data.divisionId,
                directionId: data.directionId,
                sousdirectionId: data.sousdirectionId,
            };

            const decodedToken = jwtDecode<{ 
                divisionId?: string; 
                directionId?: string;
                sousdirectionId?: string;
            }>(user.accessToken);

            localStorage.setItem('user', JSON.stringify(user));


            setAuthState({
                isAuthenticated: true,
                isLoading: false,
                role: user.role,
                userEmail: user.email,
                divisionId: decodedToken.divisionId || null,
                directionId: decodedToken.directionId || null,
                sousdirectionId: decodedToken.sousdirectionId || null,
            });
        } catch (error) {
            console.error('Login error:', error);
            setAuthState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('user');
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

    const getToken = useCallback(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user: User = JSON.parse(userData);
            return user.accessToken;
        }
        return null;
    }, []);

    return (
        <AuthContext.Provider value={{ 
            ...authState, 
            login, 
            logout,
            isGlobalAdmin,
            isDirectionAdmin,
            isSousDirectionUser,
            getToken // Add the getToken method here
        }}>
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