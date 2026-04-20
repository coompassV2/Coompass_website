import { useMissionMetrics } from "@/hooks/useMissionMetrics";
import type { MetricsTimeframe, MissionMetricsResponse } from "@/types/analytics";

type UseMetricsOptions = {
  enabled?: boolean;
  keepPreviousData?: boolean;
};

export function useCompanyMissionMetrics(
  timeframe: MetricsTimeframe = "90d",
  options?: UseMetricsOptions
) {
  return useMissionMetrics<MissionMetricsResponse>("/api/company/mission-metrics", timeframe, options);
}
