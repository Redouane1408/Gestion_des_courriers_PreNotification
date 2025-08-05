import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import type { DirectionGeneral } from '@/types/directionGeneral';
import type { Division } from '@/types/division';
import type { Direction } from '@/types/direction';
import type { SousDirection } from '@/types/sousDirection';
import type { Destination } from '@/types/mail';

import { MailFormState } from '@/components/mail-form/useMailForm'; // Import instead of redefining

// Remove the duplicate MailFormState interface definition (lines 15-33)

/* interface MailFormState {
  courielNumber: string;
  type: 'Entrant' | 'Sortant';
  nature: 'Interne' | 'Externe';
  status: 'ARCHIVER' | 'EN_COURS';
  subject: string;
  priority: 'Urgent' | 'Normal';
  description: string;
  arrivedDate: string | null;
  sentDate: string | null;
  returnDate: string | null;
  fromDirectionGeneralId: string | null;
  fromDivisionId: string | null;
  fromDirectionId: string | null;
  fromSousDirectionId: string | null;
  fromExternal: string | null;
  destinations: Destination[];
  files: File[];
} */

interface RoutingStepProps {
  formState: MailFormState;
  onInputChange: (field: keyof MailFormState, value: any) => void;
  completedSteps: boolean[];
}

export function RoutingStep({ formState, onInputChange, completedSteps }: RoutingStepProps) {
  const { toast } = useToast();
  
  // States for hierarchical data
  const [directionGeneral, setDirectionGeneral] = useState<DirectionGeneral[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]); // Add this for sender directions
  const [sousDirections, setSousDirections] = useState<SousDirection[]>([]); // Add this for sender sous-directions
  const [toDirectionGeneral, setToDirectionGeneral] = useState<DirectionGeneral[]>([]);
  const [toDivisions, setToDivisions] = useState<Division[]>([]);
  const [toDirections, setToDirections] = useState<Direction[]>([]);
  const [toSousDirections, setToSousDirections] = useState<SousDirection[]>([]);
  const [ministries, setMinistries] = useState<string[]>([]);
  
  // Selected values states
  const [selectedDirectionGeneral, setSelectedDirectionGeneral] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [showDestinationForm, setShowDestinationForm] = useState(false);
  const [currentDestination, setCurrentDestination] = useState<Partial<Destination>>({});

  // Automatically set destination type when showDestinationForm changes
  useEffect(() => {
    if (showDestinationForm) {
      setCurrentDestination({
        type: formState.nature === 'Interne' ? 'internal' : 'external'
      });
    }
  }, [showDestinationForm, formState.nature]);

    const getToken = async () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).accessToken : null;
  };

  const isInternalDestinationDuplicate = (destination: any) => {
    return formState.destinations.some(existingDest => 
      existingDest.type === 'internal' &&
      existingDest.directionGeneralId?.toString() === destination.directionGeneralId?.toString() &&
      existingDest.divisionId?.toString() === destination.divisionId?.toString() &&
      existingDest.directionId?.toString() === destination.directionId?.toString() &&
      existingDest.sousDirectionId?.toString() === destination.sousDirectionId?.toString()
    );
  };

  // Get available Direction Générale options
  const getAvailableDirectionGenerale = () => {
    return toDirectionGeneral.filter(dg => {
      // Allow Direction Générale if it's not completely filled (has available sub-levels)
      const dgDestinations = formState.destinations.filter(dest => 
        dest.type === 'internal' && dest.directionGeneralId === dg.id.toString()
      );
      
      // If no destinations for this DG yet, allow it
      if (dgDestinations.length === 0) return true;
      
      // Check if there are still available divisions for this DG
      const usedDivisions = dgDestinations.map(dest => dest.divisionId).filter(Boolean);
      const availableDivisions = toDivisions.filter(div => 
        div.directionGeneralId === dg.id.toString() && 
        !usedDivisions.includes(div.id.toString())
      );
      
      return availableDivisions.length > 0;
    });
  };

  // Get available divisions for selected Direction Générale
  const getAvailableDivisions = () => {
    if (!currentDestination.directionGeneralId) return toDivisions;
    
    return toDivisions.filter(division => {
      // Check if this exact division is already used
      const isDivisionUsed = formState.destinations.some(dest => 
        dest.type === 'internal' && 
        dest.directionGeneralId === currentDestination.directionGeneralId &&
        dest.divisionId === division.id.toString() &&
        (!dest.directionId || !dest.sousDirectionId) // Division-level destination
      );
      
      if (isDivisionUsed) return false;
      
      // Check if there are still available directions for this division
      const usedDirections = formState.destinations
        .filter(dest => 
          dest.type === 'internal' && 
          dest.directionGeneralId === currentDestination.directionGeneralId &&
          dest.divisionId === division.id.toString() &&
          dest.directionId
        )
        .map(dest => dest.directionId);
      
      const availableDirections = toDirections.filter(dir => 
        dir.divisionId === division.id.toString() && 
        !usedDirections.includes(dir.id.toString())
      );
      
      return availableDirections.length > 0 || usedDirections.length === 0;
    });
  };

  // Get available directions for selected division
  const getAvailableDirections = () => {
    if (!currentDestination.divisionId) return toDirections;
    
    return toDirections.filter(direction => {
      // Check if this exact direction is already used
      const isDirectionUsed = formState.destinations.some(dest => 
        dest.type === 'internal' && 
        dest.directionGeneralId === currentDestination.directionGeneralId &&
        dest.divisionId === currentDestination.divisionId &&
        dest.directionId === direction.id.toString() &&
        !dest.sousDirectionId // Direction-level destination
      );
      
      if (isDirectionUsed) return false;
      
      // Check if there are still available sous-directions for this direction
      const usedSousDirections = formState.destinations
        .filter(dest => 
          dest.type === 'internal' && 
          dest.directionGeneralId === currentDestination.directionGeneralId &&
          dest.divisionId === currentDestination.divisionId &&
          dest.directionId === direction.id.toString() &&
          dest.sousDirectionId
        )
        .map(dest => dest.sousDirectionId);
      
      const availableSousDirections = toSousDirections.filter(sdir => 
        sdir.directionId === direction.id.toString() && 
        !usedSousDirections.includes(sdir.id.toString())
      );
      
      return availableSousDirections.length > 0 || usedSousDirections.length === 0;
    });
  };

  // Get available sous-directions for selected direction
  const getAvailableSousDirections = () => {
    if (!currentDestination.directionId) return toSousDirections;
    
    return toSousDirections.filter(sousDirection => {
      // Simply check if this exact sous-direction is already used
      return !formState.destinations.some(dest => 
        dest.type === 'internal' && 
        dest.directionGeneralId === currentDestination.directionGeneralId &&
        dest.divisionId === currentDestination.divisionId &&
        dest.directionId === currentDestination.directionId &&
        dest.sousDirectionId === sousDirection.id.toString()
      );
    });
  };

  const getAvailableMinistries = () => {
    const selectedMinistries = formState.destinations
      .filter(dest => dest.type === 'external')
      .map(dest => dest.ministryName)
      .filter(Boolean);
    
    return ministries.filter(ministry => !selectedMinistries.includes(ministry));
  };

    // Fetch functions
  const fetchDirectionGeneral = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/DirectionGenerale`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDirectionGeneral(response.data);
      setToDirectionGeneral(response.data);
    } catch (error) {
      console.error('Error fetching direction general:', error);
    }
  };

  const fetchDivisions = async (directionGeneralId: number, isDestination = false) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/v1/Divisions/getByDirectionGeneralId/${directionGeneralId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (isDestination) {
        setToDivisions(response.data);
      } else {
        setDivisions(response.data);
      }
    } catch (error) {
      console.error('Error fetching divisions:', error);
    }
  };

  const fetchDirections = async (divisionId: number, isDestination = false) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Directions/getByDivisionId?divisionId=${divisionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (isDestination) {
        setToDirections(response.data);
      } else {
        setDirections(response.data); // Set sender directions
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const fetchSousDirections = async (directionId: number, divisionId: number, isDestination = false) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/sousDirections/getByDirectionIdAndDivisionId`,
        {
          params: { directionId, divisionId },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );
      if (isDestination) {
        setToSousDirections(response.data);
      } else {
        setSousDirections(response.data); // Set sender sous-directions
      }
    } catch (error) {
      console.error('Error fetching sous directions:', error);
    }
  };

  const fetchMinistries = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/ministries`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMinistries(response.data);
    } catch (error) {
      console.error('Error fetching ministries:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les ministères"
      });
    }
  };

  // Load initial data
  useEffect(() => {
    fetchDirectionGeneral();
    fetchMinistries();
  }, []);
    // Destination management functions
  const addDestination = () => {
    if (!canAddDestination()) return;
  
    const newDestination: any = currentDestination.type === 'internal' ? {
      type: 'internal',
      directionGeneralId: currentDestination.directionGeneralId ? parseInt(currentDestination.directionGeneralId) : null,
      divisionId: currentDestination.divisionId ? parseInt(currentDestination.divisionId) : null,
      directionId: currentDestination.directionId ? parseInt(currentDestination.directionId) : null,
      sousDirectionId: currentDestination.sousDirectionId ? parseInt(currentDestination.sousDirectionId) : null,
      toExternal: null
    } : {
      type: 'external',
      directionGeneralId: null,
      divisionId: null,
      directionId: null,
      sousDirectionId: null,
      toExternal: currentDestination.ministryName || null,
      ministryName: currentDestination.ministryName || null
    };
  
    const updatedDestinations = [...formState.destinations, newDestination];
    onInputChange('destinations', updatedDestinations);
    
    resetDestinationForm();
    setShowDestinationForm(false);
    
    toast({
      title: "Destinataire ajouté",
      description: "Le destinataire a été ajouté avec succès"
    });
  };

  const removeDestination = (index: number) => {
    const updatedDestinations = formState.destinations.filter((_, i) => i !== index);
    onInputChange('destinations', updatedDestinations);
    
    toast({
      title: "Destinataire supprimé",
      description: "Le destinataire a été supprimé avec succès"
    });
  };

  const canAddDestination = () => {
    if (currentDestination.type === 'internal') {
      const hasRequiredField = currentDestination.directionGeneralId;
      const isDuplicate = isInternalDestinationDuplicate(currentDestination);
      return hasRequiredField && !isDuplicate;
    } else if (currentDestination.type === 'external') {
      return currentDestination.ministryName && getAvailableMinistries().length > 0;
    }
    return false;
  };

  const resetDestinationForm = () => {
    setCurrentDestination({ type: formState.nature === 'Interne' ? 'internal' : 'external' });
    setToDivisions([]);
    setToDirections([]);
    setToSousDirections([]);
  };

  const generateDestinationDisplayName = (destination: Destination) => {
    if (destination.type === 'external') {
      return destination.ministryName || 'Ministère non spécifié';
    }
    
    const parts = [];
    
    if (destination.directionGeneralId) {
      const dg = directionGeneral.find(d => d.id.toString() === destination.directionGeneralId?.toString());
      if (dg) parts.push(dg.directionGeneraleName);
    }
    
    if (destination.divisionId) {
      const div = divisions.find(d => d.id.toString() === destination.divisionId?.toString());
      if (div) parts.push(div.divisionName);
    }
    
    if (destination.directionId) {
      const dir = toDirections.find(d => d.id.toString() === destination.directionId?.toString());
      if (dir) parts.push(dir.directionName);
    }
    
    if (destination.sousDirectionId) {
      const sdir = toSousDirections.find(d => d.id.toString() === destination.sousDirectionId?.toString());
      if (sdir) parts.push(sdir.sousDirectionName);
    }
    
    return parts.length > 0 ? parts.join(' > ') : 'Direction non spécifiée';
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Badge variant={completedSteps[1] ? "default" : "secondary"} className="text-xs">
            {completedSteps[1] ? <Check className="w-3 h-3" /> : "2"}
          </Badge>
          Expéditeur / Destinataire
        </CardTitle>
        <CardDescription>
          Définissez l'expéditeur et les destinataires du courrier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sender Section for Entrant mails */}
        {formState.type === 'Entrant' && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm border-b pb-2">Informations de l'expéditeur</h4>
            
            {formState.nature === 'Interne' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Direction Générale *</label>
                  <Select
                    value={selectedDirectionGeneral}
                    onValueChange={(value) => {
                      setSelectedDirectionGeneral(value);
                      onInputChange('fromDirectionGeneralId', parseInt(value));
                      if (value) fetchDivisions(parseInt(value));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la direction générale" />
                    </SelectTrigger>
                    <SelectContent>
                      {directionGeneral.map(dg => (
                        <SelectItem key={dg.id} value={dg.id.toString()}>
                          {dg.directionGeneraleName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Division</label>
                  <Select
                    value={selectedDivision}
                    onValueChange={(value) => {
                      setSelectedDivision(value);
                      onInputChange('fromDivisionId', parseInt(value));
                      // Reset dependent fields
                      onInputChange('fromDirectionId', null);
                      onInputChange('fromSousDirectionId', null);
                      setDirections([]);
                      setSousDirections([]);
                      // Fetch directions for this division
                      if (value) fetchDirections(parseInt(value), false);
                    }}
                    disabled={!selectedDirectionGeneral}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.length > 0 ? (
                        divisions.map(division => (
                          <SelectItem key={division.id} value={division.id.toString()}>
                            {division.divisionName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                          Aucune division disponible
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>


        
                <div className="space-y-2">
                  <label className="text-sm font-medium">Direction</label>
                  <Select
                    value={formState.fromDirectionId || ''}
                    onValueChange={(value) => {
                      onInputChange('fromDirectionId', value);
                      onInputChange('fromSousDirectionId', null);
                      setSousDirections([]);
                      // Fetch sous-directions for this direction
                      if (value && selectedDivision) {
                        fetchSousDirections(parseInt(value), parseInt(selectedDivision), false);
                      }
                    }}
                    disabled={!selectedDivision}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la direction" />
                    </SelectTrigger>
                    <SelectContent>
                      {directions.length > 0 ? (
                        directions.map(direction => (
                          <SelectItem key={direction.id} value={direction.id.toString()}>
                            {direction.directionName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                          {selectedDivision ? 'Aucune direction disponible' : 'Sélectionnez d\'abord une division'}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sous-Direction</label>
                  <Select
                    value={formState.fromSousDirectionId || ''}
                    onValueChange={(value) => onInputChange('fromSousDirectionId', value)}
                    disabled={!formState.fromDirectionId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la sous-direction" />
                    </SelectTrigger>
                    <SelectContent>
                      {sousDirections.length > 0 ? (
                        sousDirections.map(sousDirection => (
                          <SelectItem key={sousDirection.id} value={sousDirection.id.toString()}>
                            {sousDirection.sousDirectionName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                          {formState.fromDirectionId ? 'Aucune sous-direction disponible' : 'Sélectionnez d\'abord une direction'}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">Ministère expéditeur *</label>
                <Select
                  value={formState.fromExternal || ''}
                  onValueChange={(value) => onInputChange('fromExternal', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le ministère" />
                  </SelectTrigger>
                  <SelectContent>
                    {ministries.map((ministry, index) => (
                      <SelectItem key={index} value={ministry}>
                        {ministry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
                {/* Destinations Section for Sortant mails */}
        {formState.type === 'Sortant' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-medium text-sm">Destinataires</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowDestinationForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter un destinataire
              </Button>
            </div>

            {/* Current destinations list */}
            {formState.destinations.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Destinataires ajoutés:</h5>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {formState.destinations.map((destination, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                      <div className="flex items-center gap-2">
                        <Badge variant={destination.type === 'internal' ? 'default' : 'secondary'} className="text-xs">
                          {destination.type === 'internal' ? 'Interne' : 'Externe'}
                        </Badge>
                        <span className="text-sm font-medium">
                          {generateDestinationDisplayName(destination)}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDestination(index)}
                        className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

                        {/* Destination form */}
            {showDestinationForm && (
              <Card className="border-dashed">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    Ajouter un nouveau destinataire
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowDestinationForm(false);
                        resetDestinationForm();
                      }}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Destination type selection */}
                  {/* <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={currentDestination.type === 'internal' ? 'default' : 'outline'}
                      onClick={() => setCurrentDestination({ ...currentDestination, type: 'internal' })}
                      className="flex-1"
                    >
                      Interne
                    </Button>
                    <Button
                      type="button"
                      variant={currentDestination.type === 'external' ? 'default' : 'outline'}
                      onClick={() => setCurrentDestination({ ...currentDestination, type: 'external' })}
                      className="flex-1"
                    >
                      Externe
                    </Button>
                  </div> */}

                  {/* Internal destination form */}
                  {currentDestination.type === 'internal' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Direction Générale *</label>
                        <Select
                          value={currentDestination.directionGeneralId || ''}
                          onValueChange={(value) => {
                            setCurrentDestination({
                              ...currentDestination,
                              directionGeneralId: value,
                              divisionId: '',
                              directionId: '',
                              sousDirectionId: ''
                            });
                            if (value) fetchDivisions(parseInt(value), true);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la direction générale" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableDirectionGenerale().map(dg => (
                              <SelectItem key={dg.id} value={dg.id.toString()}>
                                {dg.directionGeneraleName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Division</label>
                        <Select
                          value={currentDestination.divisionId || ''}
                          onValueChange={(value) => {
                            setCurrentDestination({
                              ...currentDestination,
                              divisionId: value,
                              directionId: '',
                              sousDirectionId: ''
                            });
                            if (value) fetchDirections(parseInt(value), true);
                          }}
                          disabled={!currentDestination.directionGeneralId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la division" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableDivisions().length > 0 ? (
                              getAvailableDivisions().map(division => (
                                <SelectItem key={division.id} value={division.id.toString()}>
                                  {division.divisionName}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                Toutes les divisions ont été sélectionnées
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Direction</label>
                        <Select
                          value={currentDestination.directionId || ''}
                          onValueChange={(value) => {
                            setCurrentDestination({
                              ...currentDestination,
                              directionId: value,
                              sousDirectionId: ''
                            });
                            if (value && currentDestination.divisionId) {
                              fetchSousDirections(parseInt(value), parseInt(currentDestination.divisionId), true);
                            }
                          }}
                          disabled={!currentDestination.divisionId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la direction" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableDirections().length > 0 ? (
                              getAvailableDirections().map(direction => (
                                <SelectItem key={direction.id} value={direction.id.toString()}>
                                  {direction.directionName}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                Toutes les directions ont été sélectionnées
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sous-Direction</label>
                        <Select
                          value={currentDestination.sousDirectionId || ''}
                          onValueChange={(value) => {
                            setCurrentDestination({
                              ...currentDestination,
                              sousDirectionId: value
                            });
                          }}
                          disabled={!currentDestination.directionId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la sous-direction" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableSousDirections().length > 0 ? (
                              getAvailableSousDirections().map(sousDirection => (
                                <SelectItem key={sousDirection.id} value={sousDirection.id.toString()}>
                                  {sousDirection.sousDirectionName}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                Toutes les sous-directions ont été sélectionnées
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                                    {/* External destination form */}
                  {currentDestination.type === 'external' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ministère</label>
                      <Select
                        value={currentDestination.ministryName || ''}
                        onValueChange={(value) => {
                          setCurrentDestination({
                            ...currentDestination,
                            ministryName: value
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le ministère" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableMinistries().length > 0 ? (
                            getAvailableMinistries().map((ministry, index) => (
                              <SelectItem key={index} value={ministry}>
                                {ministry}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-2 py-1.5 text-sm text-muted-foreground">
                              Tous les ministères ont été sélectionnés
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      {getAvailableMinistries().length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          Tous les ministères disponibles ont déjà été ajoutés comme destinataires.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Warning for duplicate internal destinations */}
                  {currentDestination.type === 'internal' && isInternalDestinationDuplicate(currentDestination) && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Cette combinaison de destination a déjà été ajoutée.
                      </p>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={addDestination}
                    disabled={!canAddDestination()}
                    className="w-full"
                  >
                    Ajouter ce destinataire
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}