import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { CompanyProjectDetailsContent } from "@/components/company/projects/CompanyProjectDetailsContent";
import { apiGet, apiPatch, apiPost, getStoredToken } from "@/services/authApi";
import type { CompanyProject, ProjectComment } from "@/components/company/projects/types";
import { apiCompanyProjectCommentToProjectComment, apiCompanyProjectToCompanyProject } from "@/components/company/projects/mapApiProject";
import type {
  ApiCompanyProject,
  ApiCompanyProjectComment,
  CompanyProjectCommentCreateResponse,
  CompanyProjectCommentsListResponse,
  CompanyProjectSingleResponse,
} from "@/types/companyProjects";
import type { MissionsResponse } from "@/types/missions";

export default function SharedProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<CompanyProject | null>(null);
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProject(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const load = async () => {
      const token = getStoredToken();
      const { data, error } = await apiGet<CompanyProjectSingleResponse>(`/api/company/projects/${id}`, token);
      if (cancelled) return;
      if (error || !data?.project) {
        setProject(null);
        setComments([]);
        setLoading(false);
        return;
      }
      const mapped = apiCompanyProjectToCompanyProject(data.project as ApiCompanyProject);
      mapped.canComment = data.can_comment ?? false;
      setProject(mapped);
      setCommentError(null);
      setLoading(false);
      const { data: commentsData } = await apiGet<CompanyProjectCommentsListResponse>(
        `/api/company/projects/${id}/comments`,
        token
      );
      if (!cancelled) {
        setComments(
          (commentsData?.comments ?? []).map((comment) =>
            apiCompanyProjectCommentToProjectComment(comment as ApiCompanyProjectComment)
          )
        );
      }

      if (mapped.linkedMissionId && !mapped.linkedMission && token) {
        const { data: missionsData } = await apiGet<MissionsResponse>("/api/company/missions", token);
        if (cancelled) return;
        const linkedMission = (missionsData?.missions ?? []).find((m) => m.id === mapped.linkedMissionId);
        if (!linkedMission) return;
        setProject((prev) => {
          if (!prev || prev.id !== mapped.id || prev.linkedMission) return prev;
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
    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleUpdateProject = async (projectId: string | number, newStatus: string, notes: string) => {
    if (newStatus !== "completed" && newStatus !== "active") return;
    const token = getStoredToken();
    if (!token) return;
    await apiPatch(
      `/api/company/projects/${String(projectId)}`,
      { status: newStatus, notes: notes || null },
      token
    );
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <main className={cn("p-4 md:p-8", !isMobile && "responsive-layout")}>
          <PageHeader title={t("Loading...")} theme={theme} toggleTheme={toggleTheme} />
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <main className={cn("p-4 md:p-8", !isMobile && "responsive-layout")}>
          <PageHeader title={t("Project not found")} theme={theme} toggleTheme={toggleTheme} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className={cn("transition-all duration-300 ease-in-out p-4 md:p-8", !isMobile && "responsive-layout")}>
        <PageHeader title={project.title} theme={theme} toggleTheme={toggleTheme} />
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2" asChild>
            <Link to="/projects" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
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
        />
      </main>
    </div>
  );
}
