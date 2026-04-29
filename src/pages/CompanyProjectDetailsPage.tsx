import { useParams, useNavigate, Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyProjectDetailsContent } from "@/components/company/projects/CompanyProjectDetailsContent";
import { EditCompanyProjectDialog } from "@/components/company/projects/EditCompanyProjectDialog";
import { useState, useEffect } from "react";
import type { CompanyProject, ProjectComment } from "@/components/company/projects/types";
import { apiCompanyProjectCommentToProjectComment, apiCompanyProjectToCompanyProject } from "@/components/company/projects/mapApiProject";
import { apiGet, apiPatch, apiPost, getStoredToken } from "@/services/authApi";
import type { CompanyProjectCommentCreateResponse, CompanyProjectCommentsListResponse, CompanyProjectSingleResponse } from "@/types/companyProjects";
import type { ApiCompanyProject, ApiCompanyProjectComment } from "@/types/companyProjects";
import type { MissionsResponse } from "@/types/missions";
import { fetchCompanyUsers } from "@/services/companyUsersApi";

export default function CompanyProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [project, setProject] = useState<CompanyProject | null>(null);
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [availableParticipants, setAvailableParticipants] = useState<Array<{ id: string; fullName: string; department: string | null }>>([]);
  const [participantsUpdating, setParticipantsUpdating] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isProjectSaving, setIsProjectSaving] = useState(false);

  const loadProject = async (projectId: string, token: string, cancelled: () => boolean) => {
    const { data, error } = await apiGet<CompanyProjectSingleResponse>(`/api/company/projects/${projectId}`, token);
    if (cancelled()) return;
    if (error || !data?.project) {
      setProject(null);
      setComments([]);
      setLoading(false);
      return;
    }
    const mappedProject = apiCompanyProjectToCompanyProject(data.project as ApiCompanyProject);
    mappedProject.canComment = data.can_comment ?? false;
    setProject(mappedProject);
    setCommentError(null);
    setLoading(false);

    const { data: commentsData } = await apiGet<CompanyProjectCommentsListResponse>(`/api/company/projects/${projectId}/comments`, token);
    if (cancelled()) return;
    setComments(
      (commentsData?.comments ?? []).map((comment) =>
        apiCompanyProjectCommentToProjectComment(comment as ApiCompanyProjectComment)
      )
    );

    // Fallback for dev sessions where project endpoint does not include linked mission payload yet.
    if (mappedProject.linkedMissionId && !mappedProject.linkedMission && token) {
      const { data: missionsData, error: missionsError } = await apiGet<MissionsResponse>("/api/company/missions", token);
      if (cancelled() || missionsError) return;
      const linkedMission = (missionsData?.missions ?? []).find((m) => m.id === mappedProject.linkedMissionId);
      if (!linkedMission) return;
      setProject((prev) => {
        if (!prev || prev.id !== mappedProject.id || prev.linkedMission) return prev;
        return {
          ...prev,
          linkedMission: {
            id: linkedMission.id,
            title: linkedMission.title,
            startDate: linkedMission.start_date,
            endDate: linkedMission.end_date,
            missionImageUrl: linkedMission.mission_image_url ?? null,
            approvalStatus: linkedMission.approval_status,
            executionStatus: linkedMission.execution_status ?? "not_started",
            location: linkedMission.location,
            isVirtual: linkedMission.is_virtual,
            volunteersRequired: linkedMission.volunteers_required ?? 0,
          },
        };
      });
    }
  };

  useEffect(() => {
    if (!id) {
      setProject(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const token = getStoredToken();
    if (!token) {
      setProject(null);
      setComments([]);
      setLoading(false);
      return;
    }
    void loadProject(id, token, () => cancelled)
      .catch(() => {
        if (!cancelled) {
          setProject(null);
          setComments([]);
          setLoading(false);
        }
      });
    fetchCompanyUsers({ limit: 200 }).then(({ data }) => {
      if (cancelled) return;
      const rows = (data?.users ?? [])
        .filter((user) => user.source !== "invite")
        .map((user) => ({
          id: user.id,
          fullName: user.full_name || user.email,
          department: user.department ?? null,
        }));
      setAvailableParticipants(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleBack = () => {
    navigate("/company/projects", { state: { returnTo: "projects" } });
  };

  const handleUpdateProject = async (projectId: string | number, newStatus: string, notes: string) => {
    if (newStatus !== "completed" && newStatus !== "active") return;
    const token = getStoredToken();
    if (!token) throw new Error(t("companyProject.sessionExpired"));
    const { error } = await apiPatch(
      `/api/company/projects/${String(projectId)}`,
      { status: newStatus, notes: notes || null },
      token
    );
    if (error) throw new Error(error);
    setProject((prev) => {
      if (!prev || String(prev.id) !== String(projectId)) return prev;
      return {
        ...prev,
        status: newStatus as CompanyProject["status"],
        endedAt: newStatus === "completed" ? new Date().toISOString() : prev.endedAt,
        readyForReport: newStatus === "completed",
        notes: notes || prev.notes,
      };
    });
  };

  const handleCreateComment = async (projectId: string | number, content: string) => {
    const token = getStoredToken();
    if (!token) return;
    setIsCommentSubmitting(true);
    setCommentError(null);
    const { data, error } = await apiPost<CompanyProjectCommentCreateResponse>(
      `/api/company/projects/${String(projectId)}/comments`,
      { content },
      token
    );
    setIsCommentSubmitting(false);
    if (error || !data?.comment) {
      setCommentError(error ?? t("companyProject.commentCreateError"));
      throw new Error(error ?? "Failed to create comment");
    }
    setComments((prev) => [...prev, apiCompanyProjectCommentToProjectComment(data.comment as ApiCompanyProjectComment)]);
  };

  const handleUpdateParticipants = async (projectId: string, invitedUserIds: string[]) => {
    const token = getStoredToken();
    if (!token) return;
    setParticipantsUpdating(true);
    const { error } = await apiPatch<CompanyProjectSingleResponse>(
      `/api/company/projects/${projectId}`,
      { invited_user_ids: invitedUserIds },
      token
    );
    if (error) {
      setParticipantsUpdating(false);
      throw new Error(error ?? "Failed to update participants");
    }
    await loadProject(projectId, token, () => false);
    setParticipantsUpdating(false);
  };

  const handleSaveProject = async (payload: {
    title: string;
    description: string;
    category: string;
    project_mode: string;
    periodicidade: string | null;
    district: string;
    location_details: string | null;
    start_date: string;
    end_date: string;
    project_goals: string | null;
    partner_nonprofit_ids: string[];
    target_nonprofit_id: string | null;
  }) => {
    if (!id) return;
    const token = getStoredToken();
    if (!token) return;
    setIsProjectSaving(true);
    try {
      const { error } = await apiPatch(`/api/company/projects/${id}`, payload, token);
      if (error) {
        throw new Error(error);
      }
      await loadProject(id, token, () => false);
    } finally {
      setIsProjectSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className={cn("p-4 md:p-8", !isMobile && "responsive-layout")}>
          <PageHeader title={t("Loading...")} theme={theme} toggleTheme={toggleTheme} />
        </main>
      </div>
    );
  }

  if (!id || !project) {
    return (
      <div className="min-h-screen bg-background">
        <main className={cn("p-4 md:p-8", !isMobile && "responsive-layout")}>
          <PageHeader title={t("Project not found")} theme={theme} toggleTheme={toggleTheme} />
          <p className="text-muted-foreground">{t("The project you are looking for does not exist or was removed.")}</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/company/projects">{t("Back to projects")}</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className={cn("transition-all duration-300 ease-in-out p-4 md:p-8", !isMobile && "responsive-layout")}>
        <PageHeader title={project.title} theme={theme} toggleTheme={toggleTheme} />
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2" onClick={handleBack} asChild>
            <Link to="/company/projects" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              {t("Projects")}
            </Link>
          </Button>
        </div>
        <CompanyProjectDetailsContent
          project={project}
          comments={comments}
          onUpdateProject={handleUpdateProject}
          onCreateComment={handleCreateComment}
          canComment={project.canComment === true}
          isCommentSubmitting={isCommentSubmitting}
          commentError={commentError}
          canCompleteProject
          canEditProject
          onEditProject={() => setIsEditProjectOpen(true)}
          canEditParticipants
          availableParticipants={availableParticipants}
          onUpdateParticipants={handleUpdateParticipants}
          participantsUpdating={participantsUpdating}
        />
        <EditCompanyProjectDialog
          open={isEditProjectOpen}
          onOpenChange={setIsEditProjectOpen}
          project={project}
          saving={isProjectSaving}
          onSave={handleSaveProject}
        />
      </main>
    </div>
  );
}
