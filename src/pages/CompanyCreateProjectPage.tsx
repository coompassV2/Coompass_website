import { useNavigate, Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { CreateCompanyProjectForm } from "@/components/company/projects/CreateCompanyProjectForm";

export default function CompanyCreateProjectPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const handleCancel = () => {
    navigate("/company/projects");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className={cn("transition-all duration-300 ease-in-out p-4 md:p-8", !isMobile && "responsive-layout")}>
        <PageHeader title={t("Create Project")} theme={theme} toggleTheme={toggleTheme} />
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2" asChild>
            <Link to="/company/projects" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              {t("Projects")}
            </Link>
          </Button>
        </div>
        <CreateCompanyProjectForm
          onSuccess={(result) => {
            if (result.nextStep === "mission" && result.createMissionAfter) {
              navigate(`/missions/create?projectId=${encodeURIComponent(result.project.id)}`, {
                replace: true,
              });
              return;
            }
            navigate(`/company/projects/${encodeURIComponent(result.project.id)}`, {
              replace: true,
            });
          }}
          onCancel={handleCancel}
          showHeader={true}
        />
      </main>
    </div>
  );
}
