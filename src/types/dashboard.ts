export interface Attachment {
  name: string;
  size: string;
}

export interface Modification {
  user: string;
  date: string;
}

export interface Mail {
  id?: string;
  courielNumber: string;
  type: string;
  nature: string;
  subject: string;
  priority: string;
  status: string;
  arrivedDate: string;
  sentDate: string;
  returnDate: string;
  savedDate: string | null;
  fromDivisionId: number;
  fromDirectionId: number | null;
  fromSousDirectionId: number | null;
  fromExternal: string | null;
  toDivisionId: number;
  toDirectionId: number | null;
  toSousDirectionId: number | null;
  toExternal: string | null;
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
  description: string;
}

export interface DashboardSummary {
  totalMails: number;
  incomingMails: number;
  outgoingMails: number;
  activeUsers: number;
}

export interface MailOverviewData {
  name: string;
  total: number;
}
