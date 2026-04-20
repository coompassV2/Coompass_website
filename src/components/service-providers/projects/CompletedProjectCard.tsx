
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Clock, Star, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompletedProject } from "./types";

interface CompletedProjectCardProps {
  project: CompletedProject;
  onViewDetails: (project: CompletedProject) => void;
  onAddToPortfolio: (project: CompletedProject) => void;
}

export function CompletedProjectCard({ project, onViewDetails, onAddToPortfolio }: CompletedProjectCardProps) {
  const { t } = useTranslation();
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <Card key={project.id}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={`https://api.dicebear.com/7.x/shapes/svg?seed=${project.client}`}
              alt="Project"
              className="h-16 w-16 rounded-lg"
            />
            <div>
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="text-sm text-coompass-primary">{project.client}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {project.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {project.completionDate}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {project.hoursContributed} {t('hrs')}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-center">
            <Badge className="bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400 mb-2">
              {t('Completed')}
            </Badge>
            <div className="flex gap-0.5">
              {renderStars(project.clientRating)}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => onViewDetails(project)}
            >
              {t('View Details')}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">{t('Impact')}</div>
              <div className="font-medium">{project.impact}</div>
            </div>
            <div className="bg-card/50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">{t('Client Feedback')}</div>
              <div className="font-medium text-sm">{project.clientFeedback}</div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAddToPortfolio(project)}
            >
              <Award className="h-4 w-4 mr-2" />
              {t('Add to Portfolio')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
