import { useCallback, useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MissionHeader } from "@/components/missions/MissionHeader";
import { MissionAbout } from "@/components/missions/MissionAbout";
import { MissionOrganization } from "@/components/missions/MissionOrganization";
import { MissionNotFound } from "@/components/missions/MissionNotFound";
import { MissionSidebar } from "@/components/missions/MissionSidebar";
import { MissionParticipantsInfo } from "@/components/missions/MissionParticipantsInfo";
import { MissionApplicationsTab } from "@/components/missions/MissionApplicationsTab";
import { MissionCompleteDialog } from "@/components/missions/MissionCompleteDialog";
import { MissionMediaSections } from "@/components/missions/MissionMediaSections";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
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
import type { Mission } from "@/types/organization";
import { useAuth } from "@/contexts/AuthContext";
import {
  apiGet,
  apiDelete,
  apiPost,
  getStoredToken,
  listMissionAttachments,
  type MissionAttachmentItem,
} from "@/services/authApi";
import type { ApiMission, MissionResponse, MissionsResponse } from "@/types/missions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDatePt } from "@/lib/dateFormat";

interface NonprofitProfileLookupResponse {
  id: string;
}

interface CompanyProfileLookupResponse {
  id: string;
}

function toMissionCardModel(apiMission: ApiMission): Mission {
  const organization =
    apiMission.organization_name ??
    apiMission.company_name ??
    "";

  return {
    id: apiMission.id,
    title: apiMission.title,
    organization,
    companyId: apiMission.company_id,
    createdByEntityType: apiMission.created_by_entity_type,
    description: apiMission.description || "",
    requirements: apiMission.requirements ?? "",
    hours: apiMission.hours ?? 0,
    volunteers: apiMission.volunteers_required ?? 0,
    location: apiMission.is_virtual ? "Virtual" : apiMission.location || "-",
    district: apiMission.district ?? null,
    isVirtual: apiMission.is_virtual,
    scheduleType: apiMission.schedule_type ?? "one_time",
    postedDate: apiMission.created_at ? formatDatePt(apiMission.created_at, "") : "",
    startDate: apiMission.start_date ? formatDatePt(apiMission.start_date, "") : undefined,
    endDate: apiMission.end_date ? formatDatePt(apiMission.end_date, "") : undefined,
    isActive:
      apiMission.approval_status === "approved" &&
      apiMission.execution_status !== "completed" &&
      apiMission.execution_status !== "cancelled",
    approvalStatus: apiMission.approval_status,
    executionStatus: apiMission.execution_status ?? "not_started",
    startedAt: apiMission.started_at ?? null,
    causes: apiMission.causes ?? [],
    skills: apiMission.skills ?? [],
    isSkillMatch: apiMission.is_skill_match,
    matchedSkillsCount: apiMission.matched_skills_count,
    missionSkillsCount: apiMission.mission_skills_count,
    participantsCount: apiMission.participants_count,
    approvedCandidatesCount: apiMission.approved_candidates_count ?? 0,
    spotsLeft: apiMission.spots_left,
    isFull: apiMission.is_full,
    isJoined: apiMission.is_joined,
    image: apiMission.mission_image_url ?? undefined,
    organizationLogoUrl:
      apiMission.organization_logo_url ?? apiMission.company_logo_url ?? undefined,
    organizationId: apiMission.organization_id,
    projectCategory: apiMission.project_category ?? null,
    projectTitle: apiMission.project_title ?? null,
    beneficiariesCount: apiMission.beneficiaries_count ?? 0,
    requiresInterview: apiMission.requires_interview ?? false,
  };
}

export default function MissionDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isUnderCompanyLayout = location.pathname.startsWith("/company");
  const missionsListPath = isUnderCompanyLayout ? "/company/missions" : "/missions";
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [resolvedNonprofitId, setResolvedNonprofitId] = useState<string | null>(null);
  const [resolvedCompanyId, setResolvedCompanyId] = useState<string | null>(null);
  const [missionFiles, setMissionFiles] = useState<MissionAttachmentItem[]>([]);

  const nonprofitIdFromMetadata =
    (user?.user_metadata as { nonprofit_id?: string } | undefined)?.nonprofit_id ?? null;
  const effectiveNonprofitId = nonprofitIdFromMetadata ?? resolvedNonprofitId;
  const companyIdFromMetadata =
    (user?.user_metadata as { company_id?: string } | undefined)?.company_id ?? null;
  const effectiveCompanyId = companyIdFromMetadata ?? resolvedCompanyId;
  const isMissionOwnedByLoggedNonprofit = Boolean(
    user?.role === "nonprofit" &&
      mission?.organizationId &&
      effectiveNonprofitId &&
      mission.organizationId === effectiveNonprofitId
  );
  const isMissionOwnedByLoggedCompany = Boolean(
    user?.role === "company_admin" &&
      mission?.companyId &&
      effectiveCompanyId &&
      mission.companyId === effectiveCompanyId &&
      mission.createdByEntityType === "company"
  );
  const missionOwnerType: "nonprofit" | "company" | null = isMissionOwnedByLoggedNonprofit
    ? "nonprofit"
    : isMissionOwnedByLoggedCompany
      ? "company"
      : null;
  const canEdit =
    (isMissionOwnedByLoggedNonprofit || isMissionOwnedByLoggedCompany) &&
    mission?.approvalStatus === "approved" &&
    mission?.executionStatus === "not_started" &&
    missionOwnerType !== null;
  const canDelete = Boolean(
    missionOwnerType !== null &&
      mission?.approvalStatus === "approved" &&
      mission?.executionStatus === "not_started"
  );
  const canViewApplications = missionOwnerType !== null;
  const canStartMission = Boolean(
    missionOwnerType !== null &&
    mission?.executionStatus === "not_started" &&
    mission?.isActive === true &&
    (mission?.approvedCandidatesCount ?? 0) > 0
  );
  const canCompleteMission = Boolean(
    missionOwnerType !== null &&
      mission?.approvalStatus === "approved" &&
      mission?.executionStatus === "in_progress"
  );
  const isVolunteer = user?.role === "volunteer";
  const hasNoVacancies = (currentMission: Mission) =>
    currentMission.isFull === true || (currentMission.spotsLeft ?? 0) <= 0;

  const joinDisabledReason = () => {
    if (!mission) return t("Loading...");
    if (!isVolunteer) return t("Volunteer access required");
    if (mission.approvalStatus !== "approved") return t("Mission not approved");
    if (mission.executionStatus === "cancelled") return t("Mission cancelled");
    if (mission.executionStatus === "completed") return t("Mission Completed");
    if (mission.executionStatus === "in_progress") return t("Mission In Progress");
    if (!mission.isActive) return t("Mission unavailable");
    if (joinLoading) return t("Loading...");
    if (mission.isJoined) return t("Leave Mission");
    if (hasNoVacancies(mission)) return t("Spots filled");
    return t("I Want to Help");
  };

  const handleEdit = () => {
    if (!id) return;
    navigate(`/missions/${id}/edit`);
  };

  const handleDeleteClick = () => setDeleteDialogOpen(true);

  const handleDeleteConfirm = async () => {
    if (!id) return;
    setDeleting(true);
    const token = getStoredToken();
    const { error } = await apiDelete(`/api/missions/${id}`, token);
    setDeleting(false);
    setDeleteDialogOpen(false);
    if (error) {
      toast({ title: t("Error"), description: error, variant: "destructive" });
      return;
    }
    toast({ title: t("Mission deleted") });
    navigate(missionOwnerType === "company" ? "/company/our-missions" : "/nonprofit/dashboard");
  };

  const loadMissionFiles = useCallback(async (missionId: string) => {
    const token = getStoredToken();
    const { files } = await listMissionAttachments(missionId, token);
    setMissionFiles(files ?? []);
  }, []);

  const reloadMission = async () => {
    if (!id) return;
    const found = await fetchMissionForContext(id);
    setMission(found ? toMissionCardModel(found) : null);
    if (found) {
      await loadMissionFiles(id);
    } else {
      setMissionFiles([]);
    }
  };

  const handleJoinMission = async () => {
    if (!id || !isVolunteer) return;
    setJoinLoading(true);
    const token = getStoredToken();
    const { error } = await apiPost(`/api/missions/${id}/join`, {}, token);
    setJoinLoading(false);
    if (error) {
      toast({ title: t("Unable to join mission"), description: error, variant: "destructive" });
      return;
    }
    toast({ title: t("Joined mission") });
    await reloadMission();
  };

  const handleLeaveMission = async () => {
    if (!id || !isVolunteer) return;
    setJoinLoading(true);
    const token = getStoredToken();
    const { error } = await apiDelete(`/api/missions/${id}/join`, token);
    setJoinLoading(false);
    if (error) {
      toast({ title: t("Unable to leave mission"), description: error, variant: "destructive" });
      return;
    }
    toast({ title: t("Left mission") });
    await reloadMission();
  };

  const handleStartMission = async () => {
    if (!id || !canStartMission) return;
    setStartLoading(true);
    const token = getStoredToken();
    const endpoint = `/api/missions/${id}/start`;
    const { error } = await apiPost(endpoint, {}, token);
    setStartLoading(false);
    if (error) {
      toast({ title: t("Unable to start mission"), description: error, variant: "destructive" });
      return;
    }
    toast({ title: t("Mission started") });
    await reloadMission();
  };

  const handleCompleteMission = () => {
    if (!canCompleteMission) return;
    setCompleteDialogOpen(true);
  };

  const fetchMissionForContext = useCallback(async (missionId: string): Promise<ApiMission | null> => {
    const token = getStoredToken();
    const { data, error } = await apiGet<MissionResponse>(`/api/missions/${missionId}`, token);
    if (!error && data?.mission) return data.mission;

    // Company mission detail pages can include non-approved missions that are not
    // returned by the public `/api/missions/:id` endpoint.
    if (isUnderCompanyLayout) {
      const { data: companyData, error: companyError } = await apiGet<MissionsResponse>("/api/company/missions", token);
      if (!companyError) {
        return (companyData?.missions ?? []).find((m) => m.id === missionId) ?? null;
      }
    }

    return null;
  }, [isUnderCompanyLayout]);

  useEffect(() => {
    let cancelled = false;
    const loadMission = async () => {
      if (!id) {
        setMission(null);
        setLoading(false);
        return;
      }

      const found = await fetchMissionForContext(id);
      if (cancelled) return;
      setMission(found ? toMissionCardModel(found) : null);
      if (found) {
        await loadMissionFiles(id);
      } else {
        setMissionFiles([]);
      }
      setLoading(false);
    };

    void loadMission();
    return () => {
      cancelled = true;
    };
  }, [id, fetchMissionForContext, loadMissionFiles]);

  useEffect(() => {
    let cancelled = false;

    const resolveNonprofitId = async () => {
      if (user?.role !== "nonprofit") {
        setResolvedNonprofitId(null);
        return;
      }

      if (nonprofitIdFromMetadata) {
        setResolvedNonprofitId(nonprofitIdFromMetadata);
        return;
      }

      const token = getStoredToken();
      if (!token) {
        setResolvedNonprofitId(null);
        return;
      }

      const { data } = await apiGet<NonprofitProfileLookupResponse>("/api/nonprofit/profile", token);
      if (cancelled) return;
      setResolvedNonprofitId(data?.id ?? null);
    };

    void resolveNonprofitId();
    return () => {
      cancelled = true;
    };
  }, [user?.role, nonprofitIdFromMetadata]);

  useEffect(() => {
    let cancelled = false;

    const resolveCompanyId = async () => {
      if (user?.role !== "company_admin") {
        setResolvedCompanyId(null);
        return;
      }

      if (companyIdFromMetadata) {
        setResolvedCompanyId(companyIdFromMetadata);
        return;
      }

      const token = getStoredToken();
      if (!token) {
        setResolvedCompanyId(null);
        return;
      }

      const { data } = await apiGet<CompanyProfileLookupResponse>("/api/company/profile", token);
      if (cancelled) return;
      setResolvedCompanyId(data?.id ?? null);
    };

    void resolveCompanyId();
    return () => {
      cancelled = true;
    };
  }, [user?.role, companyIdFromMetadata]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {!isUnderCompanyLayout && <AppSidebar />}
        <main className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}>
          <PageHeader
            title={t("Mission")}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <p className="text-sm text-muted-foreground">{t("Loading...")}</p>
        </main>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="min-h-screen bg-background">
        {!isUnderCompanyLayout && <AppSidebar />}
        <main className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}>
          <PageHeader 
            title={t('Mission Not Found')}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <MissionNotFound />
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {!isUnderCompanyLayout && <AppSidebar />}
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={mission.title}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link 
                  to={missionsListPath} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('Missions')}
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">{mission.title}</span>
              </li>
            </ol>
          </nav>
        </div>
        
        <MissionHeader
          mission={mission}
          canEdit={canEdit}
          canDelete={canDelete}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          canVolunteerJoin={isVolunteer}
          isJoined={mission.isJoined === true}
          isJoinDisabled={
            joinLoading ||
            !mission.isActive ||
            (!mission.isJoined && hasNoVacancies(mission))
          }
          joinButtonLabel={joinDisabledReason()}
          onJoin={handleJoinMission}
          onLeave={handleLeaveMission}
          canStartMission={canStartMission}
          startMissionLoading={startLoading}
          startMissionLabel={startLoading ? t("Starting...") : t("Start Mission")}
          showStartMissionNotice={
            missionOwnerType !== null &&
            mission.executionStatus === "not_started"
          }
          startMissionNoticeLabel={t("Click only when the initiative starts.")}
          onStartMission={handleStartMission}
          canCompleteMission={canCompleteMission}
          completeMissionLabel={t("Complete Mission")}
          onCompleteMission={handleCompleteMission}
        />
        <MissionCompleteDialog
          missionId={mission.id}
          ownerType={missionOwnerType ?? "nonprofit"}
          open={completeDialogOpen}
          onOpenChange={setCompleteDialogOpen}
          onCompleted={reloadMission}
        />
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogTitle>{t("Delete mission?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("This action cannot be undone. The mission will be permanently removed.")}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>{t("Cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  void handleDeleteConfirm();
                }}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? t("Deleting...") : t("Delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        {canViewApplications ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="details">{t("Details")}</TabsTrigger>
              <TabsTrigger value="applications">{t("Applications")}</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <MissionAbout mission={mission} />
                  <MissionMediaSections
                    files={missionFiles}
                    isCompleted={mission.executionStatus === "completed"}
                  />
                  <MissionOrganization mission={mission} />
                </div>

                <div className="space-y-6">
                  <MissionParticipantsInfo mission={mission} />
                  <MissionSidebar mission={mission} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <MissionApplicationsTab
                missionId={mission.id}
                ownerType={missionOwnerType ?? "nonprofit"}
                missionExecutionStatus={mission.executionStatus}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <MissionAbout mission={mission} />
              <MissionMediaSections
                files={missionFiles}
                isCompleted={mission.executionStatus === "completed"}
              />
              <MissionOrganization mission={mission} />
            </div>

            <div className="space-y-6">
              <MissionParticipantsInfo mission={mission} />
              <MissionSidebar mission={mission} />
            </div>
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
}
