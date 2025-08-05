"use client"

//import type React from "react"

import { useState, useEffect } from "react"
import {useMails} from "@/hooks/use-mails"
import { AlertCircle, AlertTriangle, Download, Eye, FileText, Filter, History, MoreHorizontal, Pencil, Plus, Trash2, X , Timer , SendToBackIcon, User, BarChart3 } from "lucide-react"
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
//import { useAuth } from "@/contexts/auth-context"
//import { format } from "date-fns"//
//import { useNavigate } from "react-router-dom"
//import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { mailService } from "@/services/mail-service"
//import { authService } from "@/services/authService"

// Import necessary types
import type { Mail, MailFilters, FilterState } from "@/types/mail"
import { Avatar } from "@radix-ui/react-avatar"

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

export function ArchivePage() {
  /* const navigate = useNavigate()
  const { getToken, directionId } = useAuth(); */
  const { toast } = useToast()

  const { mails, pagination, filters, isLoading, error, updateFilters, refresh } = useMails({
    courielNumber: "",
    page: 0,
    limit: 10,
    description: ""
  });

  const handlePageChange = (newPage: number) => {
    console.log('handlePageChange called with newPage:', newPage);
    updateFilters({ page: newPage });
  };

  const handleSizeChange = (newSize: number) => {
    updateFilters({ limit: newSize, page: 0 });
  };
  /* const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //setSearchTerm(value);
    updateFilters({ id: value, page: 0 });
  } */

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  /* const [date, setDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined) */
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null)
  //const [selectedMails, setSelectedMails] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState<FilterState>({
    id: filters.courielNumber || "",
    type: filters.type || "all",
    nature: filters.nature || "all",
    subject: filters.subject || "",
    description: filters.description || "",
    dateFrom: filters.dateFrom || "",
    dateTo: filters.dateTo || "",
    dateReceptionFrom: filters.dateReceptionFrom || "",
    dateReceptionTo: filters.dateReceptionTo || "",
    dateRetourFrom: filters.dateRetourFrom || "",
    dateRetourTo: filters.dateRetourTo || "",
    status: filters.status || "all",
    priority: filters.priority || "all",
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
    senderDivision: filters.senderDivision || "",
    senderDirection: filters.senderDirection || "",
    senderSousDirection: filters.senderSousDirection || "",
    recipientDivision: filters.recipientDivision || "",
    recipientDirection: filters.recipientDirection || "",
    recipientSousDirection: filters.recipientSousDirection || "",
    showSenderDirection: false,
    showSenderSousDirection: false,
    showRecipientDirection: false,
    showRecipientSousDirection: false,
    destinations: filters.destinations || [],
    ministryName: filters.ministryName || "",
    toExternal: filters.toExternal,
    page: filters.page,
    limit: filters.limit
  });

  useEffect(() => {
    setTempFilters({
      id: filters.courielNumber || "",
      type: filters.type || "all",
      nature: filters.nature || "all",
      subject: filters.subject || "",
      description: filters.description || "",
      dateFrom: filters.dateFrom || "",
      dateTo: filters.dateTo || "",
      dateReceptionFrom: filters.dateReceptionFrom || "",
      dateReceptionTo: filters.dateReceptionTo || "",
      dateRetourFrom: filters.dateRetourFrom || "",
      dateRetourTo: filters.dateRetourTo || "",
      status: filters.status || "all",
      priority: filters.priority || "all",
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
      senderDivision: filters.senderDivision || "",
      senderDirection: filters.senderDirection || "",
      senderSousDirection: filters.senderSousDirection || "",
      recipientDivision: filters.recipientDivision || "",
      recipientDirection: filters.recipientDirection || "",
      recipientSousDirection: filters.recipientSousDirection || "",
      showSenderDirection: false,
      showSenderSousDirection: false,
      showRecipientDirection: false,
      showRecipientSousDirection: false,
      destinations: filters.destinations || [],
      ministryName: filters.ministryName || "",
      toExternal: filters.toExternal,
      page: filters.page,
      limit: filters.limit
    });
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
        return "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "En cours":
        return "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      default:
        return "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
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

  /* const handleAddMail = async (e: React.FormEvent) => {
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
  } */

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

  const handleDownloadAttachments = async (mail: Mail) => {
    // Assurez-vous que le menu est fermé
    setOpenDropdownId(null);
    
    try {
      // Check if mail has files
      if (!mail.courielFiles || mail.courielFiles.length === 0) {
        toast({
          title: "Information",
          description: "Aucun fichier à télécharger pour ce courrier.",
        });
        return;
      }
      
      toast({
        title: "Téléchargement des pièces jointes",
        description: `${mail.courielFiles.length} fichier(s) en cours de téléchargement.`,
      });
      
      const blob = await mailService.downloadAllFiles(mail.courielNumber);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${mail.courielNumber}_files.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Succès",
        description: `Les fichiers ont été téléchargés avec succès.`,
      });
    } catch (error) {
      console.error('Error downloading files:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement des fichiers.",
        variant: "destructive"
      });
    }
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
  
  const confirmDeleteMail = (mail: Mail) => {
    setSelectedMail(mail);
    setIsDeleteDialogOpen(true);
    setOpenDropdownId(null);
  }
/* 
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
  } */

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
    // Convert FilterState to MailFilters
    const mailFilters: Partial<MailFilters> = {
      courielNumber: tempFilters.id,
      page: 0,
      limit: tempFilters.limit,
      id: tempFilters.id,
      type: tempFilters.type,
      nature: tempFilters.nature,
      subject: tempFilters.subject,
      description: tempFilters.description || "", // Required field in MailFilters
      dateFrom: tempFilters.dateFrom,
      dateTo: tempFilters.dateTo,
      dateReceptionFrom: tempFilters.dateReceptionFrom,
      dateReceptionTo: tempFilters.dateReceptionTo,
      dateRetourFrom: tempFilters.dateRetourFrom,
      dateRetourTo: tempFilters.dateRetourTo,
      status: tempFilters.status,
      priority: tempFilters.priority,
      senderDivision: tempFilters.senderDivision,
      senderDirection: tempFilters.senderDirection,
      senderSousDirection: tempFilters.senderSousDirection,
      recipientDivision: tempFilters.recipientDivision,
      recipientDirection: tempFilters.recipientDirection,
      recipientSousDirection: tempFilters.recipientSousDirection,
      destinations: tempFilters.destinations,
      ministryName: tempFilters.ministryName,
      toExternal: tempFilters.toExternal
    };
    
    updateFilters(mailFilters);
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
      description: "", // Add this line
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
      destinations: [],
      ministryName: "",
      toExternal: null,
      page: 0,
      limit: 10
    };
    
    updateFilters(emptyFilters);
    setIsFilterOpen(false);
  }

/*   // Helper functions for status and nature mapping
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
  } */

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
              <Filter className="mr-2 h-4 w-4" /> Filtre
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
              <h3 className="text-lg font-medium">Filtrer par :</h3>
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
                <Label>Date d'arrivée</Label>
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
                    {/* <TableHead className="w-12"></TableHead> */}
                    <TableHead>N° de courrier</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Nature</TableHead>
                    <TableHead>Objet</TableHead>
                    {/* <TableHead>Date d'enregistrement</TableHead> */}
                    <TableHead>Date d'arrivée</TableHead>
                    <TableHead>Date d'envoi</TableHead>
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
                    <TableRow key={mail.courielNumber} className="hover:bg-cyan-50 dark:hover:bg-gray-900">
                   {/*    <TableCell>

                      </TableCell> */}
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold`}
                        >
                          {mail.id}
                        </span>  
                      </TableCell>
                      <TableCell>{mail.type}</TableCell>
                      <TableCell>{mail.nature}</TableCell>
                       <TableCell className="max-w-xs truncate">
                        {mail.subject}
                      </TableCell> 
                      {/* <TableCell>
                        {mail.historyList[0]?.timestamp ? new Date(mail.historyList[0].timestamp).toLocaleDateString() : 'N/A'}
                      </TableCell> */}
                      <TableCell>
                        {mail.arrivedDate ? new Date(mail.arrivedDate).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {mail.sentDate ? new Date(mail.sentDate).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {mail.returnDate ? new Date(mail.returnDate).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        <span className={getStatusColor(mail.status)}>
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
                      <TableCell className="max-w-60 truncate ">
                        {mail.sender}
                      </TableCell>
                      <TableCell className="max-w-60 truncate">
                        {mail.recipient}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu open={openDropdownId === mail.courielNumber} onOpenChange={(open) => {
                            if (open) {
                              setOpenDropdownId(mail.courielNumber)
                            } else {
                              setOpenDropdownId(null)
                            }
                          }}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              aria-label="Actions"
                              data-state={openDropdownId === mail.courielNumber ? "open" : "closed"}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end" 
                            className="w-[160px]"
                          >
                            <DropdownMenuItem onClick={() => handleViewDetails(mail)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(mail)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => confirmDeleteMail(mail)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDownloadAttachments(mail)}>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger fichiers
                            </DropdownMenuItem>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              Détails du courrier
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Consultez toutes les informations détaillées de ce courrier
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto py-6">
            {selectedMail && (
              <div className="space-y-8">
                {/* Header Information Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Numéro du courrier
                      </label>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-lg font-bold text-gray-900">{selectedMail.courielNumber}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Type
                      </label>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900 font-medium">{selectedMail.type}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Nature
                      </label>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900 font-medium">{selectedMail.nature}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Informations générales
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600 block mb-1">
                            Objet
                          </label>
                          <p className="text-gray-900 font-medium bg-gray-50 rounded-lg p-3">
                            {selectedMail.subject}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">
                              Date d'enregistrement
                            </label>
                            <div className="flex items-center gap-2 text-gray-900">
                              <Timer className="w-4 h-4 text-blue-600" />
                              <span>
                                {selectedMail.historyList && selectedMail.historyList.length > 0 && selectedMail.historyList[0].timestamp 
                                  ? new Date(selectedMail.historyList[0].timestamp).toLocaleDateString('fr-FR') 
                                  : 'N/A'}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">
                              Date de retour
                            </label>
                            <div className="flex items-center gap-2 text-gray-900">
                              <Timer className="w-4 h-4 text-blue-600" />
                              <span>
                                {selectedMail.returnDate 
                                  ? new Date(selectedMail.returnDate).toLocaleDateString('fr-FR')
                                  : 'Non définie'
                                }
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">
                              Date d'envoi
                            </label>
                            <div className="flex items-center gap-2 text-gray-900">
                              <Timer className="w-4 h-4 text-blue-600" />
                              <span>
                                {selectedMail.sentDate 
                                  ? new Date(selectedMail.sentDate).toLocaleDateString('fr-FR')
                                  : '-'
                                }
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">
                              Date d'arrivée
                            </label>
                            <div className="flex items-center gap-2 text-gray-900">
                              <Timer className="w-4 h-4 text-blue-600" />
                              <span>
                                {selectedMail.arrivedDate 
                                  ? new Date(selectedMail.arrivedDate).toLocaleDateString('fr-FR')
                                  : '-'
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">
                              Statut
                            </label>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMail.status)}`}>
                              <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                              {selectedMail.status}
                            </span>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">
                              Priorité
                            </label>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedMail.priority)}`}>
                              <FileText className="w-3 h-3 mr-1" />
                              {selectedMail.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <SendToBackIcon className="w-5 h-5 text-blue-600" />
                        Expéditeur et Destinataire
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600 block mb-2">
                            Expéditeur
                          </label>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-green-800">
                              <FileText className="w-4 h-4" />
                              <span className="font-medium">
                                {selectedMail.sender}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600 block mb-2">
                            Destinataire
                          </label>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-blue-800">
                              <FileText className="w-4 h-4" />
                              <span className="font-medium">
                                {selectedMail.recipient}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {selectedMail.description && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Description
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedMail.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {selectedMail.attachments && selectedMail.attachments.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Pièces jointes ({selectedMail.attachments.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedMail.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {attachment.size}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Téléchargement",
                                description: `Téléchargement de ${attachment.name} en cours...`,
                              })
                            }}
                            className="flex-shrink-0 hover:bg-blue-100 hover:text-blue-700"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter className="border-t border-gray-200 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsViewDialogOpen(false)}
              className="hover:bg-gray-50"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Mail Dialog */}
      
      <EditMailDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen}
        mail={ selectedMail }
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

      {/* History Dialog - Modern Design */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <History className="w-5 h-5 text-white" />
              </div>
              Historique du courrier
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Consultez l'historique complet des modifications et actions effectuées sur ce courrier
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto py-6">
            {selectedMail && (
              <div className="space-y-6">
                {/* Mail Information Header */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Courrier #{selectedMail.courielNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedMail.subject}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">
                          📧 {selectedMail.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          🏷️ {selectedMail.nature}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-600" />
                    Chronologie des événements
                  </h3>
                  
                  {selectedMail.historyList && selectedMail.historyList.length > 0 ? (
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-purple-200"></div>
                      
                      <div className="space-y-6">
                        {selectedMail.historyList.map((entry, index) => {
                          const isFirst = index === 0;
// Removed unused isLast variable
                          
                          // Action type styling
                          const getActionStyle = (action: string) => {
                            switch (action) {
                              case 'CREATE':
                                return {
                                  bg: 'bg-green-100',
                                  text: 'text-green-700',
                                  border: 'border-green-200',
                                  dot: 'bg-green-500'
                                };
                              case 'UPDATE':
                                return {
                                  bg: 'bg-blue-100',
                                  text: 'text-blue-700',
                                  border: 'border-blue-200',
                                  dot: 'bg-blue-500'
                                };
                              case 'ARCHIVE':
                                return {
                                  bg: 'bg-gray-100',
                                  text: 'text-gray-700',
                                  border: 'border-gray-200',
                                  dot: 'bg-gray-500'
                                };
                              case 'DELETE':
                                return {
                                  bg: 'bg-red-100',
                                  text: 'text-red-700',
                                  border: 'border-red-200',
                                  icon: '🗑️',
                                  dot: 'bg-red-500'
                                };
                              default:
                                return {
                                  bg: 'bg-purple-100',
                                  text: 'text-purple-700',
                                  border: 'border-purple-200',
                                  dot: 'bg-purple-500'
                                };
                            }
                          };
                          
                          const actionStyle = getActionStyle(entry.actionType);
                          
                          return (
                            <div key={index} className="relative flex items-start gap-4">
                              {/* Timeline Dot */}
                              <div className={`relative z-10 w-12 h-12 ${actionStyle.bg} ${actionStyle.border} border-2 rounded-full flex items-center justify-center flex-shrink-0`}>
                                <div className={`w-3 h-3 ${actionStyle.dot} rounded-full`}></div>
                              </div>
                              
                              {/* Content Card */}
                              <div className={`flex-1 ${actionStyle.bg} ${actionStyle.border} border rounded-xl p-4 ${isFirst ? 'shadow-md' : 'shadow-sm'}`}>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-lg">{actionStyle.icon}</span>
                                      <h4 className={`font-semibold ${actionStyle.text}`}>
                                        {entry.actionType}
                                      </h4>
                                      {isFirst && (
                                        <span className="px-2 py-1 bg-white rounded-full text-xs font-medium text-purple-600 border border-purple-200">
                                          Récent
                                        </span>
                                      )}
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                          <User className="w-4 h-4 text-gray-500" />
                                          <span className="text-gray-600">Par:</span>
                                          <span className="font-medium text-gray-900">
                                            {entry.createdById}
                                          </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-1">
                                          <Timer className="w-4 h-4 text-gray-500" />
                                          <span className="text-gray-600">Le:</span>
                                          <span className="font-medium text-gray-900">
                                            {new Date(entry.timestamp).toLocaleDateString('fr-FR', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                            })}
                                          </span>
                                        </div>
                                      </div>
                                      
                                      {/* Additional details if available */}
                                      {entry.updatedById && (
                                        <div className="mt-3 p-3 bg-white bg-opacity-60 rounded-lg">
                                          <p className="text-sm text-gray-700">
                                            Modifié par: {entry.updatedById}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Time indicator */}
                                 {/*  <div className="text-xs text-gray-500 ml-4">
                                    {(() => {
                                      const date = new Date(entry.timestamp);
                                      const now = new Date();
                                      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
                                      
                                      if (diffInHours < 1) return 'Il y a moins d\'une heure';
                                      if (diffInHours < 24) return `Il y a ${diffInHours}h`;
                                      const diffInDays = Math.floor(diffInHours / 24);
                                      if (diffInDays < 30) return `Il y a ${diffInDays}j`;
                                      const diffInMonths = Math.floor(diffInDays / 30);
                                      return `Il y a ${diffInMonths} mois`;
                                    })()
                                    }
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <History className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        Aucun historique disponible
                      </h4>
                      <p className="text-gray-500">
                        L'historique de ce courrier n'est pas encore disponible.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Statistics Summary */}
                {selectedMail.historyList && selectedMail.historyList.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      Résumé des activités
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                            <Avatar className="text-lg"/>
                          </div>
                          <div>
                            <p className="text-sm text-green-600 font-medium">Créations</p>
                            <p className="text-xl font-bold text-green-700">
                              {selectedMail.historyList.filter(h => h.actionType === 'CREATE').length}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                            <span className="text-lg">✏️</span>
                          </div>
                          <div>
                            <p className="text-sm text-blue-600 font-medium">Modifications</p>
                            <p className="text-xl font-bold text-blue-700">
                              {selectedMail.historyList.filter(h => h.actionType === 'UPDATE').length}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                            <span className="text-lg">📊</span>
                          </div>
                          <div>
                            <p className="text-sm text-purple-600 font-medium">Total événements</p>
                            <p className="text-xl font-bold text-purple-700">
                              {selectedMail.historyList.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter className="border-t border-gray-200 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsHistoryDialogOpen(false)}
              className="hover:bg-gray-50"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog - Modern Design */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Cette action est irréversible et supprimera définitivement ce courrier.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedMail && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-red-800 mb-1">
                      Courrier à supprimer:
                    </h4>
                    <div className="space-y-1">
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Numéro:</span> {selectedMail.courielNumber}
                      </p>
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Type:</span> {selectedMail.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-800 mb-1">
                    Attention
                  </h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Le courrier sera définitivement supprimé</li>
                    <li>• Toutes les pièces jointes seront également supprimées</li>
                    <li>• L'historique du courrier sera perdu</li>
                    <li>• Cette action ne peut pas être annulée</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="border-t border-gray-200 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="hover:bg-gray-50"
            >
              Annuler
            </Button>
            <Button 
              variant="destructive"
              onClick={async () => {
                if (selectedMail) {
                  try {
                    await handleDeleteMail(selectedMail.courielNumber);
                    setIsDeleteDialogOpen(false);
                  } catch (error) {
                    console.error('Error deleting mail:', error);
                  }
                }
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
  