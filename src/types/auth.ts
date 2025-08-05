export interface JWTClaims {
    sub?: string;
    iat?: number;
    exp?: number;
    role: 'ADMIN' | 'USER';
    divisionId: number;
    directionId?: number;
    sousdirectionId?: number;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    role: 'ADMIN' | 'USER';
    directionGeneralId?: number;
    divisionId: number;
    directionId?: number;
    sousdirectionId?: number; // Changed from sousDirectionId to sousdirectionId
    email?: string;
}

// Helper functions to determine user type
export const isGlobalAdmin = (claims: TokenResponse): boolean => {
    return claims.role === 'ADMIN' && !claims.directionId;
}

export const isDirectionAdmin = (claims: TokenResponse): boolean => {
    return claims.role === 'ADMIN' && !!claims.directionId;
}

export const isSousDirectionUser = (claims: TokenResponse): boolean => {
    return claims.role === 'USER'; 
}