import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProjectCard } from "./ProjectCard";
import { ProjectsListHeader } from "./ProjectsListHeader";
import { EmptyProjectsState } from "./EmptyProjectsState";
import type { CompanyProject } from "./types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CompanyProjectsListProps {
  status: "active" | "completed";
  projects: CompanyProject[];
  onUpdateProject: (projectId: string | number, newStatus: string, notes: string) => void;
  canEndProject?: boolean;
  detailsBasePath?: string;
}

export function CompanyProjectsList({
  status,
  projects,
  onUpdateProject,
  canEndProject = true,
  detailsBasePath = "/company/projects",
}: CompanyProjectsListProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [projectToEnd, setProjectToEnd] = useState<CompanyProject | null>(null);

  const handleViewDetails = (project: CompanyProject) => {
    navigate(`${detailsBasePath}/${project.id}`);
  };

  const handleEndProject = (project: CompanyProject) => {
    setProjectToEnd(project);
  };

  const handleConfirmEndProject = () => {
    if (!projectToEnd) return;
    onUpdateProject(projectToEnd.id, "completed", "");
    setProjectToEnd(null);
  };

  return (
    <>
      <div className="glass-card p-6">
        <ProjectsListHeader status={status} />

        {projects.length === 0 ? (
          <EmptyProjectsState status={status} />
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={status === "active"}
                onViewDetails={handleViewDetails}
                onEndProject={status === "active" && canEndProject ? handleEndProject : undefined}
              />
            ))}
          </div>
        )}
      </div>
      <AlertDialog open={projectToEnd !== null} onOpenChange={(open) => !open && setProjectToEnd(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("companyProject.endProjectConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("companyProject.endProjectConfirmDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
              onClick={handleConfirmEndProject}
            >
              {t("companyProject.endProject")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
