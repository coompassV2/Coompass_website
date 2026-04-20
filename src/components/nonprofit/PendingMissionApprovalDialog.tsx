import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Clock, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ApiMission } from "@/types/missions";
import { formatDatePt } from "@/lib/dateFormat";

interface PendingMissionApprovalDialogProps {
  mission: ApiMission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (missionId: string) => Promise<void>;
  onReject: (missionId: string) => Promise<void>;
  isSubmitting?: boolean;
}

export function PendingMissionApprovalDialog({
  mission,
  open,
  onOpenChange,
  onApprove,
  onReject,
  isSubmitting = false,
}: PendingMissionApprovalDialogProps) {
  const { t } = useTranslation();

  if (!mission) return null;

  const locationDisplay = mission.is_virtual ? t("Virtual") : (mission.location || "-");
  const startDate = formatDatePt(mission.start_date);
  const endDate = formatDatePt(mission.end_date);

  const handleApprove = async () => {
    await onApprove(mission.id);
    onOpenChange(false);
  };

  const handleReject = async () => {
    await onReject(mission.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{mission.title}</DialogTitle>
          <p className="text-coompass-primary font-medium">
            {mission.company_name ?? "-"}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={
                mission.approval_status === "pending"
                  ? "bg-amber-500/20 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                  : mission.approval_status === "approved"
                    ? "bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : "bg-red-500/20 text-red-700 dark:bg-red-950 dark:text-red-400"
              }
            >
              {t(mission.approval_status)}
            </Badge>
            <Badge variant="outline">{locationDisplay}</Badge>
          </div>

          {mission.description && (
            <div>
              <h3 className="font-medium mb-2">{t("Description")}</h3>
              <p className="text-sm text-muted-foreground">{mission.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-sm text-muted-foreground">{t("Start Date")}: </span>
                <span className="text-sm">{startDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-sm text-muted-foreground">{t("End Date")}: </span>
                <span className="text-sm">{endDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-sm text-muted-foreground">{t("Location")}: </span>
                <span className="text-sm">{locationDisplay}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-sm text-muted-foreground">{t("Hours")}: </span>
                <span className="text-sm">{mission.hours} {t("hours")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-sm text-muted-foreground">{t("Volunteers")}: </span>
                <span className="text-sm">{mission.volunteers_required ?? 0}</span>
              </div>
            </div>
            {mission.point_of_contact && (
              <div className="flex items-center gap-2 md:col-span-2">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm text-muted-foreground">{t("Point of contact")}: </span>
                  <a
                    href={`mailto:${mission.point_of_contact}`}
                    className="text-sm text-coompass-primary hover:underline"
                  >
                    {mission.point_of_contact}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {mission.approval_status === "pending" && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("Close")}
            </Button>
            <Button
              variant="outline"
              className="text-destructive hover:bg-destructive/10"
              disabled={isSubmitting}
              onClick={handleReject}
            >
              {t("Reject")}
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
              onClick={handleApprove}
            >
              {t("Approve")}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
