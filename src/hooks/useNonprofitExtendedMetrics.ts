import { useEffect, useState } from "react";
import { apiGet, getStoredToken } from "@/services/authApi";
import type { MetricsTimeframe, NonprofitExtendedMetricsResponse } from "@/types/analytics";

type UseMetricsOptions = {
  enabled?: boolean;
  keepPreviousData?: boolean;
};

export function useNonprofitExtendedMetrics(
  timeframe: MetricsTimeframe = "90d",
  options?: UseMetricsOptions
) {
  const { enabled = true, keepPreviousData = true } = options ?? {};
  const [data, setData] = useState<NonprofitExtendedMetricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const params = new URLSearchParams({ timeframe });

    async function run() {
      setLoading(true);
      setError(null);
      const token = getStoredToken();
      const response = await apiGet<NonprofitExtendedMetricsResponse>(
        `/api/nonprofit/analytics/extended-metrics?${params.toString()}`,
        token
      );

      if (cancelled) return;

      if (response.error) {
        setError(response.error);
        if (!keepPreviousData) setData(null);
        setLoading(false);
        return;
      }

      setData(response.data ?? null);
      setLoading(false);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [timeframe, enabled, keepPreviousData]);

  return { data, loading, error };
}
