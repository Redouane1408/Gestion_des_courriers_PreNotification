import { PageTransition } from "@/components/page-transition";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Building } from "lucide-react";

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
              Hiérarchie: Direction Générale → Division → Direction → Sous Direction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
                
              {/* Direction Générale */}
              <AccordionItem value="direction-generale">
                <AccordionTrigger className="text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-blue-600" />
                    Direction générale du budgets
                    <Badge variant="default" className="bg-blue-600">DG</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    
                    
                    {/* Divisions sous la Direction Générale */}
                    <Accordion type="multiple" className="ml-4">
                      {/* Division Administrative et Financière */}
                      <AccordionItem value="division-admin">
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-green-600" />
                            Division Administrative et Financière
                            <Badge variant="outline" className="border-green-600 text-green-600">DAF</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-4">

                            {/* Directions sous cette Division */}
                            <Accordion type="multiple" className="ml-4">
                              {/* Direction du Budget */}
                              <AccordionItem value="direction-budget">
                                <AccordionTrigger className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-purple-600" />
                                    Direction du Budget
                                    <Badge variant="outline" className="border-purple-600 text-purple-600">DB</Badge>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="pl-6 space-y-3">

                                    
                                    {/* Sous-Directions */}
                                    <Accordion type="multiple" className="ml-4">
                                      <AccordionItem value="sous-direction-preparation">
                                        
                                          <div className="flex items-center gap-2">
                                            <Users className="h-10 w-4 text-orange-600 my-4 " />
                                            Sous-Direction de la Préparation Budgétaire
                                            <Badge variant="secondary" className="text-xs">SDPB</Badge>
                                          </div>
                                        
                                      </AccordionItem>
                                      
                                      
                                    </Accordion>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                              
                              {/* Direction du Trésor */}
                              
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