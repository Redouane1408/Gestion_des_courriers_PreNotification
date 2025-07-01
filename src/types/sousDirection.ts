export interface SousDirection {
    id: number;  // Changed to number to match API response
    name: string;
    directionId: number;  // Changed to number to match API response
    divisionId: number;  // Added to match the hierarchy
    createdAt?: string;
    updatedAt?: string;
}

export interface SousDirectionFilters {
    search?: string;
    directionId?: number;  // Changed to number to match API response
    divisionId?: number;  // Added to match the hierarchy
    page?: number;
    limit?: number;
}

// Helper type for the response structure
export interface SousDirectionResponse {
    id: number;
    name: string;
    directionId: number;
    divisionId: number;
}