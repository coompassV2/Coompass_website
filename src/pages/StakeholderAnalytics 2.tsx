import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import {
  KpiStatGrid,
  LineChartCard,
  BarChartCard,
  DonutChartCard,
} from "@/components/analytics/blocks";
import {
  analyticsDefinitions,
  resolveKpiItems,
} from "@/features/analytics/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const PERSONA = "stakeholder" as const;

/** No real data yet for stakeholder; all empty until wired. */
function useStakeholderAnalyticsData(timeframe: string) {
  const kpiData: Record<string, string | number | undefined> = {};
  const lineData: Record<string, string | number>[] = [];
  const barData: Record<string, string | number>[] = [];
  const donutData: { name: string; value: number }[] = [];
  return { kpiData, lineData, barData, donutData, loading: false };
}

export default function StakeholderAnalytics() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [timeframe, setTimeframe] = useState("90d");
  const { kpiData, lineData, barData, donutData, loading } =
    useStakeholderAnalyticsData(timeframe);

  const config = analyticsDefinitions[PERSONA];
  const kpiItems = resolveKpiItems(PERSONA, kpiData);

  const timeframeControls = (
    <Select value={timeframe} onValueChange={setTimeframe}>
      <SelectTrigger className="w-[140px]" aria-label={t("Timeframe")}>
        <SelectValue placeholder={t("Timeframe")} />
      </SelectTrigger>
      <SelectContent>
        {config.timeframes.map((tf) => (
          <SelectItem key={tf} value={tf}>
            {tf === "7d"
              ? t("Last 7 days")
              : tf === "30d"
                ? t("Last 30 days")
                : tf === "90d"
                  ? t("Last 90 days")
                  : tf === "quarter"
                    ? t("This quarter")
                    : t("This year")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

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

        <div className="space-y-5">
          <KpiStatGrid items={kpiItems} loading={loading} columns={4} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {config.lineCharts.map((chart) => (
              <LineChartCard
                key={chart.id}
                title={chart.title}
                description={chart.description}
                controls={timeframeControls}
                data={lineData}
                xKey={chart.xKey}
                series={chart.series}
                loading={loading}
              />
            ))}
            {config.barCharts.map((chart) => (
              <BarChartCard
                key={chart.id}
                title={chart.title}
                description={chart.description}
                controls={timeframeControls}
                data={barData}
                xKey={chart.xKey}
                series={chart.series}
                loading={loading}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.donutCharts.map((chart) => (
              <DonutChartCard
                key={chart.id}
                title={chart.title}
                description={chart.description}
                controls={timeframeControls}
                data={donutData}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
