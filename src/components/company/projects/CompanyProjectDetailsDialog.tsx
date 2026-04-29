import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CompanyProjectDetailsContent } from "./CompanyProjectDetailsContent";
import type { CompanyProject } from "./types";

interface CompanyProjectDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: CompanyProject | null;
  onUpdateProject: (projectId: string | number, newStatus: string, notes: string) => void;
}

export function CompanyProjectDetailsDialog({ open, onOpenChange, project, onUpdateProject }: CompanyProjectDetailsDialogProps) {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <CompanyProjectDetailsContent project={project} onUpdateProject={onUpdateProject} />
      </DialogContent>
    </Dialog>
  );
}
