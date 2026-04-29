import React from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, getHours, setHours, setMinutes, addHours, isSameDay } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { Mission } from "@/types/organization";

interface WeekViewProps {
  currentDate: Date;
  missions: Mission[];
  onMissionHover: (mission: Mission | null) => void;
}

export function WeekView({ currentDate, missions, onMissionHover }: WeekViewProps) {
  const { t } = useTranslation();
  
  // Get all days in the current week
  const weekStart = startOfWeek(currentDate, { locale: pt });
  const weekEnd = endOfWeek(currentDate, { locale: pt });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // Get hours for the day (8am to 8pm)
  const hours = Array.from({ length: 13 }, (_, i) => i + 8);
  
  // Group missions by day and hour
  const getMissionsForTimeSlot = (day: Date, hour: number) => {
    const dayStart = setHours(setMinutes(day, 0), hour);
    const dayEnd = addHours(dayStart, 1);
    
    return missions.filter(mission => {
      const missionDate = mission.date;
      return isSameDay(missionDate, day) && 
             getHours(missionDate) >= getHours(dayStart) && 
             getHours(missionDate) < getHours(dayEnd);
    });
  };
  
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Week header with days */}
        <div className="grid grid-cols-8 gap-1">
          {/* Empty cell for time column */}
          <div className="p-2 text-center text-sm font-medium text-muted-foreground border-b border-r border-border"></div>
          
          {/* Days of the week */}
          {days.map(day => (
            <div 
              key={day.toString()} 
              className="p-2 text-center text-sm font-medium text-muted-foreground border-b border-border"
            >
              <div>{format(day, 'EEE', { locale: pt })}</div>
              <div className={cn(
                "font-bold",
                isSameDay(day, new Date()) && "text-green-500"
              )}>
                {format(day, 'd', { locale: pt })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Time slots */}
        <div>
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 gap-1">
              {/* Time column */}
              <div className="p-2 text-xs text-right text-muted-foreground border-r border-border">
                {hour}:00
              </div>
              
              {/* Time slots for each day */}
              {days.map(day => {
                const slotMissions = getMissionsForTimeSlot(day, hour);
                return (
                  <div 
                    key={`${day.toString()}-${hour}`} 
                    className="p-1 min-h-[60px] border-b border-r border-border"
                  >
                    {slotMissions.map(mission => (
                      <Link 
                        to={`/missions/${mission.id}`}
                        key={mission.id}
                        className={cn(
                          "text-xs p-1 my-1 rounded truncate cursor-pointer block",
                          mission.isActive
                            ? "bg-green-500/20 text-green-700 dark:text-green-300 hover:bg-green-500/30" 
                            : "bg-red-500/20 text-red-700 dark:text-red-300 hover:bg-red-500/30"
                        )}
                        onMouseEnter={() => onMissionHover(mission)}
                        onMouseLeave={() => onMissionHover(null)}
                      >
                        {mission.title}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
