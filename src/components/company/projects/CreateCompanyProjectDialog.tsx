import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CreateCompanyProjectForm } from "./CreateCompanyProjectForm";
import type { CompanyProject } from "./types";

interface CreateCompanyProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: CompanyProject) => void;
}

export function CreateCompanyProjectDialog({
  isOpen,
  onClose,
  onCreateProject,
}: CreateCompanyProjectDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {t("Create Company Project")}
          </DialogTitle>
          <DialogDescription>
            {t("Launch your own corporate initiative and invite nonprofits to participate")}
          </DialogDescription>
        </DialogHeader>
        <CreateCompanyProjectForm
          onCreateProject={onCreateProject}
          onCancel={onClose}
          showHeader={false}
        />
      </DialogContent>
    </Dialog>
  );
}
