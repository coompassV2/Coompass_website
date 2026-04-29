
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { 
  Calendar, Users, ArrowUpRight, 
  CircleDashed, CheckCircle2, Target
} from "lucide-react";
import { Project } from "./types";
import { SDGs } from "@/data/sdgs";
import { CAUSE_AREAS } from "@/data/causeAreas";
import { translateSdgName } from "@/utils/sdgI18n";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const { t } = useTranslation();
  const isActive = project.status === 'active';

  const getSDGNames = (sdgIds: number[]) => {
    return sdgIds
      .map((id) => SDGs.find((sdg) => sdg.id === id))
      .filter(Boolean)
      .map((sdg) => translateSdgName(sdg, t));
  };

  const getCauseAreaNames = (causeAreaIds: string[]) => {
    return causeAreaIds.map(id => CAUSE_AREAS.find(area => area.id === id)?.name).filter(Boolean);
  };

  return (
    <Card className="p-3 hover:bg-accent/5 transition-colors">
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-sm">{project.title}</h3>
              <Badge variant="outline" className="text-xs">{project.category}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{project.description}</p>
            {project.goal && (
              <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                <Target className="h-3 w-3 shrink-0" />
                <span>{project.goal}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 shrink-0">
            {isActive ? (
              <Badge className="bg-green-500/20 text-green-700 flex items-center gap-0.5 text-xs">
                <CircleDashed className="h-2.5 w-2.5" />
                {t('In Progress')}
              </Badge>
            ) : (
              <Badge className="bg-blue-500/20 text-blue-700 flex items-center gap-0.5 text-xs">
                <CheckCircle2 className="h-2.5 w-2.5" />
                {t('Completed')}
              </Badge>
            )}
          </div>
        </div>
        
        {isActive && (
          <div>
            <div className="flex justify-between text-xs mb-0.5">
              <span>{t('Progress')}</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
          </div>
        )}

        {/* Three sections displayed in the same row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* SDGs Display */}
          {project.sdgs && project.sdgs.length > 0 && (
            <div>
              <h4 className="text-[11px] font-medium text-muted-foreground mb-1">{t('SDGs')}</h4>
              <div className="flex flex-wrap gap-1">
                {getSDGNames(project.sdgs).slice(0, 3).map((sdgName, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                    {sdgName}
                  </Badge>
                ))}
                {project.sdgs.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.sdgs.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Skills Display */}
          {project.skills && project.skills.length > 0 && (
            <div>
              <h4 className="text-[11px] font-medium text-muted-foreground mb-1">{t('Required Skills')}</h4>
              <div className="flex flex-wrap gap-1">
                {project.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {project.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.skills.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Cause Areas Display */}
          {project.causeAreas && project.causeAreas.length > 0 && (
            <div>
              <h4 className="text-[11px] font-medium text-muted-foreground mb-1">{t('Cause Areas')}</h4>
              <div className="flex flex-wrap gap-1">
                {getCauseAreaNames(project.causeAreas).slice(0, 3).map((areaName, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                    {areaName}
                  </Badge>
                ))}
                {project.causeAreas.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.causeAreas.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between pt-1 border-t border-border/50">
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 shrink-0" />
              {project.startDate} - {project.endDate}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 shrink-0" />
              {project.volunteers} {t('volunteers')}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={() => onViewDetails(project)}
          >
            {t('View Details')}
            <ArrowUpRight className="h-3 w-3 ml-1.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
