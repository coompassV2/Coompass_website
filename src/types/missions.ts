export type MissionApprovalStatus = "pending" | "approved" | "rejected";
export type MissionExecutionStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "cancelled";
export type MissionCreatorType = "company" | "nonprofit";

export interface ApiMission {
  id: string;
  title: string;
  description: string;
  hours: number;
  volunteers_required: number;
  beneficiaries_count?: number;
  requires_interview?: boolean;
  start_date: string | null;
  end_date: string | null;
  is_virtual: boolean;
  location: string;
  district?: string | null;
  point_of_contact: string;
  requirements?: string;
  mission_image_url?: string | null;
  sdgs?: number[];
  causes?: string[];
  skills?: string[];
  schedule_type?: "one_time" | "recurring";
  approval_status: MissionApprovalStatus;
  execution_status?: MissionExecutionStatus;
  started_at?: string | null;
  completed_at?: string | null;
  started_by_user_id?: string | null;
  created_by_entity_type: MissionCreatorType;
  company_id: string;
  organization_id: string;
  company_project_id?: string | null;
  project_category?: string | null;
  project_title?: string | null;
  company_name?: string | null;
  organization_name?: string | null;
  organization_logo_url?: string | null;
  company_logo_url?: string | null;
  is_skill_match?: boolean;
  matched_skills_count?: number;
  mission_skills_count?: number;
  participants_count?: number;
  approved_candidates_count?: number;
  spots_left?: number;
  is_full?: boolean;
  is_joined?: boolean;
  created_at: string;
}

export interface IncompleteMissionSetup {
  id: string;
  title: string;
  category: string;
  mission_setup_status: "incomplete";
  target_nonprofit_id: string | null;
  created_at: string;
}

export interface MissionsResponse {
  missions: ApiMission[];
  incomplete_mission_setups?: IncompleteMissionSetup[];
}

export interface CompanyMissionsApiResponse extends MissionsResponse {
  incomplete_mission_setups?: IncompleteMissionSetup[];
}

export interface PublicMarqueeMission {
  id: string;
  title: string;
  description: string;
  organization: string;
  hours: number;
  volunteers: number;
  location: string;
  isVirtual: boolean;
  scheduleType: "one_time" | "recurring";
  postedDate: string;
  startDate: string | null;
  endDate: string | null;
  executionStatus: MissionExecutionStatus;
  spotsLeft: number;
  isFull: boolean;
  causes: string[];
  image: string | null;
  organization_logo_url?: string | null;
  company_logo_url?: string | null;
}

export interface PublicMarqueeMissionsResponse {
  missions: PublicMarqueeMission[];
}

export interface MissionResponse {
  mission: ApiMission;
}

export interface VolunteerCurrentMission {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  totalHours: number;
  completedHours: number;
  status: string;
  executionStatus?: MissionExecutionStatus;
  description: string;
  tasks: string[];
}

export interface VolunteerMissionHistoryItem {
  id: string;
  missionId: string;
  title: string;
  organization: string;
  location: string;
  completionDate: string;
  status: "Completed" | "Dropped";
  hours: number;
  impact: string;
  description: string;
  skills: string[];
  hasCertificate: boolean;
  hasProvidedFeedback: boolean;
}

export type VolunteerMissionApplicationStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "Withdrawn";

export interface VolunteerMissionApplication {
  id: string;
  missionId: string;
  mission: string;
  organization: string;
  appliedDate: string;
  status: VolunteerMissionApplicationStatus;
  location: string;
  startDate: string | null;
  description: string;
  decisionNote?: string | null;
  withdrawalReason?: string | null;
}

export interface MissionHoursLogEntry {
  id: string;
  missionId: string;
  date: string;
  hours: number;
  description: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string | null;
}

export interface CurrentVolunteerMissionsResponse {
  missions: VolunteerCurrentMission[];
}

export interface VolunteerMissionHistoryResponse {
  missions: VolunteerMissionHistoryItem[];
}

export interface VolunteerMissionApplicationsResponse {
  applications: VolunteerMissionApplication[];
}

export type NonprofitMissionApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "withdrawn";

export interface NonprofitMissionApplication {
  id: string;
  mission_id: string;
  mission_title: string;
  mission_execution_status?: MissionExecutionStatus;
  volunteer_id: string;
  volunteer_name?: string | null;
  volunteer_email?: string | null;
  status: NonprofitMissionApplicationStatus;
  applied_at: string | null;
  reviewed_at: string | null;
  decision_note?: string | null;
  withdrawal_reason?: string | null;
  participant_status?: "active" | "completed" | "dropped" | null;
  participant_joined_at?: string | null;
  participant_final_hours?: number | null;
}

export interface NonprofitMissionApplicationsResponse {
  applications: NonprofitMissionApplication[];
}

export interface VolunteerMissionHoursResponse {
  entries: MissionHoursLogEntry[];
  totals: {
    approvedHours: number;
    pendingHours: number;
    rejectedHours: number;
  };
}

export interface NonprofitMissionParticipantHoursItem {
  participantId: string;
  volunteerId: string;
  volunteerName: string | null;
  volunteerEmail: string | null;
  participantStatus: "active" | "completed" | "dropped";
  approvedHours: number;
  finalHours: number;
  hoursInput: number;
}

export interface NonprofitMissionParticipantsHoursResponse {
  mission: {
    id: string;
    title: string;
    hours: number;
    beneficiaries_count: number;
    execution_status: MissionExecutionStatus;
  };
  participants: NonprofitMissionParticipantHoursItem[];
}

export interface NonprofitCompleteMissionPayload {
  participants: Array<{
    participantId: string;
    hours: number;
  }>;
  finalBeneficiariesCount: number;
}
