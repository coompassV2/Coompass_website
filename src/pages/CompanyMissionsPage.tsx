import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { CompanyMissionsSection } from "@/components/company/CompanyMissionsSection";
import { CompanyScheduledMissionsTable } from "@/components/company/CompanyScheduledMissionsTable";
import { SEOManager } from "@/components/shared/SEOManager";
import { useEffect, useMemo, useState } from "react";
import { ApiMission, IncompleteMissionSetup, MissionsResponse } from "@/types/missions";
import { apiGet, getStoredToken } from "@/services/authApi";

export default function CompanyMissionsPage() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [missions, setMissions] = useState<ApiMission[]>([]);
  const [incompleteMissionSetups, setIncompleteMissionSetups] = useState<IncompleteMissionSetup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCompanyName, setCurrentCompanyName] = useState<string | null>(null);
  /** Missions created by this company (excludes partner nonprofit–originated missions that share company_id). */
  const missionsCreatedByCompany = useMemo(
    () => missions.filter((m) => m.created_by_entity_type === "company"),
    [missions]
  );
  const scheduledMissions = useMemo(
    () =>
      missionsCreatedByCompany.filter((mission) => {
        const executionStatus = mission.execution_status ?? "not_started";
        return mission.approval_status !== "rejected" && executionStatus === "not_started";
      }),
    [missionsCreatedByCompany]
  );
  const activeMissions = useMemo(
    () =>
      missionsCreatedByCompany.filter((mission) => {
        const executionStatus = mission.execution_status ?? "not_started";
        return mission.approval_status !== "rejected" && executionStatus === "in_progress";
      }),
    [missionsCreatedByCompany]
  );
  const pastMissions = useMemo(
    () =>
      missionsCreatedByCompany.filter((mission) => {
        const executionStatus = mission.execution_status ?? "not_started";
        return (
          mission.approval_status === "rejected" ||
          executionStatus === "completed" ||
          executionStatus === "cancelled"
        );
      }),
    [missionsCreatedByCompany]
  );

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    Promise.all([
      apiGet<MissionsResponse>("/api/company/missions", token),
      apiGet<{ company_name?: string }>("/api/company/profile", token),
    ])
      .then(([missionsRes, profileRes]) => {
        if (cancelled) return;
        const n = profileRes.data?.company_name;
        if (typeof n === "string" && n.trim().length > 0) {
          setCurrentCompanyName(n.trim());
        }
        if (missionsRes.error) {
          setMissions([]);
          setIncompleteMissionSetups([]);
          setIsLoading(false);
          return;
        }
        setMissions(missionsRes.data?.missions ?? []);
        setIncompleteMissionSetups(missionsRes.data?.incomplete_mission_setups ?? []);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setMissions([]);
        setIncompleteMissionSetups([]);
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOManager
        title={t("Our Missions")}
        noIndex={true}
      />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <PageHeader
          title={t("Our Missions")}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="space-y-4 md:space-y-6 mt-6">
          <CompanyScheduledMissionsTable
            missions={scheduledMissions}
            isLoading={isLoading}
            currentCompanyName={currentCompanyName}
          />
          <CompanyMissionsSection
            activeMissions={activeMissions}
            pastMissions={pastMissions}
            incompleteMissionSetups={incompleteMissionSetups}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}
