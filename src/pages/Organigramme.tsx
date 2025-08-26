import { PageTransition } from "@/components/page-transition";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Building, Network} from "lucide-react";

export function OrganigrammePage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organigramme</h1>
            <p className="text-muted-foreground">Structure organisationnelle du Ministère des Finances</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Ministère des Finances
            </CardTitle>
            <CardDescription>
            Présentation des principaux niveaux hiérarchiques du Ministère.
              Direction Générale → Division → Direction → Sous Direction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
            <AccordionItem value="direction-generale">
                
                <AccordionTrigger className="text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-blue-700" />
                    IGF : L’Inspection Générale des Finances
                    <Badge variant="default" className="bg-blue-700">IGF</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-4">
                  </div>
                </AccordionContent>
                </AccordionItem>
                </Accordion>


                <Accordion type="multiple" className="w-full">

              <AccordionItem value="direction-generale">
                
                <AccordionTrigger className="text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-blue-700" />
                    LE CABINET
                    <Badge variant="default" className="bg-blue-700">CAB</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-4">
                  </div>
                </AccordionContent>
              </AccordionItem>
              </Accordion>










              <Accordion type="multiple" className="w-full">
              {/* LE SECRÉTAIRE GÉNÉRAL */}
              <AccordionItem value="direction-generale">
                
                <AccordionTrigger className="text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-blue-700" />
                    LE SECRÉTAIRE GÉNÉRAL
                    <Badge variant="default" className="bg-blue-700">SG</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    
                    
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGD : La Direction Générale des Douanes */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGD : La Direction Générale des Douanes
                            <Badge variant="outline" className="border-green-600 text-green-600">DGD</Badge>
                          </div>
                        </AccordionTrigger>
                                                               <AccordionContent>
                                                                   <div className="pl-6 space-y-4">
                                                                {/* Division 1 de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/* Division 1  de La Direction Générale des Douanes */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      Deux (02) Directeurs d’Études /
                                                                      Six (06) Chefs d’Études           
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division 2 de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Division 2 de La Direction Générale des Douanes */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      Inspection Générale des Services des Douanes          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">IGSD</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>



                                                                    {/* Division 3 de cette DG */}
                                                                    <Accordion type="multiple" className="ml-4">
                                                                      {/* Division 3 de La Direction Générale des Douanes */}
                                                                      <AccordionItem value="direction-budget">
                                                                        <AccordionTrigger className="font-medium">
                                                                          <div className="flex items-center gap-2">
                                                                            <Building2 className="h-4 w-4 text-purple-600" />
                                                                          Directions centrales 
                                                                            <Badge variant="outline" className="border-purple-600 text-purple-600">DC</Badge>
                                                                          </div>
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                          <div className="pl-6 space-y-3">

                                                                                                                
                                                                                                                {/* Directions */}
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction de la Législation, de la Réglementation et des Régimes Douaniers
                                                                                                                        <Badge variant="secondary" className="text-xs">DLRRD</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion>
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction de la Fiscalité et des Bases de Taxation
                                                                                                                        <Badge variant="secondary" className="text-xs">DFBT</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion>
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction du Renseignement et de la Gestion des Risques
                                                                                                                        <Badge variant="secondary" className="text-xs">DRGR</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction des Enquêtes Douanières
                                                                                                                        <Badge variant="secondary" className="text-xs">DED</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction du Contentieux et de l’Encadrement des Recettes des Douanes
                                                                                                                        <Badge variant="secondary" className="text-xs">DCERD</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction de la Sécurité et de l’Activité Opérationnelle des Brigades
                                                                                                                        <Badge variant="secondary" className="text-xs">DSAOB</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction des Études et de la Prospective
                                                                                                                        <Badge variant="secondary" className="text-xs">DEP</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction de l’Information et de la Communication
                                                                                                                        <Badge variant="secondary" className="text-xs">DIC</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction des Ressources Humaines
                                                                                                                        <Badge variant="secondary" className="text-xs">DRH</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="sous-direction-preparation">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                        Direction de l’Administration des Moyens
                                                                                                                        <Badge variant="secondary" className="text-xs">DAM</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion>
                                                                                                              </div>
                                                                                                            </AccordionContent>
                                                                                                            <AccordionContent>
                                                                                                              <div className="pl-6 space-y-3">
                                                                          </div>
                                                                        </AccordionContent>
                                                                      </AccordionItem>
                                                                    </Accordion>




                                                                  {/* Division 4 de cette DG */}
                                                                  <Accordion type="multiple" className="ml-4">
                                                                    {/* Division 4  de La Direction Générale des Douanes */}
                                                                    <AccordionItem value="direction-budget">
                                                                      <AccordionTrigger className="font-medium">
                                                                        <div className="flex items-center gap-2">
                                                                          <Building2 className="h-4 w-4 text-purple-600" />
                                                                          Les Centres Nationaux
                                                                          <Badge variant="outline" className="border-purple-600 text-purple-600">CN</Badge>
                                                                        </div>
                                                                      </AccordionTrigger>
                                                                      <AccordionContent>
                                                                        <div className="pl-6 space-y-3">

                                                                                                              
                                                                                                              {/* Directions */}
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="sous-direction-preparation">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                      Centre National des Transmissions et des Systèmes d’Information des Douanes
                                                                                                                      <Badge variant="secondary" className="text-xs">CNTSID</Badge>
                                                                                                                    </div>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="sous-direction-preparation">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                      Centre National de la Formation des Douanes
                                                                                                                      <Badge variant="secondary" className="text-xs">CNFD</Badge>
                                                                                                                    </div>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                            </div>
                                                                                                          </AccordionContent>
                                                                                                          <AccordionContent>
                                                                                                            <div className="pl-6 space-y-3">
                                                                        </div>
                                                                      </AccordionContent>
                                                                    </AccordionItem>
                                                                  </Accordion>

                                                                              {/* Division 5  de cette DG */}
                                                                              <Accordion type="multiple" className="ml-4">
                                                                                {/* Division 5 de La Direction Générale des Douanes */}
                                                                                <AccordionItem value="direction-budget">
                                                                                  <AccordionTrigger className="font-medium">
                                                                                    <div className="flex items-center gap-2">
                                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                                      Les Directions Régionales des Douanes
                                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DRD</Badge>
                                                                                    </div>
                                                                                  </AccordionTrigger>
                                                                                  <AccordionContent>
                                                                                    <div className="pl-6 space-y-3">

                                                                                                                          
                                                                                                                          {/* Directions */}
                                                                                                                          <Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Alger Extérieur »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion>
                                                                                                                          <Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Annaba »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion>
                                                                                                                          <Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Béchar »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Sétif »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Tamanrasset »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Tébessa »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Tlemcen »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Oran »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Ouargla »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Alger Port »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Constantine »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Illizi »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Blida »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Chlef »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion><Accordion type="multiple" className="ml-4">
                                                                                                                            <AccordionItem value="sous-direction-preparation">
                                                                                                                                <div className="flex items-center gap-2">
                                                                                                                                  <Network className="h-10 w-4 text-teal-500 my-4 " />
                                                                                                                                  Direction Régionale des Douanes « Laghouat »
                                                                                                                                  <Badge variant="secondary" className="text-xs">DRD</Badge>
                                                                                                                                </div>
                                                                                                                            </AccordionItem>
                                                                                                                          </Accordion>
                                                                                                                        </div>
                                                                                                                      </AccordionContent>
                                                                                                                      <AccordionContent>
                                                                                                                        <div className="pl-6 space-y-3">
                                                                                                                        </div>
                                                                                                                      </AccordionContent>
                                                                                                                    </AccordionItem>
                                                                                                                  </Accordion>
                                                                                                                </div>
                                                                                                              </AccordionContent>
                                                                                                            </AccordionItem>
                    </Accordion>
                  </div>
                </AccordionContent>






                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    
                    
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGI : La Direction Générale des Impôtss */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGI : La Direction Générale des Impôts
                            <Badge variant="outline" className="border-green-600 text-green-600">DGI</Badge>
                          </div>
                        </AccordionTrigger>
                                                               <AccordionContent>
                                                                   <div className="pl-6 space-y-4">
                                                                {/* Division 1 de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/* Division 1  de La Direction Générale des Douanes */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      Inspection Générale des Services Fiscaux 
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">IGSF</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division 2 de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Division 2 de La Direction Générale des Douanes */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      04 Directions d'Etudes 
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3"> 
                                                                                                  {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction des Systèmes d’Information
                                                                                                                        <Badge variant="secondary" className="text-xs">DSI</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>

                                                                                                                    {/* Sous-Directions */}
                                                                                                                    <AccordionContent>
                                                                                                                      <div className="pl-6 space-y-3">
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Études et des Développements
                                                                                                                          <Badge variant="secondary" className="text-xs">SDED</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction de la Gouvernance et de la Sécurité des Systèmes d’Information
                                                                                                                          <Badge variant="secondary" className="text-xs">SDGSSI</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction de l’Exploitation et du Déploiement des Solutions
                                                                                                                          <Badge variant="secondary" className="text-xs">SDEDS</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Équipements, du Réseau et de la Maintenance
                                                                                                                          <Badge variant="secondary" className="text-xs">SDERM</Badge>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction du Personnel et de la Formation
                                                                                                                      <Badge variant="secondary" className="text-xs">DPF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Personnel
                                                                                                                        <Badge variant="secondary" className="text-xs">SDP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Formation et du Perfectionnement
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Valorisation des Compétences et du Suivi des Carrières
                                                                                                                        <Badge variant="secondary" className="text-xs">SDVCSC</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 3  */}                         
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction des Moyens, des Infrastructures et des Opérations Budgétaires
                                                                                                                        <Badge variant="secondary" className="text-xs">DMIOP</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>

                                                                                                                    {/* Sous-Directions */}
                                                                                                                    <AccordionContent>
                                                                                                                      <div className="pl-6 space-y-3">
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Moyens Généraux
                                                                                                                          <Badge variant="secondary" className="text-xs">SDMG</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Infrastructures et de la Logistique
                                                                                                                          <Badge variant="secondary" className="text-xs">SDIL</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Opérations Budgétaires et de la Comptabilité
                                                                                                                          <Badge variant="secondary" className="text-xs">SDOBC</Badge>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 4 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Communication
                                                                                                                      <Badge variant="secondary" className="text-xs">DC</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Communication 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDC</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Publications et des Supports Fiscaux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPSF</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>


                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>



                                                                    {/* Division 3 (1) de cette DG */}
                                                                    <Accordion type="multiple" className="ml-4">
                                                                      {/* Division 3 de La Direction Générale des Douanes */}
                                                                      <AccordionItem value="direction-budget">
                                                                        <AccordionTrigger className="font-medium">
                                                                          <div className="flex items-center gap-2">
                                                                            <Building2 className="h-4 w-4 text-purple-600" />
                                                                            Division de la Législation, de la Réglementation Fiscale et des Affaires Juridiques 
                                                                            <Badge variant="outline" className="border-purple-600 text-purple-600">DLRFAJ</Badge>
                                                                          </div>
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                          <div className="pl-6 space-y-3">

                                                                                                                
                                                                                                                {/* Directions */}     
                                                                                                                {/* Direction n° 1 de la division 1 */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction de la Législation et de la Réglementation Fiscales
                                                                                                                        <Badge variant="secondary" className="text-xs">DLRF</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>

                                                                                                                    {/* Sous-Directions */}
                                                                                                                    <AccordionContent>
                                                                                                                      <div className="pl-6 space-y-3">
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous-Direction de la Préparation des Lois de Finances
                                                                                                                          <Badge variant="secondary" className="text-xs">SDPLF</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous-Direction de la Fiscalité Directe
                                                                                                                          <Badge variant="secondary" className="text-xs">SDFD</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous-Direction de la Fiscalité Indirecte
                                                                                                                          <Badge variant="secondary" className="text-xs">SDFI</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous-Direction des Régimes Fiscaux Particuliers
                                                                                                                          <Badge variant="secondary" className="text-xs">SDRFP</Badge>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 de la division 1 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Relations Fiscales Internationales
                                                                                                                      <Badge variant="secondary" className="text-xs">DRFI</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Études Fiscales Internationales
                                                                                                                        <Badge variant="secondary" className="text-xs">SDEFI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Conventions Fiscales Internationales
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCFI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de Règlement des Différends Fiscaux Internationaux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRDFI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Coopération Fiscale Internationale
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCFI</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 3 de la division 1 */}
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction du Contentieux Fiscal
                                                                                                                      <Badge variant="secondary" className="text-xs">DCF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Contentieux des Contrôles Fiscaux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCCF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Contentieux de l'Assiette, du Recouvrement et du Remboursement des Crédits de TVA
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCARRC-TVA-</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Commissions de Recours
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCR</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Recouvrement Gracieux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRG</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Contentieux Juridictionnel
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCJ</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                              </div>
                                                                                                            </AccordionContent>
                                                                                                           
                                                                      </AccordionItem>
                                                                    </Accordion>




                                                                  {/* Division 4 de cette DG */}
                                                                  <Accordion type="multiple" className="ml-4">
                                                                    {/* Division 4  de La Direction Générale des Douanes */}
                                                                    <AccordionItem value="direction-budget">
                                                                      <AccordionTrigger className="font-medium">
                                                                        <div className="flex items-center gap-2">
                                                                          <Building2 className="h-4 w-4 text-purple-600" />
                                                                          Division de la Gestion, du Recouvrement et de la Modernisation des Processus Métiers 
                                                                          <Badge variant="outline" className="border-purple-600 text-purple-600">DGRMPM</Badge>
                                                                        </div>
                                                                      </AccordionTrigger>
                                                                      <AccordionContent>
                                                                        <div className="pl-6 space-y-3">

                                                                                                              
                                                                                                               {/* Direction n° 1 de la division 2 */}
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Gestion Fiscale
                                                                                                                      <Badge variant="secondary" className="text-xs">DGF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Fiscalité des Personnes Physiques
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFPP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Fiscalité des Sociétés
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFS</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Fiscalité des Hydrocarbures et des Activités Extractives
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFHAE</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Garantie et des Régimes Fiscaux Particuliers
                                                                                                                        <Badge variant="secondary" className="text-xs">SDGRFP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Suivi des Avantages Fiscaux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSAF</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                            {/* Direction n° 2 de la division 2 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction du Recouvrement et des Ressources Fiscales Locales
                                                                                                                      <Badge variant="secondary" className="text-xs">DRRFL</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Procédures de Recouvrement
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPR</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Poursuites et de l’Apurement des Comptes
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPAC</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Ressources Fiscales Locales
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRFL</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                              {/* Direction n° 3 de la division 2 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Modernisation des Processus Informatisés et du Pilotage
                                                                                                                      <Badge variant="secondary" className="text-xs">DMPIP</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Pilotage de la Stratégie de Modernisation
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPSM</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Relations avec les Métiers
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRM</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Normalisation et des Méthodes
                                                                                                                        <Badge variant="secondary" className="text-xs">SDNM</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Prévisions et des Évaluations de la Performance
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPEP</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                              </div>
                                                                                                            </AccordionContent>
                                                                                                            </AccordionItem>
                                                                                                          </Accordion>

                                                                              {/* Division 5 (3) de cette DG */}
                                                                              <Accordion type="multiple" className="ml-4">
                                                                                {/* Division 5 de La Direction Générale des Douanes */}
                                                                                <AccordionItem value="direction-budget">
                                                                                  <AccordionTrigger className="font-medium">
                                                                                    <div className="flex items-center gap-2">
                                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                                      Division du Contrôle et des Enquêtes Fiscales
                                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DCEF</Badge>
                                                                                    </div>
                                                                                  </AccordionTrigger>
                                                                                  <AccordionContent>
                                                                                    <div className="pl-6 space-y-3">

                                                                                                                          
                                                                                                                          {/* Direction n 1 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction du Contrôle Fiscal
                                                                                                                      <Badge variant="secondary" className="text-xs">DCF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Normes et Procédures
                                                                                                                        <Badge variant="secondary" className="text-xs">SDNP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Programmation
                                                                                                                        <Badge variant="secondary" className="text-xs">SDP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Suivi du Contrôle Fiscal des Entreprises
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSCFE</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Suivi du Contrôle Fiscal du Patrimoine
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSCFP</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                              {/* Direction n° 2 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Gestion de l’Information des Enquêtes Fiscales
                                                                                                                      <Badge variant="secondary" className="text-xs">DGIEF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Traitement et de l’Analyse de l’Information Fiscale
                                                                                                                        <Badge variant="secondary" className="text-xs">SDTAIF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Interventions et des Enquêtes Fiscales
                                                                                                                        <Badge variant="secondary" className="text-xs">SDIEF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Fichiers et des Bases de Données
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFBD</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Lutte contre la Fraude et l’Évasion Fiscales
                                                                                                                        <Badge variant="secondary" className="text-xs">SDLCFEF</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                              </div>
                                                                                                            </AccordionContent>
                                                                                                            </AccordionItem>
                                                                                                          </Accordion>    
                                                                                       </div>
                                                                                     </AccordionContent>
                                                                                    </AccordionItem>                         
                    </Accordion>
                  </div>
                </AccordionContent>









                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    
                    
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGB : La Direction Générale du Budget */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGB : La Direction Générale du Budget
                            <Badge variant="outline" className="border-green-600 text-green-600">DGB</Badge>
                          </div>
                        </AccordionTrigger>
                                                               <AccordionContent>
                                                                   <div className="pl-6 space-y-4">
                                                                {/* les 2 directions rattachés directement DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/* les 2 directions rattachés directement DG */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" /> 
                                                                      02 Directions d'Etudes 
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">        {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction du Suivi et de la Réforme des Clients et de l'État des Subventions
                                                                                                                        <Badge variant="secondary" className="text-xs">DSRCES</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>

                                                                                                                    {/* Sous-Directions */}
                                                                                                                    <AccordionContent>
                                                                                                                      <div className="pl-6 space-y-3">
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction de Conception de la Stratégie et des Subventions de l'État
                                                                                                                          <Badge variant="secondary" className="text-xs">SDCSSE</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction de Gestion des Ressources et de Coordination au Programme de Compensation Monétaire
                                                                                                                          <Badge variant="secondary" className="text-xs">SDGRCPCM</Badge>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction d'Administration des Moyens et des Finances
                                                                                                                      <Badge variant="secondary" className="text-xs">DAMF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de Gestion du Personnel
                                                                                                                        <Badge variant="secondary" className="text-xs">SDGP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Formation et du Perfectionnement
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Budget et des Moyens
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBM</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division 1 de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Division 1 de La Direction Générale des Budgets */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      Division des Budgets Programmes pour le Développement Humain
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DBPDH</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3"> 
                                                                                                  {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                         Direction des Budgets Programmes de l'Éducation et de la Jeunesse et des Sports
                                                                                                                        <Badge variant="secondary" className="text-xs">DBPEJS</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>

                                                                                                                    {/* Sous-Directions */}
                                                                                                                    <AccordionContent>
                                                                                                                      <div className="pl-6 space-y-3">
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Budgets Programmes de l'Éducation
                                                                                                                          <Badge variant="secondary" className="text-xs">SDBPE</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Budgets Programmes de la Jeunesse et des Sports
                                                                                                                          <Badge variant="secondary" className="text-xs">SDBPJS</Badge>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Budgets Programmes de l'Enseignement Supérieur et Professionnel  
                                                                                                                      <Badge variant="secondary" className="text-xs">DBPESP</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de l'Enseignement Supérieur et de la Recherche Scientifique 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPESRS</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de l'Enseignement et de la Formation Professionnels
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPEFP</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 3  */}                         
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500" />
                                                                                                                        Direction des Budgets Programmes de la Santé et de la Protection Sociale
                                                                                                                        <Badge variant="secondary" className="text-xs">DBPSPS</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>

                                                                                                                    {/* Sous-Directions */}
                                                                                                                    <AccordionContent>
                                                                                                                      <div className="pl-6 space-y-3">
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Budgets Programmes de la Santé 
                                                                                                                          <Badge variant="secondary" className="text-xs">SDBPS</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous Direction des Budgets Programmes du Travail, de l'Emploi et de la Sécurité Sociale
                                                                                                                          <Badge variant="secondary" className="text-xs">SDBPTESS</Badge>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 4 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Budgets Programmes Socio-Culturels
                                                                                                                      <Badge variant="secondary" className="text-xs">DBPSC</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes des Moudjahidine et de la Solidarité
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPMS</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de la Culture et des Affaires Religieuses
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPCAR</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>


                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>



                                                                    {/* Division 2  de cette DG */}
                                                                    <Accordion type="multiple" className="ml-4">
                                                                      {/* Division 2 de La Direction Générale des Budgets */}
                                                                      <AccordionItem value="direction-budget">
                                                                        <AccordionTrigger className="font-medium">
                                                                          <div className="flex items-center gap-2">
                                                                            <Building2 className="h-4 w-4 text-purple-600" />
                                                                            Division des Budgets Programme pour le Développement Socio-Économique
                                                                            <Badge variant="outline" className="border-purple-600 text-purple-600">DBPDSE</Badge>
                                                                          </div>
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                          <div className="pl-6 space-y-3">

                                                                                                                
                                                                                                                {/* Directions */}     
                                                                                                                {/* Direction n° 1 de la division 2 */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction des Budgets Programmes de l'Habitat et de l'Environnement
                                                                                                                        <Badge variant="secondary" className="text-xs">DBPHE</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>

                                                                                                                    {/* Sous-Directions */}
                                                                                                                    <AccordionContent>
                                                                                                                      <div className="pl-6 space-y-3">
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de l'Habitat
                                                                                                                          <Badge variant="secondary" className="text-xs">SDBPH</Badge>
                                                                                                                        </div>
                                                                                                                        <div className="flex items-center gap-2">
                                                                                                                          <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                          Sous-Direction des Budgets Programmes de l'Environnement
                                                                                                                          <Badge variant="secondary" className="text-xs">SDBPE</Badge>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 de la division 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Budgets Programme pour le Développement Économique
                                                                                                                      <Badge variant="secondary" className="text-xs">DBPDE</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de l'Énergie de la Transition Énergétique des Énergies Renouvelables et des Activités Extractives
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBRETEERAE</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de l'Industrie et du Tourisme
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPIT</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 3 de la division 2 */}
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Budgets Programmes des Ressources en Eau et de l'Agriculture et de la Pêche
                                                                                                                      <Badge variant="secondary" className="text-xs">DBPREAP</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes des Ressources en Eau
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPRE</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de l'Agriculture et de la Pêche
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPAP</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>  
                                                                                                              {/* Direction n° 4 de la division 2 */}
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Budgets Programmes des Transports et Travaux Publics
                                                                                                                      <Badge variant="secondary" className="text-xs">DBPTTP</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes des Transports
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPT</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes des Travaux Publics
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBRTP</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                              </div>
                                                                          </AccordionContent>                     
                                                                      </AccordionItem>
                                                                    </Accordion>




                                                                  {/* Division 3 de cette DG */}
                                                                  <Accordion type="multiple" className="ml-4">
                                                                    {/* Division 3  de La Direction Générale des Budgets */}
                                                                    <AccordionItem value="direction-budget">
                                                                      <AccordionTrigger className="font-medium">
                                                                        <div className="flex items-center gap-2">
                                                                          <Building2 className="h-4 w-4 text-purple-600" />
                                                                          Division des Budgets Programmes des Institutions Nationales et des Secteurs de Souveraineté et de Régulation
                                                                          
                                                                          <Badge variant="outline" className="border-purple-600 text-purple-600">DBPINSSR</Badge>
                                                                        </div>
                                                                      </AccordionTrigger>
                                                                      <AccordionContent>
                                                                        <div className="pl-6 space-y-3">

                                                                                                              
                                                                                                               {/* Direction n° 1 de la division 3 */}
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Budgets Programme des Secteurs de Souverainetée
                                                                                                                      <Badge variant="secondary" className="text-xs">DBPSS</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de la Défense et de L'Intérieur
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPDI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes des Justices et des Finances
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPJF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes des Autres Secteurs de Souveraineté
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPASS</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                            {/* Direction n° 2 de la division 2 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Budgets Programmes des Institutions Nationales et des Administrations de Régulation
                                                                                                                      <Badge variant="secondary" className="text-xs">DBPINAR</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes de la Communication de la Poste et des Télécommunications
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPCPT</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes des Institutions Nationale
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPIN</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Budgets Programmes des Autres Administrations de Régulation
                                                                                                                        <Badge variant="secondary" className="text-xs">SDBPAAR</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                              </div>
                                                                                                            </AccordionContent>
                                                                                                            </AccordionItem>
                                                                                                          </Accordion>

                                                                              {/* Division 4  de cette DG */}
                                                                              <Accordion type="multiple" className="ml-4">
                                                                                {/* Division 4 de La Direction Générale des budgets*/}
                                                                                <AccordionItem value="direction-budget">
                                                                                  <AccordionTrigger className="font-medium">
                                                                                    <div className="flex items-center gap-2">
                                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                                      Division de la Modernisation et de la Synthèse Budgétaire
                                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DMSB</Badge>
                                                                                    </div>
                                                                                  </AccordionTrigger>
                                                                                  <AccordionContent>
                                                                                    <div className="pl-6 space-y-3">

                                                                                                                          
                                                                                                                          {/* Direction n 1 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Synthèse Budgétaire
                                                                                                                      <Badge variant="secondary" className="text-xs">DSB</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Mise en Place des Crédits Budgétaires et du Suivi de l'Exécution
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMPCBSE</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Consolidation des Volumes et des Documents Budgétaires
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCVDB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Procédures de Codification Budgétaire
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPCB</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                              {/* Direction n° 2 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Statistiques des Indicateurs et de l'Évaluation Budgétaire
                                                                                                                      <Badge variant="secondary" className="text-xs">DSIEB</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Volumes des Documents Budgétaires
                                                                                                                        <Badge variant="secondary" className="text-xs">SDVDB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Consolidation Budgétaire
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Procédures de Codification Budgétaire
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPCB</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 3 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Modernisation des Systèmes Budgétaires
                                                                                                                      <Badge variant="secondary" className="text-xs">DMSB</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Coordination et de l'Accompagnement des Reformes Budgétaires
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCARB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Mise en Oeuvre des Nouvelles Procédures 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFMONP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Conception liée à la Reforme Budgétaire
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCRB</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 4 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Systèmes d'Information 
                                                                                                                      <Badge variant="secondary" className="text-xs">DSI</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Systèmes Budgétaires Intégrés 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSBI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des réseaux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDR</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Maintenances 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDM</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                              </div>
                                                                                                            </AccordionContent>
                                                                                                            </AccordionItem>
                                                                                                          </Accordion>    


                                                                              {/* Division 5  de cette DG */}
                                                                              <Accordion type="multiple" className="ml-4">
                                                                                {/* Division 5 de La Direction Générale des budgets*/}
                                                                                <AccordionItem value="direction-budget">
                                                                                  <AccordionTrigger className="font-medium">
                                                                                    <div className="flex items-center gap-2">
                                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                                      Division de la Réglementation Budgétaire du Contrôle et des Marchés Publics
                                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DRBCMP</Badge>
                                                                                    </div>
                                                                                  </AccordionTrigger>
                                                                                  <AccordionContent>
                                                                                    <div className="pl-6 space-y-3">

                                                                                                                          
                                                                                                                          {/* Direction n 1 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Réglementation Budgétaire et des Études juridiques
                                                                                                                      <Badge variant="secondary" className="text-xs">DRBEJ</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Réglementation du Budget de l'État et des Établissements publics du Périmètre Budgétaire
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRBEEPPB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Réglementation du Budget des Collectivités Locales et des Établissements Publics Sous Tutelles 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRBCLEPST</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Études juridiques
                                                                                                                        <Badge variant="secondary" className="text-xs">SDEJ</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                              {/* Direction n° 2 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Marchés Publics et des Autres Contrats Publics 
                                                                                                                      <Badge variant="secondary" className="text-xs">DMPACP</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Réglementation des Marchés Publics
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRMP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Réglementation des Autres Contrats Publics
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRACP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Normalisation des Cahiers des Charges et de la Dématérialisation du Système de Passation des Commandes Publics 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDNCCDSPCP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Suivi et de l'Évaluation des Commandes Publics
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSECP</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                                          {/* Direction n 3 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Systèmes de Rémunération et des Statuts 
                                                                                                                      <Badge variant="secondary" className="text-xs">DSRS</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des des Systèmes de Rémuniration et des Allocations 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSRA</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Statuts et des Classifications 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSC</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Affectifs Budgétaires 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDAB</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                                          {/* Direction n 4 de la division 3 */}
                                                                                                            <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction du Contrôle Budgétaire
                                                                                                                      <Badge variant="secondary" className="text-xs">DCB</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>

                                                                                                                  {/* Sous-Directions */}
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de l'Encadrement des Services de Contrôle Budgétaire
                                                                                                                        <Badge variant="secondary" className="text-xs">SDESCB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Contentieux et de l'évaluation des Activités du Contrôle Budgétaires 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCEACB</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                              

                                                                                                              </div>
                                              </AccordionContent>
                                       </AccordionItem>
                                 </Accordion>  
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>





                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DIMES : La Direction des Infrastructures, de la Maintenance et de l’Environnement du Site */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DIMES : La Direction des Infrastructures, de la Maintenance et de l’Environnement du Site
                            <Badge variant="outline" className="border-green-600 text-green-600">DIMES</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-4">
                          {/* les Divisions */}                         
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>











                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DC : La Direction de la Communication */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DC : La Direction de la Communication
                            <Badge variant="outline" className="border-green-600 text-green-600">DC</Badge>
                          </div>
                        </AccordionTrigger>
                          <AccordionContent>
                                                                   <div className="pl-6 space-y-4">
                                                                {/* Division  de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/* Division de La Direction de la Communication */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction de l'Information et de la Normalisation des Méthodes de Communication           
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDINMC</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Division La Direction de la Communication */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction de la Publication et des Archives          
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDPA</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>

                       
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>








                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DRH : La Direction des Ressources Humaines */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DRH : La Direction des Ressources Humaines
                            <Badge variant="outline" className="border-green-600 text-green-600">DRH</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                                                                   <div className="pl-6 space-y-4">
                                                                {/* Division  de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/* Division 1  de La Direction des Ressources Humaines */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction de la Gestion des Personnels des l'Administration Centrale           
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDGPAC</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Division de La Direction des Ressources Humaines */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction de la Gestion des Cadres et des Compétences           
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDGCC</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                               {/* Division de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/* Division de La Direction des Ressources Humaines */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction de la Formation            
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDF</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Division de La Direction des Ressources Humaines */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction de la Valorisation des Ressources Humaines           
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDVRH</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>

                       
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>






                




                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGAJT : La Direction Générale de l’Agence Judiciaire du Trésor */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGAJT : La Direction Générale de l’Agence Judiciaire du Trésor
                            <Badge variant="outline" className="border-green-600 text-green-600">DGAJT</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                        <div className="pl-6 space-y-4">
                                                                {/* Division  de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/*  La Direction Générale de l’Agence Judiciaire du Trésor */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction de la Sauvegarde des Deniers de l’État         
                                                                      <Badge variant="outline" className="border-teal-500 text-teal-500">DSDE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Affaires Pénales Économiques et Financières
                                                                                                                        <Badge variant="secondary" className="text-xs">SDAPEF</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Autres Affaires Pénales
                                                                                                                      <Badge variant="secondary" className="text-xs">SDAAP</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction du Suivi du Recouvrement des Réparations Civiles Allouées à l’État
                                                                                                                      <Badge variant="secondary" className="text-xs">SDSRRCAE</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 2 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Transactions et des Recours
                                                                                                                      <Badge variant="secondary" className="text-xs">SDTR</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/*  La Direction Générale de l’Agence Judiciaire du Trésor */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                     Direction de la Protection des Agents de l’État et de l’Indemnisation          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DPAEI</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3"> 
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                        Sous Direction de la Protection des Agents de l’État Contre les Atteintes Physiques
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPAECAP</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de la Protection des Agents de l’État Contre les Atteintes Morales
                                                                                                                      <Badge variant="secondary" className="text-xs">SDPAECAM</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de l’Indemnisation des Victimes d’Accidents de la Circulation
                                                                                                                      <Badge variant="secondary" className="text-xs">SDIVAC</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 2 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de l’Indemnisation de la Détention Provisoire Injustifiée et de l’Erreur Judiciaire
                                                                                                                      <Badge variant="secondary" className="text-xs">SDIDPIEJ</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                               {/* Division de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/* La Direction Générale de l’Agence Judiciaire du Trésor*/}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                     Direction des Affaires Juridiques et de l’Arbitrage International d’Investissement          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DAJAII</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                        Sous Direction des Études Juridiques
                                                                                                                        <Badge variant="secondary" className="text-xs">SDEJ</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Consultations Juridiques
                                                                                                                      <Badge variant="secondary" className="text-xs">SDCJ</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction du Règlement Amiable des Différends Relatifs à l’Investissement
                                                                                                                      <Badge variant="secondary" className="text-xs">SDRADRI</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 4 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de l’Arbitrage International d’Investissement
                                                                                                                      <Badge variant="secondary" className="text-xs">SDAII</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>










                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DFM : La Direction des Finances et des Moyens */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DFM : La Direction des Finances et des Moyens
                            <Badge variant="outline" className="border-green-600 text-green-600">DFM</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-4">   
                           {/* Division  de cette DG */}
                           <Accordion type="multiple" className="ml-4">
                                                                {/* 1 DFM : La Direction des Finances et des Moyens */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction du Budget, de la Comptabilité et des Marchés          
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDBCM</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* 2  */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction de la Maintenance des Équipements Techniques           
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDMET</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                               {/* Division de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/* 3  */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction des Moyens de Fonctionnement et de la Documentation          
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDMFD</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* 4  */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Users className="h-4 w-4 text-orange-600" />
                                                                      Sous Direction des Infrastructures et de l’Environnement du Site           
                                                                      <Badge variant="outline" className="border-orange-600 text-orange-600">SDIES</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>

                          {/* les Divisions */}                         
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>












                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGDn : La Direction Générale du Domaine National */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGDN : La Direction Générale du Domaine National
                            <Badge variant="outline" className="border-green-600 text-green-600">DGDN</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-4">
                         
                                                                {/* Division  de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/*  Division 01 Division du domaine de l'État */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      Division du Domaine de l'État         
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DDE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction de la Gestion Domaniale
                                                                                                                        <Badge variant="secondary" className="text-xs">DGD</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                    {/* Les sous Direction n° 1  */} 
                                                                                                                    <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Opérations Domaniales
                                                                                                                        <Badge variant="secondary" className="text-xs">SDOD</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de l'Inventaire Général des Propriétés du Domaine National
                                                                                                                        <Badge variant="secondary" className="text-xs">SDIGPDN</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Gestion Mobilière
                                                                                                                        <Badge variant="secondary" className="text-xs">SDGM</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Valorisation du Domaine de l'État
                                                                                                                      <Badge variant="secondary" className="text-xs">DVDE</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  {/* Les sous Direction n° 1  */} 
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Opérations Immobilières
                                                                                                                        <Badge variant="secondary" className="text-xs">SDOI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Patrimoines Publics Agricoles
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPPA</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du foncier
                                                                                                                        <Badge variant="secondary" className="text-xs">SDF</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/*  Division du Cadastre et de la Conservation Foncière */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      Division du Cadastre et de la Conservation Foncière         
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DCCF</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3"> 
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction des Opérations Cadastrales
                                                                                                                        <Badge variant="secondary" className="text-xs">DOC</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                    {/* Les sous Direction n° 1  */} 
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous direction des Activités Cadastrales et des Relations avec les Partenaires
                                                                                                                        <Badge variant="secondary" className="text-xs">SDACRP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Planification du Suivi des Travaux Cadastraux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPSTC</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Valorisation de la Donnée Cadastrale et de la Normalisation
                                                                                                                        <Badge variant="secondary" className="text-xs">SDVDCN</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Mise à Jour Cadastrale
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMJC</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Conservation Foncière
                                                                                                                      <Badge variant="secondary" className="text-xs">DCF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                   {/* Les sous Direction n° 1  */} 
                                                                                                                   <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Publicité Foncière
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Immatriculations Foncières
                                                                                                                        <Badge variant="secondary" className="text-xs">SDIF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Suivi des Prestations des Conservations Foncières  
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSPCF</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion> 
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                               {/* Division de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/* Les 4 direction rattachées directement a la DG */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                     04 Directions d’Études          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                       Direction de la  Réglementation et du Contentieux 
                                                                                                                        <Badge variant="secondary" className="text-xs">DRC</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                    <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Réglementation
                                                                                                                        <Badge variant="secondary" className="text-xs">SDR</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Contentieux Domanial 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCD</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Contentieux Cadastral et Foncier
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCCF</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                    Direction du Recouvrement, des Statistiques et des Méthodes 
                                                                                                                      <Badge variant="secondary" className="text-xs">DRSM</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Recouvrement
                                                                                                                        <Badge variant="secondary" className="text-xs">SDR</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Statistiques Synthèses
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSS</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Méthodes, des Archives et de la Documentation  
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMAD</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                   Direction du Système d'Information et de la Communication 
                                                                                                                      <Badge variant="secondary" className="text-xs">DSIC</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Développement des Applications Informatiques 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDDAI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Système Informatique 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du développement des Réseaux et Sécurité Informatique  
                                                                                                                        <Badge variant="secondary" className="text-xs">SDDRSI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Communication   
                                                                                                                        <Badge variant="secondary" className="text-xs">SDC</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Direction n° 4 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                     Direction de l’Administration des Moyens et des Finances 
                                                                                                                      <Badge variant="secondary" className="text-xs">DAMF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Personnel  
                                                                                                                        <Badge variant="secondary" className="text-xs">SDP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Formation 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Moyens er du Budget  
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Infrastructures et du Soutien Logistique  
                                                                                                                        <Badge variant="secondary" className="text-xs">SDISL</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>                      
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>














                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGPP : La Direction Générale de la Prévision et des Politiques */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGPP : La Direction Générale de la Prévision et des Politiques
                            <Badge variant="outline" className="border-green-600 text-green-600">DGPP</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-4">   
                           {/* elle ce compose de 04 directions cette DG */}
                           <Accordion type="multiple" className="ml-4">
                                                                {/* Direction de la Prévision Macroéconomiques */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction de la Prévision Macroéconomiques<code></code>          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DPM</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                       Sous Direction de la Prévision
                                                                                                                        <Badge variant="secondary" className="text-xs">SDP</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                    Sous Direction de l'Analyse de la Conjoncture 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDAC</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Sous Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                  Sous Direction de l'Analyse des Opérations Financières  
                                                                                                                      <Badge variant="secondary" className="text-xs">SDAOF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               {/* Sous Direction n° 4 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                     Sous Direction des Modèles de Prévision et des Simulations 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDMPS</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Direction 2 de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/*  Direction de l’Information Statistique */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction de l’Information Statistique         
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DIS</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                       Sous Direction des Statistiques de la Sphère Financière
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSSF</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/*Sous  Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                   Sous Direction des Statistiques de la Sphère réelle 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDSSR</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>        
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                               {/* Direction 3 de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/* Direction des Politiques Budgétaires  */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                     Direction des Politiques Budgétaires          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DPB</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Équilibres Budgétaires
                                                                                                                        <Badge variant="secondary" className="text-xs">SDEB</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/*Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                    Sous Direction de l'Action Économique et Sociale de l’État
                                                                                                                      <Badge variant="secondary" className="text-xs">SDAESE</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Direction 4 de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Direction des Politiques Fiscales  */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                       Direction des Politiques Fiscales         
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DPF</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                       Sous Direction de la Politique de la Fiscalité des Revenus, de la Consommation et de l’Épargne
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPFRCE</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                    Sous Direction des Régimes Sociaux
                                                                                                                      <Badge variant="secondary" className="text-xs">SDRS</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/*Sous Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                  Sous Direction de la Fiscalité Spécifique
                                                                                                                      <Badge variant="secondary" className="text-xs">SDFS</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>   
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>













                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGP : La Direction Générale de la Prospective */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGP : La Direction Générale de la Prospective
                            <Badge variant="outline" className="border-green-600 text-green-600">DGP</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                         <div className="pl-6 space-y-3">  
                         {/* Les directions  */}
                                                            <Accordion type="multiple" className="ml-4">
                                                                {/*   02 Directions d'études */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                     02 Direction d’Études     
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">        
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>

                                                               <Accordion type="multiple" className="ml-4">
                                                                {/* Direction du système d'information */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction du Système d'Information<code></code>          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DSI</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                    {/* Sous Direction n° 1  */}       
                                                                    <AccordionContent>
                                                                     <div className="pl-6 space-y-3">                  
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                       Sous Direction des Réseaux Informatiques et de la Maintenance
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRIM</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                    Sous Direction des Bases de Données et Applications Collaboratives 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDBDAC</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Sous Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                  Sous Direction de la Dématérialisation 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDD</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Direction 2 de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/*  Direction de l’Information Statistique */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction des Études du Développement Territorial Durable      
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DEDTD</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                       Sous Direction du Développement Territorial
                                                                                                                        <Badge variant="secondary" className="text-xs">SDDT</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/*Sous  Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                   Sous Direction du Développement Durable 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDDD</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>   
                                                                                                              {/* Sous Direction n° 3  */}                         
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                       Sous Direction du Développement Spatial et de l'Équilibres Régional
                                                                                                                        <Badge variant="secondary" className="text-xs">SDDSER</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/*Sous  Direction n° 4 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                   Sous Direction du Capital Naturel et Infrastructurel
                                                                                                                      <Badge variant="secondary" className="text-xs">SDCNI</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>          
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                               {/* Direction 3 de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/* Direction de l’analyse et du développement humain  */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction de l’Analyse et du Développement Humain        
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DADH</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Études Démographiques
                                                                                                                        <Badge variant="secondary" className="text-xs">SDED</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/*Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                    Sous Direction du Développement Humain
                                                                                                                      <Badge variant="secondary" className="text-xs">SDDH</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                              {/*Sous Direction n° 3 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                    Sous Direction du Capital Humain
                                                                                                                      <Badge variant="secondary" className="text-xs">SDCH</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>

                                                              {/* Direction 4 de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Direction des Études et Analyses Sociales */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                       Direction des Études et Analyses Sociales       
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DEAS</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                       Sous Direction du Suivi et des Analyses du Marché du Travail et des Revenus
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSAMTR</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                    Sous Direction du Suivi et des Politiques Socioculturelles
                                                                                                                      <Badge variant="secondary" className="text-xs">SDSPS</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/*Sous Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                  Sous Direction de Suivi et d’Analyse du Système Éducatif et de Formation
                                                                                                                      <Badge variant="secondary" className="text-xs">SDSASEF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                              {/*Sous Direction n° 4 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                  Sous Direction de l’Analyse et du Logement
                                                                                                                      <Badge variant="secondary" className="text-xs">SDAL</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>   
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/* Direction des méthodes et analyses économiques prospectives */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction des Méthodes et Analyses Économiques Prospectives     
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DMAEP</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                       Sous Direction des Méthodes Prospectives
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMP</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                    Sous Direction des Études sur la Diversification Économique et la Stratégie
                                                                                                                      <Badge variant="secondary" className="text-xs">SDEDES</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/*Sous Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                  Sous Direction de Suivi de l’Environnement Économique International
                                                                                                                      <Badge variant="secondary" className="text-xs">SDSEEI</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                              {/*Sous Direction n° 4 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                  Sous Direction de l’Évaluation des Politiques Économiques et Publiques
                                                                                                                      <Badge variant="secondary" className="text-xs">SDEPEP</Badge>
                                                                                                                      </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>   
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>










                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGTC : La Direction Générale du Trésor et de la Comptabilité */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGTC : La Direction Générale du Trésor et de la Comptabilité
                            <Badge variant="outline" className="border-green-600 text-green-600">DGTC</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-4">
                         
                                                                {/* Division  de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/*  Division 01  Division de la Gestion des Opération Financières et de la Trésorerie */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      Division de la Gestion des Opération Financières et de la Trésorerie          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DGOFT</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction de la Dette Publique
                                                                                                                        <Badge variant="secondary" className="text-xs">DDP</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                    {/* Les sous Direction n° 1  */} 
                                                                                                                    <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Dette Publique Interne 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDDPI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Dette Publique Externe 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDDPE</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction de la Trésorerie de l'État
                                                                                                                      <Badge variant="secondary" className="text-xs">DTE</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  {/* Les sous Direction n° 1  */} 
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Interventions Financières
                                                                                                                        <Badge variant="secondary" className="text-xs">SDIF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Gestion de la Trésorerie
                                                                                                                        <Badge variant="secondary" className="text-xs">SDGT</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/*  Division du Cadastre et de la Conservation Foncière */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                      Division des Activités Financières       
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DAF</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3"> 
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                        Direction des Banques Publiques et du Marché Financier
                                                                                                                        <Badge variant="secondary" className="text-xs">DBPMF</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                    {/* Les sous Direction n° 1  */} 
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous direction des Institutions Bancaires 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDIB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Marché Financier 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Modernisation et de l'Intégration des Marchés
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMIM</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Participations
                                                                                                                      <Badge variant="secondary" className="text-xs">DP</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                   {/* Les sous Direction n° 2 */} 
                                                                                                                   <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Participations à Caractère Industriel 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPCI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Participations à Caractère Non Industriel 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPCNI</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de l'Analyse et de l’Évaluation Financière
                                                                                                                        <Badge variant="secondary" className="text-xs">SDAEF</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Participations Externe 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDPE</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion> 


                                                                                                                {/* Direction n° 3 */}                                                                                                    
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Assurances
                                                                                                                      <Badge variant="secondary" className="text-xs">DA</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                   {/* Les sous Direction n° 3  */} 
                                                                                                                   <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Réglementation 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDR</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Suivi et de l'Analyse  
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSA</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Controle
                                                                                                                        <Badge variant="secondary" className="text-xs">SDC</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion> 
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                               {/* Division de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/*  Division de la Gestion Comptable des Opérations du Trésor Public  */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                     Division de la Gestion Comptable des Opérations du Trésor Public          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DGCOTP</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                       Direction de la Réglementation et de l'Exécution Comptable des Budgets
                                                                                                                        <Badge variant="secondary" className="text-xs">DRECB</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                    <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                       Sous Direction de la Réglementation Comptables de l’État
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRCE</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Réglementation Comptable des Collectivités Administratives,
                                                                                                                        des Établissements Publics à Caractère Administratif et Organismes Assimilés 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRCCAEPCAOA</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Loi de Réglement Budgétaire
                                                                                                                        <Badge variant="secondary" className="text-xs">SDLRB</Badge>
                                                                                                                      </div>          <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Contentieux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDC</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                    Direction de la Modernisation et de la Normalisation Comptables
                                                                                                                      <Badge variant="secondary" className="text-xs">DMNC</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                       Sous Direction de la Modernisation et de la Normalisation de la Comptabilité de l’État
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFD</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Modernisation et de la Normalisation des Collectivités Administratives, des Établissements Publics à Caractère Administratif
                                                                                                                        et des Organismes Assimilés
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMNCAEPCAOA</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Normalisation de la Comptabilité Commerciale
                                                                                                                        <Badge variant="secondary" className="text-xs">SDNCC</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                            
                                                                                                               {/* Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                      Direction des Consolidations Comptables et Financières
                                                                                                                      <Badge variant="secondary" className="text-xs">DCCF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Consolidations Comptables et Financières de l’État
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCCFE</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Consolidations Comptables et Financières 
                                                                                                                        des Collectivités Administratives, des Établissements Publics à Caractère
                                                                                                                         Administratif et des Organismes Publics Spécifiques
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCCFCAEPCAOPS</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Statistiques des Finances Publiques 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDSFP</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>    




                                                                {/* Division de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/* Les 4 direction rattachées directement a la DG */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Building2 className="h-4 w-4 text-purple-600" />
                                                                     03 Directions d’Études          
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">    {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Network className="h-4 w-4 text-teal-500" />
                                                                                                                       Direction des Systèmes d'Information
                                                                                                                        <Badge variant="secondary" className="text-xs">DSI</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                    <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Réseaux Informatiques et des Infrastructures technologique
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRIIT</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Gestion des Systèmes d'Information
                                                                                                                        <Badge variant="secondary" className="text-xs">SDGSI</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                    Direction de l'Administration, des Moyens et des Finances 
                                                                                                                      <Badge variant="secondary" className="text-xs">DAMF</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction du Personnel
                                                                                                                        <Badge variant="secondary" className="text-xs">SDP</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Moyens et du Budgets
                                                                                                                        <Badge variant="secondary" className="text-xs">SDMB</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Formation 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDF</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Network className="h-4 w-4 text-teal-500 " />
                                                                                                                   Direction des Instruments de Paiement
                                                                                                                      <Badge variant="secondary" className="text-xs">DIP</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                  <AccordionContent>
                                                                                                                    <div className="pl-6 space-y-3">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction des Télé-Compensation  
                                                                                                                        <Badge variant="secondary" className="text-xs">SDTC</Badge>
                                                                                                                      </div>
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-12 text-orange-600 my-4" />
                                                                                                                        Sous Direction de la Monétique 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDM</Badge>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </AccordionContent>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>                    
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>











                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGNdSIE : La Direction Générale de la Numérisation, de la Digitalisation et des Systèmes d’Information Économiques */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGNDSIE : La Direction Générale de la Numérisation, de la Digitalisation et des Systèmes d’Information Économiques
                            <Badge variant="outline" className="border-green-600 text-green-600">DGNDSIE</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                        <div className="pl-6 space-y-4">
                                                                {/* Division  de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/*  La Direction 01 */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction des Systèmes d'Information
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DSI</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                          {/*Sous  Directions */}     
                                                                                                                {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de l'Organisation et de l'Analyse des Systèmes 
                                                                                                                      d'Information 
                                                                                                                        <Badge variant="secondary" className="text-xs">SDOASI</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction du Développement des Applications Transversales 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDDAT</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Sous Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Équipements Informatiques Mutualisés 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDEIM</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                              
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/*  Division 02  */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction de la Coordination et du Suivi des Projets de Modernisation      
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DCSPM</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3"> 
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                        Sous Direction de la Conduite du Changement
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCC</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de la Coordination des Projets de Numérisation 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDCPN</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction du Suivi des Programmes de Coopération
                                                                                                                      pour la Modernisation
                                                                                                                      <Badge variant="secondary" className="text-xs">SDSPCM</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>

                                                               {/* Division de cette DG */}
                                                               <Accordion type="multiple" className="ml-4">
                                                                {/*  Division 03 */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                   Direction de la Sécurité Informatique et des Réseaux      
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DSIR</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3"> 
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                        Sous Direction des Réseaux et des Fonctions Mutualisées
                                                                                                                        <Badge variant="secondary" className="text-xs">SDRFM</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de la Sécurité Informatique 
                                                                                                                      <Badge variant="secondary" className="text-xs">SDSI</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              
                                                              
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>












                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* DGRFE : La Direction Générale des Relations Économiques et Financières Extérieures */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            DGRFE : La Direction Générale des Relations Économiques et Financières Extérieures
                            <Badge variant="outline" className="border-green-600 text-green-600">DGRFE</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                        <div className="pl-6 space-y-4">
                                                                {/* Division  de cette DG */}
                                                                <Accordion type="multiple" className="ml-4">
                                                                {/*  La Direction 01 */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction des Financements Extérieurs
                                                                      <Badge variant="outline" className="border-purple-600 text-purple-600">DFE</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3">
                                                                          {/*Sous  Directions */}     
                                                                                                                {/* Sous Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Finances Bilatéraux
                                                                                                                        <Badge variant="secondary" className="text-xs">SDFB</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Sous Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Financements des Institutions Internationales
                                                                                                                      <Badge variant="secondary" className="text-xs">SDFII</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Sous Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction des Financements des Institutions Régionales
                                                                                                                      <Badge variant="secondary" className="text-xs">SDFIR</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                              
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              {/* Division de cette DG */}
                                                              <Accordion type="multiple" className="ml-4">
                                                                {/*  DGRFE : La Direction Générale des Relations Économiques et Financières Extérieures */}
                                                                <AccordionItem value="direction-budget">
                                                                  <AccordionTrigger className="font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                      <Network className="h-4 w-4 text-teal-500" />
                                                                      Direction de la Coopération et des Relations Économiques Internationales         
                                                                      <Badge variant="outline" className="border-teal-500 text-teal-500">DCREI</Badge>
                                                                    </div>
                                                                  </AccordionTrigger>
                                                                  <AccordionContent>
                                                                        <div className="pl-6 space-y-3"> 
                                                                          {/* Directions */}     
                                                                                                                {/* Direction n° 1  */}                         
                                                                                                                <Accordion type="multiple" className="ml-4">
                                                                                                                  <AccordionItem value="direction-legislation">
                                                                                                                    <AccordionTrigger className="font-medium">
                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                        <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                        Sous Direction de la Coopération et des Relations Économiques Bilatérales
                                                                                                                        <Badge variant="secondary" className="text-xs">SDCREB</Badge>
                                                                                                                      </div>
                                                                                                                    </AccordionTrigger>
                                                                                                                  </AccordionItem>
                                                                                                                </Accordion> 


                                                                                                                 {/* Direction n° 2 */}                                                                                                    
                                                                                                              <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de la Coopération et des Relations Économiques avec les Ensembles Régionaux
                                                                                                                      <Badge variant="secondary" className="text-xs">SDCREER</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>

                                                                                                               {/* Direction n° 3 */}                                                                                                    
                                                                                                               <Accordion type="multiple" className="ml-4">
                                                                                                                <AccordionItem value="direction-legislation">
                                                                                                                  <AccordionTrigger className="font-medium">
                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                      <Users className="h-4 w-4 text-orange-600 " />
                                                                                                                      Sous Direction de la Coopération et des Relations Économiques avec les Organismes Multilatéraux Spécialisés ou de Développement
                                                                                                                      <Badge variant="secondary" className="text-xs">SDREOMSD</Badge>
                                                                                                                    </div>
                                                                                                                  </AccordionTrigger>
                                                                                                                </AccordionItem>
                                                                                                              </Accordion>
                                                                                                               
                                                                    </div>
                                                                  </AccordionContent>
                                                                </AccordionItem>
                                                              </Accordion>
                                                              
                                                              
                            </div>
                          </AccordionContent>
                         </AccordionItem>                                                                       
                    </Accordion>
                  </div>
                </AccordionContent>











                



              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

export default OrganigrammePage;