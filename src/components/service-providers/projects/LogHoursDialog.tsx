
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "./types";

interface LogHoursDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (hours: number, note: string) => void;
}

export function LogHoursDialog({ project, open, onOpenChange, onSubmit }: LogHoursDialogProps) {
  const { t } = useTranslation();
  const [hoursToLog, setHoursToLog] = useState("");
  const [projectNote, setProjectNote] = useState("");

  if (!project) return null;

  const handleSubmit = () => {
    const hours = parseFloat(hoursToLog);
    if (!isNaN(hours) && hours > 0) {
      onSubmit(hours, projectNote);
      setHoursToLog("");
      setProjectNote("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Log Hours')}</DialogTitle>
          <DialogDescription>
            {t('Log your hours for')} {project.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="hours">
              {t('Hours Worked')}
            </label>
            <input
              id="hours"
              type="number"
              min="0.5"
              step="0.5"
              value={hoursToLog}
              onChange={(e) => setHoursToLog(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="0.0"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="note">
              {t('Note')} ({t('Optional')})
            </label>
            <Textarea
              id="note"
              value={projectNote}
              onChange={(e) => setProjectNote(e.target.value)}
              placeholder={t('Brief description of work completed...')}
              rows={3}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            {t('Current progress')}: {project.progress}% ({project.hoursLogged}/{project.totalHours} {t('hours')})
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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
