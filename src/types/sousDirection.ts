export interface SousDirection {
    id: number;  // Changed to number to match API response
    sousDirectionName: string;
    directionId: string; // Changed to number to match API response
    divisionId: string;  // Added to match the hierarchy
    directionGeneralId: string; //new
    createdAt?: string;
    updatedAt?: string;
}

export interface SousDirectionFilters {
    search?: string;
    directionGeneralId: number; //new
    directionId?: number;  // Changed to number to match API response
    divisionId?: number; // Added to match the hierarchy
    page?: number;
    limit?: number;
}

// Helper type for the response structure
export interface SousDirectionResponse {
    id: number;
    name: string;
    directionId: number;
    divisionId: number;
    directionGeneralId: number; //new
}