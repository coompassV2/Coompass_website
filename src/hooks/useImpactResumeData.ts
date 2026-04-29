import { useState, useEffect } from "react";
import { getStoredToken, apiGet } from "@/services/authApi";
import type { ImpactResumeData } from "@/components/volunteer/impact-resume/types";

export function useImpactResumeData(userId?: string, isDemo?: boolean) {
  const [data, setData] = useState<ImpactResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || isDemo) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = getStoredToken();
        const result = await apiGet<ImpactResumeData>("/api/volunteer/impact-resume", token);
        if (result.error) {
          setError(result.error);
          setData(null);
          return;
        }
        if (result.data) {
          setData(result.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, isDemo]);

  return { data, loading, error };
}
