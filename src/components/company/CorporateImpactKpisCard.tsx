import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Clock, ListCheck, Users } from "lucide-react";
import { useCompanyMissionMetrics } from "@/hooks/useCompanyMissionMetrics";
import type { MetricsTimeframe } from "@/types/analytics";
import { ImpactKpiCards } from "@/components/shared/ImpactKpiCards";

interface KpiItem {
  label: string;
  value: string;
  icon: typeof Clock;
  helpText?: string;
}

interface CorporateImpactKpisCardProps {
  timeframe?: MetricsTimeframe;
}

export function CorporateImpactKpisCard({ timeframe = "90d" }: CorporateImpactKpisCardProps) {
  const { t } = useTranslation();
  const { data, loading, error } = useCompanyMissionMetrics(timeframe);
  const totalMissions = data?.total_missions ?? 0;
  const totalActiveMissions = data?.total_active_missions ?? 0;
  const totalVolunteerHours = data?.volunteer_hours_total ?? 0;
  const totalBeneficiariesImpacted = data?.beneficiaries_completed_total ?? 0;

  const kpis: KpiItem[] = [
    {
      label: t("Total Missions"),
      value: totalMissions.toLocaleString(),
      icon: ListCheck,
      helpText: t("Total Missions Formula"),
    },
    {
      label: t("Active Missions"),
      value: totalActiveMissions.toLocaleString(),
      icon: ListCheck,
      helpText: t("Active Missions Formula"),
    },
    {
      label: t("Volunteer Hours"),
      value: totalVolunteerHours.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      icon: Clock,
      helpText: t("Volunteer Hours Formula"),
    },
    {
      label: t("Total Beneficiaries Impacted"),
      value: totalBeneficiariesImpacted.toLocaleString(),
      icon: Users,
      helpText: t("Beneficiaries Impacted Formula"),
    },
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">{t("Corporate Impact")}</h4>
      <ImpactKpiCards
        metrics={kpis.map((kpi) => ({
          ...kpi,
          value: loading ? "—" : kpi.value,
        }))}
        variant="gradient"
      />
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : null}
      <Link
        to="/company/analytics"
        className="inline-block text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {t("For detailed analytics")}
      </Link>
    </div>
  );
}
