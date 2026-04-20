import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Building2, MapPin, Monitor, RefreshCw, Target, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ManageTeamMembersDialog } from "./ManageTeamMembersDialog";
import { GenerateReportDialog } from "./GenerateReportDialog";
import { ViewPartnerProfileDialog } from "./ViewPartnerProfileDialog";
import { ViewOrganizationProfileDialog } from "./ViewOrganizationProfileDialog";
import { SendCollaborationInviteDialog } from "./SendCollaborationInviteDialog";
import type { CompanyProject, CollaborationInviteData, ProjectComment } from "./types";
import { getCategoryBadgeClass, getCategoryLabel } from "./categoryUtils";
import { formatDatePt } from "@/lib/dateFormat";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CompanyProjectDetailsContentProps {
  project: CompanyProject;
  comments?: ProjectComment[];
  onUpdateProject: (projectId: string | number, newStatus: string, notes: string) => Promise<void> | void;
  onCreateComment?: (projectId: string | number, content: string) => Promise<void> | void;
  canComment?: boolean;
  isCommentSubmitting?: boolean;
  commentError?: string | null;
  canCompleteProject?: boolean;
  canEditProject?: boolean;
  onEditProject?: (project: CompanyProject) => void;
  canEditParticipants?: boolean;
  availableParticipants?: Array<{
    id: string;
    fullName: string;
    department: string | null;
  }>;
  onUpdateParticipants?: (projectId: string, invitedUserIds: string[]) => Promise<void>;
  participantsUpdating?: boolean;
  /** When provided, rendered above the content (e.g. back link for page) */
  renderBack?: () => React.ReactNode;
}

export function CompanyProjectDetailsContent({
  project,
  comments = [],
  onUpdateProject,
  onCreateComment,
  canComment = false,
  isCommentSubmitting = false,
  commentError = null,
  canCompleteProject = false,
  canEditProject = false,
  onEditProject,
  canEditParticipants = false,
  availableParticipants = [],
  onUpdateParticipants,
  participantsUpdating = false,
  renderBack,
}: CompanyProjectDetailsContentProps) {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setNewComment("");
  }, [project.id]);
  const [showEndProjectConfirm, setShowEndProjectConfirm] = useState(false);
  const [showManageTeam, setShowManageTeam] = useState(false);
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [showPartnerProfile, setShowPartnerProfile] = useState(false);
  const [showInvitePartners, setShowInvitePartners] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false);
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<string[]>(project.invitedUserIds ?? []);

  const handleInvitePartner = () => {
    setShowInvitePartners(true);
  };

  const handleConfirmEndProject = async () => {
    try {
      await onUpdateProject(project.id, "completed", "");
      setShowEndProjectConfirm(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("Error"));
    }
  };

  const handleTeamUpdate = (_projectId: string, _members: unknown[]) => {
    // Update team members logic here
  };

  const handleViewPartnerProfile = (partnerName: string) => {
    setSelectedPartner(partnerName);
    setShowPartnerProfile(true);
  };

  const handleSendCollaborationInvite = (inviteData: CollaborationInviteData) => {
    toast.success(t("Collaboration invite sent to {{organization}}", { organization: inviteData.organizationName }));
  };

  useEffect(() => {
    setSelectedParticipantIds(project.invitedUserIds ?? []);
  }, [project.id, project.invitedUserIds]);

  const linkedMission = project.linkedMission;
  const linkedMissionDateRange =
    linkedMission?.startDate && linkedMission?.endDate
      ? `${formatDatePt(linkedMission.startDate)} - ${formatDatePt(linkedMission.endDate)}`
      : "—";

  const linkedMissionApprovalLabel = linkedMission
    ? t(`companyProject.missionApprovalStatus.${linkedMission.approvalStatus}`)
    : "—";
  const linkedMissionApprovalBadgeClass = linkedMission
    ? linkedMission.approvalStatus === "pending"
      ? "bg-amber-500/20 text-amber-700 dark:text-amber-400"
      : linkedMission.approvalStatus === "approved"
        ? "bg-green-500/20 text-green-700 dark:text-green-400"
        : "bg-muted text-muted-foreground"
    : "";
  const linkedMissionExecutionLabel = linkedMission
    ? t(`companyProject.missionExecutionStatus.${linkedMission.executionStatus}`)
    : "—";
  const linkedMissionExecutionBadgeClass = linkedMission
    ? linkedMission.executionStatus === "not_started"
      ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      : linkedMission.executionStatus === "in_progress"
        ? "bg-green-500/20 text-green-700 dark:text-green-400"
        : linkedMission.executionStatus === "completed"
          ? "bg-purple-500/20 text-purple-700 dark:text-purple-400"
          : "bg-muted text-muted-foreground"
    : "";
  const projectDateRange =
    project.startDate && project.endDate
      ? `${formatDatePt(project.startDate)} - ${formatDatePt(project.endDate)}`
      : "—";
  const projectStatusLabel =
    project.status === "completed"
      ? t("companyProject.badgeCompleted")
      : t("companyProject.badgeInProgress");
  const participantsById = new Map(
    (project.invitedUsers ?? []).map((user) => [
      user.id,
      { id: user.id, fullName: user.fullName, email: user.email, department: user.department },
    ])
  );
  for (const participant of availableParticipants) {
    if (!participantsById.has(participant.id)) {
      participantsById.set(participant.id, {
        id: participant.id,
        fullName: participant.fullName,
        email: null,
        department: participant.department,
      });
    }
  }
  const participantDisplayRows = (project.invitedUserIds ?? []).map((id) => {
    const participant = participantsById.get(id);
    if (!participant) {
      return { id, label: t("companyProject.participantFallback", { id }) };
    }
    const name = participant.fullName || participant.email || t("companyProject.participantFallback", { id });
    return {
      id,
      label: participant.department ? `${name} - ${participant.department}` : name,
    };
  });
  const nonprofitRows =
    project.nonprofitPartners && project.nonprofitPartners.length > 0
      ? project.nonprofitPartners.map((partner) => ({
          id: partner.id,
          name: partner.name || t("companyProject.nonprofitNameFallback"),
          logoUrl: partner.logoUrl,
        }))
      : project.nonprofits.map((name, index) => ({
          id: project.partnerNonprofitIds?.[index] ?? name,
          name,
          logoUrl: null as string | null,
        }));

  const handleSubmitComment = async () => {
    const content = newComment.trim();
    if (!content) return;
    try {
      await onCreateComment?.(project.id, content);
      setNewComment("");
    } catch {
      // Error state is handled by parent via `commentError`.
    }
  };

  const formatCommentDateTime = (value: string): string => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleString();
  };

  const toggleParticipantSelection = (id: string) => {
    setSelectedParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((existingId) => existingId !== id) : [...prev, id]
    );
  };

  const handleSaveParticipants = async () => {
    if (!onUpdateParticipants) return;
    try {
      await onUpdateParticipants(project.id, selectedParticipantIds);
      setIsParticipantsDialogOpen(false);
    } catch {
      // Error is shown by parent.
    }
  };
  return (
    <>
      {renderBack?.()}
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{project.title}</h1>
              <Badge variant="outline" className={getCategoryBadgeClass(project.category)}>
                {getCategoryLabel(project.category, t)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {canEditProject ? (
                <Button size="sm" variant="outline" onClick={() => onEditProject?.(project)}>
                  {t("companyProject.editProjectButton")}
                </Button>
              ) : null}
              {canCompleteProject && project.status !== "completed" ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:border-red-300 hover:bg-red-500/10 hover:text-red-700 dark:hover:border-red-800 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                    onClick={() => setShowEndProjectConfirm(true)}
                  >
                    {t("companyProject.endProject")}
                  </Button>
                </>
              ) : null}
            </div>
          </div>
          <p className="text-muted-foreground mt-3">{project.description}</p>
        </div>

        {!project.linkedMissionId && (
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
            <p className="text-sm">{t("companyProject.missionIncompleteBanner")}</p>
            <Button asChild className="mt-2" size="sm">
              <Link
                to={`/missions/create?projectId=${encodeURIComponent(project.id)}`}
              >
                {t("companyProject.createMission")}
              </Link>
            </Button>
          </div>
        )}

        {project.linkedMissionId ? (
          <div className="overflow-hidden rounded-2xl border border-emerald-400/40 bg-emerald-500/10 shadow-md">
            <div className="relative">
              {linkedMission?.missionImageUrl ? (
                <img
                  src={linkedMission.missionImageUrl}
                  alt={linkedMission.title || t("companyProject.linkedMissionTitle")}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="h-44 w-full bg-gradient-to-r from-emerald-600/35 via-emerald-500/20 to-emerald-400/10" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-white/90">
                  {t("companyProject.linkedMissionTitle")}
                </p>
                <h3 className="text-lg font-semibold text-white">
                  {linkedMission?.title ?? t("companyProject.linkedMissionTitle")}
                </h3>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  {t("companyProject.missionLinkedToProjectBanner", { title: project.title })}
                </p>
                <Button asChild size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link to={`/company/missions/${project.linkedMissionId}`}>
                    {t("companyProject.viewLinkedMission")}
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`h-6 px-2.5 text-xs font-medium ${linkedMissionApprovalBadgeClass}`}>
                  {t("companyProject.linkedMissionApprovalLabel")} {linkedMissionApprovalLabel}
                </Badge>
                <Badge className={`h-6 px-2.5 text-xs font-medium ${linkedMissionExecutionBadgeClass}`}>
                  {t("companyProject.linkedMissionExecutionLabel")} {linkedMissionExecutionLabel}
                </Badge>
                <Badge variant="outline" className="h-6 px-2.5 text-xs font-medium">
                  {t("companyProject.linkedMissionFormatLabel")} {linkedMission?.isVirtual ? t("Virtual") : t("In-person")}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                <div className="rounded-lg border bg-background/75 p-3">
                  <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {t("companyProject.linkedMissionScheduleLabel")}
                  </p>
                  <p className="mt-1 font-medium">{linkedMissionDateRange}</p>
                </div>
                <div className="rounded-lg border bg-background/75 p-3">
                  <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {t("companyProject.linkedMissionVolunteersLabel")}
                  </p>
                  <p className="mt-1 font-medium">{linkedMission?.volunteersRequired ?? "—"}</p>
                </div>
                <div className="rounded-lg border bg-background/75 p-3 md:col-span-1">
                  <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {t("companyProject.linkedMissionLocationLabel")}
                  </p>
                  <p className="mt-1 font-medium">{linkedMission?.location || "—"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-8 space-y-6">
            <div>
              <h3 className="mb-4 font-semibold">{t("Project details")}</h3>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("Schedule:")} </span>
                      <span>{projectDateRange}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="h-6 px-2.5 text-xs font-medium">
                      {t("companyProject.projectStatusLabel")}
                    </Badge>
                    <Badge
                      className={`h-6 px-2.5 text-xs font-medium ${
                        project.status === "completed"
                          ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                          : "bg-green-500/20 text-green-700 dark:text-green-400"
                      }`}
                    >
                      {projectStatusLabel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("Category")}: </span>
                      <span>{getCategoryLabel(project.category, t)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("Format:")} </span>
                      <span>{project.projectMode === "virtual" ? t("Virtual") : project.projectMode === "presencial" ? t("In-person") : "—"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("Periodicity:")} </span>
                      <span>{project.periodicidade === "recorrente" ? t("Recurring") : project.periodicidade === "pontual" ? t("One-off") : "—"}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("Location:")} </span>
                      <span>{project.district ?? "—"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("companyProject.locationDetailsLabel")} </span>
                      <span>{project.locationDetails || "—"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("companyProject.targetNonprofitLabel")} </span>
                      <span>{project.targetNonprofitName || "—"}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("Partner institutions:")} </span>
                      <span>{project.nonprofits.length > 0 ? project.nonprofits.join(", ") : t("None")}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-4 space-y-3 lg:col-span-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-sm text-muted-foreground">{t("Team:")} </span>
                      <span>{project.employees} {t("collaborators")}</span>
                    </div>
                  </div>
                  {project.causes && project.causes.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <span className="text-sm text-muted-foreground">{t("Causes:")} </span>
                        <span>{project.causes.join(", ")}</span>
                      </div>
                    </div>
                  ) : null}
                  {project.projectGoals ? (
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground">{t("companyProject.projectGoalsLabel")} </span>
                        <span>{project.projectGoals}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">
                {t("companyProject.commentsTitle")} ({comments.length})
              </h4>
              {project.notes ? (
                <div className="rounded-md border border-border/70 bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground mb-1">{t("companyProject.legacyNoteLabel")}</p>
                  <p className="text-sm whitespace-pre-wrap">{project.notes}</p>
                </div>
              ) : null}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium">
                          {comment.author.fullName || t("companyProject.commentAuthorFallback")}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatCommentDateTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-2">{t("companyProject.commentsEmpty")}</p>
                )}
              </div>

              {canComment ? (
                <div className="space-y-2">
                  <Textarea
                    placeholder={t("companyProject.commentsComposerPlaceholder")}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="resize-none"
                    disabled={isCommentSubmitting}
                  />
                  {commentError ? <p className="text-xs text-destructive">{commentError}</p> : null}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => void handleSubmitComment()}
                      disabled={isCommentSubmitting || newComment.trim().length === 0}
                    >
                      {isCommentSubmitting ? t("companyProject.commentSending") : t("companyProject.commentSend")}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">{t("companyProject.commentPermissionHint")}</p>
              )}
            </div>
          </div>
          <div className="md:col-span-4 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">
                {t("companyProject.participantsSection")} ({participantDisplayRows.length})
              </h3>
              {canEditParticipants ? (
                <div className="mb-3 flex justify-end">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsParticipantsDialogOpen(true)}>
                    {t("companyProject.editParticipantsButton")}
                  </Button>
                </div>
              ) : null}
              <div>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {participantDisplayRows.length > 0 ? (
                  participantDisplayRows.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center gap-3 rounded-lg border border-border/70 bg-transparent px-3 py-2.5 transition-colors hover:border-emerald-300/60 hover:bg-emerald-500/5"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Users className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm">{row.label}</span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-md border border-dashed p-3">
                    <p className="text-sm text-muted-foreground">{t("companyProject.noParticipants")}</p>
                    {canEditParticipants ? (
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 mt-1"
                        onClick={() => setIsParticipantsDialogOpen(true)}
                      >
                        {t("companyProject.editParticipantsButton")}
                      </Button>
                    ) : null}
                  </div>
                )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                {t("Partner institutions")} ({nonprofitRows.length})
              </h3>
              {nonprofitRows.length > 0 ? (
                <div>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {nonprofitRows.map((nonprofit) => (
                      <div
                        key={nonprofit.id}
                        className="rounded-lg border border-border/70 bg-transparent px-3 py-2.5 transition-colors hover:border-emerald-300/60 hover:bg-emerald-500/5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {nonprofit.logoUrl ? (
                              <img
                                src={nonprofit.logoUrl}
                                alt={nonprofit.name}
                                className="w-10 h-10 rounded-full object-cover border"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-purple-500" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{nonprofit.name}</p>
                              <p className="text-xs text-muted-foreground">{t('Nonprofit Partner')}</p>
                            </div>
                          </div>
                          {project.partnerNonprofitIds?.includes(nonprofit.id) ? (
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="shrink-0 border border-emerald-300/40 text-emerald-700 hover:bg-emerald-500/10 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                            >
                              <Link to={`/nonprofit/dashboard/${encodeURIComponent(nonprofit.id)}`}>
                                {t('View Profile')}
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0 border border-emerald-300/40 text-emerald-700 hover:bg-emerald-500/10 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                              onClick={() => handleViewPartnerProfile(nonprofit.name)}
                            >
                              {t('View Profile')}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 border rounded-md border-dashed">
                  <Building2 className="h-10 w-10 text-muted-foreground mb-2" />
                  <h4 className="font-medium mb-1">{t('No Partners Yet')}</h4>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {t('This project has no nonprofit partners. Invite organizations to collaborate.')}
                  </p>
                  <Button type="button" size="sm" variant="outline" onClick={handleInvitePartner}>
                    {t('Invite Nonprofit Partners')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showEndProjectConfirm} onOpenChange={setShowEndProjectConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("companyProject.endProjectConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("companyProject.endProjectConfirmDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
              onClick={() => void handleConfirmEndProject()}
            >
              {t("companyProject.endProject")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ManageTeamMembersDialog
        open={showManageTeam}
        onOpenChange={setShowManageTeam}
        project={project}
        onTeamUpdate={handleTeamUpdate}
      />
      <GenerateReportDialog
        open={showGenerateReport}
        onOpenChange={setShowGenerateReport}
        project={project}
      />
      <ViewOrganizationProfileDialog
        isOpen={showPartnerProfile}
        onClose={() => setShowPartnerProfile(false)}
        organization={selectedPartner}
        onInvite={(orgName) => {
          setSelectedPartner(orgName);
          setShowPartnerProfile(false);
          setShowInvitePartners(true);
        }}
      />
      <SendCollaborationInviteDialog
        isOpen={showInvitePartners}
        onClose={() => setShowInvitePartners(false)}
        organizationName={selectedPartner}
        onSendInvite={handleSendCollaborationInvite}
      />
      <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{t("companyProject.editParticipantsTitle")}</DialogTitle>
            <DialogDescription>{t("companyProject.editParticipantsDescription")}</DialogDescription>
          </DialogHeader>
          <div className="max-h-72 space-y-2 overflow-y-auto">
            {availableParticipants.map((participant) => {
              const checked = selectedParticipantIds.includes(participant.id);
              return (
                <label
                  key={participant.id}
                  className="flex cursor-pointer items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{participant.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {participant.department || t("companyProject.departmentFallback")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {checked ? <Check className="h-4 w-4 text-coompass-success" /> : null}
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleParticipantSelection(participant.id)}
                    />
                  </div>
                </label>
              );
            })}
            {availableParticipants.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("companyProject.noParticipantsAvailableToInvite")}</p>
            ) : null}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsParticipantsDialogOpen(false)} disabled={participantsUpdating}>
              {t("Cancel")}
            </Button>
            <Button onClick={() => void handleSaveParticipants()} disabled={participantsUpdating}>
              {participantsUpdating ? t("companyProject.savingParticipants") : t("Save Changes")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
