
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { ViewApplicationDialogProps } from "./types";
import { ApplicationInfo } from "./ApplicationInfo";
import { DialogFooterActions } from "./DialogFooterActions";

export function ViewApplicationDialog({
  application,
  open,
  onOpenChange,
  onWithdraw,
  goToMission,
  browseMissions
}: ViewApplicationDialogProps) {
  const { t } = useTranslation();

  if (!application) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{application.mission}</DialogTitle>
          <DialogDescription className="text-coompass-primary">
            {application.organization}
          </DialogDescription>
        </DialogHeader>
        
        <ApplicationInfo application={application} />
        
        <DialogFooter>
          <DialogFooterActions
            application={application}
            onOpenChange={onOpenChange}
            onWithdraw={onWithdraw}
            goToMission={goToMission}
            browseMissions={browseMissions}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
