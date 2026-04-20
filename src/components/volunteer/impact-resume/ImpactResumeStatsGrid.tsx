import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Clock, Building2 } from "lucide-react";
import { ImpactResumeStatsGridProps } from "./types";

export function ImpactResumeStatsGrid({ stats }: ImpactResumeStatsGridProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{stats.missionsCompleted}</div>
          <div className="text-sm text-muted-foreground">{t('Missions Completed')}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">{stats.volunteerHours}</div>
          <div className="text-sm text-muted-foreground">{t('Volunteer Hours')}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Building2 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
          <div className="text-2xl font-bold">{stats.associationsHelped}</div>
          <div className="text-sm text-muted-foreground">{t('Associations Helped')}</div>
        </CardContent>
      </Card>
    </div>
  );
}
