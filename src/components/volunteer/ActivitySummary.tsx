import { useTranslation } from "react-i18next";
import { Clock, ListCheck, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImpactKpiCards } from "@/components/shared/ImpactKpiCards";
import { useVolunteerMissionMetrics } from "@/hooks/useVolunteerMissionMetrics";
import type { MetricsTimeframe, VolunteerMissionMetricsResponse } from "@/types/analytics";

interface ActivitySummaryProps {
  onShowImpactResume?: () => void;
  timeframe?: MetricsTimeframe;
  metricsData?: VolunteerMissionMetricsResponse | null;
  metricsLoading?: boolean;
  metricsError?: string | null;
}

export function ActivitySummary({
  onShowImpactResume,
  timeframe = "90d",
  metricsData,
  metricsLoading,
  metricsError,
}: ActivitySummaryProps) {
  const { t } = useTranslation();
  const hook = useVolunteerMissionMetrics(timeframe, {
    enabled: metricsData == null && metricsLoading == null && metricsError == null,
  });
  const data = metricsData ?? hook.data;
  const loading = metricsLoading ?? hook.loading;
  const error = metricsError ?? hook.error;

  // Volunteer impact KPIs (same card style as nonprofit Organization Impact)
  const impactMetrics = [
    {
      label: t("Volunteer Hours"),
      value: loading ? "—" : (data?.volunteer_hours_total ?? 0).toLocaleString(),
      change: "0%",
      positive: true,
      icon: Clock,
      helpText: t("Volunteer Hours Formula"),
    },
    {
      label: t("Completed Missions"),
      value: loading ? "—" : (data?.missions.finished ?? 0).toLocaleString(),
      change: `${data?.participants.completion_rate ?? 0}%`,
      positive: true,
      icon: ListCheck,
      helpText: t("Mission Completion Formula"),
    },
    {
      label: t("Active Missions"),
      value: loading ? "—" : (data?.missions.active ?? 0).toLocaleString(),
      change: `${data?.missions.completion_rate ?? 0}%`,
      positive: true,
      icon: Target,
      helpText: t("Active Missions Formula"),
    },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t("My Activity")}</h3>
        <Button
          size="sm"
          onClick={onShowImpactResume}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs"
        >
          <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
          {t("Track your impact")}
        </Button>
      </div>

      <ImpactKpiCards metrics={impactMetrics} variant="gradient" />
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
