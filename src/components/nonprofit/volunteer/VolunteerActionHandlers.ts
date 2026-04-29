import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { apiGet, apiPost, getStoredToken } from "@/services/authApi";
import type { MissionsResponse, NonprofitMissionApplication, NonprofitMissionApplicationsResponse } from "@/types/missions";
import { PendingVolunteer, Volunteer } from "./VolunteerTypes";
import { formatDatePt } from "@/lib/dateFormat";

function asDisplayDate(value: string | null | undefined): string {
  return formatDatePt(value);
}

function classifyApplications(applications: NonprofitMissionApplication[]): {
  active: Volunteer[];
  pending: PendingVolunteer[];
} {
  const active: Volunteer[] = [];
  const pending: PendingVolunteer[] = [];

  for (const application of applications) {
    const missionExecutionStatus = application.mission_execution_status ?? "not_started";
    const participantStatus = application.participant_status ?? null;
    const missionStarted = missionExecutionStatus !== "not_started";
    const isAccepted = application.status === "accepted";
    const isPending = application.status === "pending";
    const isNotStartedApplication = !missionStarted && (isPending || isAccepted);
    const isStartedVolunteer = missionStarted && (isAccepted || participantStatus === "active");

    if (isNotStartedApplication) {
      pending.push({
        id: application.id,
        applicationId: application.id,
        volunteerId: application.volunteer_id,
        missionId: application.mission_id,
        name: application.volunteer_name ?? "Unknown volunteer",
        email: application.volunteer_email ?? null,
        applyDate: asDisplayDate(application.applied_at),
        availability: "-",
        mission: application.mission_title,
        status: isAccepted ? "accepted" : "pending",
        missionExecutionStatus,
        canReject: true,
      });
      continue;
    }

    if (!isStartedVolunteer) continue;

    active.push({
      id: application.id,
      applicationId: application.id,
      volunteerId: application.volunteer_id,
      missionId: application.mission_id,
      name: application.volunteer_name ?? "Unknown volunteer",
      email: application.volunteer_email ?? null,
      joinDate: asDisplayDate(application.participant_joined_at ?? application.applied_at),
      appliedAt: application.applied_at,
      hours: application.participant_final_hours ?? null,
      skills: [],
      mission: application.mission_title,
      status: participantStatus === "active" ? "active" : "accepted",
      missionExecutionStatus,
      participantStatus,
      canReject: false,
    });
  }

  active.sort((a, b) => a.name.localeCompare(b.name));
  pending.sort((a, b) => a.name.localeCompare(b.name));
  return { active, pending };
}

export function useVolunteerActions() {
  const { t } = useTranslation();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [pendingVolunteers, setPendingVolunteers] = useState<PendingVolunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectingApplicationId, setRejectingApplicationId] = useState<string | null>(null);

  const loadVolunteers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = getStoredToken();
    const { data: missionsData, error: missionsError } = await apiGet<MissionsResponse>(
      "/api/nonprofit/missions",
      token
    );

    if (missionsError) {
      setError(missionsError);
      setVolunteers([]);
      setPendingVolunteers([]);
      setLoading(false);
      return;
    }

    const missionIds = (missionsData?.missions ?? []).map((mission) => mission.id);
    if (missionIds.length === 0) {
      setVolunteers([]);
      setPendingVolunteers([]);
      setLoading(false);
      return;
    }

    const responses = await Promise.all(
      missionIds.map((missionId) =>
        apiGet<NonprofitMissionApplicationsResponse>(`/api/missions/${missionId}/applications`, token)
      )
    );

    const failed = responses.find((response) => response.error);
    if (failed?.error) {
      setError(failed.error);
      setVolunteers([]);
      setPendingVolunteers([]);
      setLoading(false);
      return;
    }

    const allApplications = responses.flatMap((response) => response.data?.applications ?? []);
    const classified = classifyApplications(allApplications);
    setVolunteers(classified.active);
    setPendingVolunteers(classified.pending);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadVolunteers();
  }, [loadVolunteers]);

  const handleRejectVolunteer = async (applicationId: string, decisionNote?: string) => {
    setRejectingApplicationId(applicationId);
    const token = getStoredToken();
    const { error: rejectError } = await apiPost(
      `/api/missions/applications/${applicationId}/reject`,
      { decision_note: decisionNote?.trim() || undefined },
      token
    );
    setRejectingApplicationId(null);
    if (rejectError) {
      toast.error(rejectError);
      return { ok: false as const, error: rejectError };
    }

    toast.success(t("Volunteer application rejected"));
    await loadVolunteers();
    return { ok: true as const };
  };

  return {
    volunteers,
    pendingVolunteers,
    loading,
    error,
    rejectingApplicationId,
    refreshVolunteers: loadVolunteers,
    handleRejectVolunteer,
  };
}
