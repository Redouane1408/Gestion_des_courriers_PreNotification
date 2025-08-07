// Types for mail data
export interface Attachment {
  name: string;
  size: number;
}

export interface Modification {
  user: string;
  date: string;
}

// New destination interface for multiple destinations
export interface Destination {
  id?: string;
  type?: 'internal' | 'external';
  directionGeneralId?: string;
  divisionId?: string;
  directionId?: string;
  sousDirectionId?: string;
  ministryName?: string;
  displayName?: string;
}

export interface Mail {
  id: string;
  courielNumber: string;
  type: "Départ" | "Sortant";
  nature: "Externe" | "Interne";
  subject: string;
  sender: string;
  recipient: string;
  returnDate: string | null;
  status: "Archivé" | "En cours";
  priority: "Normal" | "Urgent";
  attachments: Attachment[];
  description: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: Modification[];
  
  // NEW: Creator's hierarchy information
  creatorHierarchy?: {
    directionId?: string;
    divisionId?: string;
    sousdirectionId?: string;
  };
  
  // Updated for multiple destinations support
  destinations: Destination[];
  
  // Keep legacy fields for backward compatibility during transition
  fromDivisionId?: string | null;
  fromDirectionId?: string | null;
  fromSousDirectionId?: string | null;
  fromExternal?: string | null;
  toDivisionId?: string | null;
  toDirectionId?: string | null;
  toSousDirectionId?: string | null;
  toExternal?: string | null;
  
  arrivedDate?: string | null;
  sentDate?: string | null;
  historyList: Array<{
    id: string;
    courrierId: string;
    createdById: string | null;
    updatedById: string | null;
    actionType: string;
    timestamp: string;
  }>;
  courielFiles?: Array<{
    id: string;
    fileName: string;
    fileType: string;
    filePath: string;
    fileSize: number;
  }>;
  editable: boolean; // New property from backend
}

  
  


export interface Division {
  id: string;
  name: string;
  directions: Direction[];
}

export interface Direction {
  id: string;
  name: string;
  sousDirections: SousDirection[];
}

export interface SousDirection {
  id: string;
  name: string;
}

export interface FilterState {
  id: string;
  type: string;
  nature: string;
  subject: string;
  dateFrom: string;
  description: string;
  dateTo: string;
  dateReceptionFrom: string;
  dateReceptionTo: string;
  dateRetourFrom: string;
  dateRetourTo: string;
  status: string;
  priority: string;
  destinations: Destination[];
  ministryName: string;
  sender: {
    type?: "Interne" | "Externe" | "Particulier";
    department?: string;
    service?: string;
    name?: string;
  
};
  recipient: {
    type?: "Interne" | "Externe" | "Particulier";
    department?: string;
    service?: string;
    name?: string;
  };
  senderDivision: string;
  senderDirection: string;
  senderSousDirection: string;
  recipientDivision: string;
  fromExternal?: string | null;
  toExternal?: string | null;
  limit?: string | number;
  recipientDirection: string;
  recipientSousDirection: string;
  showSenderDirection: boolean;
  showSenderSousDirection: boolean;
  showRecipientDirection: boolean;
  showRecipientSousDirection: boolean;
  page?: string | number;
}

export interface MailPagination {
  items: Mail[];
  total: number;
  totalPages: number;
  limit: number;
  page: number;
}

export interface MailFilters {
  courielNumber: string;
  page?: string | number;
  limit?: string | number;
  size?: string | number;
  id?: string;
  type?: string;
  nature?: string;
  subject?: string;
  description: string;
  dateFrom?: string;
  dateTo?: string;
  dateReceptionFrom?: string;
  dateReceptionTo?: string;
  dateRetourFrom?: string;
  dateRetourTo?: string;
  status?: string;
  priority?: string;
  senderDivision?: string;
  senderDirection?: string;
  senderSousDirection?: string;
  recipientDivision?: string;
  recipientDirection?: string;
  recipientSousDirection?: string;
  destinations?: Destination[];
  ministryName?: string;
  toExternal?: string | null;
  editable?: boolean; // New filter for editable mails

  
}

export interface MailOverviewData {
    name: string;
    total: string;
  }