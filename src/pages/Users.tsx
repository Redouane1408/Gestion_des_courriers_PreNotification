import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
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
import { Copy, Loader2, AlertCircle } from "lucide-react"
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
  direction?: string;
  subDirection?: string;
  profession?: string;
  quatreChiffres?: string; // Add this line
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mot de passe généré</DialogTitle>
          <DialogDescription>
            Veuillez copier ce mot de passe et le partager avec l'utilisateur de manière sécurisée.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between p-4 bg-muted rounded-md">
          <code className="text-sm font-mono">{password}</code>
          <Button variant="outline" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copier
          </Button>
        </div>
        <Button onClick={onClose}>Fermer</Button>
      </DialogContent>
    </Dialog>
  );
};

export function UsersPage() {
  const { isGlobalAdmin, getToken, directionId } = useAuth();
  const { toast } = useToast();
  
  // State management
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [sousDirections, setSousDirections] = useState<Direction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [isLoadingSousDirections, setIsLoadingSousDirections] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
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
          endpoint = `/auth/getAllUsers/${directionId}`
        } 
        // For sous-direction users, get users from their direction
        // Fallback to current behavior
        else {
          endpoint = `/auth/getAllUsers/${directionId}`
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

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = await getToken();
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/delete/${userToDelete.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      toast({
        title: "Succès",
        description: "Utilisateur supprimé avec succès"
      });
      
      fetchUsers();
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.response?.data?.message || "Impossible de supprimer l'utilisateur"
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  // Add a function to handle copying passwords
const handleCopyPassword = () => {
  if (generatedPassword) {
    navigator.clipboard.writeText(generatedPassword);
    toast({
      title: "Copié",
      description: "Le mot de passe a été copié dans le presse-papiers"
    });
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
            `${import.meta.env.VITE_API_BASE_URL}/auth/update/${selectedUser.id}?nomComplet=${data.nomComplet}&telephone=${data.telephone}`,
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
      
      setIsDialogOpen(false);
      setSelectedUser(null);
      adminForm.reset();
      userForm.reset();
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
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {shouldShowAdminForm() ? "Gestion des administrateurs de direction" : "Gestion des utilisateurs"}
        </h1>
        <Button onClick={() => {
          setSelectedUser(null);
          setIsDialogOpen(true);
          adminForm.reset();
          userForm.reset();
        }}>
          {shouldShowAdminForm() ? "Nouvel admin de direction" : "Nouvel utilisateur"}
        </Button>
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
                <TableHead>{shouldShowAdminForm() ? "Direction" : "Sous-direction"}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>{user.profession || '-'}</TableCell>
                    <TableCell>{user.quatreChiffres}</TableCell>
                    <TableCell>{shouldShowAdminForm() ? user.direction : user.subDirection}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                          Modifier
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(user)}>
                          Supprimer
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
                        <Input {...field} disabled={!!selectedUser} />
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
                          <Input maxLength={4} {...field} disabled={!!selectedUser} />
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
                        <Input {...field} disabled={!!selectedUser} />
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
                        <Input maxLength={4} {...field} disabled={!!selectedUser} />
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                <>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Supprimer
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
  )
}
