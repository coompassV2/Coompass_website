
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { CompanyProject } from "./types";

interface UpdateProjectStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: CompanyProject | null;
  onStatusUpdate: (projectId: string | number, newStatus: string, notes: string) => Promise<void> | void;
}

export function UpdateProjectStatusDialog({
  open,
  onOpenChange,
  project,
  onStatusUpdate
}: UpdateProjectStatusDialogProps) {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState(project?.status || "active");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open && project) {
      setSelectedStatus(project.status || "active");
      setNotes("");
    }
  }, [open, project]);

  const statusOptions = [
    { value: "active", label: t("Active") },
    { value: "completed", label: t("Completed") },
  ];

  const handleSubmit = async () => {
    if (!project) return;
    try {
      await onStatusUpdate(project.id, selectedStatus, notes);
      toast.success(t("Project status updated successfully"));
      onOpenChange(false);
      setNotes("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("Error"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Update Project Status")}</DialogTitle>
          <DialogDescription>
            {t("Change the status of")} "{project?.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="status">{t("New Status")}</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">{t("Notes (Optional)")}</Label>
            <Textarea
              id="notes"
              placeholder={t("Add any notes about this status change...")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Cancel")}
          </Button>
          <Button onClick={() => void handleSubmit()}>
            {t("Update Status")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
