
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Resource {
  id: number;
  project: string;
  budget: number;
  used: number;
  volunteers: number;
  hoursAllocated: number;
  hoursLogged: number;
  priority: string;
  allocation: {
    type: string;
    percentage: number;
  }[];
}

interface EditResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource: Resource | null;
  onSave: (resource: Resource) => void;
}

export function EditResourceDialog({
  open,
  onOpenChange,
  resource,
  onSave
}: EditResourceDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<{ project: string } | null>(null);

  // Update form data when resource changes
  useEffect(() => {
    if (resource) {
      console.log("Setting form data for resource:", resource.project);
      setFormData({ project: resource.project });
    } else {
      setFormData(null);
    }
  }, [resource]);

  if (!resource || !formData) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, project: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.project.trim()) {
      toast.error(t("Project name cannot be empty"));
      return;
    }
    
    const updatedResource = { 
      ...resource, 
      project: formData.project 
    };
    
    console.log("Submitting updated resource:", updatedResource);
    onSave(updatedResource);
    toast.success(t("Project updated successfully"));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('Edit Project')}</DialogTitle>
          <DialogDescription>
            {t('Update the project details')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">{t('Project Name')}</Label>
            <Input 
              id="projectName" 
              value={formData.project}
              onChange={handleNameChange}
              placeholder={t('Enter project name')}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSubmit}>
            {t('Save Changes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
