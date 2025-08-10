//import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
//import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Check } from 'lucide-react';
import { MailFormState } from './useMailForm'; // Import instead of redefining

// Remove the duplicate MailFormState interface definition (lines 9-27)

interface BasicInfoStepProps {
  formState: MailFormState;
  onInputChange: (field: keyof MailFormState, value: any) => void;
  completedSteps: boolean[];
}

// Helper function to detect text direction
const detectTextDirection = (text: string): 'ltr' | 'rtl' => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicRegex.test(text) ? 'rtl' : 'ltr';
};

export function BasicInfoStep({ formState, onInputChange, completedSteps }: BasicInfoStepProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Badge variant={completedSteps[0] ? "default" : "secondary"} className="text-xs">
            {completedSteps[0] ? <Check className="w-3 h-3" /> : "1"}
          </Badge>
          Informations de base
        </CardTitle>
        <CardDescription>
          Renseignez les informations principales du courrier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Numéro de courrier *</label>
            <Input
              name="courielNumber"
              value={formState.courielNumber}
              onChange={(e) => onInputChange('courielNumber', e.target.value)}
              placeholder="Entrez le numéro de courrier"
              style={{ direction: detectTextDirection(formState.courielNumber) }}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type *</label>
            <Select
              name="type"
              value={formState.type}
              onValueChange={(value) => onInputChange('type', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Entrant">Arrivé</SelectItem>
                <SelectItem value="Sortant">Départ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nature *</label>
            <Select
              name="nature"
              value={formState.nature}
              onValueChange={(value) => onInputChange('nature', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la nature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Interne">Interne</SelectItem>
                <SelectItem value="Externe">Externe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Statut *</label>
            <Select
              name="status"
              value={formState.status}
              onValueChange={(value) => onInputChange('status', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN_COURS">En cours</SelectItem>
                <SelectItem value="ARCHIVER">Archivé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Objet *</label>
          <Input
            name="subject"
            value={formState.subject}
            onChange={(e) => onInputChange('subject', e.target.value)}
            placeholder="Entrez l'objet du courrier"
            style={{ direction: detectTextDirection(formState.subject) }}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formState.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Entrez une description détaillée (optionnel)"
            style={{ direction: detectTextDirection(formState.description) }}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}