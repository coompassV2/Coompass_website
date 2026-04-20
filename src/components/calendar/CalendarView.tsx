import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, addWeeks, subWeeks, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import { pt } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import type { Mission } from "@/types/organization";

interface CalendarViewProps {
  missions: Mission[];
  viewType: "month" | "week";
}

export function CalendarView({ missions, viewType }: CalendarViewProps) {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredMission, setHoveredMission] = useState<Mission | null>(null);
  
  // Navigation functions
  const navigatePrevious = () => {
    if (viewType === 'month') {
      setCurrentDate(prev => subMonths(prev, 1));
    } else {
      setCurrentDate(prev => subWeeks(prev, 1));
    }
  };
  
  const navigateNext = () => {
    if (viewType === 'month') {
      setCurrentDate(prev => addMonths(prev, 1));
    } else {
      setCurrentDate(prev => addWeeks(prev, 1));
    }
  };
  
  const resetToToday = () => {
    setCurrentDate(new Date());
  };
  
  const handleConnectCalendar = () => {
    // TODO: Implement calendar connection logic
    console.log("Connect calendar clicked");
  };
  
  // Format the date range for the header based on view type
  const getHeaderDate = () => {
    if (viewType === 'month') {
      return format(currentDate, 'MMMM yyyy', { locale: pt });
    } else {
      const start = startOfWeek(currentDate, { locale: pt });
      const end = endOfWeek(currentDate, { locale: pt });
      return `${format(start, 'd MMM', { locale: pt })} - ${format(end, 'd MMM yyyy', { locale: pt })}`;
    }
  };

  // Process missions to add date objects
  const processedMissions = missions.map(mission => ({
    ...mission,
    date: parseISO(mission.postedDate)
  }));
  
  return (
    <div className="bg-background border border-border rounded-lg shadow-sm">
      {/* Calendar header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{getHeaderDate()}</h2>
          <Button variant="outline" size="icon" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={resetToToday}>
            {t("Today")}
          </Button>
        </div>
        
        <Button variant="outline" onClick={handleConnectCalendar}>
          <CalendarIcon className="h-4 w-4 mr-2" />
          {t("Connect Calendar")}
        </Button>
      </div>
      
      {/* Calendar body */}
      <div className="p-4">
        {viewType === 'month' ? (
          <MonthView 
            currentDate={currentDate} 
            missions={processedMissions} 
            onMissionHover={setHoveredMission}
          />
        ) : (
          <WeekView 
            currentDate={currentDate} 
            missions={processedMissions} 
            onMissionHover={setHoveredMission}
          />
        )}
      </div>
    </div>
  );
}
