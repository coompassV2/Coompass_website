import { cn } from "@/lib/utils";
import { MapPin, Users, Clock, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { Mission } from "@/types/organization";

interface MissionTooltipProps {
  mission: Mission;
  children: React.ReactNode;
}

export function MissionTooltip({ mission, children }: MissionTooltipProps) {
  const { t } = useTranslation();
  
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className={cn(
              "w-2 h-2 rounded-full",
              mission.isActive ? "bg-green-500" : "bg-red-500"
            )}
          />
          <span className="font-medium">{mission.title}</span>
        </div>
        
        <div className="text-sm space-y-1 text-muted-foreground mt-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{mission.organization}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{t(mission.location)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{mission.hours} {t("hours")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{mission.postedDate || "-"}</span>
          </div>
        </div>
        
        <div className="mt-3 text-sm border-t pt-2 border-border">
          {mission.description.substring(0, 120)}
          {mission.description.length > 120 ? '...' : ''}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
