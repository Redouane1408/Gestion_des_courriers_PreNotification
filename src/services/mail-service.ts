import api from "@/lib/api";
import type { Mail, MailFilters, MailPagination, Destination } from "@/types/mail";
import { authService } from '@/services/authService';

// Helper function to format dates for API
const formatDateForApi = (dateStr: string) => {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toISOString();
  } catch (e) {
    console.error("Invalid date format:", dateStr);
    return null;
  }
};

// Helper to map frontend filter names to backend filter names
const mapFiltersToBackend = (filters: MailFilters) => {
  const mappedFilters = {
    courielNumber: filters.id || null, 
    type: filters.type === 'all' ? null : filters.type || null,
    nature: filters.nature === 'all' || !filters.nature ? null :
           filters.nature === 'Interne' ? 'Intern' :
           filters.nature === 'Externe' ? 'Extern' :
           filters.nature,
    subject: filters.subject?.trim() || null,
    priority: filters.priority === 'all' ? null : filters.priority || null,
    status: filters.status === 'all' ? null : filters.status|| null,
    
    // Change these property names to match what the backend expects
    fromarrivedDate: formatDateForApi(filters.dateReceptionFrom || ''),
    toarrivedDate: formatDateForApi(filters.dateReceptionTo || ''),
    fromsentDate: formatDateForApi(filters.dateFrom || ''),
    tosentDate: formatDateForApi(filters.dateTo || ''),
    fromreturnDate: formatDateForApi(filters.dateRetourFrom || ''),
    toreturnDate: formatDateForApi(filters.dateRetourTo || ''),
    
    savedDate: null,
    editable: filters.editable || null, // Map from frontend filters


    fromDivisionId: filters.senderDivision ? parseInt(filters.senderDivision) : null,
    fromDirectionId: filters.senderDirection ? parseInt(filters.senderDirection) : null,
    fromSousDirectionId: filters.senderSousDirection ? parseInt(filters.senderSousDirection) : null,
    ministryName: filters.ministryName || null,
    toDivisionId: filters.recipientDivision ? parseInt(filters.recipientDivision) : null,
    toDirectionId: filters.recipientDirection ? parseInt(filters.recipientDirection) : null,
    toSousDirectionId: filters.recipientSousDirection ? parseInt(filters.recipientSousDirection) : null,
    toExternal: filters.toExternal || null,
    page: filters.page !== undefined ? filters.page : 0,
    size: filters.limit !== undefined ? filters.limit : 10,
  };
  
  console.log('Mapped filters for backend:', mappedFilters);
  console.log('Original page value:', filters.page, 'Mapped page value:', mappedFilters.page);
  return mappedFilters;
};

// Helper to map backend response to frontend Mail objects
export const mapResponseToMails = (data: any[]): Mail[] => {
  return data.map((mail: any) => {
    // Map destinations from the new backend structure
    const destinations: Destination[] = mail.destinations?.map((dest: any) => ({
      id: dest.id?.toString() || "",
      type: dest.type || 'internal',
      directionGeneralId: dest.directionGeneralId?.toString(),
      divisionId: dest.divisionId?.toString(),
      directionId: dest.directionId?.toString(),
      sousDirectionId: dest.sousDirectionId?.toString(),
      ministryName: dest.ministryName,
      displayName: dest.displayName || generateDestinationDisplayName(dest)
    })) || [];

    return {
      id: mail.courielNumber?.toString() || "",
      courielNumber: mail.courielNumber?.toString() || "",
      type: mail.type || "",
      nature: mail.nature || "",
      subject: mail.subject || "",
      sender: mail.fromExternal || 
             (mail.fromDivisionId ? `${mail.fromDivisionId}${mail.fromDirectionId ? ` - ${mail.fromDirectionId}` : ''}` : ""),
      recipient: destinations.length > 0 
        ? [...new Set(destinations.map(d => d.displayName))].join(', ') // Remove duplicates
        : (mail.toExternal || 
          (mail.toDivisionId ? ` ${mail.toDivisionId}${mail.toDirectionId ? ` -  ${mail.toDirectionId}` : ''}` : "")),
      date: mail.arrivedDate || mail.sentDate || new Date().toISOString(),
      registrationDate: mail.savedDate || mail.arrivedDate || new Date().toISOString(),
      returnDate: mail.returnDate || null,
      status: mail.status === "EN_COURS" ? "En cours" : mail.status === "ARCHIVER" ? "Archivé" : "En cours",
      priority: mail.priority || "Normal",
      attachments: mail.attachments?.map((att: any) => ({
        name: att.name || att.fileName || "Document",
        size: att.size || "Unknown"
      })) || [],
      description: mail.description || "",
      createdBy: mail.historyList?.[0]?.createdById?.toString() || "Unknown",
      createdAt: mail.historyList?.[0]?.timestamp || mail.arrivedDate || new Date().toISOString(),
      modifiedBy: mail.historyList?.slice(1).map((history: any) => ({
        user: history.updatedById?.toString() || "Unknown",
        date: history.timestamp || new Date().toISOString()
      })) || [],
      
      // New destinations field
      destinations,
      
      // Keep legacy fields for backward compatibility
      editable: mail.editable,
      fromDivisionId: mail.fromDivisionId,
      fromDirectionId: mail.fromDirectionId,
      fromSousDirectionId: mail.fromSousDirectionId,
      fromExternal: mail.fromExternal,
      toDivisionId: mail.toDivisionId,
      toDirectionId: mail.toDirectionId,
      toSousDirectionId: mail.toSousDirectionId,
      toExternal: mail.toExternal,
      arrivedDate: mail.arrivedDate,
      sentDate: mail.sentDate,
      savedDate: mail.savedDate,
      historyList: mail.historyList,
      courielFiles: mail.courielFiles || []
    };
  });
};

// Helper function to generate display name for destinations
const generateDestinationDisplayName = (dest: any): string => {
  if (dest.type === 'external') {
    return dest.ministryName || 'Ministère Externe';
  }
  
  const parts = [];
  if (dest.directionGeneralId) parts.push(`${dest.directionGeneralId}`);
  if (dest.divisionId) parts.push(`${dest.divisionId}`);
  if (dest.directionId) parts.push(`${dest.directionId}`);
  if (dest.sousDirectionId) parts.push(`${dest.sousDirectionId}`);
  if (dest.ministryName) parts.push(`${dest.ministryName}`);
  
  // If we have parts, join them
  if (parts.length > 0) {
    return parts.join(' | ');
  }
  
  // Better fallback - try to use destination ID or name if available
  if (dest.id) {
    return `${dest.id}`;
  }
  
  return 'Destination Interne';
};

// Create request config with authorization headers
const createRequestConfig = (token: string) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const mailService = {
  async getMails(filters: Partial<MailFilters> = {}): Promise<MailPagination> {
    try {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const backendFilters = mapFiltersToBackend(filters as MailFilters);
      const cleanedParams = Object.fromEntries(
        Object.entries(backendFilters).filter(([_, v]) => v !== null && v !== '')
      );
      
      console.log('Sending filters to backend:', cleanedParams);
      console.log('Request URL:', `${import.meta.env.VITE_API_BASE_URL}/api/filter`);
      console.log('Request headers:', createRequestConfig(token));
      
      // Extract the page parameter for the URL query
      const pageValue = cleanedParams.page !== undefined ? cleanedParams.page : 0;
      const sizeValue = cleanedParams.size !== undefined ? cleanedParams.size : 10;
      // Keep a copy of the page in the request body as well
      // This ensures both pagination and filtering work correctly
      
      const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/api/filter?page=${pageValue}&size=${sizeValue}`, cleanedParams, createRequestConfig(token));
      
      console.log('Received response from backend:', response.data);
      console.log('Response page value:', response.data.page);
      console.log('Response totalPages value:', response.data.totalPages);
      
      const mails = mapResponseToMails(response.data.items || []);
      
      return {
        items: mails,
        total: response.data.total,
        totalPages: response.data.totalPages,
        page: response.data.page,
        limit: Number(filters.limit) || 10  // This should be the selected limit value
      };
    } catch (error) {
      console.error('Error fetching mails:', error);
      throw error;
    }
},
    async exportMails(filters: Partial<MailFilters> = {}): Promise<Blob> {
      try {
        const userData = localStorage.getItem('user');
        const token = userData ? JSON.parse(userData).accessToken : null;
        
        if (!token) {
          throw new Error('Authentication token not found');
        }
  
        const backendFilters = mapFiltersToBackend(filters as MailFilters);
        
         const pageValue = backendFilters.page || 0;
         const sizeValue = backendFilters.size || 10;
        // Supprimer les paramètres de pagination pour l'exportation
        // ou définir une taille très grande pour inclure tous les éléments
   
        
        const cleanedParams = Object.fromEntries(
          Object.entries(backendFilters).filter(([_, v]) => v !== null && v !== '')
        );
  
        const response = await api.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/export?page=${pageValue}&size=${sizeValue}`,
      cleanedParams,
       {
        ...createRequestConfig(token),
        responseType: 'blob',
        params: cleanedParams // Les autres paramètres sont envoyés comme query params
      } 
    );
        
        return response.data;
      } catch (error) {
        console.error('Error exporting mails:', error);
        throw error;
      }
    },
  
  async createMail(mailData: FormData): Promise<Mail> {
    const token = await authService.getValidAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await api.post('/api/mails', mailData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // The response now includes destinations array
      return mapResponseToMails([response.data])[0];
    } catch (error: any) {
      console.error('Error creating mail:', error);
      throw new Error(error.response?.data?.message || 'Failed to create mail');
    }
  },

  async updateMail(data: FormData | any): Promise<Mail> {
    const token = await authService.getValidAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      let courielNumber: string;
      
      if (data instanceof FormData) {
        courielNumber = data.get('courielNumber') as string;
      } else {
        courielNumber = data.courielNumber;
      }

      if (!courielNumber) {
        throw new Error('Couriel number is required for update');
      }

      const response = await api.put(`${import.meta.env.VITE_API_BASE_URL}/api/mails`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
        }
      });
      
      // The response now includes destinations array
      return mapResponseToMails([response.data])[0];
    } catch (error: any) {
      console.error('Error updating mail:', error);
      throw new Error(error.response?.data?.message || 'Failed to update mail');
    }
  },

  async deleteMail(courielNumber: string): Promise<void> {
    try {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      await api.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/mail?courielNumber=${courielNumber}`,
        createRequestConfig(token)
      );
    } catch (error) {
      console.error('Error deleting mail:', error);
      throw error;
    }
  },

  async downloadFile(courielNumber: string, fileName: string): Promise<Blob> {
    try {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const encodedCourielNumber = encodeURIComponent(courielNumber);
      const encodedFileName = encodeURIComponent(fileName);
      const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/api/download?courielNumber=${encodedCourielNumber}&fileName=${encodedFileName}`;
      console.log('Attempting to download from URL:', downloadUrl);
      const response = await api.get(
        downloadUrl,
        {
          ...createRequestConfig(token),
          responseType: 'blob' // Important for downloading files
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  },

  async downloadAllFiles(courielNumber: string): Promise<Blob> {
    try {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const encodedCourielNumber = encodeURIComponent(courielNumber);
      const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/api/downloadAll?courielNumber=${encodedCourielNumber}`;
      console.log('Attempting to download all files from URL:', downloadUrl);
      const response = await api.get(
        downloadUrl,
        {
          ...createRequestConfig(token),
          responseType: 'blob' // Important for downloading files
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error downloading all files:', error);
      throw error;
    }
  }
};
