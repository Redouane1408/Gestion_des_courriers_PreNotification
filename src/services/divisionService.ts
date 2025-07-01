import api from '@/lib/api'
import type { Division, DivisionFilters } from '@/types/division'
import type { User } from '@/types/user'

export const divisionService = {
  // Get all divisions with optional filters
  getDivisions: async (filters?: DivisionFilters): Promise<Division[]> => {
    try {
      const response = await api.get('/v1/Divisions', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching divisions:', error)
      throw error
    }
  },

  // Get a division by ID
  getDivisionById: async (id: string): Promise<Division> => {
    try {
      const response = await api.get(`/v1/Divisions/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching division ${id}:`, error)
      throw error
    }
  },

  // Get users in a division
  getDivisionUsers: async (divisionId: string): Promise<User[]> => {
    try {
      const response = await api.get(`/v1/Divisions/${divisionId}/users`)
      return response.data
    } catch (error) {
      console.error(`Error fetching users for division ${divisionId}:`, error)
      throw error
    }
  }
}