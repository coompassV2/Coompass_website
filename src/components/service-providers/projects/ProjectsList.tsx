
import { useTranslation } from "react-i18next";
import { ProjectCard } from "./ProjectCard";
import { AvailableProject } from "./types";

interface ProjectsListProps {
  projects: AvailableProject[];
  onViewDetails: (project: AvailableProject) => void;
  onApply: (project: AvailableProject) => void;
}

export function ProjectsList({ projects, onViewDetails, onApply }: ProjectsListProps) {
  const { t } = useTranslation();
  
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t('No projects found matching your criteria.')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onViewDetails={onViewDetails}
          onApply={onApply}
        />
      ))}
    </div>
  );
}
