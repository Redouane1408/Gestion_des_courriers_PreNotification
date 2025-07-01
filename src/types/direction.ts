export interface Direction {
    id: string;
    name: string;
    divisionId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface DirectionFilters {
    search?: string;
    divisionId?: string;
    page?: number;
    limit?: number;
  }