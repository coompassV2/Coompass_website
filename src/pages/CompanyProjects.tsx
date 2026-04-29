import { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyProjectsList } from "@/components/company/projects/CompanyProjectsList";
import { filterProjects } from "@/components/company/projects/ProjectsData";
import type { CompanyProject } from "@/components/company/projects/types";
import { apiCompanyProjectToCompanyProject } from "@/components/company/projects/mapApiProject";
import { apiGet, apiPatch, getStoredToken } from "@/services/authApi";
import type { CompanyProjectsListResponse } from "@/types/companyProjects";
import { toast } from "sonner";

export default function CompanyProjects() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [projects, setProjects] = useState<CompanyProject[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setProjects([]);
      setLoading(false);
      return;
    }
    const { data, error } = await apiGet<CompanyProjectsListResponse>("/api/company/projects", token);
    if (error) {
      toast.error(t("companyProject.loadError"));
      setProjects([]);
      setLoading(false);
      return;
    }
    const rows = data?.projects ?? [];
    setProjects(rows.map(apiCompanyProjectToCompanyProject));
    setLoading(false);
  }, [t]);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    const state = location.state as { refreshProjects?: boolean } | null;
    if (state?.refreshProjects) {
      void loadProjects();
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.state, location.pathname, loadProjects]);

  const activeProjects = useMemo(
    () => filterProjects(projects, "active", ""),
    [projects]
  );
  const completedProjects = useMemo(
    () => filterProjects(projects, "completed", ""),
    [projects]
  );

  const handleUpdateProject = async (projectId: string | number, newStatus: string, notes: string) => {
    if (newStatus !== "completed" && newStatus !== "active") return;
    const token = getStoredToken();
    if (!token) {
      toast.error(t("companyProject.sessionExpired"));
      return;
    }
    const { error } = await apiPatch(
      `/api/company/projects/${String(projectId)}`,
      { status: newStatus, notes: notes || null },
      token
    );
    if (error) {
      toast.error(error);
      return;
    }
    setProjects((prev) =>
      prev.map((p) =>
        String(p.id) === String(projectId)
          ? {
              ...p,
              status: newStatus as CompanyProject["status"],
              endedAt: newStatus === "completed" ? new Date().toISOString() : p.endedAt,
              readyForReport: newStatus === "completed",
              notes: notes || p.notes,
            }
          : p
      )
    );
    toast.success(
      newStatus === "completed"
        ? t("companyProject.endedSuccess")
        : t("Project status updated successfully")
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("companyProject.listPageTitle")}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex gap-2">
            <Button
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              asChild
            >
              <Link to="/company/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                {t("Create Project")}
              </Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground py-8">{t("Loading...")}</p>
        ) : (
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid grid-cols-2 gap-4 w-full max-w-md">
            <TabsTrigger value="active">{t("Active (tabs)")}</TabsTrigger>
            <TabsTrigger value="completed">{t("Completed")}</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <CompanyProjectsList
              status="active"
              projects={activeProjects}
              onUpdateProject={handleUpdateProject}
            />
          </TabsContent>

          <TabsContent value="completed">
            <CompanyProjectsList
              status="completed"
              projects={completedProjects}
              onUpdateProject={handleUpdateProject}
            />
          </TabsContent>
        </Tabs>
        )}
      </main>
    </div>
  );
}
