
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, MessageSquare, AlertTriangle } from "lucide-react";
import { Project, AvailableProject } from "./types";

interface ProjectDetailsDialogProps {
  project: Project | AvailableProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogHours?: (project: Project) => void;
  onApply?: (project: AvailableProject) => void;
}

export function ProjectDetailsDialog({ 
  project, 
  open, 
  onOpenChange, 
  onLogHours,
  onApply 
}: ProjectDetailsDialogProps) {
  const { t } = useTranslation();

  if (!project) return null;

  const isAvailableProject = 'organization' in project;

  const handleClientCommunication = () => {
    // In a real implementation, this would open a messaging interface or email client
  };

  const handleViewDocuments = () => {
    // In a real implementation, this would navigate to a documents view
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription className="text-coompass-primary">
            {isAvailableProject ? (project as AvailableProject).organization : (project as Project).client}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isAvailableProject && (
              <div>
                <h4 className="text-sm font-medium">{t('Status')}</h4>
                <div className="flex items-center mt-1">
                  {(project as Project).isAtRisk ? (
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {t('At Risk')}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      {t('On Track')}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium">{t('Deadline')}</h4>
              <p className="mt-1">{project.deadline}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">{t('Location')}</h4>
              <p className="mt-1">{project.location}</p>
            </div>
            
            {!isAvailableProject && (
              <div>
                <h4 className="text-sm font-medium">{t('Hours')}</h4>
                <p className="mt-1">
                  {(project as Project).hoursLogged} / {(project as Project).totalHours} {t('logged')}
                </p>
              </div>
            )}
            
            {isAvailableProject && (
              <div>
                <h4 className="text-sm font-medium">{t('Budget')}</h4>
                <p className="mt-1">{(project as AvailableProject).budget}</p>
              </div>
            )}
            
            {isAvailableProject && (
              <div>
                <h4 className="text-sm font-medium">{t('Match Score')}</h4>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400">
                    {(project as AvailableProject).matchScore}%
                  </Badge>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium">{t('Description')}</h4>
            <p className="mt-1 text-sm">{project.description}</p>
          </div>
          
          {!isAvailableProject && (
            <div>
              <h4 className="text-sm font-medium mb-2">{t('Progress')}</h4>
              <div className="flex justify-between text-sm mb-1">
                <span>{t('Completion')}</span>
                <span className="font-medium">{(project as Project).progress}%</span>
              </div>
              <Progress value={(project as Project).progress} className="h-2" />
            </div>
          )}
          
          {isAvailableProject && (
            <div>
              <h4 className="text-sm font-medium">{t('Required Skills')}</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {(project as AvailableProject).skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {!isAvailableProject && (project as Project).teamMembers && (
            <div>
              <h4 className="text-sm font-medium">{t('Team Members')}</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {(project as Project).teamMembers?.map((member, idx) => (
                  <div key={idx} className="flex items-center bg-muted/50 px-3 py-1 rounded-full text-sm">
                    <span className="flex items-center justify-center h-4 w-4 rounded-full bg-coompass-primary text-white text-xs mr-2">
                      {member[0]}
                    </span>
                    {member}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!isAvailableProject && (project as Project).isAtRisk && (project as Project).riskReason && (
            <div className="p-3 bg-red-500/10 border border-red-200 rounded-md">
              <h4 className="text-sm font-medium text-red-700 dark:text-red-400">{t('Risk Factors')}</h4>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                {(project as Project).riskReason}
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between sm:space-x-0">
          {!isAvailableProject ? (
            <>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewDocuments}
                  className="flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  {t('Documents')}
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleClientCommunication}
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  {t('Client Communication')}
                </Button>
              </div>
              {onLogHours && (
                <Button 
                  size="sm"
                  onClick={() => {
                    onOpenChange(false);
                    onLogHours(project as Project);
                  }}
                >
                  {t('Log Hours')}
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {t('Close')}
              </Button>
              {onApply && (
                <Button 
                  onClick={() => {
                    onOpenChange(false);
                    onApply(project as AvailableProject);
                  }}
                >
                  {t('Apply Now')}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
