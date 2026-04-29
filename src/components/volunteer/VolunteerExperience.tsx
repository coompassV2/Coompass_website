import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { missions } from "@/data/missions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSessionMode } from "@/hooks/useSessionMode";
import { getStoredToken, apiGet } from "@/services/authApi";

interface ApiMission {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  completedHours: number;
  status: string;
  description: string;
  tasks: string[];
}

export function VolunteerExperience() {
  const { t } = useTranslation();
  const { isDemo, userId } = useSessionMode();
  const [userMissions, setUserMissions] = useState<ApiMission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo || !userId) {
      setLoading(false);
      return;
    }
    const token = getStoredToken();
    apiGet<{ missions: ApiMission[] }>("/api/missions/current", token)
      .then(({ data }) => {
        if (data?.missions) setUserMissions(data.missions.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, [isDemo, userId]);

  const demoMissions = missions.slice(0, 4);
  const displayMissions = isDemo ? demoMissions : userMissions;

  if (loading && !isDemo) {
    return (
      <div className="glass-card p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("Volunteering Missions and Experience")}</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-card">
                <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("Volunteering Missions and Experience")}</h3>
        <div className="space-y-4">
          {displayMissions.length > 0 ? (
            displayMissions.map((mission, index) => {
              const missionData = isDemo ? mission : mission;
              const organizationName = isDemo ? (mission as { organization?: string }).organization : missionData.organization;
              const missionTitle = isDemo ? (mission as { title?: string }).title : missionData.title;
              const missionCauses = isDemo ? (mission as { causes?: string[] }).causes ?? [] : [];
              const postedDate = isDemo
                ? (mission as { postedDate?: string }).postedDate
                : missionData.startDate;
              const missionId = isDemo ? (mission as { id: string }).id : missionData.id;

              return (
                <Link key={missionId} to={`/missions/${missionId}`} className="block mb-2">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card hover:bg-coompass-success/20 hover:text-coompass-success transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${organizationName}-${index}`} />
                      <AvatarFallback>{(organizationName ?? "?")[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{missionTitle}</h4>
                      <p className="text-sm text-muted-foreground truncate">{organizationName}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {missionCauses.slice(0, 2).map((cause: string) => (
                          <span key={cause} className="text-xs px-2 py-1 rounded-full bg-accent-foreground/10">
                            {cause}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{postedDate}</div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t("No missions yet. Start volunteering to see your experience here!")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
