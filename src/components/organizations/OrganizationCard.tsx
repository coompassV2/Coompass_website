import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Organization } from "@/types/organization";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";

const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

function getSdgImageUrl(goal: number): string {
  return `${SDG_IMAGE_BASE}-${goal}.jpg`;
}
import { cn } from "@/lib/utils";

const ORG_GRADIENTS = [
  "from-pink-200/90 via-orange-200/70 to-amber-100/50",
  "from-violet-200/90 via-fuchsia-200/70 to-pink-100/50",
  "from-cyan-200/90 via-teal-200/70 to-emerald-100/50",
  "from-amber-200/90 via-yellow-200/70 to-lime-100/50",
  "from-rose-200/90 via-pink-200/70 to-fuchsia-100/50",
  "from-sky-200/90 via-blue-200/70 to-indigo-100/50",
  "from-emerald-200/90 via-green-200/70 to-teal-100/50",
  "from-orange-200/90 via-amber-200/70 to-yellow-100/50",
] as const;

function normalizeOrgId(id: number | string): number {
  if (typeof id === "number") return id;
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getGradientForOrg(id: number | string): (typeof ORG_GRADIENTS)[number] {
  const normalized = normalizeOrgId(id);
  return ORG_GRADIENTS[normalized % ORG_GRADIENTS.length];
}

export interface OrganizationCardProps {
  organization: Organization;
  onDonate?: () => void;
  onTogglePartnership?: (orgId: string) => void;
  showPartnershipButton?: boolean;
}

export function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  const { t } = useTranslation();
  const id = String(organization.id);
  const gradientClass = getGradientForOrg(organization.id);
  const missionCountLabel =
    organization.activeMissions != null
      ? t("active missions count", { count: organization.activeMissions })
      : t("Nonprofit");

  return (
    <Link
      to={`/nonprofit/dashboard/${organization.id}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
      aria-label={`View ${organization.name}`}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md cursor-pointer aspect-square flex flex-col"
        )}
      >
        <div
          className={cn(
            "relative flex-1 min-h-0 w-full overflow-hidden rounded-xl flex flex-col items-center pt-10 pb-4 px-4",
            "bg-gradient-to-br",
            gradientClass
          )}
        >
          {/* Grain overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            aria-hidden
          >
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <filter id={`org-grain-${id}`}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  result="noise"
                />
                <feColorMatrix
                  in="noise"
                  type="saturate"
                  values="0"
                  result="mono"
                />
              </filter>
              <rect
                width="100%"
                height="100%"
                fill="white"
                filter={`url(#org-grain-${id})`}
                style={{ mixBlendMode: "overlay" }}
              />
            </svg>
          </div>

          {/* Top right: SDG images */}
          {organization.goals && organization.goals.length > 0 && (
            <div className="absolute right-2 top-2 flex flex-col gap-1 items-end z-10">
              {organization.goals.slice(0, 3).map((goal) => (
                <img
                  key={goal}
                  src={getSdgImageUrl(goal)}
                  alt={`SDG ${goal}`}
                  className="h-[30px] w-[30px] rounded object-cover"
                />
              ))}
              {organization.goals.length > 3 && (
                <span className="text-xs bg-black/20 text-white rounded-full px-2 py-0.5 font-medium backdrop-blur-sm">
                  +{organization.goals.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Center: logo (highlighted, overlapping feel) */}
          <div className="relative z-10 flex flex-col items-center flex-1 justify-center w-full">
            <Avatar className="h-24 w-24 shrink-0 border-4 border-white/90 shadow-lg ring-2 ring-black/5">
              <AvatarImage
                src={
                  organization.logo ||
                  `https://api.dicebear.com/7.x/shapes/svg?seed=${organization.name}`
                }
                alt=""
              />
              <AvatarFallback className="text-lg font-semibold text-foreground bg-muted">
                {organization.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* Name and description below logo, centered */}
            <div className="mt-4 text-center w-full min-w-0 px-1">
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="line-clamp-1 font-semibold text-base leading-tight text-foreground drop-shadow-sm">
                  {organization.name}
                </h3>
                {organization.isVerified && (
                  <BadgeCheck
                    className="h-4 w-4 shrink-0 text-green-600"
                    aria-label="Verified"
                  />
                )}
              </div>
              <p className="text-xs text-black mt-0.5 drop-shadow-sm">
                {missionCountLabel}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
