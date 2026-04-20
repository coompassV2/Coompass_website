
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface LogHoursDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  volunteer: { id: number; name: string } | null;
  onSaveHours: (hours: string) => void;
}

export function LogHoursDialog({
  open,
  onOpenChange,
  volunteer,
  onSaveHours,
}: LogHoursDialogProps) {
  const { t } = useTranslation();
  const [hoursToLog, setHoursToLog] = useState("");
  
  const handleSaveHours = () => {
    if (!hoursToLog || isNaN(parseFloat(hoursToLog)) || parseFloat(hoursToLog) <= 0) {
      toast.error(t("Please enter a valid number of hours"));
      return;
    }
    
    onSaveHours(hoursToLog);
    setHoursToLog("");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {t('Log Volunteer Hours')}
          </DialogTitle>
          <DialogDescription>
            {volunteer && t('Record hours for {{name}}', { name: volunteer.name })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel>{t('Date')}</FormLabel>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <FormLabel>{t('Hours')}</FormLabel>
                <Input 
                  type="number"
                  step="0.5"
                  min="0.5"
                  placeholder="0.0"
                  value={hoursToLog}
                  onChange={(e) => setHoursToLog(e.target.value)}
                />
              </div>
            </div>
            <div>
              <FormLabel>{t('Activity Description')}</FormLabel>
              <Textarea placeholder={t('Briefly describe the volunteer activity')} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSaveHours}>
            {t('Save Hours')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
