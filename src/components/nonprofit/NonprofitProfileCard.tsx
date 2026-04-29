import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Globe, ExternalLink, Users, ListCheck, Heart } from "lucide-react";
import { ImpactKpiCards } from "@/components/shared/ImpactKpiCards";
import { apiGet, getStoredToken } from "@/services/authApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNonprofitMissionMetrics } from "@/hooks/useNonprofitMissionMetrics";
import type { MetricsTimeframe, MissionMetricsResponse } from "@/types/analytics";
import { translateSdgName } from "@/utils/sdgI18n";

const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

function getSdgImageUrl(goal: number): string {
  return `${SDG_IMAGE_BASE}-${goal}.jpg`;
}

export interface NonprofitProfileResponse {
  id: string;
  organization_name: string;
  description: string | null;
  organization_type: string | null;
  year_founded: number | null;
  website: string | null;
  avatar_url: string | null;
  location: string | null;
  sdgs?: Array<{ id: number; name: string; image_url?: string | null }>;
  dashboard_banner_url?: string | null;
  cover_image_url?: string | null;
  causes?: Array<{ id: string; name: string; key?: string; slug?: string }>;
}

interface NonprofitProfileCardProps {
  profile?: NonprofitProfileResponse | null;
  timeframe?: MetricsTimeframe;
  showImpactMetrics?: boolean;
  showCoverTopRightActions?: boolean;
  impactMetricsData?: MissionMetricsResponse | null;
  impactMetricsLoading?: boolean;
  impactMetricsError?: string | null;
}

export function NonprofitProfileCard({
  profile,
  timeframe = "90d",
  showImpactMetrics = true,
  showCoverTopRightActions = true,
  impactMetricsData,
  impactMetricsLoading,
  impactMetricsError,
}: NonprofitProfileCardProps) {
  const { t } = useTranslation();
  const [nonprofit, setNonprofit] = useState<NonprofitProfileResponse | null>(profile ?? null);
  const [isLoading, setIsLoading] = useState(true);
  const hook = useNonprofitMissionMetrics(timeframe, {
    enabled:
      showImpactMetrics &&
      impactMetricsData == null &&
      impactMetricsLoading == null &&
      impactMetricsError == null,
  });
  const metrics = impactMetricsData ?? hook.data;
  const metricsLoading = impactMetricsLoading ?? hook.loading;
  const metricsError = impactMetricsError ?? hook.error;

  useEffect(() => {
    if (profile) {
      setNonprofit(profile);
      setIsLoading(false);
      return undefined;
    }
    let cancelled = false;
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return undefined;
    }

    apiGet<NonprofitProfileResponse>("/api/nonprofit/profile", token)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setNonprofit(data);
      })
      .catch(() => {
        // Keep fallback UI when profile endpoint is unavailable.
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [profile]);

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="relative h-36 bg-muted">
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <div className="absolute inset-0 flex items-center gap-4 px-6">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </Card>
    );
  }

  const organizationName = nonprofit?.organization_name ?? "";
  const organizationType = nonprofit?.organization_type ?? "";
  const organizationLocation = nonprofit?.location ?? "";
  const organizationFoundedYear = nonprofit?.year_founded;
  const organizationWebsite = nonprofit?.website ?? "";
  const organizationDescription = nonprofit?.description ?? "";
  const avatarFromBackend = nonprofit?.avatar_url ?? "";
  const coverImageFromBackend = nonprofit?.dashboard_banner_url ?? nonprofit?.cover_image_url ?? "";
  const coverImage = coverImageFromBackend || "/covers/cover-hero.png";
  const fallbackAvatar = organizationName
    ? `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(organizationName)}`
    : "";
  const organizationAvatar = avatarFromBackend || fallbackAvatar;
  const organizationInitials = organizationName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "NP";

  const impactMetrics = [
    {
      label: t("Volunteers Engaged"),
      value: metricsLoading ? "—" : (metrics?.participants.enrolled_total ?? 0).toLocaleString(),
      icon: Users,
      helpText: t("Participants Enrolled Formula"),
    },
    {
      label: t("People Benefitted"),
      value: metricsLoading ? "—" : (metrics?.beneficiaries_completed_total ?? 0).toLocaleString(),
      icon: Heart,
      helpText: t("People Benefitted Formula"),
    },
    {
      label: t("Missions Completed"),
      value: metricsLoading ? "—" : (metrics?.missions.finished ?? 0).toLocaleString(),
      icon: ListCheck,
      helpText: t("Mission Completion Formula"),
    },
    {
      label: t("Active Missions"),
      value: metricsLoading ? "—" : (metrics?.missions.active ?? 0).toLocaleString(),
      icon: Users,
      helpText: t("Active Missions Formula"),
    },
  ];

  return (
    <Card className="overflow-hidden">
      <div
        className="relative h-36 bg-cover bg-center"
        style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        {showCoverTopRightActions ? (
          <div className="absolute top-4 right-4 flex gap-3 text-white/80">
            {organizationWebsite ? (
              <a
                href={organizationWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label={t("Website")}
              >
                <Globe className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        ) : null}
        <div className="absolute bottom-4 right-4 flex gap-1.5 flex-wrap justify-end">
          {nonprofit?.sdgs?.map((sdg) => {
            const sdgImage = "image_url" in sdg && typeof sdg.image_url === "string" && sdg.image_url.length > 0
              ? sdg.image_url
              : getSdgImageUrl(sdg.id);
            return (
              <img
                key={sdg.id}
                src={sdgImage}
                alt={`SDG ${sdg.id}: ${translateSdgName(sdg, t)}`}
                className="h-8 w-8 rounded object-cover shadow-md"
              />
            );
          })}
        </div>
        <div className="absolute inset-0 flex items-center gap-4 px-6">
          <Avatar className="h-20 w-20 border-4 border-background shadow-lg rounded-lg">
            <AvatarImage
              src={organizationAvatar || undefined}
              alt={organizationName || t("Nonprofit")}
              className="object-contain"
            />
            <AvatarFallback>{organizationInitials}</AvatarFallback>
          </Avatar>
          <div className="text-white space-y-1">
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <span>{organizationName || "—"}</span>
              {organizationWebsite ? (
                <a
                  href={organizationWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={t("Website")}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
            <p className="text-sm text-white/80">
              {organizationDescription || organizationType || "—"}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {organizationLocation || "—"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {t("Founded")} {organizationFoundedYear ?? "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showImpactMetrics ? (
        <div className="p-5">
          <ImpactKpiCards
            title={t("Organization Impact")}
            metrics={impactMetrics}
            className="mt-0"
            variant="gradient"
          />
          {metricsError ? <p className="mt-2 text-xs text-destructive">{metricsError}</p> : null}
        </div>
      ) : null}
    </Card>
  );
}
