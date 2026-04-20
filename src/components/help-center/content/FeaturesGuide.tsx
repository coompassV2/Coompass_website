
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonaType } from "@/utils/personaLabels";
import { FeaturesGuideProps } from "./guides/types";

export function FeaturesGuide({ persona, searchQuery = "" }: FeaturesGuideProps) {
  // Different features by persona
  const features = {
    company: [
      { id: "dashboard", title: "Dashboard", description: "Overview of your company's impact and volunteer activities." },
      { id: "employees", title: "Employee Management", description: "Track and manage your employees' volunteer hours and impact." },
      { id: "partnerships", title: "Partnerships", description: "Manage partnerships with nonprofits and track impact." },
      { id: "reporting", title: "Reporting", description: "Generate impact reports for stakeholders and ESG reporting." },
    ],
    nonprofit: [
      { id: "dashboard", title: "Dashboard", description: "Overview of your organization's volunteer management and partnerships." },
      { id: "volunteers", title: "Volunteer Management", description: "Track volunteers, hours, and skills." },
      { id: "partners", title: "Corporate Partners", description: "Manage corporate partnerships and resources." },
      { id: "projects", title: "Projects", description: "Create and manage volunteer projects and missions." },
    ],
    volunteer: [
      { id: "dashboard", title: "Dashboard", description: "Overview of your volunteer activities and impact." },
      { id: "missions", title: "Missions", description: "Browse and apply for volunteer opportunities." },
      { id: "profile", title: "Profile", description: "Manage your skills, interests, and volunteer history." },
      { id: "certificates", title: "Certificates", description: "View and download your volunteer certificates." },
    ],
    provider: [
      { id: "dashboard", title: "Dashboard", description: "Overview of your service provision and client relationships." },
      { id: "services", title: "Services Management", description: "List and manage your service offerings." },
      { id: "clients", title: "Client Management", description: "Track client relationships and projects." },
      { id: "projects", title: "Projects", description: "Manage ongoing and completed service projects." },
    ],
  };
  
  const currentFeatures = features[persona] || features.company;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Features Guide</h1>
      
      <Tabs defaultValue={currentFeatures[0].id} className="space-y-4">
        <TabsList className="w-full md:w-auto flex flex-wrap">
          {currentFeatures.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id}>
              {feature.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {currentFeatures.map((feature) => (
          <TabsContent key={feature.id} value={feature.id}>
            <Card>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">How to Access</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.id === "dashboard" 
                      ? "Navigate to the Dashboard section from the main sidebar menu." 
                      : `Navigate to the ${feature.title} section from the main sidebar menu.`}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Key Capabilities</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>View and analyze data</li>
                    <li>Manage relationships and activities</li>
                    <li>Generate reports and insights</li>
                    <li>Track progress over time</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Related Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentFeatures
                      .filter(relatedFeature => relatedFeature.id !== feature.id)
                      .map(relatedFeature => (
                        <span 
                          key={relatedFeature.id} 
                          className="inline-block bg-muted px-2 py-1 text-xs rounded-md"
                        >
                          {relatedFeature.title}
                        </span>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
