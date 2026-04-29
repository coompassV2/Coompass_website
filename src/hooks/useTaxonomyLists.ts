import { useEffect, useState } from "react";
import { apiGet, getStoredToken } from "@/services/authApi";

export interface TaxonomyItem {
  id: string;
  name: string;
  slug?: string;
  key?: string;
}

export interface SdgItem {
  id: number;
  name: string;
  key?: string;
  image_url?: string | null;
}

interface TaxonomyState {
  skills: TaxonomyItem[];
  causes: TaxonomyItem[];
  sdgs: SdgItem[];
  loading: boolean;
  error: string | null;
}

export function useTaxonomyLists(): TaxonomyState {
  const [skills, setSkills] = useState<TaxonomyItem[]>([]);
  const [causes, setCauses] = useState<TaxonomyItem[]>([]);
  const [sdgs, setSdgs] = useState<SdgItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();

    const load = async () => {
      setLoading(true);
      setError(null);
      const [skillsRes, causesRes, sdgsRes] = await Promise.all([
        apiGet<{ skills: TaxonomyItem[] }>("/api/skills", token),
        apiGet<{ causes: TaxonomyItem[] }>("/api/causes", token),
        apiGet<{ sdgs: SdgItem[] }>("/api/social-development-goals", token),
      ]);

      if (cancelled) return;

      if (skillsRes.error || causesRes.error || sdgsRes.error) {
        setError(skillsRes.error || causesRes.error || sdgsRes.error || "Failed to load lists.");
        setLoading(false);
        return;
      }

      setSkills(skillsRes.data?.skills ?? []);
      setCauses(causesRes.data?.causes ?? []);
      setSdgs(sdgsRes.data?.sdgs ?? []);
      setLoading(false);
    };

    load().catch((err) => {
      if (cancelled) return;
      setError(err instanceof Error ? err.message : "Failed to load lists.");
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { skills, causes, sdgs, loading, error };
}
