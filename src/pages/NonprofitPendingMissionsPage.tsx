import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { PendingMissionApprovalsTable } from "@/components/nonprofit/PendingMissionApprovalsTable";
import { ChevronLeft } from "lucide-react";
import { SEOManager } from "@/components/shared/SEOManager";

export default function NonprofitPendingMissionsPage() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <SEOManager title={t("Pending Mission Approvals")} noIndex={true} />
      <AppSidebar />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <PageHeader title={t("Pending Mission Approvals")} theme={theme} toggleTheme={toggleTheme} />
        <div className="mb-4">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2" asChild>
            <Link
              to="/nonprofit/dashboard"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("Back")}
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          <PendingMissionApprovalsTable maxVisible={0} showViewAllLink={false} />
        </div>
      </main>
    </div>
  );
}
