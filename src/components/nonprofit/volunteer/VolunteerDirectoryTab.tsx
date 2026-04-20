import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VolunteerTable } from "@/components/nonprofit/VolunteerTable";
import { PendingVolunteerTable } from "@/components/nonprofit/PendingVolunteerTable";
import { Textarea } from "@/components/ui/textarea";
import { apiGet, getStoredToken } from "@/services/authApi";
import { useToast } from "@/hooks/use-toast";
import { Volunteer, PendingVolunteer } from "./VolunteerTypes";

interface VolunteerDirectoryTabProps {
  volunteers: Volunteer[];
  pendingVolunteers: PendingVolunteer[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  rejectingApplicationId: string | null;
  onRejectVolunteer: (applicationId: string, decisionNote?: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  onRetry: () => Promise<void>;
}

interface VolunteerProfileDetails {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  description: string | null;
  location: string | null;
  skills: string[];
  causes: string[];
  sdgs: string[];
  metrics: {
    approved_hours: number;
    participated_missions: number;
    completed_missions: number;
  };
}

export function VolunteerDirectoryTab({
  volunteers,
  pendingVolunteers,
  searchQuery,
  loading,
  error,
  rejectingApplicationId,
  onRejectVolunteer,
  onRetry,
}: VolunteerDirectoryTabProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | PendingVolunteer | null>(null);
  const [volunteerProfile, setVolunteerProfile] = useState<VolunteerProfileDetails | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filteredVolunteers = useMemo(() => {
    const searchLower = searchQuery.trim().toLowerCase();
    if (!searchLower) return volunteers;
    return volunteers.filter((volunteer) => {
      return (
        volunteer.name.toLowerCase().includes(searchLower) ||
        volunteer.mission.toLowerCase().includes(searchLower) ||
        (volunteer.email ?? "").toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, volunteers]);

  const filteredPendingVolunteers = useMemo(() => {
    const searchLower = searchQuery.trim().toLowerCase();
    if (!searchLower) return pendingVolunteers;
    return pendingVolunteers.filter((volunteer) => {
      return (
        volunteer.name.toLowerCase().includes(searchLower) ||
        volunteer.mission.toLowerCase().includes(searchLower) ||
        (volunteer.email ?? "").toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, pendingVolunteers]);

  const openVolunteerDetails = async (volunteer: Volunteer | PendingVolunteer) => {
    setSelectedVolunteer(volunteer);
    setProfileOpen(true);
    setProfileLoading(true);
    setProfileError(null);
    setVolunteerProfile(null);
    setRejectReason("");

    const token = getStoredToken();
    const { data, error: loadError } = await apiGet<VolunteerProfileDetails>(
      `/api/nonprofit/volunteers/${volunteer.volunteerId}?missionId=${encodeURIComponent(volunteer.missionId)}`,
      token
    );
    if (loadError) {
      setProfileError(loadError);
      setProfileLoading(false);
      return;
    }
    setVolunteerProfile(data ?? null);
    setProfileLoading(false);
  };

  const canRejectSelectedVolunteer = Boolean(selectedVolunteer?.canReject);

  const submitReject = async () => {
    if (!selectedVolunteer || !selectedVolunteer.canReject) return;
    const result = await onRejectVolunteer(selectedVolunteer.applicationId, rejectReason);
    if (!result.ok) {
      toast({ title: t("Error"), description: result.error, variant: "destructive" });
      return;
    }
    setProfileOpen(false);
  };

  const selectedStatusLabel = selectedVolunteer?.status === "pending"
    ? t("Pending")
    : selectedVolunteer?.status === "accepted"
    ? t("Accepted")
    : t("Active");

  const selectedApplyDate = selectedVolunteer && "applyDate" in selectedVolunteer
    ? selectedVolunteer.applyDate
    : "-";

  const selectedJoinDate = selectedVolunteer && "joinDate" in selectedVolunteer
    ? selectedVolunteer.joinDate
    : "-";

  const selectedHours = selectedVolunteer && "hours" in selectedVolunteer && selectedVolunteer.hours !== null
    ? `${selectedVolunteer.hours} hrs`
    : "-";

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="glass-card p-4">
          <p className="text-sm text-muted-foreground">{t("Loading volunteers...")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="glass-card p-4 space-y-3">
          <p className="text-sm text-destructive">{error}</p>
          <Button variant="outline" size="sm" onClick={() => void onRetry()}>
            {t("Try again")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <VolunteerTable
        volunteers={filteredVolunteers}
        onSelectVolunteer={(volunteer) => void openVolunteerDetails(volunteer)}
      />

      <PendingVolunteerTable
        volunteers={filteredPendingVolunteers}
        onSelectVolunteer={(volunteer) => void openVolunteerDetails(volunteer)}
      />

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t("Volunteer details")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            {profileLoading ? (
              <p className="text-sm text-muted-foreground">{t("Loading...")}</p>
            ) : profileError ? (
              <p className="text-sm text-destructive">{profileError}</p>
            ) : (
              <>
                <div className="rounded-lg border p-4 bg-muted/30">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={volunteerProfile?.avatar_url || undefined} />
                      <AvatarFallback>
                        {(volunteerProfile?.full_name || selectedVolunteer?.name || "VP")
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((chunk) => chunk[0]?.toUpperCase() ?? "")
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0">
                      <p className="text-lg font-semibold">
                        {volunteerProfile?.full_name || selectedVolunteer?.name || t("Unknown volunteer")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {volunteerProfile?.email || selectedVolunteer?.email || "-"}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{selectedStatusLabel}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {t("Applied Date")}: {selectedApplyDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  {volunteerProfile?.description ? (
                    <p className="mt-3 text-sm text-muted-foreground">{volunteerProfile.description}</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{t("Join Date")}</p>
                    <p className="text-lg font-semibold">{selectedJoinDate}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{t("Hours")}</p>
                    <p className="text-lg font-semibold">{selectedHours}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{t("Missions participated")}</p>
                    <p className="text-lg font-semibold">
                      {Number(volunteerProfile?.metrics.participated_missions ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{t("Missions completed")}</p>
                    <p className="text-lg font-semibold">
                      {Number(volunteerProfile?.metrics.completed_missions ?? 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">{t("Skills")}</p>
                    <div className="flex flex-wrap gap-2">
                      {(volunteerProfile?.skills ?? []).length > 0 ? (
                        (volunteerProfile?.skills ?? []).map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">{t("No data available yet.")}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">{t("Cause Areas")}</p>
                    <div className="flex flex-wrap gap-2">
                      {(volunteerProfile?.causes ?? []).length > 0 ? (
                        (volunteerProfile?.causes ?? []).map((cause) => (
                          <Badge key={cause} variant="secondary">{cause}</Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">{t("No data available yet.")}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">{t("SDGs")}</p>
                    <div className="flex flex-wrap gap-2">
                      {(volunteerProfile?.sdgs ?? []).length > 0 ? (
                        (volunteerProfile?.sdgs ?? []).map((sdg) => (
                          <Badge key={sdg} variant="secondary">{sdg}</Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">{t("No data available yet.")}</span>
                      )}
                    </div>
                  </div>
                </div>

                {canRejectSelectedVolunteer ? (
                  <div className="space-y-2">
                    <Textarea
                      value={rejectReason}
                      onChange={(event) => setRejectReason(event.target.value)}
                      placeholder={t("Rejection reason (optional)")}
                      className="w-full min-h-[96px]"
                      maxCount={200}
                      showCount
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setProfileOpen(false)} disabled={Boolean(rejectingApplicationId)}>
              {t("Cancel")}
            </Button>
            {canRejectSelectedVolunteer && selectedVolunteer ? (
              <Button
                variant="destructive"
                onClick={() => void submitReject()}
                disabled={rejectingApplicationId === selectedVolunteer.applicationId}
              >
                {rejectingApplicationId === selectedVolunteer.applicationId ? t("Loading...") : t("Reject application")}
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
