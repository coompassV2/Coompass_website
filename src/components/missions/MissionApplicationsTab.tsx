import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { apiGet, apiPost, getStoredToken } from "@/services/authApi";
import type { NonprofitMissionApplicationsResponse } from "@/types/missions";
import { useToast } from "@/hooks/use-toast";
import { formatDatePt } from "@/lib/dateFormat";

interface MissionApplicationsTabProps {
  missionId: string;
  ownerType?: "nonprofit" | "company";
  missionExecutionStatus?: "not_started" | "in_progress" | "completed" | "cancelled";
}

type StatusTone = "pending" | "accepted" | "rejected" | "withdrawn";
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

function normalizeStatus(status: string | null | undefined): StatusTone {
  switch ((status ?? "").toLowerCase()) {
    case "accepted":
      return "accepted";
    case "rejected":
      return "rejected";
    case "withdrawn":
      return "withdrawn";
    default:
      return "pending";
  }
}

function statusLabel(status: StatusTone): string {
  if (status === "accepted") return "Accepted";
  if (status === "withdrawn") return "Withdrawn";
  return status;
}

function formatDate(value: string | null | undefined): string {
  return formatDatePt(value);
}

export function MissionApplicationsTab({
  missionId,
  ownerType = "nonprofit",
  missionExecutionStatus = "not_started",
}: MissionApplicationsTabProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<NonprofitMissionApplicationsResponse["applications"]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<NonprofitMissionApplicationsResponse["applications"][number] | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [volunteerProfile, setVolunteerProfile] = useState<VolunteerProfileDetails | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejecting, setRejecting] = useState(false);
  const [approving, setApproving] = useState(false);

  const basePath = "/api/missions";
  const reviewBasePath = "/api/missions/applications";

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      const token = getStoredToken();
      const { data, error: loadError } = await apiGet<NonprofitMissionApplicationsResponse>(
        `${basePath}/${missionId}/applications`,
        token
      );
      if (cancelled) return;
      if (loadError) {
        setError(loadError);
        setApplications([]);
        setLoading(false);
        return;
      }
      setApplications(data?.applications ?? []);
      setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [basePath, missionId]);

  const rows = useMemo(() => applications, [applications]);
  const canManageApplications = missionExecutionStatus === "not_started";
  const canRejectSelectedApplication =
    canManageApplications &&
    normalizeStatus(selectedApplication?.status) !== "rejected" &&
    normalizeStatus(selectedApplication?.status) !== "withdrawn";
  const canApproveSelectedApplication =
    canManageApplications &&
    normalizeStatus(selectedApplication?.status) === "pending";

  const openProfile = async (application: NonprofitMissionApplicationsResponse["applications"][number]) => {
    setSelectedApplication(application);
    setProfileLoading(true);
    setProfileError(null);
    setVolunteerProfile(null);
    setRejectReason("");
    setProfileOpen(true);
    const token = getStoredToken();
    const profileEndpoint =
      ownerType === "company"
        ? `/api/company/volunteers/${application.volunteer_id}?missionId=${encodeURIComponent(missionId)}`
        : `/api/nonprofit/volunteers/${application.volunteer_id}?missionId=${encodeURIComponent(missionId)}`;
    const { data, error: loadError } = await apiGet<VolunteerProfileDetails>(profileEndpoint, token);
    if (loadError) {
      setProfileError(loadError);
      setProfileLoading(false);
      return;
    }
    setVolunteerProfile(data ?? null);
    setProfileLoading(false);
  };

  const submitReject = async () => {
    if (!selectedApplication) return;
    setRejecting(true);
    const token = getStoredToken();
    const { error: rejectError } = await apiPost(
      `${reviewBasePath}/${selectedApplication.id}/reject`,
      { decision_note: rejectReason.trim() || undefined },
      token
    );
    setRejecting(false);
    if (rejectError) {
      toast({ title: t("Error"), description: rejectError, variant: "destructive" });
      return;
    }
    const nowIso = new Date().toISOString();
    setApplications((prev) =>
      prev.map((row) =>
        row.id === selectedApplication.id
          ? {
              ...row,
              status: "rejected",
              reviewed_at: nowIso,
              decision_note: rejectReason.trim() || null,
            }
          : row
      )
    );
    toast({ title: t("Application rejected.") });
    setSelectedApplication((prev) =>
      prev ? { ...prev, status: "rejected", reviewed_at: nowIso, decision_note: rejectReason.trim() || null } : prev
    );
  };

  const submitApprove = async () => {
    if (!selectedApplication) return;
    setApproving(true);
    const token = getStoredToken();
    const { error: approveError } = await apiPost(
      `${reviewBasePath}/${selectedApplication.id}/approve`,
      {},
      token
    );
    setApproving(false);
    if (approveError) {
      toast({ title: t("Error"), description: approveError, variant: "destructive" });
      return;
    }
    const nowIso = new Date().toISOString();
    setApplications((prev) =>
      prev.map((row) =>
        row.id === selectedApplication.id
          ? {
              ...row,
              status: "accepted",
              reviewed_at: nowIso,
            }
          : row
      )
    );
    toast({ title: t("Application approved.") });
    setSelectedApplication((prev) =>
      prev ? { ...prev, status: "accepted", reviewed_at: nowIso } : prev
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Applications")}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <p className="text-sm text-muted-foreground">{t("Loading applications...")}</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("No applications for this mission yet.")}</p>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>{t("Volunteer")}</TableHead>
                  <TableHead>{t("Email")}</TableHead>
                  <TableHead>{t("Applied Date")}</TableHead>
                  <TableHead>{t("Status")}</TableHead>
                  <TableHead className="text-right">{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((application) => {
                  const status = normalizeStatus(application.status);
                  return (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.volunteer_name || t("Unknown volunteer")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {application.volunteer_email || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(application.applied_at)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            status === "accepted"
                              ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                              : status === "rejected"
                              ? "bg-red-500/15 text-red-700 dark:bg-red-950 dark:text-red-400"
                              : status === "withdrawn"
                              ? "bg-slate-500/15 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                              : "bg-amber-500/15 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                          }
                        >
                          {t(statusLabel(status))}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => void openProfile(application)}>
                            {t("View details")}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

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
                        {(volunteerProfile?.full_name || "VP")
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((chunk) => chunk[0]?.toUpperCase() ?? "")
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0">
                      <p className="text-lg font-semibold">
                        {volunteerProfile?.full_name || selectedApplication?.volunteer_name || t("Unknown volunteer")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {volunteerProfile?.email || selectedApplication?.volunteer_email || "-"}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {t(statusLabel(normalizeStatus(selectedApplication?.status)))}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {t("Applied Date")}: {formatDate(selectedApplication?.applied_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {volunteerProfile?.description ? (
                    <p className="mt-3 text-sm text-muted-foreground">{volunteerProfile.description}</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{t("Volunteer Hours")}</p>
                    <p className="text-2xl font-semibold">
                      {Number(volunteerProfile?.metrics.approved_hours ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{t("Missions participated")}</p>
                    <p className="text-2xl font-semibold">
                      {Number(volunteerProfile?.metrics.participated_missions ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{t("Missions completed")}</p>
                    <p className="text-2xl font-semibold">
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

                {canRejectSelectedApplication ? (
                  <div className="space-y-2">
                    <Textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
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
            <Button variant="outline" onClick={() => setProfileOpen(false)} disabled={rejecting || approving}>
              {t("Cancel")}
            </Button>
            {canApproveSelectedApplication ? (
              <Button
                className="bg-coompass-success hover:bg-coompass-success/90 text-white"
                onClick={submitApprove}
                disabled={approving || rejecting}
              >
                {approving ? t("Loading...") : t("Approve application")}
              </Button>
            ) : null}
            {canRejectSelectedApplication ? (
              <Button variant="destructive" onClick={submitReject} disabled={rejecting || approving}>
                {rejecting ? t("Loading...") : t("Reject application")}
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
