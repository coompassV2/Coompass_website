
export interface Employee {
  id: number;
  name: string;
  joinDate: string;
  lastLogin: string;
  activeMissions: number;
  completeMissions: number;
  volunteerHours: number;
  photoUrl: string;
  companyId?: string;
  /** User ID for API lookups (e.g. volunteer profile) */
  userId?: string;
  /** Admin table: role and status */
  role?: string;
  status?: string;
  /** Volunteer profile: skills and causes (from API when available) */
  skills?: string[];
  causes?: string[];
}

export interface EmployeeTableProps {
  employees: Employee[];
  onRemoveEmployee: (name: string) => void;
  onViewEmployee: (employee: Employee) => void;
  hideActions?: boolean;
}

export interface MissionApplication {
  id: string;
  missionId: string;
  missionTitle: string;
  volunteerId: string;
  volunteerName: string;
  volunteerDepartment: string | null;
  nonprofitId: string | null;
  nonprofitName: string;
  nonprofitLogoUrl: string | null;
  appliedAt: string | null;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
}

export interface CompanyMissionApplicationApiRow {
  id: string;
  mission_id: string;
  mission_title: string;
  volunteer_id: string;
  volunteer_name: string;
  volunteer_department: string | null;
  nonprofit_id: string | null;
  nonprofit_name: string;
  nonprofit_logo_url: string | null;
  applied_at: string | null;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
}

export interface CompanyMissionApplicationsResponse {
  applications: CompanyMissionApplicationApiRow[];
}
