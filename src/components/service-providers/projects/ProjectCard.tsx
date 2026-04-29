
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, AlertTriangle, FileText, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Project, AvailableProject } from "./types";

interface ProjectCardProps {
  project: Project | AvailableProject;
  onViewDetails: (project: Project | AvailableProject) => void;
  onLogHours?: (project: Project) => void;
  onViewDocuments?: (project: Project) => void;
  onClientCommunication?: (project: Project) => void;
  onApply?: (project: AvailableProject) => void;
}

export function ProjectCard({ 
  project, 
  onViewDetails, 
  onLogHours,
  onViewDocuments,
  onClientCommunication,
  onApply
}: ProjectCardProps) {
  const { t } = useTranslation();
  
  const isAvailableProject = 'organization' in project;

  if (isAvailableProject) {
    const availableProject = project as AvailableProject;
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={`https://api.dicebear.com/7.x/shapes/svg?seed=${availableProject.organization}`}
                alt="Project"
                className="h-16 w-16 rounded-lg"
              />
              <div>
                <h3 className="text-lg font-medium">{availableProject.title}</h3>
                <p className="text-sm text-coompass-primary">{availableProject.organization}</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {availableProject.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {t('Deadline')}: {availableProject.deadline}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <Badge className="mb-2 bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400">
                {availableProject.matchScore}% {t('Match')}
              </Badge>
              <div className="flex gap-2 mt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onViewDetails(availableProject)}
                >
                  {t('Details')}
                </Button>
                {onApply && (
                  <Button 
                    size="sm"
                    onClick={() => onApply(availableProject)}
                  >
                    {t('Apply')}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {availableProject.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    // This is a current project
    const currentProject = project as Project;
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">{currentProject.title}</h3>
              <p className="text-sm text-coompass-primary">{currentProject.client}</p>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              {currentProject.isAtRisk && (
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {t('At Risk')}
                </Badge>
              )}
              {onLogHours && (
                <Button size="sm" variant="outline" onClick={() => onLogHours(currentProject)}>
                  {t('Log Hours')}
                </Button>
              )}
              <Button size="sm" onClick={() => onViewDetails(currentProject)}>
                {t('Manage')}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {currentProject.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {t('Deadline')}: {currentProject.deadline}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {currentProject.hoursLogged}/{currentProject.totalHours} {t('hrs')}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span>{t('Progress')}</span>
                  <span className="font-medium">{currentProject.progress}%</span>
                </div>
                <Progress value={currentProject.progress} className="h-2" />
              </div>
              
              {currentProject.isAtRisk && currentProject.riskReason && (
                <p className="text-sm text-red-500">{currentProject.riskReason}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t('Team Members')}</h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.teamMembers?.map((member, idx) => (
                  <div key={idx} className="flex items-center bg-muted/50 px-3 py-1 rounded-full text-sm">
                    <span className="flex items-center justify-center h-4 w-4 rounded-full bg-coompass-primary text-white text-xs mr-2">
                      {member[0]}
                    </span>
                    {member}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                {onViewDocuments && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewDocuments(currentProject)}
                    className="flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    {t('Documents')}
                  </Button>
                )}
                {onClientCommunication && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onClientCommunication(currentProject)}
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {t('Client Communication')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
