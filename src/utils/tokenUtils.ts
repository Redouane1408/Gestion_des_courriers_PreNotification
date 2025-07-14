// utils/tokenUtils.ts
import { jwtDecode } from "jwt-decode";

export function isAccessTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    if (!decoded?.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}
