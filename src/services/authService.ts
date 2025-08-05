// ✅ authService.ts
import api from '@/lib/api';
import axios from 'axios'; // ✅ raw axios to bypass interceptors
import { JWTClaims, TokenResponse } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';

// ✅ Utility function to check access token expiration
function isAccessTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    if (!decoded?.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  getUser(): TokenResponse | null {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    return JSON.parse(userData);
  }
  async login({ email, password }: LoginData): Promise<TokenResponse> {
    const response = await api.post('/auth/login', { email, password });

    if (!response.data?.accessToken) {
      throw new Error('Authentication failed: No token received');
    }

    this.storeAuthData(response.data);
    return response.data;
  }

  async refreshToken(): Promise<string> {
    const userData = localStorage.getItem("user");
    if (!userData) throw new Error("No user data found");

    const user = JSON.parse(userData);
    const payload = { refreshToken: user.refreshToken };

    console.log('🔐 Refresh token payload:', payload);

    try {
      // ✅ Use raw axios to avoid interceptors
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data?.accessToken) {
        throw new Error("No access token received in refresh response");
      }

      const updatedUser = {
        ...user,
        accessToken: response.data.accessToken,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return response.data.accessToken;
    } catch (error: any) {
      console.error("❌ Token refresh failed:", error.response?.data || error.message);
      this.clearAuthData();
      throw new Error("Token refresh failed");
    }
  }

    // ✅ Checks if accessToken is expired and refreshes it if needed
    async getValidAccessToken(): Promise<string | null> {
    const token = this.getCurrentToken();
    if (!token) return null;

    if (isAccessTokenExpired(token)) {
        return await this.refreshToken();
    }

    return token;
    }



  storeAuthData(data: TokenResponse): void {
    const user = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      role: data.role,
      email: data.email,
      directionGeneralId: data.directionGeneralId,
      divisionId: data.divisionId,
      directionId: data.directionId,
      sousdirectionId: data.sousdirectionId,
    };

    localStorage.setItem("user", JSON.stringify(user));
  }

  clearAuthData(): void {
    localStorage.removeItem("user");
  }

  getCurrentToken(): string | null {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    const user = JSON.parse(userData);
    return user.accessToken || null;
  }

  getCurrentClaims(): JWTClaims | null {
    const token = this.getCurrentToken();
    if (!token) return null;
    return jwtDecode<JWTClaims>(token);
  }

  logout(): Promise<void> {
    this.clearAuthData();
    return api.post('/auth/logout');
  }
}

export const authService = new AuthService();
