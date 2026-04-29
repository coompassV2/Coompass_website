
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, FileText, Star } from "lucide-react";
import { CompletedProject } from "./types";

interface CompletedProjectDetailsDialogProps {
  project: CompletedProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToPortfolio: (project: CompletedProject) => void;
  onExportReport: (project: CompletedProject) => void;
}

export function CompletedProjectDetailsDialog({ 
  project, 
  open, 
  onOpenChange, 
  onAddToPortfolio, 
  onExportReport 
}: CompletedProjectDetailsDialogProps) {
  const { t } = useTranslation();
  
  if (!project) return null;
  
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription className="text-coompass-primary">
            {project.client}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">{t('Location')}</h4>
              <p className="mt-1">{project.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">{t('Completion Date')}</h4>
              <p className="mt-1">{project.completionDate}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">{t('Hours Contributed')}</h4>
              <p className="mt-1">{project.hoursContributed} {t('hours')}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">{t('Client Rating')}</h4>
              <div className="flex gap-0.5 mt-1">
                {renderStars(project.clientRating)}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">{t('Project Description')}</h4>
            <p className="mt-1 text-sm">{project.description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">{t('Impact')}</h4>
            <p className="mt-1 text-sm">{project.impact}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">{t('Client Feedback')}</h4>
            <p className="mt-1 text-sm">{project.clientFeedback}</p>
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex flex-wrap gap-2 w-full justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onExportReport(project)}
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              {t('Export Report')}
            </Button>
            <Button 
              size="sm"
              onClick={() => {
                onOpenChange(false);
                onAddToPortfolio(project);
              }}
              className="flex items-center gap-1"
            >
              <Award className="h-4 w-4" />
              {t('Add to Portfolio')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
