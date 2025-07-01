

import type { Sender, Recipient, Attachment, Comment, HistoryEntry } from './index'

export type EntityType = "Interne" | "Externe" | "Particulier"

export interface Courrier {
    id: string
    number: string
    subject: string
    type: MailType
    nature: MailNature
    priority: MailPriority
    registrationDate: Date
    sender: Sender
    recipient: Recipient
    status: MailStatus
    attachments?: Attachment[]
    comments?: Comment[]
    history?: HistoryEntry[]
  }
  
  export type MailType = "Entrant" | "Sortant" | "Interne"
  export type MailNature = "Administratif" | "Financier" | "Technique" | "Juridique" | "Autre"
  export type MailPriority = "Urgent" | "Haute" | "Normale" | "Basse"
  export type MailStatus = "Nouveau" | "En traitement" | "Traité" | "Archivé" | "En attente"
  
  export interface CourrierFilters {
    search?: string
    type?: MailType[]
    nature?: MailNature[]
    priority?: MailPriority[]
    status?: MailStatus[]
    dateRange?: {
      from?: Date
      to?: Date
    }
    sender?: {
      type?: EntityType
      name?: string
      department?: string
      service?: string
    }
    recipient?: {
      type?: EntityType
      name?: string
      department?: string
      service?: string
    }
  }