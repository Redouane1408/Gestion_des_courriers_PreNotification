export interface JWTClaims {
    sub?: string;
    iat?: number;
    exp?: number;
    role: 'ADMIN' | 'USER';
    divisionId: number;
    directionId?: number;
    sousDirectionId?: number;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    role: 'ADMIN' | 'USER';
    divisionId: number;
    directionId?: number;
    sousDirectionId?: number;
}

// Helper functions to determine user type
export const isGlobalAdmin = (claims: TokenResponse): boolean => {
    return claims.role === 'ADMIN' && !claims.directionId;
}

export const isDirectionAdmin = (claims: TokenResponse): boolean => {
    return claims.role === 'ADMIN' && !!claims.directionId;
}

export const isRegularUser = (claims: TokenResponse): boolean => {
    return claims.role === 'USER';
}