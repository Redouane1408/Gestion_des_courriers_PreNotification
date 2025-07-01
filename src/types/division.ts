export interface Division {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface DivisionFilters {
    search?: string;
    page?: number;
    limit?: number;
  }