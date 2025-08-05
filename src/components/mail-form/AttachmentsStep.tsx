import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Check } from 'lucide-react';

interface AttachmentsStepProps {
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  completedSteps: boolean[];
}

export function AttachmentsStep({ files, onFileChange, onRemoveFile, completedSteps }: AttachmentsStepProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Badge variant={completedSteps[3] ? "default" : "secondary"} className="text-xs">
            {completedSteps[3] ? <Check className="w-3 h-3" /> : "4"}
          </Badge>
          Pièces jointes
        </CardTitle>
        <CardDescription>
          Ajoutez les documents relatifs au courrier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <input
              type="file"
              onChange={onFileChange}
              accept=".pdf,.doc,.docx"
              multiple
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 w-full px-6 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group"
            >
              <Upload className="h-6 w-6 text-gray-400 group-hover:text-cyan-500 transition-colors" />
              <div className="text-center">
                <span className="text-base font-medium text-gray-600 group-hover:text-cyan-600 transition-colors block">
                  {files.length > 0 ? `${files.length} fichier(s) sélectionné(s)` : 'Cliquez pour sélectionner des fichiers'}
                </span>
                <span className="text-sm text-gray-500 mt-1 block">
                  ou glissez-déposez vos fichiers ici
                </span>
              </div>
            </label>
          </div>
          
          {files.length > 0 && (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              <h4 className="font-medium text-sm">Fichiers sélectionnés:</h4>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-cyan-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">{file.name}</span>
                      <span className="text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFile(index)}
                    className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Formats acceptés: PDF, DOC, DOCX | Taille maximale: 100MB
        </p>
      </CardContent>
    </Card>
  );
}