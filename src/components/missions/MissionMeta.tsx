import { useTranslation } from "react-i18next";
import { Calendar, MapPin } from "lucide-react";
import { Mission } from "@/components/missions/MissionCard";

interface MissionMetaProps {
  mission: Mission;
}

export function MissionMeta({ mission }: MissionMetaProps) {
  const { t } = useTranslation();
  const district = mission.district?.trim();
  const location = mission.location?.trim() ?? "";
  const showDistrict =
    Boolean(district) &&
    district!.toLowerCase() !== location.toLowerCase();
  const dateLabel =
    mission.startDate && mission.endDate
      ? `${mission.startDate} – ${mission.endDate}`
      : mission.postedDate
        ? `${t("Posted")} ${mission.postedDate}`
        : null;

  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
      <div className="flex items-center gap-1">
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
          {mission.scheduleType === "recurring" ? t("Recurring") : t("One-time")}
        </span>
      </div>
      {dateLabel && (
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{dateLabel}</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <MapPin className="h-3.5 w-3.5" />
        <span>{location}</span>
      </div>
      {showDistrict ? (
        <div className="flex items-center gap-1">
          <span>
            {t("District")}: {district}
          </span>
        </div>
      ) : null}
      <div className="flex items-center gap-1">
        <span
          className={
            mission.requiresInterview
              ? "rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-300"
              : "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          }
        >
          {mission.requiresInterview
            ? t("Requires prior interview")
            : t("No prior interview required")}
        </span>
      </div>
    </div>
  );
}
