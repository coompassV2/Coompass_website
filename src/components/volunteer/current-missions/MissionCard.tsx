import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VolunteerCurrentMission } from "@/types/missions";

interface MissionCardProps {
  mission: VolunteerCurrentMission;
}

export function MissionCard({ mission }: MissionCardProps) {
  const { t } = useTranslation();
  const statusLabel = mission.status ? t(mission.status) : t("In Progress");

  return (
    <div className="glass-card p-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={`https://api.dicebear.com/7.x/shapes/svg?seed=${mission.organization}`}
            alt="Mission"
            className="h-16 w-16 rounded-lg"
          />
          <div>
            <h4 className="text-lg font-medium">{mission.title}</h4>
            <p className="text-sm text-coompass-primary">{mission.organization}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {mission.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {(mission.startDate ?? "-")} - {(mission.endDate ?? "-")}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <Badge
            className={cn(
              "mb-2",
              "bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
            )}
          >
            {statusLabel}
          </Badge>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-end">
          <Button size="sm" variant="outline" asChild>
            <Link to={`/missions/${mission.id}`}>
              <MoreHorizontal className="h-4 w-4 mr-2" />
              {t("Details")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
