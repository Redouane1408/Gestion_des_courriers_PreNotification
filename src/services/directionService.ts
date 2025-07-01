import axios from 'axios'
import { Direction, DirectionFilters } from '@/types/direction'
import api from '@/lib/api'

export const directionService = {
  getDirections: async (filters?: DirectionFilters): Promise<Direction[]> => {
    try {
      const response = await api.get('/Directions', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching directions:', error)
      throw error
    }
  },

  getDirectionsByDivisionId: async (divisionId: string, token: string): Promise<Direction[]> => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Directions/getByDivisionId`, {
        params: { divisionId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching directions:", error);
      throw error;
    }
  }
}