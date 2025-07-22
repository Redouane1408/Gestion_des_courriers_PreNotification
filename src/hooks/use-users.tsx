/* "use client"

import { useState, useEffect, useCallback } from "react"
import { userService } from "@/services/user-service"
import type { User, UserFilters, UserPagination } from "@/types/user"
import { useToast } from "@/hooks/use-toast"

// Hook personnalisé pour la gestion des utilisateurs
export function useUsers(initialFilters: UserFilters = {}) {
  const [users, setUsers] = useState<User[]>([])
  const [pagination, setPagination] = useState<Omit<UserPagination, "items">>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [filters, setFilters] = useState<UserFilters>(initialFilters)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fonction pour charger les utilisateurs
  const loadUsers = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await userService.getUsers({
        ...filters,
        page: filters.page || 1,
        limit: filters.limit || 10,
      })

      setUsers(data.items)
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
      })
    } catch (err) {
      setError("Impossible de charger les utilisateurs")
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les utilisateurs. Veuillez réessayer.",
      })
    } finally {
      setIsLoading(false)
    }
  }, [filters, toast])

  // Charger les utilisateurs au montage et lorsque les filtres changent
  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  // Fonction pour mettre à jour les filtres
  const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Réinitialiser la page à 1 si les filtres changent (sauf si la page est explicitement définie)
      page: newFilters.page !== undefined ? newFilters.page : 1,
    }))
  }, [])

  // Fonction pour créer un utilisateur
  const createUser = useCallback(
    async (userData: any) => {
      setIsLoading(true)

      try {
        await userService.createUser(userData)
        toast({
          title: "Utilisateur créé",
          description: "L'utilisateur a été créé avec succès.",
        })
        loadUsers()
        return true
      } catch (err: any) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: err.response?.data?.message || "Impossible de créer l'utilisateur.",
        })
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [loadUsers, toast],
  )

  // Fonction pour mettre à jour un utilisateur
  const updateUser = useCallback(
    async (id: string, userData: any) => {
      setIsLoading(true)

      try {
        await userService.updateUser(id, userData)
        toast({
          title: "Utilisateur mis à jour",
          description: "L'utilisateur a été mis à jour avec succès.",
        })
        loadUsers()
        return true
      } catch (err: any) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: err.response?.data?.message || "Impossible de mettre à jour l'utilisateur.",
        })
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [loadUsers, toast],
  )

  // Fonction pour supprimer un utilisateur
  const deleteUser = useCallback(
    async (id: string) => {
      setIsLoading(true)

      try {
        await userService.deleteUser(id)
        toast({
          title: "Utilisateur supprimé",
          description: "L'utilisateur a été supprimé avec succès.",
        })
        loadUsers()
        return true
      } catch (err: any) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: err.response?.data?.message || "Impossible de supprimer l'utilisateur.",
        })
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [loadUsers, toast],
  )

  // Fonction pour activer/désactiver un utilisateur
  const toggleUserStatus = useCallback(
    async (id: string, activate: boolean) => {
      setIsLoading(true)

      try {
        if (activate) {
          await userService.activateUser(id)
          toast({
            title: "Utilisateur activé",
            description: "L'utilisateur a été activé avec succès.",
          })
        } else {
          await userService.deactivateUser(id)
          toast({
            title: "Utilisateur désactivé",
            description: "L'utilisateur a été désactivé avec succès.",
          })
        }
        loadUsers()
        return true
      } catch (err: any) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            err.response?.data?.message || `Impossible de ${activate ? "activer" : "désactiver"} l'utilisateur.`,
        })
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [loadUsers, toast],
  )

  // Fonction pour réinitialiser le mot de passe d'un utilisateur
  const resetPassword = useCallback(
    async (id: string) => {
      setIsLoading(true)

      try {
        const result = await userService.resetPassword(id)
        toast({
          title: "Mot de passe réinitialisé",
          description: `Le mot de passe temporaire est: ${result.temporaryPassword}`,
        })
        return result.temporaryPassword
      } catch (err: any) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: err.response?.data?.message || "Impossible de réinitialiser le mot de passe.",
        })
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [toast],
  )

  return {
    users,
    pagination,
    filters,
    isLoading,
    error,
    updateFilters,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    resetPassword,
  }
}
 */