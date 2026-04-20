
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface Mission {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  completedHours: number;
  status: string;
  description: string;
  tasks: string[];
}

interface CompleteMissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mission: Mission | null;
  onConfirm: () => void;
}

export function CompleteMissionDialog({ open, onOpenChange, mission, onConfirm }: CompleteMissionDialogProps) {
  const { t } = useTranslation();

  if (!mission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Complete Mission')}</DialogTitle>
          <DialogDescription>
            {t('Are you sure you want to mark this mission as complete?')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            {t('This will notify the organization that you have completed your volunteer commitment. You can still view and reference this mission in your past missions history.')}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={onConfirm}>
            {t('Mark Complete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
