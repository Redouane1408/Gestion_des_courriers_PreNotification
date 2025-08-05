import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { FileText, Download, Upload, Edit3, AlertCircle, Calendar, Tag, Paperclip, Plus, Trash2 } from "lucide-react";
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
  const [returnDate, setReturnDate] = useState<string>("");
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
      setReturnDate(mail.returnDate ? new Date(mail.returnDate).toISOString().split('T')[0] : "");
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
    
    console.log('Mail courielNumber:', mail.courielNumber); // Add this line
    console.log('Full mail object:', mail); // Add this line
    
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('courielNumber', mail.courielNumber);
      
      const updatedData = {
        priority,
        status,
        subject,
        description,
        returnDate
      };
      
      console.log('Subject being sent:', subject);
      console.log('Description being sent:', description);
      console.log('Updated data:', updatedData);
      
      formData.append('updatedCouriel', JSON.stringify(updatedData));
      formData.append('priority', priority);
      formData.append('status', status);
      formData.append('subject', subject);
      formData.append('description', description);
      formData.append('returnDate', returnDate);

      files.forEach(file => {
        formData.append('newFiles', file);
      });

      removedFileNames.forEach(fileName => {
        formData.append('removedFiles', fileName);
      });

      const result = await mailService.updateMail(formData);
      console.log('Update response:', result);
  
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            Modifier le courrier
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Modifiez les informations de ce courrier et gérez ses pièces jointes
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Mail Information Header */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Courrier #{mail.courielNumber}</h3>
                  <p className="text-sm text-gray-600">{mail.type} - {mail.nature}</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-orange-600" />
                    Propriétés du courrier
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        Priorité
                      </Label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger className="h-11 border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                          <SelectValue placeholder="Sélectionner la priorité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Urgent"> Urgent</SelectItem>
                          <SelectItem value="Normal"> Normal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-600" />
                        Statut
                      </Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="h-11 border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                          <SelectValue placeholder="Sélectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EN_COURS">En cours</SelectItem>
                          <SelectItem value="ARCHIVER"> Archivé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="returnDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        Date de retour
                      </Label>
                      <Input
                        id="returnDate"
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="h-11 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    Contenu du courrier
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Objet
                      </Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="h-11 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        placeholder="Saisissez l'objet du courrier"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[120px] border-gray-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                        placeholder="Décrivez le contenu du courrier..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* File Management Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Paperclip className="w-5 h-5 text-orange-600" />
                Gestion des pièces jointes
              </h3>
              
              <div className="space-y-6">
                {/* Existing Files */}
                {existingFiles.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Fichiers existants ({existingFiles.length})
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {existingFiles.map((file, index) => (
                        <div key={index} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                          removedFileNames.includes(file.fileName) 
                            ? 'bg-red-50 border-red-200 opacity-60' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}>
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              removedFileNames.includes(file.fileName) 
                                ? 'bg-red-100' 
                                : 'bg-blue-100'
                            }`}>
                              <FileText className={`w-5 h-5 ${
                                removedFileNames.includes(file.fileName) 
                                  ? 'text-red-600' 
                                  : 'text-blue-600'
                              }`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-medium truncate ${
                                removedFileNames.includes(file.fileName) 
                                  ? 'text-red-700 line-through' 
                                  : 'text-gray-900'
                              }`}>
                                {file.fileName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.fileSize / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadFile(mail.courielNumber, file.fileName)}
                              type="button"
                              className="hover:bg-blue-100 hover:text-blue-700"
                              disabled={removedFileNames.includes(file.fileName)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`remove-${file.fileName}`}
                                checked={removedFileNames.includes(file.fileName)}
                                onCheckedChange={(checked) => handleRemoveFileToggle(file.fileName, checked as boolean)}
                                className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                              />
                              <Label 
                                htmlFor={`remove-${file.fileName}`} 
                                className="text-xs text-red-600 cursor-pointer"
                              >
                                Supprimer
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Files */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-green-600" />
                    Ajouter de nouveaux fichiers
                  </Label>
                  
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
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <Upload className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-orange-700 transition-colors">
                          {files.length > 0 ? `${files.length} nouveau(x) fichier(s) sélectionné(s)` : 'Cliquez pour ajouter des fichiers'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Formats supportés: PDF, DOC, DOCX, JPG, PNG (Max: 100MB)
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Display newly selected files */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-green-600">
                        Nouveaux fichiers à ajouter:
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newFiles = files.filter((_, i) => i !== index);
                                setFiles(newFiles);
                              }}
                              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-gray-200 pt-6">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                type="button"
                className="hover:bg-gray-50"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer les modifications"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}