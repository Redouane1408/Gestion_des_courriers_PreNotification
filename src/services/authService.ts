import api from '@/lib/api';
import { JWTClaims, TokenResponse } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';



interface LoginData {
  email: string;
  password: string;
}



class AuthService {
  async login({ email, password }: LoginData): Promise<TokenResponse> {
    const response = await api.post('/auth/login', { email, password });
    
    if (!response.data?.accessToken) {
      throw new Error('Authentication failed: No token received');
    }

    this.storeAuthData(response.data);
    return response.data;
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');
    
    const response = await api.post('/auth/refresh', { refreshToken });
    
    if (!response.data?.accessToken) {
      throw new Error('No access token received in refresh response');
    }

    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  }

  async validateToken(): Promise<boolean> {
    try {
      const token = this.getCurrentToken();
      if (!token) return false;
      
      await api.get('/auth/validate');
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      this.clearAuthData();
      return false;
    }
  }

  storeAuthData(data: TokenResponse): void {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userRole', data.role);
    
    // Store division and direction IDs from claims
    const claims = this.getCurrentClaims();
    if (claims?.divisionId) {
        localStorage.setItem('divisionId', claims.divisionId.toString());
    }
    if (claims?.directionId) {
        localStorage.setItem('directionId', claims.directionId.toString());
    }
    if (claims?.sousDirectionId) {
        localStorage.setItem('sousDirectionId', claims.sousDirectionId.toString());  // Fixed casing here
    }
}

  clearAuthData(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('divisionId');
    localStorage.removeItem('directionId');
    localStorage.removeItem('sousDirectionId');  // Fixed casing here
  }

  getCurrentToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getCurrentRole(): 'ADMIN' | 'USER' | null {
    return localStorage.getItem('userRole') as 'ADMIN' | 'USER' | null;
  }

  getCurrentClaims(): JWTClaims | null {
    const token = this.getCurrentToken();
    if (!token) return null;
    return jwtDecode<JWTClaims>(token);
  }

  getDivisionId(): string | null {
    const claims = this.getCurrentClaims();
    return claims?.divisionId?.toString() || null;
  }

  getDirectionId(): string | null {
    const claims = this.getCurrentClaims();
    return claims?.directionId?.toString() || null;
  }

  getSousDirectionId(): string | null {  // Add this new method
    const claims = this.getCurrentClaims();
    return claims?.sousDirectionId?.toString() || null;
  }

  isDirectionDirector(): boolean {
    const claims = this.getCurrentClaims();
    return claims?.role === 'ADMIN' && !!claims?.directionId;
  }

  isDivisionDirector(): boolean {
    const claims = this.getCurrentClaims();
    return claims?.role === 'ADMIN' && !!claims?.divisionId && !claims?.directionId;
  }

  logout(): Promise<void> {
    this.clearAuthData();
    return api.post('/auth/logout');
  }
}

// Export a singleton instance
export const authService = new AuthService();