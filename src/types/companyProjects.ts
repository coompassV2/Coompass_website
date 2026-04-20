/**
 * Company projects API (Supabase-backed).
 */
export type MissionSetupStatus = "not_required" | "incomplete" | "completed";

export interface ApiCompanyProject {
  id: string;
  company_id: string;
  title: string;
  description: string;
  category: string;
  project_mode: "presencial" | "virtual" | null;
  periodicidade: "pontual" | "recorrente" | null;
  district: string | null;
  location_details: string | null;
  start_date: string;
  end_date: string;
  project_goals: string | null;
  status: "active" | "completed";
  progress: number;
  employees_count: number;
  partners_count: number;
  mission_required: boolean;
  mission_setup_status: MissionSetupStatus;
  target_nonprofit_id: string | null;
  partner_nonprofit_ids: string[];
  invited_user_ids?: string[];
  invited_users?: Array<{
    id: string;
    full_name: string | null;
    email: string | null;
    department: string | null;
  }>;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  nonprofit_names?: string[];
  nonprofit_partners?: Array<{
    id: string;
    organization_name: string | null;
    avatar_url: string | null;
  }>;
  target_nonprofit_name?: string | null;
  linked_mission_id?: string | null;
  linked_mission?: {
    id: string;
    title: string;
    start_date: string | null;
    end_date: string | null;
    mission_image_url: string | null;
    approval_status: "pending" | "approved" | "rejected";
    execution_status: "not_started" | "in_progress" | "completed" | "cancelled";
    location: string | null;
    is_virtual: boolean;
    volunteers_required: number;
  } | null;
}

export interface ApiProjectCommentAuthor {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface ApiCompanyProjectComment {
  id: string;
  project_id: string;
  author_user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: ApiProjectCommentAuthor;
}

export interface CompanyProjectsListResponse {
  projects: ApiCompanyProject[];
}

export interface CompanyProjectCreateResponse {
  project: ApiCompanyProject;
  next_step: "mission" | null;
}

export interface CompanyProjectSingleResponse {
  project: ApiCompanyProject;
  can_comment?: boolean;
}

export interface CompanyProjectCommentsListResponse {
  comments: ApiCompanyProjectComment[];
}

export interface CompanyProjectCommentCreateResponse {
  comment: ApiCompanyProjectComment;
}
