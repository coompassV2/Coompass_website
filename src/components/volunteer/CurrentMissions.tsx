import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { MissionCard } from "./current-missions/MissionCard";
import { EmptyMissionsState } from "./current-missions/EmptyMissionsState";
import { getStoredToken } from "@/services/authApi";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentVolunteerMissions } from "@/services/volunteerMissionsApi";
import type { VolunteerCurrentMission } from "@/types/missions";

export function CurrentMissions() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMissions, setCurrentMissions] = useState<VolunteerCurrentMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchMissions = useCallback(async () => {
    setLoading(true);
    if (!user?.id) {
      setHasSession(false);
      setCurrentMissions([]);
      setLoading(false);
      return;
    }
    setHasSession(true);
    const token = getStoredToken();
    const { data, error } = await getCurrentVolunteerMissions(token);
    if (error) {
      setCurrentMissions([]);
      setLoadError(error);
    } else if (data?.missions) {
      const activeMissions = data.missions.filter(
        (mission) => mission.executionStatus === "in_progress"
      );
      setCurrentMissions(activeMissions);
      setLoadError(null);
    } else {
      setCurrentMissions([]);
      setLoadError(null);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    void fetchMissions();
  }, [fetchMissions]);

  const filteredMissions = currentMissions.filter(
    (mission) =>
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!hasSession) {
    return (
      <EmptyMissionsState
        title={t("Sign in to see your missions")}
        description={t("Your current missions will appear here once you're logged in.")}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="text-muted-foreground">{t("Loading missions...")}</div>
      </div>
    );
  }

  if (currentMissions.length === 0) {
    return (
      <EmptyMissionsState
        title={loadError ? t("Could not load current missions") : t("No current missions")}
        description={
          loadError
            ? loadError
            : t("You are not currently participating in any missions")
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder={t("Search missions...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filteredMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  );
}
