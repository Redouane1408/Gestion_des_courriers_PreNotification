//import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Check } from 'lucide-react';
import { MailFormState } from '@/components/mail-form/useMailForm';

interface DatesStepProps {
  formState: MailFormState;
  onInputChange: (field: keyof MailFormState, value: any) => void;
  completedSteps: boolean[];
}

export function DatesStep({ formState, onInputChange, completedSteps }: DatesStepProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Badge variant={completedSteps[2] ? "default" : "secondary"} className="text-xs">
            {completedSteps[2] ? <Check className="w-3 h-3" /> : "3"}
          </Badge>
          Dates et priorité
        </CardTitle>
        <CardDescription>
          Renseignez les dates importantes et la priorité
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {formState.type === 'Entrant' ? 'Date d\'arrivée *' : 'Date d\'envoi *'}
            </label>
            <Input
              type="date"
              name={formState.type === 'Entrant' ? 'arrivedDate' : 'sentDate'}
              value={formState.type === 'Entrant' ? formState.arrivedDate || '' : formState.sentDate || ''}
              onChange={(e) => onInputChange(
                formState.type === 'Entrant' ? 'arrivedDate' : 'sentDate',
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
              value={formState.returnDate || ''}
              onChange={(e) => onInputChange('returnDate', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priorité *</label>
            <Select
              name="priority"
              value={formState.priority}
              onValueChange={(value) => onInputChange('priority', value)}
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
      </CardContent>
    </Card>
  );
}