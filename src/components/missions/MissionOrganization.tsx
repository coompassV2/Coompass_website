
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiGet, getStoredToken } from "@/services/authApi";
import { Mission } from "@/types/organization";

interface MissionOrganizationProps {
  mission: Mission;
}

interface PublicNonprofitProfileLogoResponse {
  avatar_url?: string | null;
  organization_logo_url?: string | null;
}

export function MissionOrganization({ mission }: MissionOrganizationProps) {
  const { t } = useTranslation();
  const hasPublicOrganizationProfile =
    mission.createdByEntityType === "nonprofit" && Boolean(mission.organizationId);
  const organizationPath = hasPublicOrganizationProfile
    ? `/nonprofit/dashboard/${encodeURIComponent(mission.organizationId ?? "")}`
    : null;
  const [publicNonprofitLogoUrl, setPublicNonprofitLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPublicNonprofitLogo = async () => {
      if (!hasPublicOrganizationProfile || !mission.organizationId) {
        setPublicNonprofitLogoUrl(null);
        return;
      }

      const token = getStoredToken();
      const { data } = await apiGet<PublicNonprofitProfileLogoResponse>(
        `/api/nonprofit/public-profile?id=${encodeURIComponent(mission.organizationId)}`,
        token
      );

      if (cancelled) return;
      const resolvedLogo =
        data?.avatar_url?.trim() ||
        data?.organization_logo_url?.trim() ||
        null;
      setPublicNonprofitLogoUrl(resolvedLogo);
    };

    void loadPublicNonprofitLogo();
    return () => {
      cancelled = true;
    };
  }, [hasPublicOrganizationProfile, mission.organizationId]);

  const organizationLogoSrc =
    publicNonprofitLogoUrl ||
    mission.organizationLogoUrl?.trim() ||
    `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(mission.organization)}`;

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="mb-4 text-xl font-semibold">{t("About the Organization")}</h2>
        {organizationPath ? (
          <Link
            to={organizationPath}
            className="mb-4 flex items-center gap-4 rounded-md transition-colors hover:bg-muted/30"
          >
            <Avatar className="h-16 w-16">
              <AvatarImage src={organizationLogoSrc} />
              <AvatarFallback>{mission.organization?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{mission.organization}</h3>
              <span className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                {t("Institution profile")}
              </span>
            </div>
          </Link>
        ) : (
          <div className="mb-4 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={organizationLogoSrc} />
              <AvatarFallback>{mission.organization?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{mission.organization}</h3>
              <span className="text-sm text-muted-foreground">
                {t("Organization profile")}
              </span>
            </div>
          </div>
        )}
        <p className="text-muted-foreground">
          {t("This initiative is led by {{organization}}.", { organization: mission.organization })}
        </p>
      </CardContent>
    </Card>
  );
}
