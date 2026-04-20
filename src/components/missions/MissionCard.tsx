import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { translateCauseName } from "@/utils/taxonomyI18n";

export type MissionApprovalStatus = "pending" | "approved" | "rejected";
export type MissionExecutionStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Mission {
  id: string;
  title: string;
  organization: string;
  companyId?: string;
  createdByEntityType?: "company" | "nonprofit";
  description: string;
  requirements?: string;
  hours: number;
  volunteers: number;
  location: string;
  district?: string | null;
  isVirtual?: boolean;
  scheduleType?: "one_time" | "recurring";
  postedDate: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  approvalStatus?: MissionApprovalStatus;
  executionStatus?: MissionExecutionStatus;
  startedAt?: string | null;
  causes?: string[];
  skills?: string[];
  isSkillMatch?: boolean;
  matchedSkillsCount?: number;
  missionSkillsCount?: number;
  participantsCount?: number;
  spotsLeft?: number;
  isFull?: boolean;
  isJoined?: boolean;
  image?: string;
  /** Nonprofit or company logo for overlay (nonprofit URL preferred when both exist). */
  organizationLogoUrl?: string;
  projectCategory?: string | null;
  projectTitle?: string | null;
  requiresInterview?: boolean;
}

export interface MissionCardProps {
  mission?: Mission;
  title?: string;
  organization?: string;
  description?: string;
  hours?: number;
  volunteers?: number;
  location?: string;
  postedDate?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  id?: string;
  onMissionClick?: (mission: Mission) => void;
  marqueeMode?: boolean;
  organizationLogoUrl?: string;
}

export function MissionCard(props: MissionCardProps) {
  const { t } = useTranslation();

  const {
    mission,
    title: titleProp,
    organization: organizationProp,
    description: descriptionProp,
    hours: hoursProp,
    volunteers: volunteersProp,
    location: locationProp,
    postedDate: postedDateProp,
    startDate: startDateProp,
    endDate: endDateProp,
    isActive: isActiveProp,
    id: idProp,
    onMissionClick,
    marqueeMode = false,
    organizationLogoUrl: organizationLogoUrlProp,
  } = props;

  const id = idProp ?? mission?.id ?? "";
  const title = titleProp ?? mission?.title ?? "";
  const organization = organizationProp ?? mission?.organization ?? "";
  const description = descriptionProp ?? mission?.description ?? "";
  const hours = hoursProp ?? mission?.hours ?? 0;
  const volunteers = volunteersProp ?? mission?.volunteers ?? 0;
  const location = locationProp ?? mission?.location ?? "";
  const district = mission?.district?.trim() ?? "";
  const compactLocation = district || location;
  const postedDate = postedDateProp ?? mission?.postedDate ?? "";
  const isVirtual = mission?.isVirtual;
  const scheduleType = mission?.scheduleType ?? "one_time";
  const startDate = startDateProp ?? mission?.startDate ?? "";
  const endDate = endDateProp ?? mission?.endDate ?? "";
  const causes = mission?.causes ?? [];
  const skills = mission?.skills ?? [];
  const projectCategory = mission?.projectCategory ?? null;
  const customImageSrc = mission?.image?.trim() ?? "";
  const hasCustomImage = customImageSrc.length > 0;
  const organizationLogoUrl = (
    organizationLogoUrlProp ??
    mission?.organizationLogoUrl ??
    ""
  ).trim();
  const hasOrgLogo = organizationLogoUrl.length > 0;

  const isActive =
    isActiveProp !== undefined
      ? isActiveProp
      : mission?.isActive !== undefined
        ? mission.isActive
        : true;
  const isFull =
    mission?.isFull === true ||
    (mission?.spotsLeft != null && mission.spotsLeft <= 0);
  const executionStatus = mission?.executionStatus;
  const hasExplicitStatus = executionStatus != null;
  const missionStatusLabel =
    executionStatus === "not_started"
      ? (isFull ? t("Full") : t("Open"))
      : executionStatus === "in_progress"
        ? t("Mission In Progress")
        : executionStatus === "completed"
          ? t("Mission Completed")
          : executionStatus === "cancelled"
            ? t("Cancelled")
            : !hasExplicitStatus && isActive
              ? (isFull ? t("Sem vagas/Fechada") : t("Active"))
              : t("Status unavailable");
  const missionStatusClass =
    executionStatus === "not_started"
      ? (isFull ? "bg-red-500/90 text-white" : "bg-green-500/90 text-white")
      : executionStatus === "in_progress"
        ? "bg-primary/90 text-primary-foreground"
        : executionStatus === "completed"
          ? "bg-muted-foreground/80 text-muted"
          : executionStatus === "cancelled"
            ? "bg-red-500/90 text-white"
            : !hasExplicitStatus && isActive && !isFull
              ? "bg-primary/90 text-primary-foreground"
              : "bg-muted text-muted-foreground";

  const missionData: Mission = mission ?? {
    id,
    title,
    organization,
    description,
    hours,
    volunteers,
    location,
    isVirtual,
    scheduleType,
    postedDate,
    startDate,
    endDate,
    isActive,
    causes: [],
    skills: [],
    ...(organizationLogoUrl ? { organizationLogoUrl } : {}),
  };

  const handleCardClick = () => {
    if (onMissionClick) {
      onMissionClick(missionData);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  // Unsplash images by cause/theme (free); stable per mission via id hash.
  // All cause strings used in mission data are mapped (incl. Hunger Relief, Community Support, etc.).
  const CAUSE_IMAGES: Record<string, string[]> = {
    Education: [
      "1523240795612-9a05468c4ab1",
      "1503676260726-1bb00e136cce",
      "1522202176988-66273c2fd55f",
    ],
    Environment: [
      "1441974238291-8af8f7301b78",
      "1470071459604-3b5ec3a7fe05",
      "1469474968028-56623f02e42e",
    ],
    Health: [
      "1579684385127-1eb15b562077",
      "1576091160550-2173dba999ef",
      "1584515933487-892824239432",
    ],
    "Technology Access": [
      "1498050104933-361e67c7",
      "1517694712205-9084842877fc",
      "1461749280684-6cc6d0ce451b",
    ],
    Conservation: [
      "1505142468650-8e2c04f2",
      "1439066615861-d1af74d74000",
      "1544551763-46a013bb70d5",
    ],
    "Animal Welfare": [
      "1587300003388-59208cc962cb",
      "1416339698674-4f89bd106bda",
      "1583337130415-4d55fd787121",
    ],
    "Arts & Culture": [
      "1460667269286-e8830108e80e",
      "1518998053908-8f7c4a2dc404",
      "1514525253161-7a46f19fcd3d",
    ],
    "Community Development": [
      "1529155859895-7c3f2f0f",
      "1523240795612-9a05468c4ab1",
      "1522071820081-009f0129c71c",
    ],
    "Food Security": [
      "1542838132-92c53300491e",
      "1466692479798-a8c9a1c930c4",
      "1540420773520-1f1bbe6b919d",
    ],
    "Youth Development": [
      "1503454537195-1dcabb7ffc90",
      "1523240795612-9a05468c4ab1",
      "1529155859895-7c3f2f0f",
    ],
    "Senior Support": [
      "1609220136736-443140c7f1e4",
      "1579684385127-1eb15b562077",
      "1584515933487-892824239432",
    ],
    Poverty: [
      "1522071820081-009f0129c71c",
      "1529155859895-7c3f2f0f",
      "1523240795612-9a05468c4ab1",
    ],
    "Human Rights": [
      "1529155859895-7c3f2f0f",
      "1522071820081-009f0129c71c",
      "1523240795612-9a05468c4ab1",
    ],
    "Global Aid": [
      "1522071820081-009f0129c71c",
      "1579684385127-1eb15b562077",
      "1529155859895-7c3f2f0f",
    ],
    "Hunger Relief": [
      "1542838132-92c53300491e",
      "1466692479798-a8c9a1c930c4",
      "1540420773520-1f1bbe6b919d",
    ],
    "Community Support": [
      "1529155859895-7c3f2f0f",
      "1523240795612-9a05468c4ab1",
      "1522071820081-009f0129c71c",
    ],
    "Pollution Reduction": [
      "1441974238291-8af8f7301b78",
      "1505142468650-8e2c04f2",
      "1469474968028-56623f02e42e",
    ],
    "Child Development": [
      "1503454537195-1dcabb7ffc90",
      "1523240795612-9a05468c4ab1",
      "1529155859895-7c3f2f0f",
    ],
    "Wildlife Protection": [
      "1505142468650-8e2c04f2",
      "1587300003388-59208cc962cb",
      "1544551763-46a013bb70d5",
    ],
    default: [
      "1529155859895-7c3f2f0f",
      "1522071820081-009f0129c71c",
      "1523240795612-9a05468c4ab1",
    ],
  };

  const category =
    causes.length > 0 && CAUSE_IMAGES[causes[0]]
      ? causes[0]
      : "default";
  const photos = CAUSE_IMAGES[category] ?? CAUSE_IMAGES.default;
  const placeholderIndex =
    Math.abs(id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) %
    photos.length;
  const defaultIds = CAUSE_IMAGES.default;
  const allPhotoIds = [...photos, ...defaultIds];
  const toUrl = (photoId: string) =>
    `https://images.unsplash.com/photo-${photoId}?w=600&q=80`;

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  useEffect(() => {
    setCurrentPhotoIndex(0);
  }, [id, category, customImageSrc]);

  const fallbackPhotoIndex = hasCustomImage
    ? Math.max(currentPhotoIndex - 1, 0)
    : currentPhotoIndex;
  const fallbackSrc = toUrl(
    allPhotoIds[(placeholderIndex + fallbackPhotoIndex) % allPhotoIds.length]
  );
  const displaySrc = hasCustomImage && currentPhotoIndex === 0
    ? customImageSrc
    : fallbackSrc;

  const handleImageError = () => {
    setCurrentPhotoIndex((prev) => prev + 1);
  };

  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={t("View details for {{title}}", { title })}
    >
      {/* Media area: mission/custom image; on error try next Unsplash by cause */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-t-lg bg-muted">
        <img
          src={displaySrc}
          alt=""
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
        {/* Grain overlay - SVG noise for slight film-grain effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id={`grain-${id}`}>
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
              filter={`url(#grain-${id})`}
              style={{ mixBlendMode: "overlay" }}
            />
          </svg>
        </div>
        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          aria-hidden
        />
        {/* Bottom: org (logo + name), then mission title */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 text-left">
          <div className="flex min-w-0 items-center gap-2">
            {hasOrgLogo ? (
              <img
                src={organizationLogoUrl}
                alt=""
                className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-white/35"
              />
            ) : null}
            <span className="truncate text-sm font-medium text-white drop-shadow-sm">
              {organization}
            </span>
          </div>
          <h3 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight text-white drop-shadow-sm">
            {title}
          </h3>
        </div>
        {/* Top right: status pill */}
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-xs",
              scheduleType === "recurring"
                ? "bg-indigo-500/90 text-white"
                : "bg-zinc-700/80 text-white"
            )}
          >
            {scheduleType === "recurring" ? t("Recurring") : t("One-time")}
          </span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-xs",
              missionStatusClass
            )}
          >
            {missionStatusLabel}
          </span>
        </div>
      </div>

      <CardContent className="space-y-3 p-4">
        {/* Metadata row - location, hours, volunteers, posted */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {compactLocation || "-"}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {hours} {t("Hours")}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {volunteers} {t("Volunteers")}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {startDate && endDate
              ? `${startDate} – ${endDate}`
              : startDate
                ? startDate
                : postedDate
                  ? `${t("Posted")} ${postedDate}`
                  : null}
          </span>
        </div>

        {/* Tags - causes (and skills if desired); non-clickable for parity with current grid */}
        {(projectCategory || causes.length > 0 || skills.length > 0) && (
          <div className="flex flex-wrap gap-1">
            {projectCategory ? (
              <span className="rounded-md bg-coompass-success/15 px-1.5 py-0.5 text-[10px] text-coompass-success sm:px-2 sm:text-xs">
                {projectCategory}
              </span>
            ) : null}
            {causes.slice(0, 3).map((cause, idx) => (
              <span
                key={`cause-${idx}`}
                className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:px-2 sm:text-xs"
              >
                {translateCauseName({ name: cause }, t)}
              </span>
            ))}
            {causes.length > 3 && (
              <span className="text-[10px] text-muted-foreground sm:text-xs">
                +{causes.length - 3}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
