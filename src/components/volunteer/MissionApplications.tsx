
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Calendar, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getStoredToken } from "@/services/authApi";
import { getVolunteerMissionApplications } from "@/services/volunteerMissionsApi";
import { cn } from "@/lib/utils";
import type { MissionApplication } from "./mission-applications/types";
import { formatDatePt } from "@/lib/dateFormat";

const CANDIDATE_STATUSES: MissionApplication["status"][] = ["Pending", "Accepted"];

function getStatusBadgeClass(status: MissionApplication["status"]): string {
  if (status === "Accepted") {
    return "bg-green-500/10 text-green-700 dark:bg-green-950 dark:text-green-400";
  }
  if (status === "Pending") {
    return "bg-amber-500/10 text-amber-700 dark:bg-amber-950 dark:text-amber-400";
  }
  return "bg-muted text-muted-foreground";
}

export function MissionApplications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState<MissionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!user?.id) {
      setApplications([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    const token = getStoredToken();
    const { data, error } = await getVolunteerMissionApplications(token);
    if (error) {
      setLoadError(error);
      setApplications([]);
    } else {
      const candidateApplications = (data?.applications ?? []).filter(
        (app) => CANDIDATE_STATUSES.includes(app.status)
      );
      setApplications(candidateApplications);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    void fetchApplications();
  }, [fetchApplications]);

  const filteredApplications = useMemo(
    () =>
      applications.filter(
        (app) =>
          app.mission.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.organization.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [applications, searchQuery]
  );
  
  const browseMissions = () => {
    navigate("/missions");
  };
  
  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t('Search applications...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {loading ? (
        <div className="text-sm text-muted-foreground">{t("Loading applications...")}</div>
      ) : loadError ? (
        <div className="space-y-3">
          <p className="text-sm text-destructive">{loadError}</p>
          <Button variant="outline" onClick={() => void fetchApplications()}>
            {t("Retry")}
          </Button>
        </div>
      ) : filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <div key={application.id} className="glass-card p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/shapes/svg?seed=${application.organization}`}
                    alt="Mission"
                    className="h-16 w-16 rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg font-medium">{application.mission}</h4>
                    <p className="text-sm text-coompass-primary">{application.organization}</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {application.location || "-"}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {t("Applied Date")}: {formatDatePt(application.appliedDate)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {t("Start Date")}: {formatDatePt(application.startDate)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <Badge className={cn("mb-2", getStatusBadgeClass(application.status))}>
                    {t(application.status)}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex justify-end">
                <Button size="sm" asChild>
                  <Link to={`/missions/${application.missionId}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("Go to Mission")}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <h3 className="mt-2 text-lg font-medium">{t("No pending missions")}</h3>
          <p className="text-muted-foreground">
            {t("You have no missions where you're a candidate. Browse missions and apply to get started.")}
          </p>
          <Button className="mt-4" onClick={browseMissions}>
            {t("Find Missions")}
          </Button>
        </div>
      )}
    </div>
  );
}
