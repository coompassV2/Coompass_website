import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { NonprofitProfileCard, type NonprofitProfileResponse } from "@/components/nonprofit/NonprofitProfileCard";
import { MyMissionsTable } from "@/components/nonprofit/MyMissionsTable";
import { UpcomingVolunteers } from "@/components/nonprofit/UpcomingVolunteers";
import { SEOManager } from "@/components/shared/SEOManager";
import { apiGet, getStoredToken } from "@/services/authApi";
import type { MissionMetricsResponse } from "@/types/analytics";
import { useAuth } from "@/contexts/AuthContext";

type PublicNonprofitProfileResponse = NonprofitProfileResponse;

export default function NonprofitPublicDashboard() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();

  const [profile, setProfile] = useState<PublicNonprofitProfileResponse | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [impactMetrics, setImpactMetrics] = useState<MissionMetricsResponse | null>(null);
  const [loadingImpactMetrics, setLoadingImpactMetrics] = useState(true);
  const [impactMetricsError, setImpactMetricsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      const nonprofitId = (id || "").trim();
      if (!nonprofitId) {
        setProfileError("missing-id");
        setLoadingProfile(false);
        return;
      }

      setLoadingProfile(true);
      const token = getStoredToken();
      const { data, error } = await apiGet<PublicNonprofitProfileResponse>(
        `/api/nonprofit/public-profile?id=${encodeURIComponent(nonprofitId)}`,
        token
      );

      if (cancelled) return;

      if (error) {
        setProfile(null);
        setProfileError(error);
      } else {
        setProfile(data ?? null);
        setProfileError(null);
      }
      setLoadingProfile(false);
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    const loadImpactMetrics = async () => {
      const nonprofitId = (id || "").trim();
      if (!nonprofitId) {
        setImpactMetrics(null);
        setImpactMetricsError("missing-id");
        setLoadingImpactMetrics(false);
        return;
      }

      setLoadingImpactMetrics(true);
      const token = getStoredToken();
      const { data, error } = await apiGet<MissionMetricsResponse>(
        `/api/nonprofit/public-mission-metrics?id=${encodeURIComponent(nonprofitId)}`,
        token
      );

      if (cancelled) return;

      if (error) {
        setImpactMetrics(null);
        setImpactMetricsError(error);
      } else {
        setImpactMetrics(data ?? null);
        setImpactMetricsError(null);
      }
      setLoadingImpactMetrics(false);
    };

    void loadImpactMetrics();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const title = profile?.organization_name || t("Nonprofit Dashboard");
  const isNonprofitViewer = user?.role === "nonprofit";

  return (
    <div className="min-h-screen bg-background">
      <SEOManager title={title} noIndex={true} />
      <AppSidebar />

      <main
        className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <PageHeader title={title} theme={theme} toggleTheme={toggleTheme} loading={loadingProfile} />

        {profileError && !loadingProfile ? (
          <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            {t("Unable to load nonprofit profile.")}
          </div>
        ) : null}

        {!profileError && (profile || loadingProfile) ? (
          <>
            <NonprofitProfileCard
              profile={profile}
              impactMetricsData={impactMetrics}
              impactMetricsLoading={loadingImpactMetrics}
              impactMetricsError={impactMetricsError}
            />

            <div className="mt-6 space-y-6">
              {isNonprofitViewer ? (
                <>
                  <MyMissionsTable
                    showLaunchMission={false}
                    organizationNameOverride={profile?.organization_name}
                    nonprofitId={id}
                    readOnly={true}
                  />
                  <UpcomingVolunteers
                    organizationName={profile?.organization_name}
                    nonprofitId={id}
                  />
                </>
              ) : (
                <>
                  <UpcomingVolunteers
                    organizationName={profile?.organization_name}
                    nonprofitId={id}
                  />
                  <MyMissionsTable
                    showLaunchMission={false}
                    organizationNameOverride={profile?.organization_name}
                    nonprofitId={id}
                    readOnly={true}
                  />
                </>
              )}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
