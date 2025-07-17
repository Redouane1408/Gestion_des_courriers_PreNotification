"use client"

import { useState,useEffect } from "react"
//import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
//import { Textarea } from "@/components/ui/textarea"
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { profileService } from "@/services/ProfileService"
import { Profile } from "@/types/user"

export function ProfilePage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getToken } = useAuth()

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.fetchProfile(getToken)
        setProfile(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger votre profil.",
        })
      }
    }
  
    loadProfile()
  }, [getToken])

  const isAdmin = profile?.role === "ADMIN"

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      })
    }, 1000)
  }

  if (!profile) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Mon profil</h2>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <div className="grid gap-6 md:grid-cols-2">

            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Vos informations personnelles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" defaultValue={profile.nomComplet} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={profile.email} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" defaultValue={profile?.telephone} readOnly />
                </div>
              </CardContent>
              {isAdmin}
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Informations professionnelles</CardTitle>
                <CardDescription>Vos informations professionnelles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="division">Division</Label>
                  <Input id="divion" defaultValue={profile.divisionId} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input id="profession" defaultValue={profile.role} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Code à 4 chiffres</Label>
                  <Input id="4chiffres" defaultValue={profile.quatreChiffres} readOnly />
                </div>
              {profile.directionId && (
              <div className="space-y-2">
                <Label htmlFor="direction">Direction</Label>
                <Input id="direction" defaultValue={profile.directionId} readOnly />
              </div>
              
            
            )}
                {profile.sousDirectionId && (
              <div className="space-y-2">
                <Label htmlFor="sousDirection">Sous-direction</Label>
                <Input id="sousDirection" defaultValue={profile.sousDirectionId} readOnly />
              </div>
              
            
            )}
                
              </CardContent>
              {isAdmin}
            </Card>
          </div>
        </TabsContent>
        
      </Tabs>
    </div>
  )
}
