"use client"

import { useState, useEffect } from "react"
import {
  Archive,
  ArrowUpDown,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Download,
  Eye,
  Pencil,
  History,

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
import { format } from "date-fns"
import { fetchDashboardSummary, fetchMailOverview, fetchRecentMails } from "@/services/dashboardService";
import { Mail } from "@/types/mail"; // Keep this import
import { RecentMails } from "@/components/dashboard/recent-mails"
// Remove any local Mail interface declaration (it's already commented out)
// Types for our data
// The local Mail, Attachment, and Modification interfaces will be removed from here.

export function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMails, setSelectedMails] = useState<string[]>([])
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  // State for real data
  const [recentMails, setRecentMails] = useState<Mail[]>([]); // Using imported Mail type
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
        setRecentMails(Array.isArray(recent) ? recent : []); // Ensure recent is always an array

      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la récupération des données du tableau de bord.",
          variant: "destructive",
        });
        setRecentMails([]); // Also ensure it's an empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);

  // Update filteredMails to use recentMails if you want to filter only the displayed recent mails
  // If you want to filter all mails, you'll need a separate API call for the 'mails' tab
  const filteredMails = recentMails.filter(
    (mail) =>
      mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mail.courielNumber && mail.courielNumber.toLowerCase().includes(searchTerm.toLowerCase())), // Use courielNumber
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
      "Date d'enregistrement": mail.registrationDate,
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

  const handleViewDetails = (mail: Mail) => {
    // Navigate to mail details page
    navigate(`/courriers/${mail.courielNumber || mail.id}`) // Use courielNumber or fallback to id
  }

  const handleNewMail = () => {
    // Navigate to archive page
    navigate("/archive")
  }

  return (
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
                <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courriers entrants</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardSummary.incomingMails}</div>
                <p className="text-xs text-muted-foreground">+8% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courriers sortants</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardSummary.outgoingMails}</div>
                <p className="text-xs text-muted-foreground">+18% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardSummary.activeUsers}</div>
                <p className="text-xs text-muted-foreground">+5% par rapport au mois dernier</p>
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
                <RecentMails recentMails={recentMails} getStatusColor={getStatusColor} />
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
              <CardDescription>Les cinqs derniers courriers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2">
                <Input
                  type="search"
                  placeholder="Rechercher un courrier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-2">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtrer
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                      <DropdownMenuItem>Type</DropdownMenuItem>
                      <DropdownMenuItem>Nature</DropdownMenuItem>
                      <DropdownMenuItem>Priorité</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Statut</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" className="ml-2" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
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
                      <TableRow key={mail.courielNumber || mail.id}> {/* Use courielNumber or fallback to id */}
                        <TableCell className="w-[50px]">
                          <Checkbox
                            checked={selectedMails.includes(mail.courielNumber || mail.id)} // Use courielNumber or fallback to id
                            onCheckedChange={() => handleSelectMail(mail.courielNumber || mail.id)} // Use courielNumber or fallback to id
                          />
                        </TableCell>
                        <TableCell className="font-medium">{mail.courielNumber || mail.id}</TableCell> {/* Use courielNumber or fallback to id */}
                        <TableCell>{mail.subject}</TableCell>
                        <TableCell>{mail.type}</TableCell>
                        <TableCell>{mail.nature}</TableCell>
                        <TableCell>{mail.registrationDate}</TableCell>
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
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archiver
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
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
    </div>
  )
}
