
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { HoursLogSection } from "./HoursLogSection";
import type { VolunteerCurrentMission } from "@/types/missions";

interface MissionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mission: VolunteerCurrentMission | null;
  onLogHours: (mission: VolunteerCurrentMission) => void;
  onCompleteMission: (mission: VolunteerCurrentMission) => void;
}

export function MissionDetailsDialog({ 
  open, 
  onOpenChange, 
  mission, 
  onLogHours, 
  onCompleteMission 
}: MissionDetailsDialogProps) {
  const { t } = useTranslation();

  if (!mission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mission.title}</DialogTitle>
          <DialogDescription className="text-coompass-primary">
            {mission.organization}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>{mission.description}</p>
          <div className="flex flex-wrap gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">{t('Location')}</h4>
              <p>{mission.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">{t('Duration')}</h4>
              <p>{mission.startDate ?? "-"} - {mission.endDate ?? "-"}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{t('Tasks')}</h4>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              {mission.tasks.map((task: string, index: number) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{t('Hours')}</h4>
            <div className="flex justify-between items-center mt-1">
              <span>{mission.completedHours}/{mission.totalHours} {t('hours completed')}</span>
              <span className="text-sm">
                {mission.totalHours > 0
                  ? Math.round((mission.completedHours / mission.totalHours) * 100)
                  : 0}
                % {t('Complete')}
              </span>
            </div>
            <Progress
              value={mission.totalHours > 0 ? Math.round((mission.completedHours / mission.totalHours) * 100) : 0}
              className="h-2 mt-1"
            />
          </div>

          <HoursLogSection missionId={mission.id} />
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => {
            onOpenChange(false);
            onLogHours(mission);
          }}>
            {t('Log Hours')}
          </Button>
          <Button onClick={() => {
            onOpenChange(false);
            onCompleteMission(mission);
          }} disabled={mission.completedHours < mission.totalHours}>
            {t('Mark Complete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
