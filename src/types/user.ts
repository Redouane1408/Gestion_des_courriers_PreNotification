// Types pour les utilisateurs

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    department?: string;
    direction?: string;
    subDirection?: string;
    phone?: string;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
}

export interface JWTClaims {
    sub: string;
    email: string;
    role: 'ADMIN' | 'USER';
    directionId?: string;
    divisionId?: string;
    sousdirectionId?: string;
    exp: number;
}


////////////////////////////////////////////////////////
  
  export type UserRole = "ADMIN" | "USER" 
  
  export type UserStatus = "ACTIVE" | "INACTIVE"
  
  // Type pour la création d'un utilisateur
  export interface CreateUserDto {
    name: string
    email: string
    password: string
    role: UserRole
    department: string
    direction?: string
    subDirection?: string
    phone?: string
    status?: UserStatus
  }
  
  // Type pour la mise à jour d'un utilisateur
  export interface UpdateUserDto {
    name?: string
    email?: string
    role?: UserRole
    department?: string
    direction?: string
    subDirection?: string
    phone?: string
    status?: UserStatus
    password?: string
  }
  
  // Type pour les filtres de recherche d'utilisateurs
  export interface UserFilters {
    search?: string
    role?: UserRole
    department?: string
    status?: UserStatus
    page?: number
    limit?: number
  }
  
  // Type pour la pagination des utilisateurs
  export interface UserPagination {
    items: User[]
    total: number
    page: number
    limit: number
    totalPages: number
  }

  export interface Profile{
    nomComplet: string
    email: string
    telephone?: string
    quatreChiffres: string
    directionId: string |null
    divisionId: string | null
    sousDirectionId: string | null
    role: UserRole
  }
  
  
  