import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { CalendarDayCell } from "./CalendarDayCell";
import type { Mission } from "@/types/organization";

interface MonthViewProps {
  currentDate: Date;
  missions: Mission[];
  onMissionHover: (mission: Mission | null) => void;
}

export function MonthView({ currentDate, missions, onMissionHover }: MonthViewProps) {
  const { t } = useTranslation();
  
  // Get all days in the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get days of the week for the header
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Group missions by day
  const getMissionsForDay = (day: Date) => {
    return missions.filter(mission => isSameDay(mission.date, day));
  };
  
  return (
    <div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days of the week header */}
        {weekDays.map(day => (
          <div 
            key={day} 
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {t(day)}
          </div>
        ))}
        
        {/* Calendar day cells */}
        {days.map(day => {
          const dayMissions = getMissionsForDay(day);
          return (
            <CalendarDayCell
              key={day.toString()}
              day={day}
              isCurrentMonth={isSameMonth(day, currentDate)}
              isToday={isToday(day)}
              missions={dayMissions}
              onMissionHover={onMissionHover}
            />
          );
        })}
      </div>
    </div>
  );
}
