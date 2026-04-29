
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Mission } from "@/components/missions/MissionCard";
import { KeyDetails } from "./KeyDetails";
import { MissionMeta } from "./MissionMeta";
import { Button } from "@/components/ui/button";
import { HandHelping, Twitter, Linkedin, Facebook, Link2, Pencil, Trash2 } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

interface MissionHeaderProps {
  mission: Mission;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  canVolunteerJoin?: boolean;
  isJoined?: boolean;
  isJoinDisabled?: boolean;
  joinButtonLabel?: string;
  onJoin?: () => void;
  onLeave?: () => void;
  canStartMission?: boolean;
  startMissionLabel?: string;
  onStartMission?: () => void;
  startMissionLoading?: boolean;
  showStartMissionNotice?: boolean;
  startMissionNoticeLabel?: string;
  canCompleteMission?: boolean;
  completeMissionLabel?: string;
  onCompleteMission?: () => void;
  completeMissionLoading?: boolean;
}

export function MissionHeader({
  mission,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
  canVolunteerJoin = false,
  isJoined = false,
  isJoinDisabled = false,
  joinButtonLabel,
  onJoin,
  onLeave,
  canStartMission = false,
  startMissionLabel,
  onStartMission,
  startMissionLoading = false,
  showStartMissionNotice = false,
  startMissionNoticeLabel,
  canCompleteMission = false,
  completeMissionLabel,
  onCompleteMission,
  completeMissionLoading = false,
}: MissionHeaderProps) {
  const { t } = useTranslation();
  const fallbackImage = `https://picsum.photos/seed/mission-${mission.id}/1200/480`;
  const coverImage = mission.image?.trim() ? mission.image : fallbackImage;
  const isMissionFull =
    mission.isActive === true &&
    (mission.isFull === true || (mission.spotsLeft != null && mission.spotsLeft <= 0));

  const shareUrl = `${window.location.origin}/missions/${mission.id}`;
  
  const shareOnTwitter = () => {
    const text = `${t("Check out this volunteer mission")}: ${mission.title} ${shareUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };
  
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };
  
  const shareOnLinkedIn = () => {
    const text = `${mission.title} - ${mission.organization}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`, '_blank');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: t("Link copied"),
        description: t("Mission link copied to clipboard"),
      });
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="mb-5 overflow-hidden rounded-lg border border-border/60">
        <img
          src={coverImage}
          alt={mission.title}
          className="h-56 w-full object-cover"
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div className="md:max-w-[60%]">
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{mission.title}</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-coompass-primary font-medium">{mission.organization}</span>
              {mission.projectCategory ? (
                <span className="text-xs px-2 py-1 rounded-full bg-coompass-success/15 text-coompass-success">
                  {mission.projectCategory}
                </span>
              ) : null}
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                mission.approvalStatus === "pending"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : mission.approvalStatus === "rejected"
                      ? "bg-muted text-muted-foreground"
                      : mission.executionStatus === "not_started"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : mission.executionStatus === "in_progress"
                          ? "bg-green-500/10 text-green-500"
                          : mission.executionStatus === "completed"
                            ? "bg-muted text-muted-foreground"
                        : isMissionFull
                          ? "bg-red-500/10 text-red-500"
                          : mission.isActive
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
              )}>
                {mission.approvalStatus === "pending"
                  ? t("Pending")
                  : mission.approvalStatus === "rejected"
                      ? t("Rejected")
                      : mission.executionStatus === "not_started"
                        ? t("Not Started")
                        : mission.executionStatus === "in_progress"
                          ? t("Mission In Progress")
                          : mission.executionStatus === "completed"
                            ? t("Mission Completed")
                        : isMissionFull
                          ? t("Sem vagas/Fechada")
                          : mission.isActive
                            ? t("Active")
                            : t("Finished")}
              </span>
            </div>
            
            {/* Location and Date information */}
            <MissionMeta mission={mission} />
            
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          {/* Key Details Section */}
          <KeyDetails mission={mission} />
          {(canEdit || canDelete) && (onEdit || onDelete) && (
            <div className="flex gap-2">
              {canEdit && onEdit ? (
                <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
                  <Pencil className="h-4 w-4 mr-1" />
                  {t("Edit")}
                </Button>
              ) : null}
              {canDelete && onDelete ? (
                <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive" onClick={onDelete}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  {t("Delete")}
                </Button>
              ) : null}
            </div>
          )}
          {/* Action Button - Now moved below Key Details */}
          {canStartMission ? (
            <>
              <Button
                className="w-full bg-coompass-success hover:bg-coompass-success/90 text-white"
                disabled={startMissionLoading}
                onClick={onStartMission}
              >
                {startMissionLabel ?? t("Start Mission")}
              </Button>
              {showStartMissionNotice ? (
                <p className="text-xs text-muted-foreground">
                  {startMissionNoticeLabel ?? t("Click only when the initiative starts.")}
                </p>
              ) : null}
            </>
          ) : canCompleteMission ? (
            <Button
              className="w-full bg-coompass-success hover:bg-coompass-success/90 text-white"
              disabled={completeMissionLoading}
              onClick={onCompleteMission}
            >
              {completeMissionLabel ?? t("Complete Mission")}
            </Button>
          ) : mission.isActive ? (
            canVolunteerJoin ? (
              isJoined ? (
                <Button
                  className="w-full"
                  variant="outline"
                  disabled={isJoinDisabled}
                  onClick={onLeave}
                >
                  {joinButtonLabel ?? t("Leave Mission")}
                </Button>
              ) : (
                <Button
                  className="w-full bg-coompass-success hover:bg-coompass-success/90 text-white"
                  disabled={isJoinDisabled}
                  onClick={onJoin}
                >
                  <HandHelping className="h-4 w-4 mr-2" />
                  {joinButtonLabel ?? t("I Want to Help")}
                </Button>
              )
            ) : (
              <Button variant="outline" disabled className="w-full">
                {joinButtonLabel ?? t("Volunteer access required")}
              </Button>
            )
          ) : mission.approvalStatus === "pending" ? (
            <Button variant="outline" disabled className="w-full">
              {t("Awaiting Approval")}
            </Button>
          ) : mission.approvalStatus === "rejected" ? (
            <Button variant="outline" disabled className="w-full">
              {t("Mission Rejected")}
            </Button>
          ) : mission.executionStatus === "not_started" ? (
            <Button variant="outline" disabled className="w-full">
              {t("Not Started")}
            </Button>
          ) : mission.executionStatus === "in_progress" ? (
            <Button variant="outline" disabled className="w-full">
              {t("Mission In Progress")}
            </Button>
          ) : (
            <Button variant="outline" disabled className="w-full">
              {t("Mission Completed")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
