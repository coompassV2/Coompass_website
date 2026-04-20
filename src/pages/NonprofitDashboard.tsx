import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { NonprofitProfileCard } from "@/components/nonprofit/NonprofitProfileCard";
import { MyMissionsTable } from "@/components/nonprofit/MyMissionsTable";
import { PendingMissionApprovalsTable } from "@/components/nonprofit/PendingMissionApprovalsTable";
import { UpcomingVolunteers } from "@/components/nonprofit/UpcomingVolunteers";
import { SEOManager } from "@/components/shared/SEOManager";
import { apiGet, getStoredToken } from "@/services/authApi";

interface NonprofitHeaderResponse {
  organization_name: string;
}

export default function NonprofitDashboard() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [organizationName, setOrganizationName] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    if (!token) return undefined;

    apiGet<NonprofitHeaderResponse>("/api/nonprofit/profile", token)
      .then(({ data, error }) => {
        if (cancelled || error || !data?.organization_name) return;
        setOrganizationName(data.organization_name);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOManager 
        title={t("Nonprofit Dashboard")}
        noIndex={true}
      />
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={organizationName || t('Nonprofit Dashboard')}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <NonprofitProfileCard showCoverTopRightActions={false} />

        <div className="mt-6 space-y-6">
          <MyMissionsTable />
          <UpcomingVolunteers organizationName={organizationName} />
          <PendingMissionApprovalsTable title={t("Brisa Group Proposed Initiatives")} />
        </div>
      </main>
    </div>
  );
}
