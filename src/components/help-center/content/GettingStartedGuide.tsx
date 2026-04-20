
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PersonaGettingStarted } from "./PersonaGettingStarted";
import { PersonaType } from "@/utils/personaLabels";
import { GettingStartedGuideProps } from "./guides/types";

export function GettingStartedGuide({ persona, searchQuery = "" }: GettingStartedGuideProps) {
  if (!persona) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
        <p className="text-amber-700">Please select a persona to view getting started information.</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Getting Started with Coompass</h1>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <PersonaGettingStarted persona={persona} />
        </CardContent>
      </Card>
    </div>
  );
}
