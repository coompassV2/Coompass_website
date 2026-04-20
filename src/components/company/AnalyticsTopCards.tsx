import { useTranslation } from "react-i18next";
import { Users, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getStoredToken, apiGet } from "@/services/authApi";
import type { MetricsTimeframe } from "@/types/analytics";

const GRADIENT = "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 40%, #5a9c6e 100%)";

export interface AnalyticsTopCardsResponse {
  timeframe?: MetricsTimeframe;
  total_volunteer_hours?: number;
  total_active_missions?: number;
  total_beneficiaries_impacted?: number;
  participation_rate: number;
  registered_users: number;
  active_volunteers: number;
  impact_score: number;
  impact_target: number | null;
}

type State = "loading" | "empty" | "error" | "ready";

interface AnalyticsTopCardsProps {
  timeframe: MetricsTimeframe;
}

export function AnalyticsTopCards({ timeframe }: AnalyticsTopCardsProps) {
  const { t } = useTranslation();
  const [state, setState] = useState<State>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsTopCardsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    if (!token) {
      setState("error");
      setErrorMsg(t("Unauthorized"));
      return;
    }
    setState("loading");
    apiGet<AnalyticsTopCardsResponse>(
      `/api/company/impact-kpis?${new URLSearchParams({ timeframe }).toString()}`,
      token
    )
      .then(({ data: res, error: err }) => {
        if (cancelled) return;
        if (err) {
          setState("error");
          setErrorMsg(err);
          return;
        }
        if (!res) {
          setState("empty");
          return;
        }
        setData(res);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) {
          setState("error");
          setErrorMsg(t("Failed to load"));
        }
      });
    return () => { cancelled = true; };
  }, [t, timeframe]);

  const isEmpty = state === "ready" && data && data.registered_users === 0 && data.impact_score === 0;

  if (state === "loading") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden p-4 animate-pulse"
            style={{ background: GRADIENT }}
          >
            <div className="h-4 bg-white/20 rounded w-1/2 mb-3" />
            <div className="h-8 bg-white/30 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (state === "error") {
    return (
      <div
        className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm"
        role="alert"
      >
        {errorMsg ?? t("Failed to load")}
      </div>
    );
  }

  if (state === "empty" || isEmpty) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-lg overflow-hidden p-4"
          style={{ background: GRADIENT }}
        >
          <div className="flex items-center justify-between text-white/90 text-sm">
            <span>{t("Participação dos colaboradores")}</span>
            <Users className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">0%</p>
          <p className="mt-1 text-xs text-white/80">{t("Sem atividade no período")}</p>
        </div>
        <div
          className="rounded-lg overflow-hidden p-4"
          style={{ background: GRADIENT }}
        >
          <div className="flex items-center justify-between text-white/90 text-sm">
            <span>{t("Pontuação de impacto")}</span>
            <ArrowUp className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">0</p>
          <p className="mt-1 text-xs text-white/80">{t("Sem atividade no período")}</p>
        </div>
      </div>
    );
  }

  const participationRate = data?.participation_rate ?? 0;
  const registeredUsers = data?.registered_users ?? 0;
  const activeVolunteers = data?.active_volunteers ?? 0;
  const impactScore = data?.impact_score ?? 0;
  const impactTarget = data?.impact_target;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        className="rounded-lg overflow-hidden p-4"
        style={{ background: GRADIENT }}
      >
        <div className="flex items-center justify-between text-white/90 text-xs">
          <span className="font-medium">{t("Participação dos colaboradores")}</span>
          <Users className="h-4 w-4" />
        </div>
        <p className="text-xs text-white/80 mt-0.5">{t("Registados / Ativos")}</p>
        <p className="mt-2 text-2xl font-semibold text-white drop-shadow-sm">
          {participationRate}%
        </p>
        <p className="mt-1 text-xs text-white/80">
          {t("Ativos")}: {activeVolunteers.toLocaleString()} / {t("Registados")}: {registeredUsers.toLocaleString()}
        </p>
      </div>
      <div
        className="rounded-lg overflow-hidden p-4"
        style={{ background: GRADIENT }}
      >
        <div className="flex items-center justify-between text-white/90 text-xs">
          <span className="font-medium">{t("Pontuação de impacto")}</span>
          <ArrowUp className="h-4 w-4" />
        </div>
        <p className="text-xs text-white/80 mt-0.5">{t("Este mês / Meta")}</p>
        <p className="mt-2 text-2xl font-semibold text-white drop-shadow-sm">
          {impactScore}
        </p>
        <p className="mt-1 text-xs text-white/80">
          {t("Meta")}: {impactTarget != null ? impactTarget : "—"}
        </p>
      </div>
    </div>
  );
}
