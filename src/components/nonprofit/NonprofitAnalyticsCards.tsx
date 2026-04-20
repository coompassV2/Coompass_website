import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNonprofitMissionMetrics } from "@/hooks/useNonprofitMissionMetrics";
import type { MetricsTimeframe, MissionMetricsResponse } from "@/types/analytics";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatMonthLabelPt } from "@/lib/dateFormat";

function monthLabel(monthKey: string): string {
  return formatMonthLabelPt(monthKey);
}

interface NonprofitAnalyticsCardsProps {
  timeframe?: MetricsTimeframe;
  metricsData?: MissionMetricsResponse | null;
  metricsLoading?: boolean;
  metricsError?: string | null;
}

export function NonprofitAnalyticsCards({
  timeframe = "90d",
  metricsData,
  metricsLoading,
  metricsError,
}: NonprofitAnalyticsCardsProps) {
  const { t } = useTranslation();
  const hook = useNonprofitMissionMetrics(timeframe, {
    enabled: metricsData == null && metricsLoading == null && metricsError == null,
  });
  const data = metricsData ?? hook.data;
  const loading = metricsLoading ?? hook.loading;
  const error = metricsError ?? hook.error;
  const missionsByMonth =
    data?.timeseries.missions_by_month.map((point) => ({
      month: monthLabel(point.month),
      missions: point.count,
    })) ?? [];
  const participantsByMonth =
    data?.timeseries.participants_by_month.map((point) => ({
      month: monthLabel(point.month),
      enrolled: point.enrolled,
      completed: point.completed,
    })) ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {error ? (
        <Alert variant="destructive" className="md:col-span-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {/* Nº Missions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            Nº Missions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={missionsByMonth}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, "auto"]}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />
                <Tooltip
                  formatter={(value: number) => [value, "Missions"]}
                  labelFormatter={(label) => label}
                  contentStyle={{
                    fontSize: "12px",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="missions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {!loading && missionsByMonth.length === 0 && (
            <p className="text-xs text-muted-foreground mt-2">{t("No data yet")}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            {t("Participants per Month")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {participantsByMonth.map(({ month, enrolled, completed }) => (
              <div
                key={month}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="text-muted-foreground">{month}</span>
                <span className="font-medium tabular-nums">
                  {completed}/{enrolled}
                </span>
              </div>
            ))}
          </div>
          {!loading && participantsByMonth.length === 0 && (
            <p className="text-xs text-muted-foreground mt-2">{t("No data yet")}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
