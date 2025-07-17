import api from "@/lib/api";
import type { Mail, MailFilters, MailPagination } from "@/types/mail";

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

    fromDivisionId: filters.senderDivision ? parseInt(filters.senderDivision) : null,
    fromDirectionId: filters.senderDirection ? parseInt(filters.senderDirection) : null,
    fromSousDirectionId: filters.senderSousDirection ? parseInt(filters.senderSousDirection) : null,
    fromExternal: filters.fromExternal || null,
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
  return data.map((mail: any) => ({
    id: mail.courielNumber?.toString() || "",
    courielNumber: mail.courielNumber?.toString() || "",
    type: mail.type || "",
    nature: mail.nature || "",
    subject: mail.subject || "",
    sender: mail.fromExternal || 
           (mail.fromDivisionId ? `${mail.fromDivisionId}${mail.fromDirectionId ? ` - ${mail.fromDirectionId}` : ''}` : ""),
    recipient: mail.toExternal || 
              (mail.toDivisionId ? ` ${mail.toDivisionId}${mail.toDirectionId ? ` -  ${mail.toDirectionId}` : ''}` : ""),
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
  }));
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
  async getMails(filters: MailFilters = {}): Promise<MailPagination> {
    try {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const backendFilters = mapFiltersToBackend(filters);
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
        limit: filters.limit || 10  // This should be the selected limit value
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
    try {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/mails`,
        mailData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Don't set Content-Type, let browser set it with boundary for FormData
          }
        }
      );

      return mapResponseToMails([response.data])[0];
    } catch (error) {
      console.error('Error creating mail:', error);
      throw error;
    }
  },

  async updateMail(data: FormData | any): Promise<Mail> {
    try {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      let formData = new FormData();
      
      if (!(data instanceof FormData)) {
        // If data is not FormData, create FormData with the required fields
        formData.append('courielNumber', data.courielNumber);
        formData.append('priority', data.updatedCouriel?.priority || '');
        formData.append('status', data.updatedCouriel?.status || '');
        formData.append('subject', data.updatedCouriel?.subject || '');
        formData.append('description', data.updatedCouriel?.description || '');
        formData.append('returnDate', data.updatedCouriel?.returnDate || '');

        // Append existing files
        if (data.existingFiles && Array.isArray(data.existingFiles)) {
          data.existingFiles.forEach((file: any) => {
            formData.append('courielFiles', file.id);
          });
        }

        // Append new files
        if (data.newFiles && Array.isArray(data.newFiles)) {
          data.newFiles.forEach((file: File) => {
            formData.append('files', file);
          });
        }
        formData.append('uploadedFiles', JSON.stringify(data.uploadedFiles || []));
        formData.append('removedFiles', JSON.stringify(data.removedFiles || []));
        formData.append('skippedFiles', JSON.stringify(data.skippedFiles || []));
        
        // Handle file arrays
        if (data.removedFiles) {
          data.removedFiles.forEach((file: any, index: number) => {
            formData.append(`removedFiles[${index}]`, file);
          });
        }
        
        if (data.newFiles) {
          data.newFiles.forEach((file: File, index: number) => {
            formData.append(`newFiles[${index}]`, file);
          });
        }
      } else {
        formData = data;
      }

      const response = await api.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/mails`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Let the browser set the Content-Type header with boundary for FormData
          }
        }
      );
      
      return mapResponseToMails([response.data])[0];
    } catch (error) {
      console.error('Error updating mail:', error);
      throw error;
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
