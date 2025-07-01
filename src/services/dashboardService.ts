import api from "../lib/api";
import { Mail } from "../types/mail";
import { mapResponseToMails } from "./mail-service"; // Import the helper function

interface DashboardSummary {
  totalMails: number;
  incomingMails: number;
  outgoingMails: number;
  activeUsers: number;
}

interface MailOverviewData {
  name: string;
  total: number;
}

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

    const response = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/dashboard/summary`,
        
        {
            
          headers: {
            'Authorization': `Bearer ${token}`,
            
            // Let the browser set the Content-Type header with boundary for FormData
          }
        }
      );
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    throw error;
  }
  
};

export const fetchMailOverview = async (): Promise<MailOverviewData[]> => {
  try {
    const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).accessToken : null;
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
    const response = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/mail-overview`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Let the browser set the Content-Type header with boundary for FormData
          }
        }
      );
    return response.data;
  } catch (error) {
    console.error("Error fetching mail overview:", error);
    throw error;
  }
};

export async function fetchRecentMails(): Promise<Mail[]> {
  try {
    const userData = localStorage.getItem('user');
    const token = userData ? JSON.parse(userData).accessToken : null;
    const response = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/mails/recent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Raw API response for recent mails:', response.data);
    // Ensure that response.data.items is passed to mapResponseToMails
    return mapResponseToMails(response.data.items);
  } catch (error) {
    console.error('Error fetching recent mails:', error);
    throw error;
  }
}