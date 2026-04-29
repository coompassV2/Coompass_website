import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  Award,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getStoredToken } from "@/services/authApi";
import { getVolunteerMissionHistory } from "@/services/volunteerMissionsApi";
import type { VolunteerMissionHistoryItem } from "@/types/missions";
import { formatDatePt } from "@/lib/dateFormat";

function volunteerDisplayName(
  user: {
    email?: string;
    user_metadata?: Record<string, unknown>;
  } | null,
  t: (key: string) => string
): string {
  const raw = user?.user_metadata?.full_name;
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  const email = user?.email?.trim();
  if (email && email.includes("@")) return email.split("@")[0] ?? email;
  return t("Volunteer");
}

export function PastMissions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [selectedMission, setSelectedMission] = useState<VolunteerMissionHistoryItem | null>(
    null
  );
  const [pastMissions, setPastMissions] = useState<VolunteerMissionHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const certVolunteerName = volunteerDisplayName(user, t);

  const fetchPastMissions = useCallback(async () => {
    if (!user?.id) {
      setPastMissions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    const token = getStoredToken();
    const { data, error } = await getVolunteerMissionHistory(token);
    if (error) {
      setLoadError(error);
      setPastMissions([]);
    } else {
      setPastMissions(data?.missions ?? []);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    void fetchPastMissions();
  }, [fetchPastMissions]);

  const filteredMissions = useMemo(
    () =>
      pastMissions.filter(
        (mission) =>
          mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mission.organization.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [pastMissions, searchQuery]
  );

  const handleViewCertificate = (mission: VolunteerMissionHistoryItem) => {
    setSelectedMission(mission);
    setShowCertificateDialog(true);
  };

  const downloadCertificate = () => {
    toast.success(t("Certificate downloaded successfully!"));
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          placeholder={t("Search past missions...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="space-y-4">
        {loading && (
          <p className="text-sm text-muted-foreground">{t("Loading past missions...")}</p>
        )}
        {loadError && (
          <div className="space-y-3">
            <p className="text-sm text-destructive">{loadError}</p>
            <Button variant="outline" onClick={() => void fetchPastMissions()}>
              {t("Retry")}
            </Button>
          </div>
        )}
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="glass-card p-4">
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
                      {t("Completed")}: {formatDatePt(mission.completionDate)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {mission.hours} {t("hrs")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <Badge className="mb-2 bg-purple-500/10 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
                  {t(mission.status)}
                </Badge>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>{t("Impact")}:</strong> {t(mission.impact)}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {mission.skills.map((skill: string) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/missions/${mission.missionId}`}>
                    <FileText className="h-4 w-4 mr-2" />
                    {t("Details")}
                  </Link>
                </Button>
                {mission.hasCertificate ? (
                  <Button size="sm" variant="outline" onClick={() => handleViewCertificate(mission)}>
                    <Award className="h-4 w-4 mr-2" />
                    {t("View Certificate")}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ))}

        {!loading && !loadError && filteredMissions.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-2 text-lg font-medium">{t("No past missions")}</h3>
            <p className="text-muted-foreground">{t("You have not completed any missions yet")}</p>
            <Button className="mt-4" onClick={() => navigate("/missions")}>
              {t("Find Missions")}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="sm:max-w-2xl">
          {selectedMission && (
            <>
              <DialogHeader>
                <DialogTitle>{t("Volunteer Certificate")}</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <div className="border-8 border-gray-200 p-8 bg-white text-black w-full max-w-md rounded-sm">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {t("Certificate of Appreciation")}
                    </h2>
                    <p className="mb-6">{t("This is to certify that")}</p>
                    <p className="text-lg font-semibold mb-6">{certVolunteerName}</p>
                    <p className="mb-6">{t("has successfully volunteered")}</p>
                    <p className="text-lg font-bold mb-2">
                      {selectedMission.hours} {t("hours")}
                    </p>
                    <p className="mb-6">{t("for")}</p>
                    <p className="text-lg font-semibold mb-8">{selectedMission.title}</p>
                    <p className="mb-2">{t("with")}</p>
                    <p className="text-lg font-bold mb-6">{selectedMission.organization}</p>
                    <p className="text-sm mb-8">
                      {t("Completed on")} {formatDatePt(selectedMission.completionDate)}
                    </p>
                    <div className="flex justify-center">
                      <img
                        src="https://api.dicebear.com/7.x/initials/svg?seed=Coompass"
                        alt=""
                        className="h-12 mb-2"
                      />
                    </div>
                    <p className="text-sm">CEO, Coompass</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={downloadCertificate}>{t("Download")}</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
