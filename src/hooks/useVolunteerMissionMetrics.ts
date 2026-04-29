import { useMissionMetrics } from "@/hooks/useMissionMetrics";
import type { MetricsTimeframe, VolunteerMissionMetricsResponse } from "@/types/analytics";

type UseMetricsOptions = {
  enabled?: boolean;
  keepPreviousData?: boolean;
};

export function useVolunteerMissionMetrics(
  timeframe: MetricsTimeframe = "90d",
  options?: UseMetricsOptions
) {
  return useMissionMetrics<VolunteerMissionMetricsResponse>("/api/volunteer/mission-metrics", timeframe, options);
}
