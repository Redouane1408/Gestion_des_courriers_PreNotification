import { useState, useEffect, useCallback } from "react"
 import { mailService } from "@/services/mail-service"
import type { Mail, MailFilters, MailPagination } from "@/types/mail"
import { useToast } from "@/hooks/use-toast"

export function useMails(initialFilters: MailFilters = {}) {
  const [mails, setMails] = useState<Mail[]>([])
  const [pagination, setPagination] = useState<Omit<MailPagination, "items">>({
    total: 0,
    page: 0,
    limit: 10,
    totalPages: 0,
  })
  const [filters, setFilters] = useState<MailFilters>({
    page: 0,
    limit: 10,
    ...initialFilters,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const loadMails = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('Filters sent to mailService.getMails:', filters);
      const data = await mailService.getMails(filters)

      setMails(data.items)
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
      })
    } catch (err) {
      setError("Failed to load mails")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load mails. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
}, [filters, toast])

  useEffect(() => {
    loadMails()
  }, [loadMails])

  const updateFilters = useCallback((newFilters: Partial<MailFilters>) => {
    setFilters((prev) => {
      const nextFilters = {
        ...prev,
        ...newFilters,
        page: newFilters.page !== undefined ? newFilters.page : prev.page,
        limit: newFilters.limit !== undefined ? newFilters.limit : prev.limit,
      };
      console.log('updateFilters: prev', prev, 'new', newFilters, 'next', nextFilters);
      return nextFilters;
    });
  }, [])

  const handleMailUpdate = useCallback((updatedMail: Mail) => {
    setMails(prevMails =>
      prevMails.map(mail => (mail.id === updatedMail.id ? updatedMail : mail))
    );
  }, []);

  return {
    mails,
    pagination,
    filters,
    isLoading,
    error,
    updateFilters,
    refresh: loadMails,
    handleMailUpdate
  }
}