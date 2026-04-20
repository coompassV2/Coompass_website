
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
import { Mission } from "./types";

interface ApplyDialogProps {
  mission: Mission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export function ApplyDialog({
  mission,
  open,
  onOpenChange,
  onSubmit
}: ApplyDialogProps) {
  const { t } = useTranslation();

  if (!mission) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Apply for')} {mission.title}</DialogTitle>
          <DialogDescription>
            {t('Submit your interest to participate in this mission')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">{t('Organization')}</h4>
            <p className="text-sm text-coompass-primary">{mission.organization}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">{t('Date & Time')}</h4>
            <p className="text-sm">{mission.date} • {mission.hours} {t('hrs')}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">{t('Location')}</h4>
            <p className="text-sm">{mission.location}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('By clicking Submit, you are confirming your interest in participating in this mission. The organization will review your application and contact you with further details.')}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={onSubmit}>
            {t('Submit Application')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
