
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Mission } from "./types";

interface MissionCardProps {
  mission: Mission;
  onViewDetails: (mission: Mission) => void;
  onApply: (mission: Mission) => void;
}

export function MissionCard({ mission, onViewDetails, onApply }: MissionCardProps) {
  const { t } = useTranslation();
  
  return (
    <div key={mission.id} className="glass-card p-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={`https://api.dicebear.com/7.x/shapes/svg?seed=${mission.organization}`}
            alt="Mission"
            className="h-16 w-16 rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-medium">{mission.title}</h4>
            <p className="text-sm text-coompass-primary truncate">{mission.organization}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {mission.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {mission.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {mission.hours} {t('hrs')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <Badge className="mb-2 px-1.5 py-0.5 text-[10px] sm:text-xs bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400">
            {mission.matchScore}% {t('Match')}
          </Badge>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" onClick={() => onViewDetails(mission)}>
              {t('Details')}
            </Button>
            <Button size="sm" onClick={() => onApply(mission)}>
              {t('Apply')}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {mission.causes.map((cause: string) => (
            <Badge key={cause} variant="outline" className="px-1.5 py-0.5 text-[10px] sm:text-xs">{cause}</Badge>
          ))}
          {mission.skills.map((skill: string) => (
            <Badge key={skill} variant="outline" className="px-1.5 py-0.5 text-[10px] sm:text-xs bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
