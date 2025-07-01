import axios from "axios"
import  { Profile } from "@/types/user"

export const profileService = {
  fetchProfile: async (getToken: () => Promise<string | null>): Promise<Profile> => {
    try {
      const token = await getToken()

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error)
      throw error
    }
  },
}
