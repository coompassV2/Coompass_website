import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch, getStoredToken } from "@/services/authApi";
import { SDGAlignmentChart } from "@/components/company/SDGAlignmentChart";
import { AnalyticsTopCards } from "@/components/company/AnalyticsTopCards";
import { BarChartCard } from "@/components/analytics/blocks";
import { CauseAreasByHoursCard } from "@/components/shared/CauseAreasByHoursCard";
import { MonthlyCountTable } from "@/components/shared/MonthlyCountTable";
import { GroupParticipationRankingCard } from "@/components/company/GroupParticipationRankingCard";
import { useCompanyMissionMetrics } from "@/hooks/useCompanyMissionMetrics";
import { TimeframeSelector } from "@/components/analytics/TimeframeSelector";
import type { MetricsTimeframe } from "@/types/analytics";
import { formatMonthLabel } from "@/lib/metricsFormat";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCompanyExtendedMetrics } from "@/hooks/useCompanyExtendedMetrics";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";

export default function CompanyAnalytics() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<MetricsTimeframe>("90d");
  const { data, loading, error } = useCompanyMissionMetrics(timeframe);
  const {
    data: extendedMetrics,
    loading: extendedLoading,
    error: extendedError,
  } = useCompanyExtendedMetrics(timeframe);

  const lineData =
    data?.timeseries.missions_by_month.map((point) => ({
      month: formatMonthLabel(point.month),
      count: point.count,
    })) ?? [];
  const enrolledMonthly =
    data?.timeseries.participants_by_month.map((point) => ({
      month: formatMonthLabel(point.month),
      count: point.enrolled,
    })) ?? [];
  const completedMonthly =
    data?.timeseries.participants_by_month.map((point) => ({
      month: formatMonthLabel(point.month),
      count: point.completed,
    })) ?? [];

  const handleDownloadReport = async () => {
    const token = getStoredToken();
    if (!token) {
      setReportError(t("Unauthorized"));
      return;
    }
    setReportLoading(true);
    setReportError(null);
    try {
      const res = await apiFetch(
        "/api/company/analytics/report",
        { method: "GET" },
        token
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Request failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio-analytics.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setReportError(e instanceof Error ? e.message : "Failed to download report");
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main
        className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <PageHeader
          title={t("Analytics & Reporting")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <TimeframeSelector value={timeframe} onChange={setTimeframe} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadReport}
            disabled={reportLoading}
          >
            <Download className="h-4 w-4 mr-2" />
            {reportLoading ? t("Loading") : t("Relatório")}
          </Button>
        </div>
        {reportError && (
          <p className="text-sm text-destructive mb-4">{reportError}</p>
        )}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {extendedError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{extendedError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-5">
          <AnalyticsTopCards timeframe={timeframe} />
          <SDGAlignmentChart
            radar={extendedMetrics?.sdg_alignment.radar ?? []}
            mostUsed={extendedMetrics?.sdg_alignment.most_used ?? []}
            loading={extendedLoading}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <BarChartCard
              key="hours-trend"
              title={t("Missions started over time")}
              description={t("Monthly mission starts")}
              controls={undefined}
              data={lineData}
              xKey="month"
              series={[{ dataKey: "count", label: "Missions" }]}
              loading={loading}
              domain={[0, "auto"]}
              footer={!loading ? (
                <span>
                  {t("Total")}:{" "}
                  {lineData.reduce((sum, d) => sum + (Number(d.count) || 0), 0).toLocaleString()}{" "}
                  {t("missions")}
                </span>
              ) : undefined}
            />
            <CauseAreasByHoursCard
              title={t("Impact by cause area")}
              data={extendedLoading ? [] : extendedMetrics?.cause_areas_by_hours ?? []}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MonthlyCountTable
              title={t("Participants enrolled monthly")}
              valueColumnLabel={t("Enrolled")}
              data={enrolledMonthly}
              loading={loading}
            />
            <MonthlyCountTable
              title={t("Participants completed monthly")}
              valueColumnLabel={t("Completed")}
              data={completedMonthly}
              loading={loading}
            />
            <GroupParticipationRankingCard
              title={t("Horas por domínio")}
              description={t("Total de horas de voluntariado por domínio da empresa")}
              data={extendedMetrics?.domain_hours_ranking ?? []}
              loading={extendedLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
