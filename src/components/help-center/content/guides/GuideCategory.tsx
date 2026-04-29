
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuideItem } from "./types";

interface GuideCategoryProps {
  category: string;
  guides: GuideItem[];
  onGuideClick: (guidePath: string) => void;
}

export function GuideCategory({ category, guides, onGuideClick }: GuideCategoryProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{category}</h2>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {guides.map((guide, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-base flex items-center">
                <FileText className="h-4 w-4 mr-2 text-coompass-success" />
                {guide.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <CardDescription className="text-sm">{guide.description}</CardDescription>
              <Button 
                variant="link" 
                className="p-0 h-auto mt-2 text-coompass-success"
                onClick={() => onGuideClick(guide.path)}
              >
                Read guide <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
