"use client"

import { useState, useEffect } from "react"
import { PageTransition } from "@/components/page-transition"
import {
  Archive,
  ArrowUpDown,
  FileText,
  MoreHorizontal,
  Plus,
  Eye,
  Pencil,
  History,
  Trash2,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/auth-context"
import { Overview } from "@/components/dashboard/overview"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { fetchDashboardSummary, fetchMailOverview, fetchRecentMails } from "@/services/dashboardService";
import { Mail } from "@/types/mail"; // Keep this import
import { RecentMails } from "@/components/dashboard/recent-mails"
import { Avatar } from "@radix-ui/react-avatar"
import { useMails } from "@/hooks/use-mails"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditMailDialog } from "@/components/edit-mail-dialog"
import { mailService } from "@/services/mail-service"
import { Label } from "@/components/ui/label"

export function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMails, setSelectedMails] = useState<string[]>([])
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  
  // State for recent mails - separate from useMails hook
  const [recentMailsData, setRecentMailsData] = useState<Mail[]>([])
  // Use the useMails hook for other mail operations
  const { mails, filters, refresh } = useMails()
  
  // Add these state variables for dialogs
  const [isAnyDialogOpen, setIsAnyDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null)
  
  // Dashboard state
  const [dashboardSummary, setDashboardSummary] = useState({
    totalMails: 0,
    incomingMails: 0,
    outgoingMails: 0,
    activeUsers: 0,
  });
  const [mailOverviewData, setMailOverviewData] = useState<{ name: string; total: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const summary = await fetchDashboardSummary();
        setDashboardSummary(summary);

        const overview = await fetchMailOverview();
        setMailOverviewData(overview);

        const recent = await fetchRecentMails();
        console.log("Fetched recent mails:", recent); // Add this line
        setRecentMailsData(Array.isArray(recent) ? recent : []); // Use the local state setter

      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la récupération des données du tableau de bord.",
          variant: "destructive",
        });
        setRecentMailsData([]); // Use the local state setter
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);

  // Update filteredMails to use recentMailsData
  const filteredMails = recentMailsData.filter(
    (mail) =>
      mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mail.courielNumber && mail.courielNumber.toLowerCase().includes(searchTerm.toLowerCase())),
  );

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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMails(filteredMails.map((mail) => mail.courielNumber || mail.id)) // Use courielNumber or fallback to id
    } else {
      setSelectedMails([])
    }
  }

  const handleSelectMail = (identifier: string) => { // Changed parameter name to identifier
    if (selectedMails.includes(identifier)) {
      setSelectedMails(selectedMails.filter((mailId) => mailId !== identifier))
    } else {
      setSelectedMails([...selectedMails, identifier])
    }
  }

  const handleExport = () => {
    // In a real application, this would generate a CSV or Excel file
    const exportData = filteredMails.map((mail) => ({
      "N° de courrier": mail.courielNumber || mail.id, // Use courielNumber or fallback to id
      Type: mail.type,
      Nature: mail.nature,
      Objet: mail.subject,
      "Date d'enregistrement": mail.historyList[0].timestamp,
      Statut: mail.status,
      Priorité: mail.priority,
      Expéditeur: mail.sender,
      Destinataire: mail.recipient,
    }))

    // For demonstration, we'll just show a toast
    toast({
      title: "Export réussi",
      description: `${exportData.length} courriers exportés.`,
    })
  }

  // Ajoutez une fonction pour gérer le focus dans les menus déroulants
  const handleDropdownAction = (action: () => void) => {
    // Déplacer le focus vers le body avant d'exécuter l'action
    document.body.focus()

    // Exécuter l'action après un court délai
    setTimeout(() => {
      action()
    }, 10)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Replace the existing handleViewDetails function with this one
  const closeAllDropdowns = () => {
    // Force close any open Radix UI dropdown menus
    document.body.click();
    
    // Small delay to ensure DOM updates before opening dialogs
    return new Promise(resolve => setTimeout(resolve, 50));
  };

  // Update these handler functions to use the async approach
  const handleViewDetails = async (mail: Mail) => {
    await closeAllDropdowns();
    setSelectedMail(mail);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = async (mail: Mail) => {
    await closeAllDropdowns();
    setSelectedMail(mail);
    setIsEditDialogOpen(true);
  };

  const openHistoryDialog = async (mail: Mail) => {
    await closeAllDropdowns();
    setSelectedMail(mail);
    setIsHistoryDialogOpen(true);
  };

  const handleDeleteMail = async (mail: Mail) => {
    await closeAllDropdowns();
    setSelectedMail(mail);
    
    try {
      await mailService.deleteMail(mail.courielNumber);
      toast({
        title: "Succès",
        description: "Le courrier a été supprimé avec succès.",
      });
      // Refresh the dashboard data to update the UI
      const recent = await fetchRecentMails();
      setRecentMailsData(Array.isArray(recent) ? recent : []);
    } catch (error) {
      console.error('Error deleting mail:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du courrier.",
      });
    }
  }

  const handleNewMail = () => {
    // Navigate to archive page
    navigate("/archive")
  }

  return (
    <PageTransition>
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleNewMail}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Nouveau courrier</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 w-full">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="mails">Courriers Récents</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total des courriers</CardTitle>
                <Archive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardSummary.totalMails}</div>
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courriers entrants</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardSummary.incomingMails}</div>
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courriers sortants</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardSummary.outgoingMails}</div>
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                <Avatar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardSummary.activeUsers}</div>
                
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Aperçu des courriers</CardTitle>
                <CardDescription>Nombre de courriers par mois</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={mailOverviewData} />
              </CardContent>
            </Card>
            <Card className="flex flex-col col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courriers récents</CardTitle>
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pl-2 flex-grow">
                {/* Remplacer le tableau des courriers récents */}
                <RecentMails recentMails={recentMailsData} getStatusColor={getStatusColor} />
              </CardContent>
              <div className="flex items-center justify-end p-4">
                <Button onClick={() => navigate("/archive")} size="sm">
                  Voir tous les courriers
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Analytiques des courriers</CardTitle>
              <CardDescription>Analyse détaillée des courriers par type et département</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                {isLoading ? (
                  <p className="text-muted-foreground">Loading analytics data...</p>
                ) : (
                  <p className="text-muted-foreground">Graphiques analytiques</p>
                )}
              </div>
              
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mails" className="space-y-4 w-full">
            
          <Card className="w-full">
            
            <CardHeader>
              <CardTitle>Liste des courriers</CardTitle>
              <CardDescription>Les cinq (5) derniers courriers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2">
                <Input
                  type="search"
                  placeholder="Rechercher un courrier..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="flex items-center">

                </div>
              </div>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedMails.length === filteredMails.length && filteredMails.length > 0}
                          onCheckedChange={(checked) => handleSelectAll(checked || false)}
                        />
                      </TableHead>
                      <TableHead>N° de courrier</TableHead>
                      <TableHead>Objet</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Nature</TableHead>
                      <TableHead>Date d'enregistrement</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Expéditeur</TableHead>
                      <TableHead>Destinataire</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMails.map((mail) => (
                      <TableRow key={mail.courielNumber || mail.id}>
                        <TableCell className="w-[50px]">
                          <Checkbox
                            checked={selectedMails.includes(mail.courielNumber || mail.id)}
                            onCheckedChange={() => handleSelectMail(mail.courielNumber || mail.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{mail.courielNumber || mail.id}</TableCell>
                        <TableCell>{mail.subject}</TableCell>
                        <TableCell>{mail.type}</TableCell>
                        <TableCell>{mail.nature}</TableCell>
                        <TableCell>{mail.historyList[0].timestamp}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(mail.status)}`}
                          >
                            {mail.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(mail.priority)}`}
                          >
                            {mail.priority}
                          </span>
                        </TableCell>
                        <TableCell>{mail.sender}</TableCell>
                        <TableCell>{mail.recipient}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Ouvrir le menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDetails(mail)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditDialog(mail)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteMail(mail)}>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Mail Dialog */}
      <Dialog 
        open={isViewDialogOpen} 
        onOpenChange={(open) => {
          // When closing, ensure we don't have focus issues
          if (!open) {
            setTimeout(() => setIsViewDialogOpen(false), 0);
          } else {
            setIsViewDialogOpen(open);
          }
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails du courrier</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Informations détaillées du courrier sélectionné
            </DialogDescription>
          </DialogHeader>
          {selectedMail && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <Label className="font-medium">N° de courrier</Label>
                <div>{selectedMail.courielNumber || selectedMail.id}</div>
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
                  {selectedMail.historyList[0].timestamp}
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
              <div className="md:col-span-2">
                <Label className="font-medium">Description</Label>
                <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-900 rounded-md">
                  {selectedMail.description || "Aucune description"}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Mail Dialog */}
      <EditMailDialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          // When closing, ensure we don't have focus issues
          if (!open) {
            setTimeout(() => setIsEditDialogOpen(false), 0);
          } else {
            setIsEditDialogOpen(open);
          }
        }}
        mail={selectedMail}
        onSuccess={() => {
          setIsEditDialogOpen(false);
          // Refresh the mail list
          fetchRecentMails().then(recent => {
            setRecentMailsData(Array.isArray(recent) ? recent : []);
          });
        }}
      />

      {/* History Dialog */}
      <Dialog 
        open={isHistoryDialogOpen} 
        onOpenChange={(open) => {
          // When closing, ensure we don't have focus issues
          if (!open) {
            setTimeout(() => setIsHistoryDialogOpen(false), 0);
          } else {
            setIsHistoryDialogOpen(open);
          }
        }}
      >
        <DialogContent className="max-w-4xl overflow-hidden bg-white">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900">Historique du Courrier</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
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
                          {history.timestamp}
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
    </PageTransition>
  )
}