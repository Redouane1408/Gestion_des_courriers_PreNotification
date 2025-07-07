import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { mailService } from '@/services/mail-service';
import { divisionService } from '@/services/divisionService';
import { directionService } from '@/services/directionService';
import { sousDirectionService } from '@/services/sousDirectionService';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import type { Division } from '@/types/division';
import type { Direction } from '@/types/direction';
import type { SousDirection } from '@/types/sousDirection';

interface Ministry {
  id: string;
  name: string;
}

interface CreateMailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface MailFormState {
  courielNumber: string;
  type: 'Entrant' | 'Sortant';
  nature: 'Interne' | 'Externe';
  status: 'ARCHIVER' | 'EN_COURS';
  subject: string;
  priority: 'Urgent' | 'Normal';
  description: string;
  // Dates
  arrivedDate: string | null;
  sentDate: string | null;
  returnDate: string | null;
  // Hierarchical IDs
  fromDivisionId: number | null;
  fromDirectionId: number | null;
  fromSousDirectionId: number | null;
  fromExternal: string | null;
  toDivisionId: number | null;
  toDirectionId: number | null;
  toSousDirectionId: number | null;
  toExternal: string | null;
  // Files
  files: File[];
}

export function CreateMailDialog({ open, onOpenChange, onSuccess }: CreateMailDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [mailType, setMailType] = useState('Sortant');
  const [mailNature, setMailNature] = useState('Interne');
  const [formState, setFormState] = useState<MailFormState>({
    courielNumber: '',
    type: 'Sortant' as 'Entrant' | 'Sortant',
    nature: 'Interne' as 'Interne' | 'Externe',
    status: 'EN_COURS' as 'ARCHIVER' | 'EN_COURS',
    subject: '',
    priority: 'Normal'as 'Urgent' | 'Normal',
    description: '',
    arrivedDate: null,
    sentDate: null,
    returnDate: null,
    fromDivisionId: null,
    fromDirectionId: null,
    fromSousDirectionId: null,
    fromExternal: null,
    toDivisionId: null,
    toDirectionId: null,
    toSousDirectionId: null,
    toExternal: null,
    files: []
  });
  
  // States for hierarchical data
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [sousDirections, setSousDirections] = useState<SousDirection[]>([]);
  const [toDivisions, setToDivisions] = useState<Division[]>([]);
  const [toDirections, setToDirections] = useState<Direction[]>([]);
  const [toSousDirections, setToSousDirections] = useState<SousDirection[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  
  // Selected values states
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [selectedSousDirection, setSelectedSousDirection] = useState('');
  const [selectedToDivision, setSelectedToDivision] = useState('');
  const [selectedToDirection, setSelectedToDirection] = useState('');
  const [selectedToSousDirection, setSelectedToSousDirection] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [selectedToMinistry, setSelectedToMinistry] = useState('');

  const getToken = async () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).accessToken : null;
  };

  const getUserDivisionId = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).divisionId : null;
  };

  const fetchDivisions = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/v1/Divisions`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      const formattedDivisions = response.data.map((div: any) => ({
        id: div.id.toString(),
        name: div.divisionName || div.name
      }));
      setDivisions(formattedDivisions);
      setToDivisions(formattedDivisions);
    } catch (error) {
      console.error("Error fetching divisions:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les divisions"
      });
    }
  };

  const fetchDirections = async (divisionId: string, setStateFunction: React.Dispatch<React.SetStateAction<Direction[]>>) => {
    try {
      const token = await getToken();
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
      setStateFunction(formattedDirections);
    } catch (error) {
      console.error("Error fetching directions:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les directions"
      });
    }
  };

  const fetchSousDirections = async (
    directionId: string,
    divisionId: string,
    setStateFunction: React.Dispatch<React.SetStateAction<SousDirection[]>>
  ) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/sousDirections/getByDirectionIdAndDivisionId`,
        {
          params: {
            directionId,
            divisionId
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      const formattedSousDirections = response.data.map((sdir: any) => ({
        id: sdir.id.toString(),
        name: sdir.sousDirectionName || sdir.name || "Sous-direction sans nom"
      }));
      setStateFunction(formattedSousDirections);
    } catch (error) {
      console.error("Error fetching sous-directions:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les sous-directions"
      });
    }
  };

  // Function to fetch ministries from the API
  const fetchMinistries = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/ministries`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      // Log the response to see the actual structure
      console.log('Ministries API response:', response.data);
      
      // Utiliser directement les noms des ministères
      const ministryNames = Array.isArray(response.data) ? response.data : [];
      
      // Convertir en format compatible avec le composant Select
      const formattedMinistries = ministryNames.map((name, index) => {
        // Convert the name to match the enum format if needed
        // For example, if the backend expects uppercase with underscores
        // const enumName = name.toUpperCase().replace(/ /g, '_');
        return {
          id: `ministry-${index}`,
          name: name,
          // Add the enum value if it's different from the display name
          // enumValue: enumName
        };
      });
      
      console.log('Formatted ministries:', formattedMinistries);
      setMinistries(formattedMinistries);
    } catch (error) {
      console.error("Error fetching ministries:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les ministères"
      });
    }
  };

  useEffect(() => {
    fetchDivisions();
    fetchMinistries();
  }, []);

  useEffect(() => {
    if (selectedDivision) fetchDirections(selectedDivision, setDirections);
    if (selectedToDivision) fetchDirections(selectedToDivision, setToDirections);
  }, [selectedDivision, selectedToDivision]);

  useEffect(() => {
    if (selectedDivision && selectedDirection) {
      fetchSousDirections(selectedDirection, selectedDivision, setSousDirections);
    }
    if (selectedToDivision && selectedToDirection) {
      fetchSousDirections(selectedToDirection, selectedToDivision, setToSousDirections);
    }
  }, [selectedDivision, selectedDirection, selectedToDivision, selectedToDirection]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 100 * 1024 * 1024; // 100MB limit
    
    if (totalSize > maxSize) {
      toast({
        title: "Erreur",
        description: "La taille totale des fichiers ne doit pas dépasser 100Mo",
        variant: "destructive"
      });
      return;
    }
    
    setFiles(selectedFiles);
    setFormState(prev => ({ ...prev, files: selectedFiles }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      
      // Generate courrielPath based on type and date
      const currentDate = new Date();
      const courrielPath = `courriers/${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
      formData.append('courrielPath', courrielPath);
  
      // Add basic information
      Object.entries(formState).forEach(([key, value]) => {
        // Explicitly handle fromExternal and toExternal based on mailType and mailNature
        if (key === 'fromExternal') {
          if (mailType === 'Entrant' && mailNature === 'Externe' && value !== null) {
            formData.append(key, value.toString());
          } else {
            formData.append(key, ''); // Ensure it's not sent or sent as empty string if not applicable
          }
        } else if (key === 'toExternal') {
          if (mailType === 'Sortant' && mailNature === 'Externe' && value !== null) {
            formData.append(key, value.toString());
          } else {
            formData.append(key, ''); // Ensure it's not sent or sent as empty string if not applicable
          }
        } else if (value !== null && value !== undefined && key !== 'files') {
          if (key === 'nature') {
            formData.append(key, value === 'Interne' ? 'Intern' : 'Extern');
          } else {
            formData.append(key, value.toString());
          }
        }
      });
  
      // Handle files with metadata
      const courielFiles = files.map((file, index) => ({
        id: `temp_${index}`,
        fileName: file.name,
        fileType: file.type,
        filePath: `${courrielPath}/${file.name}`,
        fileSize: file.size
      }));
  
      formData.append('courielFiles', JSON.stringify(courielFiles));
      files.forEach(file => formData.append('files', file));
  
      await mailService.createMail(formData);
      onSuccess?.();
      onOpenChange(false);
      toast({
        title: "Succès",
        description: "Le courrier a été créé avec succès."
      });
    } catch (error) {
      console.error('Error creating mail:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du courrier.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-fit overflow-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau courrier</DialogTitle>
          <p className="text-sm text-muted-foreground">Remplissez les informations du courrier à archiver.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro de courrier</label>
              <Input
                name="courielNumber"
                placeholder="COR-XXX"
                className="col-span-1"
                required
                onChange={(e) => handleInputChange('courielNumber', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select
                name="type"
                value={mailType}
                onValueChange={(value) => {
                  setMailType(value);
                  handleInputChange('type', value);
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sortant">Départ</SelectItem>
                  <SelectItem value="Entrant">Arrivé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nature</label>
              <Select
                name="nature"
                value={mailNature}
                onValueChange={(value) => {
                  setMailNature(value);
                  handleInputChange('nature', value);
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Interne">Interne</SelectItem>
                  <SelectItem value="Externe">Externe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Objet</label>
            <Input
              name="subject"
              placeholder="Objet du courrier"
              required
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              
              {mailType === 'Entrant' && mailNature === 'Interne' ? (
                <>
                <h4 className="font-medium">Expéditeur</h4>
                  <Select
                    name="fromDivisionId"
                    value={selectedDivision}
                    onValueChange={(value) => {
                      setSelectedDivision(value);
                      handleInputChange('fromDivisionId', value);
                      setSelectedDirection('');
                      setSelectedSousDirection('');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map(division => (
                        <SelectItem key={division.id} value={division.id.toString()}>
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    name="fromDirectionId"
                    value={selectedDirection}
                    onValueChange={(value) => {
                      setSelectedDirection(value);
                      handleInputChange('fromDirectionId', value);
                      setSelectedSousDirection('');
                    }}
                    disabled={!selectedDivision}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Direction" />
                    </SelectTrigger>
                    <SelectContent>
                      {directions.map(direction => (
                        <SelectItem key={direction.id} value={direction.id.toString()}>
                          {direction.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    name="fromSousDirectionId"
                    value={selectedSousDirection}
                    onValueChange={(value) => {
                      setSelectedSousDirection(value);
                      handleInputChange('fromSousDirectionId', value);
                    }}
                    disabled={!selectedDirection}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sous-Direction" />
                    </SelectTrigger>
                    <SelectContent>
                      {sousDirections.map(sousDirection => (
                        <SelectItem key={sousDirection.id} value={sousDirection.id}>
                          {sousDirection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : mailType === 'Entrant' && mailNature === 'Externe' ? (
                <>
                <h4 className="font-medium">Expéditeur</h4>
                  <Select
                    name="fromMinistry"
                    value={selectedMinistry}
                    onValueChange={(value) => {
                      setSelectedMinistry(value);
                      handleInputChange('fromExternal', value); // Utiliser le nom du ministère
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ministère" />
                    </SelectTrigger>
                    <SelectContent>
                      {ministries.length > 0 ? (
                        ministries.map(ministry => (
                          <SelectItem 
                            key={ministry.id || `ministry-item-${Math.random()}`} 
                            value={ministry.name} // Utiliser le nom comme valeur
                          >
                            {ministry.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-ministry" disabled>
                          Aucun ministère disponible
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </>
              ) : null /* Removed the external input for 'Sortant' mails */}
            </div>

            <div className="space-y-4">
              
              {mailType === 'Sortant' && mailNature === 'Interne' ? (
                <>
                <h4 className="font-medium">Destinataire</h4>
                  <Select
                    name="toDivisionId"
                    value={selectedToDivision}
                    onValueChange={(value) => {
                      setSelectedToDivision(value);
                      handleInputChange('toDivisionId', value);
                      setSelectedToDirection('');
                      setSelectedToSousDirection('');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {toDivisions.map(division => (
                        <SelectItem key={division.id} value={division.id.toString()}>
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    name="toDirectionId"
                    value={selectedToDirection}
                    onValueChange={(value) => {
                      setSelectedToDirection(value);
                      handleInputChange('toDirectionId', value);
                      setSelectedToSousDirection('');
                    }}
                    disabled={!selectedToDivision}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Direction" />
                    </SelectTrigger>
                    <SelectContent>
                      {toDirections.map(direction => (
                        <SelectItem key={direction.id} value={direction.id.toString()}>
                          {direction.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    name="toSousDirectionId"
                    value={selectedToSousDirection}
                    onValueChange={(value) => {
                      setSelectedToSousDirection(value);
                      handleInputChange('toSousDirectionId', value);
                    }}
                    disabled={!selectedToDirection}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sous-Direction" />
                    </SelectTrigger>
                    <SelectContent>
                      {toSousDirections.map(sousDirection => (
                        <SelectItem key={sousDirection.id} value={sousDirection.id}>
                          {sousDirection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : mailType === 'Sortant' && mailNature === 'Externe' ? (
                <>
                <h4 className="font-medium">Destinataire</h4>
                  <Select
                    name="toMinistry"
                    value={selectedToMinistry}
                    onValueChange={(value) => {
                      setSelectedToMinistry(value);
                      handleInputChange('toExternal', value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ministère" />
                    </SelectTrigger>
                    <SelectContent>
                      {ministries.length > 0 ? (
                        ministries.map(ministry => (
                          <SelectItem 
                            key={ministry.id || `ministry-item-${Math.random()}`} 
                            value={ministry.name} // Use name as value instead of ID
                          >
                            {ministry.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-ministry" disabled>
                          Aucun ministère disponible
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </>
              ) : null /* Removed the external input for 'Entrant' mails */}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{mailType === 'Entrant' ? 'Date d\'arrivée' : 'Date d\'envoi'}</label>
              <Input
                type="date"
                name={mailType === 'Entrant' ? 'arrivedDate' : 'sentDate'}
                onChange={(e) => handleInputChange(
                  mailType === 'Entrant' ? 'arrivedDate' : 'sentDate',
                  e.target.value
                )}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date de retour</label>
              <Input
                type="date"
                name="returnDate"
                placeholder="Date de retour"
                onChange={(e) => handleInputChange('returnDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priorité</label>
              <Select
                name="priority"
                value={formState.priority}
                onValueChange={(value) => handleInputChange('priority', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Statut</label>
            <Select
                name="status"
                value={formState.status}
                onValueChange={(value) => handleInputChange('status', value)}
                required
            >
                <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="EN_COURS">En cours</SelectItem>
                <SelectItem value="ARCHIVER">Archivé</SelectItem>
                </SelectContent>
            </Select>
            </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Pièce jointe (scan)</label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              multiple
              required
            />
            <p className="text-sm text-muted-foreground">
              Formats acceptés: PDF, DOC, DOCX. Taille maximale: 100MB.
            </p>
          </div>

          <Textarea
            name="description"
            placeholder="Description du courrier"
            className="min-h-[100px]"
            onChange={(e) => handleInputChange('description', e.target.value)}
            
          />

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Création...' : 'Ajouter le courrier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}