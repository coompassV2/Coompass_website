
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MissionTooltip } from "./MissionTooltip";
import type { Mission } from "@/types/organization";

interface CalendarDayCellProps {
  day: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  missions: Mission[];
  onMissionHover: (mission: Mission | null) => void;
}

export function CalendarDayCell({ 
  day, 
  isCurrentMonth, 
  isToday, 
  missions,
  onMissionHover
}: CalendarDayCellProps) {
  return (
    <div 
      className={cn(
        "min-h-[100px] p-1 border border-border",
        !isCurrentMonth && "opacity-40 bg-gray-50 dark:bg-gray-800/20",
        isToday && "bg-green-500/5 border-green-500/30"
      )}
    >
      {/* Day number */}
      <div className={cn(
        "text-right p-1 text-sm",
        isToday && "font-bold text-green-500"
      )}>
        {format(day, 'd')}
      </div>
      
      {/* Mission indicators */}
      <div className="mt-1 space-y-1">
        {missions.slice(0, 3).map(mission => (
          <MissionTooltip key={mission.id} mission={mission}>
            <Link
              to={`/missions/${mission.id}`}
              className={cn(
                "text-xs p-1 rounded truncate cursor-pointer block",
                mission.isActive
                  ? "bg-green-500/20 text-green-700 dark:text-green-300 hover:bg-green-500/30"
                  : "bg-red-500/20 text-red-700 dark:text-red-300 hover:bg-red-500/30"
              )}
              onMouseEnter={() => onMissionHover(mission)}
              onMouseLeave={() => onMissionHover(null)}
            >
              {mission.title}
            </Link>
          </MissionTooltip>
        ))}
        
        {/* Show indicator if more missions exist */}
        {missions.length > 3 && (
          <div className="text-xs text-center text-muted-foreground">
            +{missions.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}
