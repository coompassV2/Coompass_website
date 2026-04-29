import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ActivitySummary } from "@/components/volunteer/ActivitySummary";
import { RecommendedMissions } from "@/components/volunteer/RecommendedMissions";
import { SEOManager } from "@/components/shared/SEOManager";
import { useEffect, useState } from "react";
import { ImpactResumeModal } from "@/components/volunteer/ImpactResumeModal";
import { VolunteerNonprofitsSidebar } from "@/components/volunteer/VolunteerNonprofitsSidebar";
import { VolunteerProfileCard } from "@/components/volunteer/VolunteerProfileCard";
import { useVolunteerData } from "@/hooks/useVolunteerData";
import { useSessionMode } from "@/hooks/useSessionMode";
import { Skeleton } from "@/components/ui/skeleton";
import type { MetricsTimeframe } from "@/types/analytics";
import { useVolunteerMissionMetrics } from "@/hooks/useVolunteerMissionMetrics";

export default function VolunteerDashboard() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [showImpactResume, setShowImpactResume] = useState(false);
  const [timeframe, setTimeframe] = useState<MetricsTimeframe>("all");
  const { isDemo, userId } = useSessionMode();
  const { volunteerData, loading } = useVolunteerData(userId);
  const metrics = useVolunteerMissionMetrics(timeframe);
  const sessionResolved = true;

  useEffect(() => {
    const persona = localStorage.getItem("demo-persona");
    if (persona !== "volunteer") localStorage.setItem("demo-persona", "volunteer");
  }, []);

  const displayName = isDemo
    ? "Rodrigo Silva"
    : volunteerData?.full_name || t("User");
  const showHeaderSkeleton = !isDemo && (!sessionResolved || loading);

  return (
    <div className="min-h-screen bg-background">
      <SEOManager 
        title={t("Volunteer Dashboard")}
        noIndex={true}
      />
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("Volunteer Dashboard")}
          subtitle={
            showHeaderSkeleton ? (
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <span className="flex items-center gap-2 text-muted-foreground font-normal text-base mt-1">
                {t("Welcome")}, {displayName}
                <span className="inline-flex" aria-hidden="true">💪</span>
              </span>
            )
          }
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-8 order-2 md:order-1">
            <ActivitySummary
              onShowImpactResume={() => setShowImpactResume(true)}
              timeframe={timeframe}
              metricsData={metrics.data}
              metricsLoading={metrics.loading}
              metricsError={metrics.error}
            />
            <RecommendedMissions userId={userId} isDemo={isDemo} />
          </div>

          <div className="space-y-4 md:space-y-6 order-1 md:order-2">
            <VolunteerProfileCard
              userId={userId}
              isDemo={isDemo}
              sessionResolved={sessionResolved}
            />
            <VolunteerNonprofitsSidebar />
          </div>
        </div>
      </main>

      <ImpactResumeModal
        isOpen={showImpactResume}
        onClose={() => setShowImpactResume(false)}
        userId={userId}
        isDemo={isDemo}
      />
    </div>
  );
}
