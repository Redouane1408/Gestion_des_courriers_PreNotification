// Types for mail data
export interface Attachment {
  name: string;
  size: string;
}

export interface Modification {
  user: string;
  date: string;
}

export interface Mail {
  id: string;
  courielNumber: string;
  type: "Entrant" | "Sortant";
  nature: "Externe" | "Interne";
  subject: string;
  sender: string;
  recipient: string;
  date: string;
  registrationDate: string;
  returnDate: string | null;
  status: "Archivé" | "En cours";
  priority: "Normal" | "Urgent";
  attachments: Attachment[];
  description: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: Modification[];
  // Backend specific fields
  fromDivisionId?: number | null;
  fromDirectionId?: number | null;
  fromSousDirectionId?: number | null;
  fromExternal?: string | null;
  toDivisionId?: number | null;
  toDirectionId?: number | null;
  toSousDirectionId?: number | null;
  toExternal?: string | null;
  arrivedDate?: string | null;
  sentDate?: string | null;
  savedDate?: string | null;
  historyList: Array<{
    id: number;
    courrierId: number;
    createdById: string | null;
    updatedById: string | null;
    actionType: string;
    timestamp: string;
}>;
  courielFiles?: Array<{
    id: number;
    fileName: string;
    fileType: string;
    filePath: string;
    fileSize: number;
  }>;
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
  recipientDirection: string;
  recipientSousDirection: string;
  showSenderDirection: boolean;
  showSenderSousDirection: boolean;
  showRecipientDirection: boolean;
  showRecipientSousDirection: boolean;
}

export interface MailPagination {
  items: Mail[];
  total: number;
  totalPages: number;
  limit: number;
  page: number;
}

export interface MailFilters {
  page?: number;
  limit?: number;
  size?:number;
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
  fromExternal?: string;
  toExternal?: string;
}

export interface MailOverviewData {
    name: string;
    total: number;
  }