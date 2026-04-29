
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { MissionApplication } from "./types";

interface DialogFooterActionsProps {
  application: MissionApplication;
  onOpenChange: (open: boolean) => void;
  onWithdraw: (application: MissionApplication) => void;
  goToMission: (application: MissionApplication) => void;
  browseMissions: () => void;
}

export function DialogFooterActions({
  application,
  onOpenChange,
  onWithdraw,
  goToMission,
  browseMissions
}: DialogFooterActionsProps) {
  const { t } = useTranslation();
  
  if (application.status === "Pending") {
    return (
      <Button variant="destructive" onClick={() => {
        onOpenChange(false);
        onWithdraw(application);
      }}>
        {t('Withdraw Application')}
      </Button>
    );
  }
  
  if (application.status === "Accepted") {
    return (
      <Button onClick={() => {
        onOpenChange(false);
        goToMission(application);
      }}>
        <ExternalLink className="h-4 w-4 mr-2" />
        {t('Go to Mission')}
      </Button>
    );
  }
  
  if (application.status === "Rejected" || application.status === "Withdrawn") {
    return (
      <Button variant="outline" onClick={() => {
        onOpenChange(false);
        browseMissions();
      }}>
        {t('Find Other Missions')}
      </Button>
    );
  }
  
  return null;
}
