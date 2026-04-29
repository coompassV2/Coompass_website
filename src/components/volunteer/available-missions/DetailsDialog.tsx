
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mission } from "./types";

interface DetailsDialogProps {
  mission: Mission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (mission: Mission) => void;
}

export function DetailsDialog({
  mission,
  open,
  onOpenChange,
  onApply
}: DetailsDialogProps) {
  const { t } = useTranslation();

  if (!mission) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
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
              <h4 className="text-sm font-medium text-muted-foreground">{t('Date')}</h4>
              <p>{mission.date}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">{t('Hours')}</h4>
              <p>{mission.hours} {t('hrs')}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{t('Causes')}</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {mission.causes.map((cause: string) => (
                <Badge key={cause} variant="outline">{cause}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{t('Skills')}</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {mission.skills.map((skill: string) => (
                <Badge key={skill} variant="outline" className="bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{t('Compatibility')}</h4>
            <div className="mt-1">
              <Badge className="bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400">
                {mission.matchScore}% {t('Match')}
              </Badge>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {
            onOpenChange(false);
            onApply(mission);
          }}>
            {t('Apply Now')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
