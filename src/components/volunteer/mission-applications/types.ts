
import type { VolunteerMissionApplication as MissionApplication } from "@/types/missions";
export type { MissionApplication };

export interface ViewApplicationDialogProps {
  application: MissionApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWithdraw: (application: MissionApplication) => void;
  goToMission: (application: MissionApplication) => void;
  browseMissions: () => void;
}

export interface WithdrawApplicationDialogProps {
  application: MissionApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  withdrawalReason: string;
  setWithdrawalReason: (reason: string) => void;
  onConfirm: () => void;
}

export interface NoApplicationsProps {
  browseMissions: () => void;
}
