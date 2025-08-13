import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mailService } from '@/services/mail-service';
import { BasicInfoStep } from './mail-form/BasicInfoStep';
import { RoutingStep } from './mail-form/RoutingStep';
import { DatesStep } from './mail-form/DatesStep';
import { AttachmentsStep } from './mail-form/AttachmentsStep';
import { StepNavigation } from './mail-form/StepNavigation';
import { useMailForm } from './mail-form/useMailForm';
//import type { Destination } from '@/types/mail';

interface CreateMailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateMailDialog({ open, onOpenChange, onSuccess }: CreateMailDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    formState,
    currentStep,
    completedSteps,
    files,
    validateStep,
    handleNextStep,
    handlePreviousStep,
    handleStepClick,
    handleInputChange,
    handleFileChange,
    resetForm,
    setFiles
  } = useMailForm();

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      resetForm();
      setShowConfirmation(false);
    }
  }, [open, resetForm]);

  const steps = [
    { id: 'basic', label: 'Informations de base' },
    { id: 'routing', label: 'Expéditeur / Destinataire' },
    { id: 'dates', label: 'Dates et Priorité' },
    { id: 'attachments', label: 'Pièces jointes' }
  ];

  const handleCreateClick = () => {
    const finalValidation = validateStep(3);
    if (!finalValidation.isValid) {
      toast({
        variant: "destructive",
        title: "Validation échouée",
        description: finalValidation.errors.join(', ')
      });
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmCreate = async () => {
    setShowConfirmation(false);
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      
      // Add basic form data with proper field mapping
      Object.entries(formState).forEach(([key, value]) => {
        if (key === 'destinations') {
          if (Array.isArray(value) && value.length > 0) {
            value.forEach((destination, index) => {
              formData.append(`destinations[${index}].directionGeneralId`, destination.directionGeneralId || '');
              formData.append(`destinations[${index}].divisionId`, destination.divisionId || '');
              formData.append(`destinations[${index}].directionId`, destination.directionId || '');
              formData.append(`destinations[${index}].sousDirectionId`, destination.sousDirectionId || '');
              formData.append(`destinations[${index}].ministryName`, destination.ministryName || '');
              formData.append(`destinations[${index}].type`, destination.type || '');
            });
          }
        } else if (key === 'files') {
          // Skip files here, handle separately
        } else if (key === 'nature') {
          // Map nature to backend format
          const backendNature = value === 'Interne' ? 'Intern' : value === 'Externe' ? 'Extern' : value;
          formData.append(key, backendNature);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // For 'Entrant' 'Interne' mails, add destination fields based on sender selection
      if (formState.type === 'Entrant' && formState.nature === 'Interne') {
        // Map the sender fields to destination fields for routing
        if (formState.fromDirectionGeneralId) {
          formData.append('toDirectionGeneralId', formState.fromDirectionGeneralId.toString());
        }
        if (formState.fromDivisionId) {
          formData.append('toDivisionId', formState.fromDivisionId.toString());
        }
        if (formState.fromDirectionId) {
          formData.append('toDirectionId', formState.fromDirectionId.toString());
        }
        if (formState.fromSousDirectionId) {
          formData.append('toSousDirectionId', formState.fromSousDirectionId.toString());
        }
      }
      
      // For 'Entrant' 'Externe' mails, add external destination
      if (formState.type === 'Entrant' && formState.nature === 'Externe') {
        if (formState.fromExternal) {
          formData.append('toExternal', formState.fromExternal);
        }
      }
      
      // Add files
      files.forEach((file, index) => {
        formData.append('files', file);
        formData.append(`fileMetadata[${index}]`, JSON.stringify({
          originalName: file.name,
          size: file.size,
          type: file.type
        }));
      });
      
      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      await mailService.createMail(formData);
      
      toast({
        title: "Succès",
        description: "Le courrier a été créé avec succès"
      });
      
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating mail:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de la création du courrier"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <>      
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] flex flex-col"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Créer un nouveau courrier</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer un nouveau courrier
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            <StepNavigation 
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
              progressPercentage={progressPercentage}
            />

            <div className="flex-1 overflow-y-auto">
              <form className="space-y-6">
                {currentStep === 0 && (
                  <BasicInfoStep 
                    formState={formState}
                    onInputChange={handleInputChange}
                    completedSteps={completedSteps}
                  />
                )}
                
                {currentStep === 1 && (
                  <RoutingStep 
                    formState={formState}
                    onInputChange={handleInputChange}
                    completedSteps={completedSteps}
                  />
                )}
                
                {currentStep === 2 && (
                  <DatesStep 
                    formState={formState}
                    onInputChange={handleInputChange}
                    completedSteps={completedSteps}
                  />
                )}
                
                {currentStep === 3 && (
                  <AttachmentsStep 
                    files={files}
                    onFileChange={handleFileChange}
                    onRemoveFile={(index) => {
                      const newFiles = files.filter((_, i) => i !== index);
                      setFiles(newFiles);
                    }}
                    completedSteps={completedSteps}
                  />
                )}
              </form>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex-shrink-0 pt-4 border-t">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="text-sm"
                >
                  Annuler
                </Button>
                
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="flex items-center gap-2 text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Précédent
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-2">
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 text-sm"
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    disabled={isLoading || !completedSteps.slice(0, -1).every(Boolean)}
                    className="flex items-center gap-2 text-sm"
                    onClick={handleCreateClick}
                  >
                    {isLoading ? 'Création...' : 'Créer le courrier'}
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent 
          className="max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              Confirmation de création
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-3">
              Veuillez noter les limitations suivantes après la création du courrier :
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Destinataires :</strong> Vous ne pourrez plus modifier les destinataires après la création
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Informations de routage :</strong> Les informations d'expéditeur et de destinataire seront verrouillées
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Modifications autorisées :</strong> Vous pourrez uniquement modifier la priorité, le statut, l'objet, la description, la date de retour et les pièces jointes
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="text-sm"
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmCreate}
              disabled={isLoading}
              className="text-sm bg-orange-600 hover:bg-orange-700"
            >
              {isLoading ? 'Création...' : 'Confirmer et créer'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}