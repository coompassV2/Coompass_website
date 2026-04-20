
import React from "react";
import { PersonaType } from "@/utils/personaLabels";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuideCategory } from "./guides/GuideCategory";
import { EmptyGuides } from "./guides/EmptyGuides";
import { VideoTutorials } from "./guides/VideoTutorials";
import { guides } from "./guides/guidesData";
import { filterGuidesBySearchQuery, handleGuideNavigation } from "./guides/guideUtils";
import { UserGuidesProps } from "./guides/types";

export function UserGuides({ persona, searchQuery }: UserGuidesProps) {
  // Get guides for the current persona
  const personaGuides = guides[persona] || {};
  
  // Filter guides if there's a search query
  const filteredGuides = filterGuidesBySearchQuery(personaGuides, searchQuery);

  // Check if we have any guides after filtering
  const hasGuides = Object.keys(filteredGuides).length > 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Guides</h1>
      
      <Tabs defaultValue="guides">
        <TabsList className="mb-4">
          <TabsTrigger value="guides">Step-by-Step Guides</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides">
          {!hasGuides ? (
            <EmptyGuides />
          ) : (
            <div className="space-y-8">
              {Object.entries(filteredGuides).map(([category, categoryGuides]) => (
                <GuideCategory 
                  key={category}
                  category={category}
                  guides={categoryGuides}
                  onGuideClick={handleGuideNavigation}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="videos">
          <VideoTutorials />
        </TabsContent>
      </Tabs>
    </div>
  );
}
