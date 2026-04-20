
export interface Volunteer {
  id: string;
  applicationId: string;
  volunteerId: string;
  missionId: string;
  name: string;
  email?: string | null;
  joinDate: string;
  appliedAt?: string | null;
  hours: number | null;
  skills: string[];
  mission: string;
  status: "accepted" | "active";
  missionExecutionStatus: "not_started" | "in_progress" | "completed" | "cancelled";
  participantStatus?: "active" | "completed" | "dropped" | null;
  canReject: boolean;
}

export interface PendingVolunteer {
  id: string;
  applicationId: string;
  volunteerId: string;
  missionId: string;
  name: string;
  email?: string | null;
  applyDate: string;
  availability: string;
  mission: string;
  status: "pending" | "accepted";
  missionExecutionStatus: "not_started" | "in_progress" | "completed" | "cancelled";
  canReject: boolean;
}
