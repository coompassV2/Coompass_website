import { useTranslation } from "react-i18next";
import { MissionCard } from "./MissionCard";
import type { Mission } from "./MissionCard";

interface MissionCardGridProps {
  missions: Mission[];
  onMissionClick?: (mission: Mission) => void;
}

export function MissionCardGrid({ missions, onMissionClick }: MissionCardGridProps) {
  const { t } = useTranslation();

  if (missions.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">{t("No missions found matching your criteria.")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {missions.map((mission, index) => (
        <MissionCard
          key={`${mission.id}-${index}`}
          mission={mission}
          onMissionClick={onMissionClick}
        />
      ))}
    </div>
  );
}
