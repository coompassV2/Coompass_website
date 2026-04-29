import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyProjectsList } from "@/components/company/projects/CompanyProjectsList";
import { apiCompanyProjectToCompanyProject } from "@/components/company/projects/mapApiProject";
import { filterProjects } from "@/components/company/projects/ProjectsData";
import { apiGet, getStoredToken } from "@/services/authApi";
import type { CompanyProjectsListResponse } from "@/types/companyProjects";
import type { CompanyProject } from "@/components/company/projects/types";
import { toast } from "sonner";

export default function SharedProjectsPage() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [projects, setProjects] = useState<CompanyProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const token = getStoredToken();
      if (!token) {
        if (!cancelled) {
          setProjects([]);
          setLoading(false);
        }
        return;
      }
      const { data, error } = await apiGet<CompanyProjectsListResponse>("/api/company/projects", token);
      if (cancelled) return;
      if (error) {
        toast.error(t("companyProject.loadError"));
        setProjects([]);
        setLoading(false);
        return;
      }
      setProjects((data?.projects ?? []).map(apiCompanyProjectToCompanyProject));
      setLoading(false);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [t]);

  const activeProjects = useMemo(() => filterProjects(projects, "active", ""), [projects]);
  const completedProjects = useMemo(() => filterProjects(projects, "completed", ""), [projects]);

  const noopUpdate = (_projectId: string | number, _newStatus: string, _notes: string) => {};

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className={cn("transition-all duration-300 ease-in-out p-4 md:p-8", !isMobile && "responsive-layout")}>
        <PageHeader title={t("companyProject.listPageTitle")} theme={theme} toggleTheme={toggleTheme} />
        <div className="mb-4">
          <Link to="/missions" className="text-sm text-muted-foreground hover:text-foreground">
            {t("Missions")}
          </Link>
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
                onUpdateProject={noopUpdate}
                canEndProject={false}
                detailsBasePath="/projects"
              />
            </TabsContent>
            <TabsContent value="completed">
              <CompanyProjectsList
                status="completed"
                projects={completedProjects}
                onUpdateProject={noopUpdate}
                canEndProject={false}
                detailsBasePath="/projects"
              />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
