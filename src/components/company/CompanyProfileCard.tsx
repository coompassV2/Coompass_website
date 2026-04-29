import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { SDGs } from "@/data/sdgs";
import { CorporateImpactKpisCard } from "@/components/company/CorporateImpactKpisCard";
import { apiGet, getStoredToken } from "@/services/authApi";
import { translateSdgName } from "@/utils/sdgI18n";

const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

function getSdgImageUrl(goal: number): string {
  return `${SDG_IMAGE_BASE}-${goal}.jpg`;
}

// SDGs aligned with Grupo Brisa (mobility, sustainable cities, climate, innovation)
const fallbackSdgIds = [9, 11, 13, 8];

interface CompanyProfileResponse {
  id: string;
  company_name: string;
  description: string | null;
  industry: string | null;
  location: string | null;
  founded_year: number | null;
  website: string | null;
  avatar_url: string | null;
  tagline: string | null;
  dashboard_banner_url?: string | null;
  cover_image_url: string | null;
  sdgs?: Array<{ id: number; name: string }>;
}

function getAvatarSeed(name: string): string {
  return encodeURIComponent(name.trim() || "Company");
}

export function CompanyProfileCard() {
  const { t } = useTranslation();
  const [company, setCompany] = useState<CompanyProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return undefined;
    }

    apiGet<CompanyProfileResponse>("/api/company/profile", token)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setCompany(data);
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
  }, []);

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="relative h-36 bg-muted">
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
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

  const companyName = company?.company_name || "Grupo Brisa";
  const companyIndustry = company?.industry || t("Mobility & Infrastructure");
  const companyLocation = company?.location || t("Lisbon, PT");
  const companyFoundedYear = company?.founded_year || 1972;
  const companyTagline =
    company?.tagline || company?.description || t("company_brisa_description");
  const coverImage =
    company?.dashboard_banner_url || company?.cover_image_url || "/covers/modern-banner-green-teal.png";
  const companyAvatar =
    company?.avatar_url ||
    `https://api.dicebear.com/7.x/shapes/svg?seed=${getAvatarSeed(companyName)}`;
  const companyInitials = companyName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "CO";

  return (
    <Card className="overflow-hidden">
      <div
        className="relative h-36 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute bottom-4 right-4 flex gap-1.5 flex-wrap justify-end">
          {(company?.sdgs?.length
            ? company.sdgs
            : fallbackSdgIds
                .map((id) => SDGs.find((sdg) => sdg.id === id))
                .filter(Boolean)
                .map((sdg) => ({ id: sdg!.id, name: sdg!.name }))
          ).map((sdg) => (
            <img
              key={sdg.id}
              src={getSdgImageUrl(sdg.id)}
              alt={`SDG ${sdg.id}: ${translateSdgName(sdg, t)}`}
              className="h-8 w-8 rounded object-cover shadow-md"
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center gap-4 px-6">
          <Avatar className="h-20 w-20 border-4 border-background shadow-lg rounded-lg">
            <AvatarImage
              src={companyAvatar}
              alt={companyName}
              className="object-contain"
            />
            <AvatarFallback>{companyInitials}</AvatarFallback>
          </Avatar>
          <div className="text-white space-y-1">
            <div className="text-2xl font-semibold">
              {companyName}
            </div>
            <p className="text-sm text-white/80">{companyIndustry}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {companyLocation}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {t("Founded")} {companyFoundedYear}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-muted-foreground mt-0">
          {companyTagline}
        </p>

        <div className="mt-6">
          <CorporateImpactKpisCard />
        </div>
      </div>
    </Card>
  );
}
