import { useState, useEffect } from "react"
import {
  Bell,
  Plus,
  Edit,
  
  Search,
  Building,
  Mail,
  Clock,
  Eye,
  Trash2,
  CheckCircle,
  Archive
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/contexts/notification-context"

// Updated interface to match your notification context
interface Notification {
  id: number;
  email: string;
  message: string;
  type: string;
  readStatus: boolean;
  timestamp: string;
  relatedEntityId?: string;
  time: string;
  operation: string;
  courrielNumber: string;
}

interface NotificationFilters {
  operation?: string;
  type?: string;
  search?: string;
}

export default function NotificationsPage() {
  // Use your existing notification context
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [filters, setFilters] = useState<NotificationFilters>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const { toast } = useToast()

  // Filter notifications from context
  useEffect(() => {
    let filtered = notifications

    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.courrielNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filters.operation) {
      filtered = filtered.filter(notification => notification.operation === filters.operation)
    }

    if (filters.type) {
      filtered = filtered.filter(notification => notification.type === filters.type)
    }

    setFilteredNotifications(filtered)
  }, [notifications, searchTerm, filters])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  const handleMarkAsRead = async (ids: number[]) => {
    try {
      // Use your existing markAsRead function for each notification
      for (const id of ids) {
        await markAsRead(id)
      }
      setSelectedNotifications([])
      toast({
        title: "Succès",
        description: `${ids.length} notification(s) marquée(s) comme lue(s).`,
      })
    } catch (error) {
      console.error('Error marking notifications as read:', error)
      toast({
        title: "Erreur",
        description: "Impossible de marquer les notifications comme lues.",
        variant: "destructive"
      })
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
      setSelectedNotifications([])
      toast({
        title: "Succès",
        description: "Toutes les notifications ont été marquées comme lues.",
      })
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      toast({
        title: "Erreur",
        description: "Impossible de marquer toutes les notifications comme lues.",
        variant: "destructive"
      })
    }
  }

  const getOperationIcon = (operation: string) => {
    switch (operation.toLowerCase()) {
      case 'create':
      case 'Archiver':
        return <Plus className="h-4 w-4" />
      case 'edit':
      case 'modifier':
        return <Edit className="h-4 w-4" />
      case 'delete':
      case 'supprimer':
        return <Trash2 className="h-4 w-4" />
      default:
        return <Archive className="h-4 w-4" />
    }
  }

  const getOperationColor = (operation: string) => {
    switch(operation) {
      case 'Archiver':
        return 'bg-sky-500 text-white border-sky-500/30';

      case 'Supprimer':
        return 'bg-red-500/20 text-red-500 border-red-500/30';

      case 'Modifier':
        return 'bg-orange-500/20 text-orange-500 border-orange-500/30';

      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  }

  const uniqueOperations = [...new Set(notifications.map(n => n.operation))]
  const uniqueTypes = [...new Set(notifications.map(n => n.type))]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Gérez vos notifications et restez informé des activités importantes.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-sm">
            {unreadCount} non lues
          </Badge>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans les notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select value={filters.operation || "all"} onValueChange={(value) => 
            setFilters(prev => ({ ...prev, operation: value === "all" ? undefined : value }))
          }>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Opération" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les opérations</SelectItem>
              {uniqueOperations.map(op => (
                <SelectItem key={op} value={op}>{op}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.type || "all"} onValueChange={(value) => 
            setFilters(prev => ({ ...prev, type: value === "all" ? undefined : value }))
          }>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {selectedNotifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkAsRead(selectedNotifications)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Marquer comme lues ({selectedNotifications.length})
            </Button>
          )}
          
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune notification</h3>
              <p className="text-muted-foreground text-center">
                {notifications.length === 0 
                  ? "Vous n'avez aucune notification pour le moment."
                  : "Aucune notification ne correspond à vos critères de recherche."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={selectedNotifications.includes(notification.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedNotifications(prev => [...prev, notification.id])
                      } else {
                        setSelectedNotifications(prev => prev.filter(id => id !== notification.id))
                      }
                    }}
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={getOperationColor(notification.operation)}>
                          {getOperationIcon(notification.operation)}
                          <span className="ml-1">{notification.operation}</span>
                        </Badge>
                        <Badge variant="outline">{notification.type}</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(notification.time)}
                        </span>
                        
                        {/* Replaced DropdownMenu with accessible button group */}
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => setSelectedNotification(notification)}
                            aria-label="Voir les détails de la notification"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => handleMarkAsRead([notification.id])}
                            aria-label="Marquer comme lue"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {notification.email}
                        </span>
                        {notification.courrielNumber && (
                          <span className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            Courrier #{notification.courrielNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Notification Detail Dialog */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la notification</DialogTitle>
            <DialogDescription>
              Consultez les informations détaillées de cette notification.
            </DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className={getOperationColor(selectedNotification.operation)}>
                  {getOperationIcon(selectedNotification.operation)}
                  <span className="ml-1">{selectedNotification.operation}</span>
                </Badge>
                <Badge variant="outline">{selectedNotification.type}</Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Message</h4>
                  <p className="text-sm">{selectedNotification.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Email</h4>
                    <p className="text-sm">{selectedNotification.email}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Date et heure</h4>
                    <p className="text-sm">{formatDate(selectedNotification.time)}</p>
                  </div>
                </div>
                
                {selectedNotification.courrielNumber && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Numéro de courrier</h4>
                    <p className="text-sm">{selectedNotification.courrielNumber}</p>
                  </div>
                )}
                
                {selectedNotification.relatedEntityId && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">ID de l'entité liée</h4>
                    <p className="text-sm">{selectedNotification.relatedEntityId}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedNotification(null)}>
                  Fermer
                </Button>
                <Button onClick={() => {
                  handleMarkAsRead([selectedNotification.id])
                  setSelectedNotification(null)
                }}>
                  Marquer comme lue
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}