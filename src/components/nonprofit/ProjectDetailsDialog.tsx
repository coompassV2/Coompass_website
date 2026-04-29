
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, CircleDashed, CheckCircle2, Target, Globe } from "lucide-react";
import { Project } from "./projects/types";
import { SDGs } from "@/data/sdgs";
import { CAUSE_AREAS } from "@/data/causeAreas";
import { translateSdgName } from "@/utils/sdgI18n";

interface ProjectDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

export function ProjectDetailsDialog({
  open,
  onOpenChange,
  project
}: ProjectDetailsDialogProps) {
  const { t } = useTranslation();

  if (!project) return null;

  const getSDGNames = (sdgIds: number[]) => {
    return sdgIds.map(id => {
      const sdg = SDGs.find(sdg => sdg.id === id);
      return sdg ? { id: sdg.id, name: translateSdgName(sdg, t) } : null;
    }).filter(Boolean);
  };

  const getCauseAreaNames = (causeAreaIds: string[]) => {
    return causeAreaIds.map(id => {
      const area = CAUSE_AREAS.find(area => area.id === id);
      return area ? area.name : null;
    }).filter(Boolean);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {project.title}
            <Badge variant="outline">{project.category}</Badge>
          </DialogTitle>
          <DialogDescription>
            {project.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {project.goal && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Target className="h-4 w-4" />
                {t('Project Goal')}
              </h4>
              <p className="text-sm text-muted-foreground">{project.goal}</p>
            </div>
          )}

          {project.status === 'active' && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{t('Progress')}</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">{t('Project Timeline')}</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {project.startDate} - {project.endDate}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {project.status === 'active' ? t('In progress') : t('Completed')}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">{t('Volunteer Information')}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {project.volunteers} {t('volunteers participating')}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {project.status === 'active' ? (
                    <Badge className="bg-green-500/20 text-green-700 flex items-center gap-1">
                      <CircleDashed className="h-3 w-3" />
                      {t('In Progress')}
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-500/20 text-blue-700 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {t('Completed')}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* SDGs */}
              {project.sdgs && project.sdgs.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {t('Sustainable Development Goals')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {getSDGNames(project.sdgs).map((sdg) => (
                      <Badge key={sdg.id} variant="outline" className="bg-blue-50 text-blue-700">
                        {sdg.id}. {sdg.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Cause Areas */}
              {project.causeAreas && project.causeAreas.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">{t('Cause Areas')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {getCauseAreaNames(project.causeAreas).map((area, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Skills */}
              {project.skills && project.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">{t('Required Skills')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Close')}
          </Button>
          {project.status === 'active' && (
            <Button onClick={() => onOpenChange(false)}>
              {t('Edit Project')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
