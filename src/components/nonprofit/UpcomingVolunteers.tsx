
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiGet, getStoredToken } from "@/services/authApi";
import { ApiMission, MissionsResponse } from "@/types/missions";
import { formatDatePt } from "@/lib/dateFormat";

interface UpcomingVolunteersProps {
  organizationName?: string;
  nonprofitId?: string;
}

export function UpcomingVolunteers({ organizationName, nonprofitId }: UpcomingVolunteersProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState<ApiMission[]>([]);

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    setLoading(true);

    const routeScopedNonprofitId = nonprofitId?.trim() ?? "";
    const endpoint = routeScopedNonprofitId
      ? `/api/nonprofit/public-missions?id=${encodeURIComponent(routeScopedNonprofitId)}`
      : "/api/missions";

    apiGet<MissionsResponse>(endpoint, token)
      .then(({ data, error }) => {
        if (cancelled || error) return;
        setMissions(data?.missions ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonprofitId]);

  const upcomingMissions = useMemo(() => {
    return missions
      .filter((mission) => {
        if (mission.approval_status !== "approved") return false;
        if (mission.execution_status !== "not_started") return false;
        const matchesOrg = organizationName?.trim()
          ? (mission.organization_name ?? "").toLowerCase() === organizationName.trim().toLowerCase()
          : true;
        return matchesOrg;
      })
      .sort((a, b) => (a.start_date ?? "").localeCompare(b.start_date ?? ""));
  }, [missions, organizationName]);

  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">{t("Scheduled Missions")}</h2>
        <Button variant="outline" size="sm" className="text-xs" asChild>
          <Link to="/nonprofit/calendar">{t("View Calendar")}</Link>
        </Button>
      </div>

      <div className="overflow-y-auto max-h-[280px] space-y-2 pr-1 -mr-1">
        {loading ? (
          <p className="text-sm text-muted-foreground py-6 text-center">{t("Loading...")}</p>
        ) : upcomingMissions.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">{t("No upcoming missions.")}</p>
        ) : (
          upcomingMissions.map((mission) => (
            <Card key={mission.id} className="hover:bg-accent/5 transition-colors">
              <CardContent className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                  <div className="md:col-span-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-medium text-sm">{mission.title}</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDatePt(mission.start_date)}
                      {mission.end_date ? ` - ${formatDatePt(mission.end_date)}` : ""}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {mission.hours} {t("Hours")}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {mission.is_virtual ? t("Virtual") : mission.location || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Badge
                      className={cn(
                        "text-[10px] px-1.5 py-0",
                        "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                      )}
                    >
                      {t("Upcoming")}
                    </Badge>
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <Link to={`/missions/${mission.id}`}>{t("View")}</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
