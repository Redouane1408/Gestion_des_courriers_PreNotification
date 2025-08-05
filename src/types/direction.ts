export interface Direction {
    id: string;
    directionName: string;
    directionGeneralId: string;
    divisionId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface DirectionFilters {
    search?: string;
    directionGeneralId: string;
    divisionId?: string;
    page?: number;
    limit?: number;
  }