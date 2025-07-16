"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {useMails} from "@/hooks/use-mails"
import { Download, Eye, FileText, Filter, History, MoreHorizontal, Pencil, Plus, Search, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
//import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { CreateMailDialog }from "@/components/create-mail-dialog"
import { EditMailDialog } from "@/components/edit-mail-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, 
} from "@/components/ui/dialog"
//import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
//import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from "@/contexts/auth-context"
//import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from "react-router-dom"
//import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { mailService } from "@/services/mail-service"
//import { authService } from "@/services/authService"
//import type { MailFilters } from "@/types/mail"
//import type { Mail } from "@/types/mail"

interface Mail {
  id?: string;
  courielNumber: string;
  type: string;
  nature: string;
  subject: string;
  priority: string;
  status: string;
  arrivedDate: string| null;
  sentDate: string| null;
  returnDate: string;
  //savedDate: string | null;
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


interface Division {
  id: string
  name: string
  directions: Direction[]
}

interface Direction {
  id: string
  name: string
  sousDirections: SousDirection[]
}

interface SousDirection {
  id: string
  name: string
}

interface FilterState {
  id: string
  type: string
  nature: string
  subject: string
  dateFrom: string
  dateTo: string
  dateReceptionFrom: string
  dateReceptionTo: string
  dateRetourFrom: string
  dateRetourTo: string
  status: string
  priority: string
  sender: {
    type?: "Interne" | "Externe" | "Particulier"
    department?: string
    service?: string
    name?: string
  }
  recipient: {
    type?: "Interne" | "Externe" | "Particulier"
    department?: string
    service?: string
    name?: string
  }
  senderDivision: string
  senderDirection: string
  senderSousDirection: string
  recipientDivision: string
  recipientDirection: string
  recipientSousDirection: string
  showSenderDirection: boolean
  showSenderSousDirection: boolean
  showRecipientDirection: boolean
  showRecipientSousDirection: boolean
  // Additional fields for backend compatibility
  fromExternal?: string | null
  toExternal?: string | null
  page?: number
  limit?: number
}

export function ArchivePage() {
  const navigate = useNavigate()
  const { getToken, directionId } = useAuth();
  const { toast } = useToast()

  const { mails, pagination, filters, isLoading, error, updateFilters, refresh } = useMails();

  const handlePageChange = (newPage: number) => {
    console.log('handlePageChange called with newPage:', newPage);
    updateFilters({ page: newPage });
  };

  const handleSizeChange = (newSize: number) => {
    updateFilters({ limit: newSize, page: 0 });
  };
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //setSearchTerm(value);
    updateFilters({ id: value, page: 0 });
  }

  const handleDateChange = (field: keyof FilterState, value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null)
  const [selectedMails, setSelectedMails] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  // Add proper focus management
  useEffect(() => {
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (isViewDialogOpen || isEditDialogOpen || createDialogOpen) {
        if (e.key === 'Escape') {
          setIsViewDialogOpen(false);
          setIsEditDialogOpen(false);
          setCreateDialogOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    return () => {
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [isViewDialogOpen, isEditDialogOpen, createDialogOpen]);



  // Add the hierarchical data for divisions, directions, and sous-directions
  const divisionsData: Division[] = [
    // ... existing code ...
  ]

  // Ajoutez un état pour contrôler manuellement l'ouverture du menu déroulant
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  // Refs for dialogs to prevent UI blocking


  const filteredMails = mails;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Archivé":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "En cours":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      case "Normal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const handleAddMail = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    try {
      const mailData = Object.fromEntries(formData);
      const result = await mailService.createMail(mailData);
      
      setCreateDialogOpen(false)
      toast({
        title: "Success",
        description: "Mail added successfully"
      })
      refresh() // Refresh the list
    } catch (error) {
      console.error('Error adding mail:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add mail"
      })
    }
  }

  // Edit mail is now handled by the EditMailDialog component

  // Function to safely close dialogs
  const safeCloseDialog = (setDialogState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setDialogState(false)
  }

  // Modifiez également les fonctions de gestion des actions pour s'assurer qu'elles nettoient correctement après leur exécution
  const handleViewDetails = (mail: Mail) => {
    setSelectedMail(mail)
    setIsViewDialogOpen(true)
    // Remove aria-hidden and use inert attribute
    setOpenDropdownId(null)
  }

  const openEditDialog = (mail: Mail) => {

    setSelectedMail(mail)
    setIsEditDialogOpen(true)
    // Assurez-vous que le menu est fermé
    setOpenDropdownId(null)
  }

  const openHistoryDialog = (mail: Mail) => {
    setSelectedMail(mail)
    setIsHistoryDialogOpen(true)
    // Assurez-vous que le menu est fermé
    setOpenDropdownId(null)
  }

  const handleDownloadAttachments = (mail: Mail) => {
    // Assurez-vous que le menu est fermé
    setOpenDropdownId(null)
    toast({
      title: "Téléchargement des pièces jointes",
      description: `${mail.attachments.length} fichier(s) en cours de téléchargement.`,
    })
  }

  const handleDeleteMail = async (courielNumber: string) => {
    try {
      await mailService.deleteMail(courielNumber);
      toast({
        title: "Succès",
        description: "Le courrier a été supprimé avec succès.",
      });
      // Refresh the mail list
      refresh();
    } catch (error) {
      console.error('Error deleting mail:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du courrier.",
      });
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMails(filteredMails.map((mail) => mail.id))
    } else {
      setSelectedMails([])
    }
  }

  const handleSelectMail = (id: string) => {
    if (selectedMails.includes(id)) {
      setSelectedMails(selectedMails.filter((mailId) => mailId !== id))
    } else {
      setSelectedMails([...selectedMails, id])
    }
  }

  const handleExport = async () => {
    try {
      const blob = await mailService.exportMails(filters);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mails-export.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export réussi",
        description: "Le fichier a été téléchargé avec succès.",
      });
    } catch (error) {
      console.error('Error during export:', error);
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export.",
        variant: "destructive"
      });
    }
  }

  // Function to apply filters
  const handleFilterApply = () => {
    updateFilters({ ...tempFilters, page: 0 });
    setIsFilterOpen(false);
  }

  // Function to reset filters with proper defaults and type safety
  const handleFilterReset = () => {
    const emptyFilters: FilterState = {
      id: "",
      type: "all",
      nature: "all",
      subject: "",
      dateFrom: "",
      dateTo: "",
      dateReceptionFrom: "",
      dateReceptionTo: "",
      dateRetourFrom: "",
      dateRetourTo: "",
      status: "all",
      priority: "all",
      sender: {
        type: undefined,
        department: undefined,
        service: undefined,
        name: undefined
      },
      recipient: {
        type: undefined,
        department: undefined,
        service: undefined,
        name: undefined
      },
      senderDivision: "",
      senderDirection: "",
      senderSousDirection: "",
      recipientDivision: "",
      recipientDirection: "",
      recipientSousDirection: "",
      showSenderDirection: false,
      showSenderSousDirection: false,
      showRecipientDirection: false,
      showRecipientSousDirection: false,
      fromExternal: null,
      toExternal: null,
      page: 0,
      limit: 10
    };
    
    updateFilters(emptyFilters);
    setIsFilterOpen(false);
  }

  // Helper functions for status and nature mapping
  const mapStatusToBackend = (status: string): string => {
  switch (status) {
    case "En cours": return "EN_COURS";
    case "Archivé": return "ARCHIVER";
    default: return status;
  }
};

const mapNatureToBackend = (nature: string): string => {
  switch (nature) {
    case "Interne": return "Intern";
    case "Externe": return "Extern";
    default: return nature;
  }
};

  const mapStatusFromBackend = (status: string): string => {
    switch (status) {
      case "EN_COURS": return "En cours";
      case "ARCHIVER": return "Archivé";
      default: return status;
    }
  }

  const mapNatureFromBackend = (nature: string): string => {
    switch (nature) {
      case "Intern": return "Interne";
      case "Extern": return "Externe";
      default: return nature;
    }
  }

  // ... existing code for rendering UI ...

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Archive des Courriers</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nouveau Courrier
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative w-full ">
            </div>
            <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
              <Filter className="mr-2 h-4 w-4" /> Filtres
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-sm">Afficher</span>
            <Select value={pagination.limit.toString()} onValueChange={(value) => handleSizeChange(Number(value))}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-muted-foreground text-sm">entrées</span>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isFilterOpen && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Filtres</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="filter-id">N° de courrier</Label>
                <Input
                  id="filter-id"
                  placeholder="Numéro de courrier"
                  value={tempFilters.id}
                  onChange={(e) =>
                    setTempFilters({ ...tempFilters, id: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="filter-type">Type</Label>
                <Select
                  value={tempFilters.type}
                  onValueChange={(value) =>
                    setTempFilters({ ...tempFilters, type: value })
                  }
                >
                                  <SelectTrigger id="filter-type">
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="Entrant">Arrivé</SelectItem>
                    <SelectItem value="Sortant">Départ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-nature">Nature</Label>
                <Select
                  value={tempFilters.nature}
                  onValueChange={(value) =>
                    setTempFilters({ ...tempFilters, nature: value })
                  }
                >
                  <SelectTrigger id="filter-nature">
                    <SelectValue placeholder="Toutes les natures" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les natures</SelectItem>
                    <SelectItem value="Interne">Interne</SelectItem>
                    <SelectItem value="Externe">Externe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-subject">Objet</Label>
                <Input
                  id="filter-subject"
                  placeholder="Objet du courrier"
                  value={tempFilters.subject}
                  onChange={(e) =>
                    setTempFilters({ ...tempFilters, subject: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Date d'envoi</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={tempFilters.dateFrom}
                    onChange={(e) => handleDateChange('dateFrom', e.target.value)}
                    placeholder="De"
                  />
                  <Input
                    type="date"
                    value={tempFilters.dateTo}
                    onChange={(e) => handleDateChange('dateTo', e.target.value)}
                    placeholder="À"
                  />
                </div>
              </div>
              <div>
                <Label>Date de réception</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={tempFilters.dateReceptionFrom}
                    onChange={(e) => handleDateChange('dateReceptionFrom', e.target.value)}
                    placeholder="De"
                  />
                  <Input
                    type="date"
                    value={tempFilters.dateReceptionTo}
                    onChange={(e) => handleDateChange('dateReceptionTo', e.target.value)}
                    placeholder="À"
                  />
                </div>
              </div>
              <div>
                <Label>Date de retour</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={tempFilters.dateRetourFrom}
                    onChange={(e) => handleDateChange('dateRetourFrom', e.target.value)}
                    placeholder="De"
                  />
                  <Input
                    type="date"
                    value={tempFilters.dateRetourTo}
                    onChange={(e) => handleDateChange('dateRetourTo', e.target.value)}
                    placeholder="À"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="filter-status">Statut</Label>
                <Select
                  value={tempFilters.status}
                  onValueChange={(value) =>
                    setTempFilters({ ...tempFilters, status: value })
                  }
                >
                  <SelectTrigger id="filter-status">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="EN_COURS">En cours</SelectItem>
                    <SelectItem value="ARCHIVER">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-priority">Priorité</Label>
                <Select
                  value={tempFilters.priority}
                  onValueChange={(value) =>
                    setTempFilters({ ...tempFilters, priority: value })
                  }
                >
                  <SelectTrigger id="filter-priority">
                    <SelectValue placeholder="Toutes les priorités" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les priorités</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {tempFilters.sender?.type === "Interne" ? (
                <>
                  <div>
                    <Label htmlFor="filter-sender-division">
                      Division (expéditeur)
                    </Label>
                    <Select
                      value={tempFilters.senderDivision}
                      onValueChange={(value) => {
                        setTempFilters({
                          ...tempFilters,
                          senderDivision: value,
                          senderDirection: "",
                          senderSousDirection: "",
                          showSenderDirection: value !== "",
                          showSenderSousDirection: false,
                        })
                      }}
                    >
                      <SelectTrigger id="filter-sender-division">
                        <SelectValue placeholder="Toutes les divisions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les divisions</SelectItem>
                        {divisionsData.map((division) => (
                          <SelectItem key={division.id} value={division.id}>
                            {division.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {tempFilters.showSenderDirection && (
                    <div>
                      <Label htmlFor="filter-sender-direction">
                        Direction (expéditeur)
                      </Label>
                      <Select
                        value={tempFilters.senderDirection}
                        onValueChange={(value) => {
                          setTempFilters({
                            ...tempFilters,
                            senderDirection: value,
                            senderSousDirection: "",
                            showSenderSousDirection: value !== "",
                          })
                        }}
                      >
                        <SelectTrigger id="filter-sender-direction">
                          <SelectValue placeholder="Toutes les directions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Toutes les directions</SelectItem>
                          {divisionsData
                            .find(
                              (d) => d.id === tempFilters.senderDivision
                            )
                            ?.directions.map((direction) => (
                              <SelectItem
                                key={direction.id}
                                value={direction.id}
                              >
                                {direction.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {tempFilters.showSenderSousDirection && (
                    <div>
                      <Label htmlFor="filter-sender-sous-direction">
                        Sous-direction (expéditeur)
                      </Label>
                      <Select
                        value={tempFilters.senderSousDirection}
                        onValueChange={(value) => {
                          setTempFilters({
                            ...tempFilters,
                            senderSousDirection: value,
                          })
                        }}
                      >
                        <SelectTrigger id="filter-sender-sous-direction">
                          <SelectValue placeholder="Toutes les sous-directions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Toutes les sous-directions</SelectItem>
                          {divisionsData
                            .find(
                              (d) => d.id === tempFilters.senderDivision
                            )
                            ?.directions
                            .find(
                              (d) => d.id === tempFilters.senderDirection
                            )
                            ?.sousDirections.map((sousDirection) => (
                              <SelectItem
                                key={sousDirection.id}
                                value={sousDirection.id}
                              >
                                {sousDirection.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              ) : tempFilters.sender?.type === "Externe" ? (
                <div>
                  <Label htmlFor="filter-sender-name">Nom de l'expéditeur</Label>
                  <Input
                    id="filter-sender-name"
                    placeholder="Nom de l'expéditeur"
                    value={tempFilters.sender?.name || ""}
                    onChange={(e) =>
                      setTempFilters({
                        ...tempFilters,
                        sender: {
                          ...tempFilters.sender,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ) : null}
              
              {tempFilters.recipient?.type === "Interne" ? (
                <>
                  <div>
                    <Label htmlFor="filter-recipient-division">
                      Division (destinataire)
                    </Label>
                    <Select
                      value={tempFilters.recipientDivision}
                      onValueChange={(value) => {
                        setTempFilters({
                          ...tempFilters,
                          recipientDivision: value,
                          recipientDirection: "",
                          recipientSousDirection: "",
                          showRecipientDirection: value !== "",
                          showRecipientSousDirection: false,
                        })
                      }}
                    >
                      <SelectTrigger id="filter-recipient-division">
                        <SelectValue placeholder="Toutes les divisions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les divisions</SelectItem>
                        {divisionsData.map((division) => (
                          <SelectItem key={division.id} value={division.id}>
                            {division.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {tempFilters.showRecipientDirection && (
                    <div>
                      <Label htmlFor="filter-recipient-direction">
                        Direction (destinataire)
                      </Label>
                      <Select
                        value={tempFilters.recipientDirection}
                        onValueChange={(value) => {
                          setTempFilters({
                            ...tempFilters,
                            recipientDirection: value,
                            recipientSousDirection: "",
                            showRecipientSousDirection: value !== "",
                          })
                        }}
                      >
                        <SelectTrigger id="filter-recipient-direction">
                          <SelectValue placeholder="Toutes les directions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Toutes les directions</SelectItem>
                          {divisionsData
                            .find(
                              (d) => d.id === tempFilters.recipientDivision
                            )
                            ?.directions.map((direction) => (
                              <SelectItem
                                key={direction.id}
                                value={direction.id}
                              >
                                {direction.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {tempFilters.showRecipientSousDirection && (
                    <div>
                      <Label htmlFor="filter-recipient-sous-direction">
                        Sous-direction (destinataire)
                      </Label>
                      <Select
                        value={tempFilters.recipientSousDirection}
                        onValueChange={(value) => {
                          setTempFilters({
                            ...tempFilters,
                            recipientSousDirection: value,
                          })
                        }}
                      >
                        <SelectTrigger id="filter-recipient-sous-direction">
                          <SelectValue placeholder="Toutes les sous-directions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Toutes les sous-directions</SelectItem>
                          {divisionsData
                            .find(
                              (d) => d.id === tempFilters.recipientDivision
                            )
                            ?.directions
                            .find(
                              (d) => d.id === tempFilters.recipientDirection
                            )
                            ?.sousDirections.map((sousDirection) => (
                              <SelectItem
                                key={sousDirection.id}
                                value={sousDirection.id}
                              >
                                {sousDirection.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              ) : tempFilters.recipient?.type === "Externe" ? (
                <div>
                  <Label htmlFor="filter-recipient-name">
                    Nom du destinataire
                  </Label>
                  <Input
                    id="filter-recipient-name"
                    placeholder="Nom du destinataire"
                    value={tempFilters.recipient?.name || ""}
                    onChange={(e) =>
                      setTempFilters({
                        ...tempFilters,
                        recipient: {
                          ...tempFilters.recipient,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ) : null}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={handleFilterReset}>
              Réinitialiser
            </Button>
            <Button onClick={handleFilterApply}>Appliquer</Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg mb-6">
            {error}
          </div>
        ) : filteredMails.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Aucun courrier trouvé.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox className="x-auto"
                        checked={
                          selectedMails.length === filteredMails.length &&
                          filteredMails.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>N° de courrier</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Nature</TableHead>
                    <TableHead>Objet</TableHead>
                    <TableHead>Date d'enregistrement</TableHead>
                    <TableHead>Date de retour</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Expéditeur</TableHead>
                    <TableHead>Destinataire</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMails.map((mail) => (
                    <TableRow key={mail.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMails.includes(mail.id)}
                          onCheckedChange={() => handleSelectMail(mail.id)}
                        />
                      </TableCell>
                      <TableCell>{mail.id}</TableCell>
                      <TableCell>{mail.type}</TableCell>
                      <TableCell>{mail.nature}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {mail.subject}
                      </TableCell>
                      <TableCell>
                        {new Date(mail.registrationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {mail.returnDate ? new Date(mail.returnDate).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            mail.status
                          )}`}
                        >
                          {mail.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            mail.priority
                          )}`}
                        >
                          {mail.priority}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {mail.sender}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {mail.recipient}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu open={openDropdownId === mail.id} onOpenChange={(open) => {
                            if (open) {
                              setOpenDropdownId(mail.id)
                            } else {
                              setOpenDropdownId(null)
                            }
                          }}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              aria-label="Actions"
                              data-state={openDropdownId === mail.id ? "open" : "closed"}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end" 
                            className="w-[160px]"
                            inert={openDropdownId !== mail.id ? "" : undefined}
                          >
                            <DropdownMenuItem onClick={() => handleViewDetails(mail)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(mail)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteMail(mail.courielNumber)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openHistoryDialog(mail)}>
                              <History className="mr-2 h-4 w-4" />
                              Historique
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Affichage de {pagination.total === 0 ? 0 : pagination.page * pagination.limit + 1} à {Math.min(pagination.total, (pagination.page + 1) * pagination.limit)} sur {pagination.total} entrées
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 0}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page + 1 >= pagination.totalPages}
                >
                  Suivant
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* View Mail Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="view-dialog-description">
          {selectedMail && (
            <>
              <DialogHeader>
                <DialogTitle>Détails du Courrier</DialogTitle>
                <DialogDescription id="view-dialog-description">
                  Détails complets du courrier sélectionné
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <Label className="font-medium">N° de courrier</Label>
                  <div>{selectedMail.courielNumber}</div>
                </div>
                <div>
                  <Label className="font-medium">Type</Label>
                  <div>{selectedMail.type}</div>
                </div>
                <div>
                  <Label className="font-medium">Nature</Label>
                  <div>{selectedMail.nature}</div>
                </div>
                <div>
                  <Label className="font-medium">Objet</Label>
                  <div>{selectedMail.subject}</div>
                </div>
                <div>
                  <Label className="font-medium">Date d'enregistrement</Label>
                  <div>
                    {new Date(selectedMail.sentDate || '').toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <Label className="font-medium">Statut</Label>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedMail.status
                      )}`}
                    >
                      {selectedMail.status}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="font-medium">Priorité</Label>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        selectedMail.priority
                      )}`}
                    >
                      {selectedMail.priority}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="font-medium">Expéditeur</Label>
                  <div>{selectedMail.sender}</div>
                </div>
                <div>
                  <Label className="font-medium">Destinataire</Label>
                  <div>{selectedMail.recipient}</div>
                </div>
                {selectedMail.returnDate && (
                  <div>
                    <Label className="font-medium">Date de retour</Label>
                    <div>
                      {new Date(selectedMail.returnDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
                {selectedMail.sentDate && (
                  <div>
                    <Label className="font-medium">Date d'envoi</Label>
                    <div>
                      {new Date(selectedMail.sentDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <Label className="font-medium">Description</Label>
                  <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-900 rounded-md">
                    {selectedMail.description || "Aucune description"}
                  </div>
                </div>
                {selectedMail.attachments.length > 0 && (
                  <div className="md:col-span-2">
                    <Label className="font-medium">Pièces jointes</Label>
                    <div className="mt-1">
                      {selectedMail.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-2"
                        >
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>{attachment.name}</span>
                          <span className="text-xs text-gray-500">
                            ({attachment.size})
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto"
                            onClick={() => {
                              toast({
                                title: "Téléchargement",
                                description: `Téléchargement de ${attachment.name} en cours...`,
                              })
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Mail Dialog */}
      
      <EditMailDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen}
        mail={selectedMail}
        onSuccess={() => {
          // Ajouter un petit délai pour s'assurer que le backend a eu le temps de traiter la mise à jour
          setTimeout(() => {
            refresh();
          }, 500);
        }}
      />

      <CreateMailDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onSuccess={() => {
          // Refresh the mail list
          refresh()
        }} 
      />

      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-4xl overflow-hidden bg-white" aria-describedby="history-dialog-description">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900">Historique du Courrier</DialogTitle>
            <DialogDescription id="history-dialog-description" className="text-sm text-gray-500">
              Historique des modifications du courrier
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 max-h-[60vh] overflow-y-auto pr-4">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:bg-gray-200">
              {selectedMail?.historyList?.map((history) => {
                return (
                  <div key={history.id} className="relative pl-8 pb-8">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-blue-600 bg-white" />
                    
                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${history.actionType === 'CREATE' ? 'bg-green-100 text-green-800' : 
                            history.actionType === 'UPDATE' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {history.actionType}
                        </span>
                        <time className="text-sm text-gray-500">
                          
                          {new Date(history.timestamp).toLocaleDateString ('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">Créé par:</span>
                          <span className="text-sm text-gray-900"> {history.createdById}</span>
                        </div>
                        
                        {history.updatedById && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500">Modifié par:</span>
                            <span className="text-sm text-gray-900"> {history.updatedById}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
  