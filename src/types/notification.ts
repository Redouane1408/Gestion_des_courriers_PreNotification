export interface Notification {
  id: number;
  email: string;
  message: string;
  courrielNumber: string;
  filesNames: string[];
  operation: 'Supprimer' | 'Modifier' | 'Archiver';
  time: string;
  directionName: string;
  divisionName: string;
  sousDirectionName: string | null;
  type?: string;
  readStatus?: boolean;
  timestamp?: string;
  relatedEntityId?: string;
}

export interface NotificationFilters {
  operation?: string;
  dateFrom?: string;
  dateTo?: string;
  direction?: string;
  search?: string;
}