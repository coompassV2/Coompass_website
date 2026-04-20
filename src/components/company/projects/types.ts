import type { MissionSetupStatus } from "@/types/companyProjects";

/**
 * Company project (CSR/ESG initiative) as used in company dashboard and projects pages.
 */
export interface CompanyProject {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  employees: number;
  partners: number;
  category: string;
  projectMode?: "presencial" | "virtual";
  periodicidade?: "pontual" | "recorrente";
  projectGoals?: string;
  invitedParticipants?: number[];
  invitedUsers?: Array<{
    id: string;
    fullName: string | null;
    email: string | null;
    department: string | null;
  }>;
  notes?: string;
  comments?: ProjectComment[];
  district?: string;
  locationDetails?: string;
  causes?: string[];
  status: "active" | "completed";
  nonprofits: string[];
  nonprofitPartners?: Array<{
    id: string;
    name: string;
    logoUrl: string | null;
  }>;
  endedAt?: string;
  readyForReport?: boolean;
  missionSetupStatus?: MissionSetupStatus;
  missionRequired?: boolean;
  targetNonprofitId?: string | null;
  targetNonprofitName?: string | null;
  partnerNonprofitIds?: string[];
  invitedUserIds?: string[];
  canComment?: boolean;
  linkedMissionId?: string | null;
  linkedMission?: {
    id: string;
    title: string;
    startDate: string | null;
    endDate: string | null;
    missionImageUrl: string | null;
    approvalStatus: "pending" | "approved" | "rejected";
    executionStatus: "not_started" | "in_progress" | "completed" | "cancelled";
    location: string | null;
    isVirtual: boolean;
    volunteersRequired: number;
  } | null;
}

export interface ProjectComment {
  id: string;
  projectId: string;
  authorUserId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    fullName: string | null;
    avatarUrl: string | null;
  };
}

export interface CollaborationInviteData {
  organizationName: string;
  [key: string]: unknown;
}

export interface CompanyProjectFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  nonprofits?: string[];
  [key: string]: unknown;
}
