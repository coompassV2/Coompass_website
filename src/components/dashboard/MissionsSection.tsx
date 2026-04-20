
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { missions } from "@/data/missions"; // This import stays the same
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function MissionsSection() {
  const { t } = useTranslation();
  const [showFinished, setShowFinished] = useState(false);
  
  // Get 5 active missions and 3 finished missions from our data
  const activeMissions = missions.filter(mission => mission.isActive).slice(0, 5);
  const finishedMissions = missions.filter(mission => !mission.isActive).slice(0, 3);
  
  // Display missions based on the selected filter
  const displayedMissions = showFinished ? finishedMissions : activeMissions;

  return (
    <div className="glass-card p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold">{t('Missions')}</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className={cn(
              !showFinished && "bg-green-500/10 text-green-500 hover:text-green-500 hover:bg-green-500/20"
            )}
            onClick={() => setShowFinished(false)}
          >
            {t('Active')}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className={cn(
              showFinished && "bg-red-500/10 text-red-500 hover:text-red-500 hover:bg-red-500/20"
            )}
            onClick={() => setShowFinished(true)}
          >
            {t('Finished')}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {displayedMissions.map((mission) => (
          <Link 
            key={mission.id} 
            to={`/missions/${mission.id}`}
          >
            <div 
              className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-foreground/5 rounded-lg transition-colors cursor-pointer gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://api.dicebear.com/7.x/shapes/svg?seed=${mission.organization}`}
                  alt="Mission"
                  className="h-12 w-12 rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{mission.title}</div>
                  <div className="flex items-center">
                    <span className="text-sm text-blue-500 truncate">{mission.organization}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {t(mission.location)}
                    </span>
                  </div>
                </div>
              </div>
              <span className={cn(
                "text-sm",
                mission.isActive 
                  ? "text-coompass-success" 
                  : "text-red-500"
              )}>
                {mission.isActive ? t('Active') : t('Finished')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
