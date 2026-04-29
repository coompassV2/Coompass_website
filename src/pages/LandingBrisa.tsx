import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/landing/Marquee";
import { ImpactHubOnboardingModal } from "@/components/landing/ImpactHubOnboardingModal";
import { BrisaAuthStep } from "@/components/landing/BrisaAuthStep";
import { homeForUser, useAuth } from "@/contexts/AuthContext";
import { missions as staticMissions } from "@/data/missions";
import { formatDatePt } from "@/lib/dateFormat";
import { cn } from "@/lib/utils";
import { apiGet, getStoredToken } from "@/services/authApi";
import { useTheme } from "@/hooks/useTheme";
import type { PublicMarqueeMission, PublicMarqueeMissionsResponse } from "@/types/missions";
import type { Mission } from "@/types/organization";

const COOMPASS_LOGO_URL = "/coompass-logo.png";
const MARQUEE_SIZE = 12;

export default function LandingBrisa() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [showAuthStep, setShowAuthStep] = useState(false);
  const fallbackMarqueeMissions = useMemo(
    () => staticMissions.slice(0, MARQUEE_SIZE),
    []
  );
  const [marqueeMissions, setMarqueeMissions] = useState<Mission[]>(() =>
    staticMissions.slice(0, MARQUEE_SIZE)
  );

  useEffect(() => {
    if (!loading && user) {
      navigate(homeForUser(user), { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    let cancelled = false;

    const toMissionCardModel = (mission: PublicMarqueeMission): Mission => {
      const startDate = mission.startDate ? formatDatePt(mission.startDate, "") : undefined;
      const endDate = mission.endDate ? formatDatePt(mission.endDate, "") : undefined;

      return {
        id: mission.id,
        title: mission.title,
        organization: mission.organization,
        description: mission.description,
        hours: mission.hours,
        volunteers: mission.volunteers,
        location: mission.location,
        isVirtual: mission.isVirtual,
        scheduleType: mission.scheduleType,
        postedDate: mission.postedDate ? formatDatePt(mission.postedDate, "") : "",
        startDate,
        endDate,
        isActive:
          mission.executionStatus !== "completed" &&
          mission.executionStatus !== "cancelled",
        executionStatus: mission.executionStatus,
        causes: mission.causes,
        spotsLeft: mission.spotsLeft,
        isFull: mission.isFull,
        image: mission.image ?? undefined,
        organizationLogoUrl:
          mission.organization_logo_url ?? mission.company_logo_url ?? undefined,
      };
    };

    const loadPublicMissions = async () => {
      const token = getStoredToken();
      const { data, error } = await apiGet<PublicMarqueeMissionsResponse>(
        `/api/missions/public?limit=${MARQUEE_SIZE}`,
        token
      );

      if (cancelled) return;
      if (error || !data?.missions?.length) {
        setMarqueeMissions(fallbackMarqueeMissions);
        return;
      }

      setMarqueeMissions(data.missions.map(toMissionCardModel));
    };

    void loadPublicMissions();

    return () => {
      cancelled = true;
    };
  }, [fallbackMarqueeMissions]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Above-the-fold Hero: full viewport height, pastel ESG gradient + grain */}
      <section
        id="hero"
        className={cn(
          "relative flex min-h-screen h-screen flex-col gap-10 overflow-hidden pl-4 pr-0 md:flex-row md:items-stretch md:justify-between md:gap-8 md:pl-8 md:pr-0 lg:gap-0",
          "bg-gradient-to-br from-emerald-50/95 via-teal-50/90 to-sky-100/95",
          "dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-sky-950/50"
        )}
      >
        {/* Grain overlay - ESG / sustainability texture */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.35] dark:opacity-[0.25]" aria-hidden>
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="landing-brisa-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
            </filter>
            <rect width="100%" height="100%" fill="transparent" filter="url(#landing-brisa-grain)" style={{ mixBlendMode: "overlay" }} />
          </svg>
        </div>

        {/* Left: content or auth step */}
        <div className="relative z-10 flex flex-1 flex-col justify-center gap-8 md:max-w-xl lg:max-w-2xl py-12 pl-8 pr-0 md:py-16 md:pl-16 md:pr-8 lg:pr-0 lg:pl-24">
          <div className="flex items-center gap-3 mt-24">
            <img
              src={
                theme === "dark"
                  ? "/logos/brisa_voluntariado_rgb_branco.png"
                  : "/logos/brisa_voluntariado_rgb_preto.png"
              }
              alt="Brisa"
              className="h-28 w-auto max-w-[400px] object-contain sm:h-32 md:h-48 md:max-w-[640px]"
            />
            <img
              src={theme === "dark" ? "/logos/Impact+dark.png" : "/logos/Impact+light.png"}
              alt="Impact Hub"
              className="h-12 w-auto object-contain sm:h-14 md:h-16"
            />
          </div>

          {showAuthStep ? (
            <BrisaAuthStep onBack={() => setShowAuthStep(false)} />
          ) : (
            <>
              <p className="text-muted-foreground leading-relaxed">
                {t("Employees can browse volunteering missions, join initiatives, track participation, and build an Impact CV—all in one place.")}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="default"
                  className="rounded-md bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                  onClick={() => setShowAuthStep(true)}
                >
                  {t("Register or sign in")}
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="rounded-md hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400 dark:hover:border-emerald-700"
                  onClick={() => setOnboardingOpen(true)}
                >
                  {t("Learn more")}
                </Button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  Okta SSO
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Role-based access")}
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Impact tracking")}
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Build your Impact CV")}
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Volunteer hours recognized")}
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Flexible participation")}
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Recognition & awards")}
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Develop your skills")}
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Join a community")}
                </Badge>
                <Badge variant="secondary" className="rounded-md text-xs font-normal">
                  {t("Corporate volunteering")}
                </Badge>
              </div>
            </>
          )}

          <div className="mt-auto flex items-center gap-2 pt-2">
            <span className="text-[11px] text-muted-foreground">
              {t("landingBrisa.poweredBy")}
            </span>
            <a href="https://www.coompass.org" target="_blank" rel="noreferrer">
              <img
                src={COOMPASS_LOGO_URL}
                alt="Coompass"
                className="h-5 w-auto object-contain md:h-6"
              />
            </a>
          </div>
        </div>

        {/* Right: marquee preview - full height of landing */}
        <div
          id="marquee"
          className="relative z-10 flex flex-1 min-h-0 min-w-0 overflow-hidden w-full max-w-[720px] flex flex-col"
        >
          <Marquee missions={marqueeMissions} className="flex-1 min-h-0" />
        </div>
      </section>

      <ImpactHubOnboardingModal
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        onRegisterClick={() => setShowAuthStep(true)}
      />
    </div>
  );
}
