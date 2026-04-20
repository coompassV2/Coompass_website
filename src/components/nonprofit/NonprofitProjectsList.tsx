
import { useState, useEffect } from "react";
import { ProjectCard } from "./projects/ProjectCard";
import { EmptyProjectsState } from "./projects/EmptyProjectsState";
import { ProjectsListHeader } from "./projects/ProjectsListHeader";
import { ProjectDetailsDialog } from "./ProjectDetailsDialog";
import { Project, ProjectsListProps } from "./projects/types";
import { getAllProjects, filterProjects, addNewProject } from "./projects/projectsService";

// Export the addNewProject function to be used in other files
export { addNewProject } from "./projects/projectsService";

export function NonprofitProjectsList({ status, searchQuery, updateTrigger = 0 }: ProjectsListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Update projects when the local data changes or updateTrigger changes
  useEffect(() => {
    console.log("Refreshing projects list. Update trigger:", updateTrigger);
    setProjects(getAllProjects()); // Get fresh data from the service
  }, [updateTrigger]);
  
  // Filter projects based on status and search query
  const filteredProjects = projects.filter(project => {
    const matchesStatus = project.status === status;
    if (!matchesStatus) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsDialogOpen(true);
  };
  
  return (
    <div className="glass-card p-4">
      <ProjectsListHeader status={status} />
      
      {filteredProjects.length === 0 ? (
        <EmptyProjectsState status={status} />
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      <ProjectDetailsDialog 
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        project={selectedProject}
      />
    </div>
  );
}
