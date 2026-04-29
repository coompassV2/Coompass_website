import { Mission } from "@/types/organization";
import { MissionCard } from "./MissionCard";
import { useTranslation } from "react-i18next";

interface MissionCardListProps {
  missions: Mission[];
  onMissionClick: (mission: Mission) => void;
}

export function MissionCardList({ missions, onMissionClick }: MissionCardListProps) {
  const { t } = useTranslation();

  if (missions.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">{t("No missions found matching your criteria.")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          onMissionClick={onMissionClick}
        />
      ))}
    </div>
  );
}
