
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { toast } from "sonner";
import type { VolunteerCurrentMission } from "@/types/missions";

interface LogHoursDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mission: VolunteerCurrentMission | null;
  onSubmit: (hoursToLog: string, hoursDescription: string) => void;
}

export function LogHoursDialog({ open, onOpenChange, mission, onSubmit }: LogHoursDialogProps) {
  const { t } = useTranslation();
  const [hoursToLog, setHoursToLog] = useState("");
  const [hoursDescription, setHoursDescription] = useState("");

  const handleSubmit = () => {
    if (!hoursToLog) {
      toast.error(t('Please enter the number of hours'));
      return;
    }
    onSubmit(hoursToLog, hoursDescription);
    setHoursToLog("");
    setHoursDescription("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setHoursToLog("");
    setHoursDescription("");
  };

  if (!mission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Log Hours')}</DialogTitle>
          <DialogDescription>
            {t('Record the time you spent volunteering for')} {mission.title}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="hours">{t('Hours')}</Label>
            <Input
              id="hours"
              type="number"
              min="0.5"
              step="0.5"
              value={hoursToLog}
              onChange={(e) => setHoursToLog(e.target.value)}
              placeholder="0.0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t('Description')}</Label>
            <Textarea
              id="description"
              value={hoursDescription}
              onChange={(e) => setHoursDescription(e.target.value)}
              placeholder={t('Describe what you did during this time')}
              rows={3}
            />
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {t('Please note: Submitted hours will be reviewed and confirmed by the nonprofit organization before being officially recorded.')}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSubmit}>
            {t('Submit Hours')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
