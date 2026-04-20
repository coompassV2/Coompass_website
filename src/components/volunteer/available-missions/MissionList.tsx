
import { useTranslation } from "react-i18next";
import { MissionCard } from "./MissionCard";
import { Mission } from "./types";
import { NoMissionsFound } from "./NoMissionsFound";

interface MissionListProps {
  filteredMissions: Mission[];
  onViewDetails: (mission: Mission) => void;
  onApply: (mission: Mission) => void;
}

export function MissionList({ 
  filteredMissions, 
  onViewDetails, 
  onApply 
}: MissionListProps) {
  return (
    <div className="space-y-4">
      {filteredMissions.map((mission) => (
        <MissionCard 
          key={mission.id}
          mission={mission}
          onViewDetails={onViewDetails}
          onApply={onApply}
        />
      ))}
      
      {filteredMissions.length === 0 && <NoMissionsFound />}
    </div>
  );
}
