export interface DirectionGeneral {
  id: string;
  directionGeneraleName: string; // Changed from 'name' to 'directionGeneraleName'
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DirectionGeneralFilters {
  search?: string;
  page?: number;
  limit?: number;
}