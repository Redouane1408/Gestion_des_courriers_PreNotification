import { useState, useCallback } from 'react';
import type { Destination } from '@/types/mail';
import { useToast } from '@/hooks/use-toast';

export interface MailFormState {
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
  fromDirectionGeneralId: string | null; // Standardize as string
  fromDivisionId: string | null;
  fromDirectionId: string | null;
  fromSousDirectionId: string | null;
  fromExternal: string | null;
  destinations: Destination[];
  files: File[];
}

interface StepValidation {
  isValid: boolean;
  errors: string[];
}

const initialFormState: MailFormState = {
  courielNumber: '',
  type: 'Sortant',
  nature: 'Interne',
  status: 'EN_COURS',
  subject: '',
  priority: 'Normal',
  description: '',
  arrivedDate: null,
  sentDate: null,
  returnDate: null,
  fromDirectionGeneralId: null,
  fromDivisionId: null,
  fromDirectionId: null,
  fromSousDirectionId: null,
  fromExternal: null,
  destinations: [],
  files: []
};

export function useMailForm() {
  const { toast } = useToast();
  const [formState, setFormState] = useState<MailFormState>(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);
  const [files, setFiles] = useState<File[]>([]);

  const resetForm = useCallback(() => {
    setFormState(initialFormState);
    setFiles([]);
    setCurrentStep(0);
    setCompletedSteps([false, false, false, false]);
  }, []);

  const handleInputChange = useCallback((field: keyof MailFormState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      setFormState(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
    }
  }, []);

  const validateStep = useCallback((stepIndex: number): StepValidation => {
    const errors: string[] = [];
    
    switch (stepIndex) {
      case 0: // Basic Information
        if (!formState.courielNumber.trim()) errors.push('Numéro de courrier requis');
        if (!formState.type) errors.push('Type requis');
        if (!formState.nature) errors.push('Nature requise');
        if (!formState.subject.trim()) errors.push('Objet requis');
        if (!formState.status) errors.push('Statut requis');
        break;
        
      case 1: // Routing
        if (formState.type === 'Entrant' && formState.nature === 'Interne') {
          if (!formState.fromDirectionGeneralId) errors.push('Direction Générale expéditeur requise');
        } else if (formState.type === 'Entrant' && formState.nature === 'Externe') {
          if (!formState.fromExternal?.trim()) errors.push('Ministère expéditeur requis');
        }
        
        if (formState.type === 'Sortant') {
          if (!formState.destinations || formState.destinations.length === 0) {
            errors.push('Au moins un destinataire requis');
          }
        }
        break;
        
      case 2: // Dates and Priority
        if (formState.type === 'Entrant' && !formState.arrivedDate) {
          errors.push('Date d\'arrivée requise');
        } else if (formState.type === 'Sortant' && !formState.sentDate) {
          errors.push('Date d\'envoi requise');
        }
        if (!formState.priority) errors.push('Priorité requise');
        break;
        
      case 3: // Attachments
        if (files.length === 0) errors.push('Au moins un fichier requis');
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  }, [formState, files]);

  const handleNextStep = useCallback(() => {
    const validation = validateStep(currentStep);
    
    if (!validation.isValid) {
      toast({
        variant: "destructive",
        title: "Validation échouée",
        description: validation.errors.join(', ')
      });
      return;
    }
    
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[currentStep] = true;
    setCompletedSteps(newCompletedSteps);
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, completedSteps, validateStep, toast]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleStepClick = useCallback((stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps[stepIndex]) {
      setCurrentStep(stepIndex);
    }
  }, [currentStep, completedSteps]);

  return {
    formState,
    currentStep,
    completedSteps,
    files,
    setFiles,
    setCurrentStep,
    resetForm,
    handleInputChange,
    handleFileChange,
    validateStep,
    handleNextStep,
    handlePreviousStep,
    handleStepClick
  };
}