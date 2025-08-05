export interface Division {
    id: string;
    divisionName: string;
    directionGeneralId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface DivisionFilters {
    search?: string;
    directionGeneralId: string;
    page?: number;
    limit?: number;
  }