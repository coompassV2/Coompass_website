
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectForm } from "./projects/ProjectForm";
import { ProjectFormData } from "./projects/types";

interface AddProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProject: (project: ProjectFormData) => void;
}

export function AddProjectDialog({
  open,
  onOpenChange,
  onAddProject
}: AddProjectDialogProps) {
  const { t } = useTranslation();

  const handleCreateProject = (formData: ProjectFormData) => {
    onAddProject(formData);
    onOpenChange(false);
  };
  
  const handleCancel = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t('Add New Project')}</DialogTitle>
          <DialogDescription>
            {t('Create a new project for your nonprofit organization.')}
          </DialogDescription>
        </DialogHeader>
        
        <ProjectForm 
          onSubmit={handleCreateProject}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
