import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { FileText, Download, Upload, X } from "lucide-react"; // Add Upload and X icons
import { mailService } from '@/services/mail-service';
import { useToast } from '@/hooks/use-toast';
import type { Mail } from '@/types/mail';
import { Textarea } from "./ui/textarea";

interface EditMailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (updatedMail: Mail) => void;
  mail: Mail | null;
}

export function EditMailDialog({ open, onOpenChange, onSuccess, mail }: EditMailDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [removedFileNames, setRemovedFileNames] = useState<string[]>([]);
  const [priority, setPriority] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>(""); // Add this line
  // Modifier le type pour correspondre à la structure de courielFiles
  const [existingFiles, setExistingFiles] = useState<Array<{

    fileName: string,
    fileType: string,
    filePath: string,
    fileSize: number
  }>>([]);

  useEffect(() => {
    if (open && mail) {
      setFiles([]);
      setRemovedFileNames([]);
      setPriority(mail.priority || "Normal");
      setStatus(mail.status === "Archivé" ? "ARCHIVER" : "EN_COURS");
      setSubject(mail.subject || "");
      setDescription(mail.description || "");
      setReturnDate(mail.returnDate ? new Date(mail.returnDate).toISOString().split('T')[0] : ""); // Add this line
      
      
      // Utiliser directement courielFiles du mail au lieu de faire un appel API
      setExistingFiles(mail.courielFiles || []);
    }
  }, [open, mail]);

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
  };

  const handleRemoveFileToggle = (fileName: string, checked: boolean) => {
    if (checked) {
      setRemovedFileNames(prev => [...prev, fileName]);
    } else {
      setRemovedFileNames(prev => prev.filter(name => name !== fileName));
    }
  };

  const handleDownloadFile = async (courielNumber: string, fileName: string) => {
    if (!mail) {
      console.error("Mail object is null, cannot download file.");
      return;
    }
    try {
      const blob = await mailService.downloadFile(courielNumber, fileName);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast({
        title: "Succès",
        description: `Le fichier ${fileName} a été téléchargé avec succès.`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Échec du téléchargement du fichier ${fileName}.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mail) {
      console.error("Mail object is null, cannot submit.");
      return;
    }
    
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('courielNumber', mail.courielNumber);
      
      // Structure explicite pour s'assurer que les données sont correctement envoyées
      const updatedData = {
        priority,
        status,
        subject,
        description,
        returnDate // Add this line
      };
      
      // Logs pour déboguer
      console.log('Subject being sent:', subject);
      console.log('Description being sent:', description);
      console.log('Updated data:', updatedData);
      
      // Ajouter les données mises à jour dans un champ updatedCouriel
      formData.append('updatedCouriel', JSON.stringify(updatedData));
      
      // Ou continuer à utiliser l'approche directe
      formData.append('priority', priority);
      formData.append('status', status);
      formData.append('subject', subject);
      formData.append('description', description);
      formData.append('returnDate', returnDate); // Add this line

      // Append new files (binary) under 'newFiles'
      files.forEach(file => {
        formData.append('newFiles', file);
      });

      // Append removed file names under 'removedFiles'
      removedFileNames.forEach(fileName => {
        formData.append('removedFiles', fileName);
      });

      const result = await mailService.updateMail(formData);
  
      console.log('Update response:', result); // Pour le débogage
  
      onSuccess?.(result);
      onOpenChange(false);
      toast({
        title: "Succès",
        description: "Courrier mis à jour avec succès"
      });
    } catch (error) {
      console.error('Error updating mail:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la mise à jour du courrier"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mail) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier le Courrier</DialogTitle>
          <DialogDescription>
            Formulaire de modification du courrier
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select 
                name="priority" 
                value={priority}
                onValueChange={setPriority}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                name="status"
                value={status}
                onValueChange={setStatus}
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

            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2"> {/* Add this block */}
              <Label htmlFor="returnDate">Date de retour</Label>
              <Input
                id="returnDate"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Fichiers existants</Label>
              {existingFiles.length > 0 ? (
                <ul className="space-y-1">
                  {existingFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span>{file.fileName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadFile(mail.courielNumber, file.fileName)}
                          type="button"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Checkbox
                          id={`remove-${file.fileName}`}
                          checked={removedFileNames.includes(file.fileName)}
                          onCheckedChange={(checked) => handleRemoveFileToggle(file.fileName, checked as boolean)}
                        />
                        <Label htmlFor={`remove-${file.fileName}`}>Supprimer</Label>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Aucun fichier attaché</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="files">Ajouter de nouveaux fichiers</Label>
              <div className="space-y-3">
                {/* Custom File Upload Button */}
                <div className="relative">
                  <input
                    id="files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="files"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group"
                  >
                    <Upload className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                      {files.length > 0 ? `${files.length} nouveau(x) fichier(s) sélectionné(s)` : 'Cliquez pour ajouter des fichiers'}
                    </span>
                  </label>
                </div>
                
                {/* Display newly selected files */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-green-600">Nouveaux fichiers à ajouter:</Label>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-md border border-green-200">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newFiles = files.filter((_, i) => i !== index);
                            setFiles(newFiles);
                          }}
                          className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}