import { useEffect, useState } from "react";
import { apiGet, getStoredToken } from "@/services/authApi";
import type {
  MetricsTimeframe,
  MissionMetricsResponse,
  VolunteerMissionMetricsResponse,
} from "@/types/analytics";

type HookState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseMissionMetricsOptions = {
  enabled?: boolean;
  keepPreviousData?: boolean;
};

function buildPath(basePath: string, timeframe: MetricsTimeframe): string {
  const params = new URLSearchParams({ timeframe });
  return `${basePath}?${params.toString()}`;
}

export function useMissionMetrics<T extends MissionMetricsResponse | VolunteerMissionMetricsResponse>(
  basePath: string,
  timeframe: MetricsTimeframe = "90d",
  options: UseMissionMetricsOptions = {}
): HookState<T> {
  const { enabled = true, keepPreviousData = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      const token = getStoredToken();
      const path = buildPath(basePath, timeframe);
      const { data: response, error: reqError } = await apiGet<T>(path, token);
      if (cancelled) return;

      if (reqError) {
        setError(reqError);
        if (!keepPreviousData) setData(null);
        setLoading(false);
        return;
      }

      setData(response ?? null);
      setLoading(false);
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [basePath, timeframe, enabled, keepPreviousData]);

  return { data, loading, error };
}
