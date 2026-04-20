
export interface Organization {
  id: number | string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  location?: string;
  causes?: string[];
  size?: string;
  foundedYear?: number;
  type?: string;
  isVerified?: boolean;
  isPartner?: boolean;
  category?: string;
  country?: string;
  activeMissions?: number;
  employees?: number;
  tags?: string[];
  goals?: number[];
  mission?: string;
  vision?: string;
  featured?: boolean;
}

export type MissionApprovalStatus = "pending" | "approved" | "rejected";
export type MissionExecutionStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Mission {
  id: string;
  title: string;
  organization: string;
  companyId?: string;
  createdByEntityType?: "company" | "nonprofit";
  description: string;
  requirements?: string;
  hours: number;
  volunteers: number;
  location: string;
  district?: string | null;
  isVirtual?: boolean;
  scheduleType?: "one_time" | "recurring";
  postedDate: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  approvalStatus?: MissionApprovalStatus;
  executionStatus?: MissionExecutionStatus;
  startedAt?: string | null;
  causes?: string[];
  skills?: string[];
  isSkillMatch?: boolean;
  matchedSkillsCount?: number;
  missionSkillsCount?: number;
  participantsCount?: number;
  approvedCandidatesCount?: number;
  spotsLeft?: number;
  isFull?: boolean;
  isJoined?: boolean;
  image?: string;
  /** Nonprofit or company logo URL for cards (nonprofit preferred when both exist). */
  organizationLogoUrl?: string;
  organizationId?: string;
  projectCategory?: string | null;
  projectTitle?: string | null;
  beneficiariesCount?: number;
  requiresInterview?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  color: string;
  howToEarn?: string;
}

export interface LeaderboardEntry {
  id: string | number;
  rank: number;
  employeeName: string;
  employeeAvatar?: string;
  name?: string;
  organization?: string;
  volunteerHours: number;
  hours?: number;
  missions?: number;
  impact?: number;
  engagedCauseAreas?: number;
  engagedNGOs?: number;
  completedMissions?: number;
  passEarned?: number;
  badges: string[];
  employeeId?: number;
}
