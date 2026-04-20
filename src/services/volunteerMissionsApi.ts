import { apiDelete, apiGet, apiPost } from "@/services/authApi";
import type {
  CurrentVolunteerMissionsResponse,
  VolunteerMissionApplicationsResponse,
  VolunteerMissionHistoryResponse,
  VolunteerMissionHoursResponse,
} from "@/types/missions";

export async function getCurrentVolunteerMissions(accessToken: string | null) {
  return apiGet<CurrentVolunteerMissionsResponse>("/api/missions/current", accessToken);
}

export async function getVolunteerMissionHistory(accessToken: string | null) {
  return apiGet<VolunteerMissionHistoryResponse>("/api/missions/history", accessToken);
}

export async function getVolunteerMissionApplications(accessToken: string | null) {
  return apiGet<VolunteerMissionApplicationsResponse>("/api/missions/applications", accessToken);
}

export async function applyToMission(missionId: string, accessToken: string | null) {
  return apiPost<{ applied: boolean }>(`/api/missions/${missionId}/apply`, {}, accessToken);
}

export async function withdrawMissionApplication(
  applicationId: string,
  accessToken: string | null,
  withdrawalReason?: string
) {
  const reason = withdrawalReason?.trim() ?? "";
  const query = reason.length > 0 ? `?reason=${encodeURIComponent(reason)}` : "";
  return apiDelete<{ withdrawn: boolean }>(`/api/missions/applications/${applicationId}${query}`, accessToken);
}

export async function logMissionHours(
  missionId: string,
  payload: { hours: number; description?: string },
  accessToken: string | null
) {
  return apiPost<{ entry: unknown }>(`/api/missions/${missionId}/hours`, payload, accessToken);
}

export async function getMissionHours(missionId: string, accessToken: string | null) {
  return apiGet<VolunteerMissionHoursResponse>(`/api/missions/${missionId}/hours`, accessToken);
}

export async function completeMission(missionId: string, accessToken: string | null) {
  return apiPost<{ completed: boolean }>(`/api/missions/${missionId}/complete`, {}, accessToken);
}
