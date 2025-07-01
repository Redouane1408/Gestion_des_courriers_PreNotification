import axios from 'axios'
import { SousDirectionFilters } from '@/types/sousDirection'
import api from '@/lib/api'

export const sousDirectionService = {
  getSousDirections: async (filters?: SousDirectionFilters) => {
    try {
      const response = await api.get('/sousDirections', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching sous-directions:', error)
      throw error
    }
  },

  getSousDirectionsByDirectionAndDivision: async (directionId: string, divisionId: string, token: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sousDirections/getByDirectionIdAndDivisionId`, {
        params: { directionId, divisionId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching sous-directions for direction ${directionId}:`, error);
      throw error;
    }
  }
}