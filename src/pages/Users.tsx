import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/page-transition";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios"
import { Copy, Loader2, AlertCircle, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import copy from 'clipboard-copy'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  enabled: boolean; // Add this field to track user account status
  direction?: string;
  subDirection?: string;
  profession?: string;
  quatreChiffres?: string;
}

interface Direction {
  id: string | number;
  name: string;
}

// Form validation schemas
const adminFormSchema = z.object({
  nomComplet: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(), // Changed to optional
  quatreChiffres: z.string().length(4, "Doit contenir exactement 4 chiffres").regex(/^\d+$/, "Doit contenir uniquement des chiffres").optional(),
  direction: z.number().min(1, "La direction est requise").optional(),
  profession: z.string().optional() // Changed to optional
})

const userFormSchema = z.object({
  nomComplet: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(), // Changed to optional
  quatreChiffres: z.string().length(4, "Doit contenir exactement 4 chiffres").regex(/^\d+$/, "Doit contenir uniquement des chiffres").optional(),
  sousdirection: z.string().min(1, "La sous-direction est requise"),
  profession: z.string().optional() // Changed to optional
})

// Helper components
const PasswordDialog = ({ password, isOpen, onClose, onCopy }: { 
  password: string | null, 
  isOpen: boolean, 
  onClose: () => void,
  onCopy: () => void 
}) => {
  if (!password) return null;
  
  const handlePasswordClick = () => {
    // Auto-select the password when clicked
    const selection = window.getSelection();
    const range = document.createRange();
    const passwordElement = document.getElementById('generated-password');
    if (passwordElement && selection) {
      range.selectNodeContents(passwordElement);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mot de passe généré</DialogTitle>
          <DialogDescription>
            Veuillez copier ce mot de passe et le partager avec l'utilisateur de manière sécurisée.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between p-4 bg-muted rounded-md">
          <code 
            id="generated-password"
            className="text-sm font-mono cursor-pointer select-all hover:bg-gray-100 p-1 rounded flex-1 mr-2"
            onClick={handlePasswordClick}
            title="Cliquez pour sélectionner le mot de passe"
          >
            {password}
          </code>
          <Button variant="outline" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copier
          </Button>
        </div>
        <div className="text-xs text-muted-foreground text-center">
          💡 Astuce: Cliquez sur le mot de passe pour le sélectionner, puis utilisez Ctrl+C
        </div>
        <Button onClick={onClose} className="w-full">Fermer</Button>
      </DialogContent>
    </Dialog>
  );
};

export function UsersPage() {
  const { isGlobalAdmin, getToken, directionId, directionGeneralId } = useAuth(); // Add directionGeneralId
  const { toast } = useToast();
  
  // State management
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [isToggleDialogOpen, setIsToggleDialogOpen] = useState(false); // Replace isDeleteDialogOpen
const [users, setUsers] = useState<User[]>([]);
const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
const [searchTerm, setSearchTerm] = useState("");
const [roleFilter, setRoleFilter] = useState<string>("all");
const [directions, setDirections] = useState<Direction[]>([]);
const [sousDirections, setSousDirections] = useState<Direction[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isLoadingDirections, setIsLoadingDirections] = useState(false);
const [isLoadingSousDirections, setIsLoadingSousDirections] = useState(false);
const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [userToToggle, setUserToToggle] = useState<User | null>(null); // Replace userToDelete
const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
const [showPasswordDialog, setShowPasswordDialog] = useState(false);
const [isToggling, setIsToggling] = useState(false); // Replace isDeleting

  // Filter users based on search term and role
  useEffect(() => {
    let filtered = users;
    
    // Apply search filter (only by name/username)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  // Helper functions
  const hasDirectionId = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return !!user.directionId;
    }
    return false;
  };
  
  const shouldShowAdminForm = () => {
    return isGlobalAdmin() && !hasDirectionId();
  };

  const getUserDirectionGeneralId = (): number => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.directionGeneralId) {
        return Number(user.directionGeneralId);
      }
    }
    // Fallback to auth context
    return directionGeneralId ? Number(directionGeneralId) : 1;
  };
  
  const getUserDivisionId = (): number => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.divisionId) {
        return Number(user.divisionId);
      }
    }
    return 1; // Default to 1 if not found
  };
  
  const getUserDirectionId = (): string | null => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.directionId) {
        return user.directionId;
      }
    }
    return directionId;
  };

  // Form setup
  const adminForm = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      nomComplet: "",
      email: "",
      telephone: "",
      quatreChiffres: "",
      direction: undefined,
      profession: "",
    },
  });

  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      nomComplet: "",
      email: "",
      telephone: "",
      quatreChiffres: "",
      sousdirection: "",
      profession: "",
    },
  });

  // Data fetching
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      if (shouldShowAdminForm()) {
        fetchDirections();
      } else {
        fetchSousDirections();
      }
    }
  }, [isDialogOpen]);

  const fetchDirections = async () => {
    setIsLoadingDirections(true);
    try {
      const token = await getToken();
      const divisionId = getUserDivisionId();
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Directions/getByDivisionId?divisionId=${divisionId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      const formattedDirections = response.data.map((dir: any) => ({
        id: dir.id,
        name: dir.directionName
      }));
      setDirections(formattedDirections);
    } catch (error) {
      console.error("Error fetching directions:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les directions"
      });
    } finally {
      setIsLoadingDirections(false);
    }
  };

  const fetchSousDirections = async () => {
    const userDirectionId = getUserDirectionId();
    if (!userDirectionId) return;
    
    setIsLoadingSousDirections(true);
    try {
      const token = await getToken();
      const divisionId = getUserDivisionId();
      
      console.log("Fetching sous-directions with directionId:", userDirectionId, "and divisionId:", divisionId);
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/sousDirections/getByDirectionIdAndDivisionId`,
        {
          params: {
            directionId: userDirectionId,
            divisionId: divisionId
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      // Update this line to use sousDirectionName instead of name
      const formattedSousDirections = response.data.map((sdir: any) => ({
        id: sdir.id.toString(),
        name: sdir.sousDirectionName || sdir.name || "Sous-direction sans nom"
      }));
      
      console.log("Formatted sous-directions:", formattedSousDirections);
      setSousDirections(formattedSousDirections);
    } catch (error) {
      console.error("Error fetching sous-directions:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les sous-directions"
      });
    } finally {
      setIsLoadingSousDirections(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const token = await getToken()
      let endpoint = '/auth/getAllUsers'
      
      // If not a global admin, we need to specify which users to fetch
      if (!isGlobalAdmin()) {
        // For direction admins, get users from their direction and all sous-directions
        if (isGlobalAdmin()) {
          endpoint = `/auth/getAllUsers`
        } 
        // For sous-direction users, get users from their direction
        // Fallback to current behavior
        else {
          endpoint = `/auth/getAllUsers`
        }
      }
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      )
      
      // Map the API response to match your User interface
      const mappedUsers = Array.isArray(response.data) ? response.data.map((user: any) => ({
        id: user.id,
        name: user.nomComplet,
        email: user.email,
        phone: user.telephone,
        quatreChiffres: user.quatreChiffres || '-',
        role: user.role || '-',
        enabled: user.enabled, // Add this new field mapping
        direction: user.directionId || '-',
        subDirection: user.souDirectionId || '-',
        profession: user.profession || '-'
      })) : [];
      
      setUsers(mappedUsers)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // User actions
  // In your handleEdit function, ensure direction is properly converted to a number
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    
    if (shouldShowAdminForm()) {
      // Make sure to convert direction to a number if it exists
      // If it's not a valid number, set it to undefined
      let directionId = undefined;
      if (user.direction && !isNaN(Number(user.direction))) {
        directionId = Number(user.direction);
      }
      
      adminForm.reset({
        nomComplet: user.name,
        email: user.email,
        telephone: user.phone || '',
        quatreChiffres: user.quatreChiffres || '', // Add this line
        direction: directionId,
        profession: user.profession || '',
      });
    } else {
      userForm.reset({
        nomComplet: user.name,
        email: user.email,
        telephone: user.phone || '',
        quatreChiffres: user.quatreChiffres || '', // Add this line
        sousdirection: user.subDirection || '',
        profession: user.profession || '',
      });
    }
    
    setIsDialogOpen(true);
  };

  const handleToggleClick = (user: User) => {
    setUserToToggle(user);
    setIsToggleDialogOpen(true);
  };

  const handleToggleStatus = async () => {
    if (!userToToggle) return;
    
    setIsToggling(true);
    try {
      const token = await getToken();
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/toggle_account`,
        {},
        {
          params: {
            email: userToToggle.email
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const action = userToToggle.enabled ? "désactivé" : "activé";
      toast({
        title: "Succès",
        description: `Utilisateur ${action} avec succès`
      });
      
      fetchUsers();
    } catch (error: any) {
      console.error("Error toggling user account:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.response?.data?.message || "Impossible de modifier le statut de l'utilisateur"
      });
    } finally {
      setIsToggling(false);
      setIsToggleDialogOpen(false);
      setUserToToggle(null);
    }
  };

  const handleCopyPassword = async () => {
  if (!generatedPassword) return;
  
  try {
    await copy(generatedPassword);
    toast({
      title: "Copié",
      description: "Le mot de passe a été copié dans le presse-papiers"
    });
  } catch (err) {
    console.error('Copy failed:', err);
    
    // Fallback to auto-selection
    const passwordElement = document.getElementById('generated-password');
    if (passwordElement) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(passwordElement);
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      toast({
        title: "Sélection automatique",
        description: "Le mot de passe est sélectionné. Utilisez Ctrl+C pour copier",
        duration: 4000
      });
    }
  }
};

  // Form submission
  // In your onSubmit function, ensure the direction ID is properly handled
  const onSubmit = async (data: any) => {
    try {
      const token = await getToken();
      
      // Determine if we're creating or updating
      const isUpdate = !!selectedUser;
      
      if (isUpdate) {
        // Check if we're updating an admin or a regular user
        if (shouldShowAdminForm()) {
          // For admin updates, include the direction ID
          const updateParams = new URLSearchParams();
          updateParams.append('nomComplet', data.nomComplet);
          updateParams.append('telephone', data.telephone);
          updateParams.append('quatreChiffres', data.quatreChiffres);
          updateParams.append('profession', data.profession);
          
          // Always include the direction ID from the selected user
          if (selectedUser.direction && !isNaN(Number(selectedUser.direction))) {
            updateParams.append('directionId', Number(selectedUser.direction).toString());
          }
          
          console.log("Update params:", updateParams.toString());
          
          // Use the updated endpoint format with all necessary parameters
          await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/auth/update/${selectedUser.id}?${updateParams.toString()}`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
        } else {
          // For regular user updates, keep the existing code
          await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/auth/update/${selectedUser.id}?nomComplet=${data.nomComplet}&telephone=${data.telephone}&quatreChiffres=${data.quatreChiffres}&profession=${data.profession}`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
        }
        
        toast({
          title: "Succès",
          description: "Utilisateur mis à jour avec succès"
        });
      } else {
        // For creation, keep the existing code
        const divisionId = getUserDivisionId();
        const endpoint = shouldShowAdminForm() ? '/auth/createAdmin' : '/auth/createUser';
        
        // Format the request body according to the API requirements
        const requestBody = {
          nomComplet: data.nomComplet,
          email: data.email,
          telephone: data.telephone,
          divisionId: divisionId,
          directionId: shouldShowAdminForm() ? parseInt(data.direction) : parseInt(getUserDirectionId() || '0'),
          directionGeneralId: getUserDirectionGeneralId(), // Add this line
          souDirectionId: !shouldShowAdminForm() ? parseInt(data.sousdirection) : 0,
          quatreChiffres: data.quatreChiffres || undefined,
          profession: data.profession || ''
        };
        
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
          requestBody,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Handle password for new users
        if (!isUpdate && response.data?.plainpassword) {
          setGeneratedPassword(response.data.plainpassword);
          setShowPasswordDialog(true);
        }
        
        toast({
          title: "Succès",
          description: "Utilisateur créé avec succès"
        });
      }
      
      // Close dialog and reset everything
      
      setIsDialogOpen(false);
      setSelectedUser(null);
      
      // Reset both forms with default values
      adminForm.reset({
        nomComplet: "",
        email: "",
        telephone: "",
        quatreChiffres: "",
        direction: undefined,
        profession: "",
      });
      
      userForm.reset({
        nomComplet: "",
        email: "",
        telephone: "",
        quatreChiffres: "",
        sousdirection: "",
        profession: "",
      });
      
      fetchUsers();
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.response?.data?.message || `Impossible de ${selectedUser ? 'mettre à jour' : 'créer'} l'utilisateur`
      });
    }
  };

  return (
    <PageTransition>
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {shouldShowAdminForm() ? "Gestion des administrateurs de directions" : "Gestion des utilisateurs"}
        </h1>
        <Button onClick={() => {
          setSelectedUser(null);
          setIsDialogOpen(true);
          // Reset both forms with default values
          adminForm.reset({
            nomComplet: "",
            email: "",
            telephone: "",
            quatreChiffres: "",
            direction: undefined,
            profession: "",
          });
          userForm.reset({
            nomComplet: "",
            email: "",
            telephone: "",
            quatreChiffres: "",
            sousdirection: "",
            profession: "",
          });
        }}>
          {shouldShowAdminForm() ? "Nouvel admin de direction" : "Nouvel utilisateur"}
        </Button>
      </div>
 
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-4">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher par nom d'utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              {[...new Set(users.map(user => user.role))].map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom complet</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Profession</TableHead>
                <TableHead>Quattre Chiffres</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead> {/* Add status column */}
                <TableHead>{shouldShowAdminForm() ? "Direction" : "Sous-direction"}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    {searchTerm.trim() !== "" ? "Aucun utilisateur trouvé pour cette recherche" : "Aucun utilisateur trouvé"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>{user.profession || '-'}</TableCell>
                    <TableCell>{user.quatreChiffres}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          user.role === 'ADMIN' || user.role === 'Admin du direction' 
                            ? 'default' 
                            : 'secondary'
                        }
                        className={
                          user.role === 'ADMIN' || user.role === 'Admin du direction'
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.enabled ? 'default' : 'destructive'}>
                        {user.enabled ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>{shouldShowAdminForm() ? user.direction : user.subDirection}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                          Modifier
                        </Button>
                        <Button 
                          variant={user.enabled ? "destructive" : "default"} 
                          size="sm" 
                          onClick={() => handleToggleClick(user)}
                        >
                          {user.enabled ? "Désactiver" : "Activer"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-fit overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedUser 
                ? "Modifier l'utilisateur"
                : shouldShowAdminForm()
                  ? "Créer un admin de direction"
                  : "Créer un utilisateur"
              }
            </DialogTitle>
            <DialogDescription>
              {shouldShowAdminForm()
                ? "Ajouter ou modifier un administrateur pour une direction spécifique"
                : "Créer ou modifier un utilisateur pour cette sous-direction"
              }
            </DialogDescription>
          </DialogHeader>

          {shouldShowAdminForm() ? (
            <Form {...adminForm}>
              <form onSubmit={adminForm.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={adminForm.control}
                  name="nomComplet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} disabled={!!selectedUser} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminForm.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input maxLength={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminForm.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input {...field} /* disabled={!!selectedUser} */ />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                  <FormField
                    control={adminForm.control}
                    name="quatreChiffres"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code à 4 chiffres</FormLabel>
                        <FormControl>
                          <Input maxLength={4} {...field} /* disabled={!!selectedUser}  *//>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                <FormField
                  control={adminForm.control}
                  name="direction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Direction</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value?.toString()}
                        disabled={!!selectedUser}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingDirections ? (
                            <div className="p-2 text-center text-muted-foreground">Chargement...</div>
                          ) : directions.length > 0 ? (
                            directions.map(dir => (
                              <SelectItem key={dir.id} value={dir.id.toString()}>
                                {dir.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-center text-muted-foreground">Aucune direction disponible</div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {selectedUser ? "Mettre à jour" : "Créer"}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={userForm.control}
                  name="nomComplet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} disabled={!!selectedUser} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input maxLength={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input {...field} /* disabled={!!selectedUser}  *//>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="quatreChiffres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code à 4 chiffres</FormLabel>
                      <FormControl>
                        <Input maxLength={4} {...field}/*  disabled={!!selectedUser} */ />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="sousdirection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sous-direction</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!!selectedUser}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une sous-direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingSousDirections ? (
                            <div className="flex items-center justify-center p-2">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Chargement...</span>
                            </div>
                          ) : sousDirections.length > 0 ? (
                            sousDirections.map((sdir) => (
                              <SelectItem key={sdir.id} value={sdir.id.toString()}>
                                {sdir.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="flex items-center justify-center p-2 text-muted-foreground">
                              <AlertCircle className="h-4 w-4 mr-2" />
                              <span>Aucune sous-direction disponible</span>
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {selectedUser ? "Mettre à jour" : "Créer"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Toggle Account Dialog */}
      <AlertDialog open={isToggleDialogOpen} onOpenChange={setIsToggleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {userToToggle?.enabled ? "Désactiver" : "Activer"} l'utilisateur
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir {userToToggle?.enabled ? "désactiver" : "activer"} l'utilisateur <strong>{userToToggle?.name}</strong> ?
              {userToToggle?.enabled 
                ? " L'utilisateur ne pourra plus se connecter à l'application."
                : " L'utilisateur pourra à nouveau se connecter à l'application."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsToggleDialogOpen(false);
              setUserToToggle(null);
            }}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleToggleStatus} 
              disabled={isToggling}
              className={userToToggle?.enabled 
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-green-600 text-white hover:bg-green-700"
              }
            >
              {isToggling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {userToToggle?.enabled ? "Désactivation..." : "Activation..."}
                </>
              ) : (
                <>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {userToToggle?.enabled ? "Désactiver" : "Activer"}
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Password Dialog */}
      <PasswordDialog
        password={generatedPassword}
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onCopy={handleCopyPassword}
       />
    </div>
    </PageTransition>
  )
}
