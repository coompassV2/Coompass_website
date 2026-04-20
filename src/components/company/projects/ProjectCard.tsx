import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar, Users, ArrowUpRight,
  CircleDashed, CheckCircle2, Building2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CompanyProject } from "./types";
import { getCategoryBadgeClass, getCategoryLabel } from "./categoryUtils";
import { formatDatePt } from "@/lib/dateFormat";

interface ProjectCardProps {
  project: CompanyProject;
  isActive: boolean;
  onViewDetails: (project: CompanyProject) => void;
  onEndProject?: (project: CompanyProject) => void;
}

export function ProjectCard({ project, isActive, onViewDetails, onEndProject }: ProjectCardProps) {
  const { t } = useTranslation();
  const n = project.nonprofits.length;
  return (
    <Card className="p-4 hover:bg-accent/5 transition-colors">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{project.title}</h3>
              <Badge variant="outline" className={getCategoryBadgeClass(project.category)}>
                {getCategoryLabel(project.category, t)}
              </Badge>
              {n > 0 && (
                <Badge className="bg-purple-500/20 text-purple-700 flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <Building2 className="h-3 w-3 shrink-0" />
                  {n === 1
                    ? t("companyProject.partnerCountOne", { count: n })
                    : t("companyProject.partnerCountOther", { count: n })}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-snug">{project.description}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:pt-0.5">
            {isActive ? (
              <Badge className="whitespace-nowrap bg-green-500/20 text-green-700 flex items-center gap-1">
                <CircleDashed className="h-3 w-3 shrink-0" />
                {t("companyProject.badgeInProgress")}
              </Badge>
            ) : (
              <Badge className="whitespace-nowrap bg-blue-500/20 text-blue-700 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                {t("companyProject.badgeCompleted")}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDatePt(project.startDate)} - {formatDatePt(project.endDate)}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {project.employees === 1
                ? t("companyProject.collaboratorCountOne", { count: project.employees })
                : t("companyProject.collaboratorCountOther", { count: project.employees })}
            </div>
          </div>

          <div className="flex gap-2">
            {isActive && onEndProject && (
              <Button
                variant="outline"
                className="hover:border-red-300 hover:bg-red-500/10 hover:text-red-700 dark:hover:border-red-800 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                size="sm"
                onClick={() => onEndProject(project)}
              >
                {t("companyProject.endProject")}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(project)}
            >
              {t("companyProject.viewProjectDetails")}
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
