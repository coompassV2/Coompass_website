import type { ApiCompanyProject, ApiCompanyProjectComment } from "@/types/companyProjects";
import type { CompanyProject, ProjectComment } from "./types";
import { formatDatePt } from "@/lib/dateFormat";

/** Map API row to UI model used by cards and details. */
export function apiCompanyProjectToCompanyProject(row: ApiCompanyProject): CompanyProject {
  const safeDescription = row.description === "undefined" || row.description === "null" ? "" : row.description;
  const nonprofitNames = row.nonprofit_names?.length
    ? row.nonprofit_names
    : (row.partner_nonprofit_ids ?? []).map(() => "");

  return {
    id: row.id,
    title: row.title,
    description: safeDescription,
    startDate: row.start_date,
    endDate: row.end_date,
    progress: row.progress ?? 0,
    employees: row.employees_count ?? 0,
    partners: row.partners_count ?? nonprofitNames.filter(Boolean).length,
    category: row.category,
    projectMode: row.project_mode ?? undefined,
    periodicidade: row.periodicidade ?? undefined,
    projectGoals: row.project_goals ?? undefined,
    district: row.district ?? undefined,
    status: row.status === "completed" ? "completed" : "active",
    nonprofits: nonprofitNames.filter(Boolean),
    nonprofitPartners: (row.nonprofit_partners ?? []).map((partner) => ({
      id: partner.id,
      name: partner.organization_name ?? "",
      logoUrl: partner.avatar_url ?? null,
    })),
    missionSetupStatus: row.mission_setup_status,
    missionRequired: row.mission_required,
    targetNonprofitId: row.target_nonprofit_id,
    targetNonprofitName: row.target_nonprofit_name,
    partnerNonprofitIds: row.partner_nonprofit_ids ?? [],
    invitedUserIds: row.invited_user_ids ?? [],
    invitedUsers: (row.invited_users ?? []).map((user) => ({
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      department: user.department,
    })),
    locationDetails: row.location_details ?? undefined,
    notes: row.notes ?? undefined,
    linkedMissionId: row.linked_mission_id ?? null,
    linkedMission: row.linked_mission
      ? {
          id: row.linked_mission.id,
          title: row.linked_mission.title,
          startDate: row.linked_mission.start_date,
          endDate: row.linked_mission.end_date,
          missionImageUrl: row.linked_mission.mission_image_url,
          approvalStatus: row.linked_mission.approval_status,
          executionStatus: row.linked_mission.execution_status,
          location: row.linked_mission.location,
          isVirtual: row.linked_mission.is_virtual,
          volunteersRequired: row.linked_mission.volunteers_required,
        }
      : null,
  };
}

export function apiCompanyProjectCommentToProjectComment(row: ApiCompanyProjectComment): ProjectComment {
  return {
    id: row.id,
    projectId: row.project_id,
    authorUserId: row.author_user_id,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    author: {
      id: row.author.id,
      fullName: row.author.full_name,
      avatarUrl: row.author.avatar_url,
    },
  };
}

/** Display-friendly date range (cards use formatDatePt elsewhere). */
export function projectDateRangeDisplay(row: ApiCompanyProject): { start: string; end: string } {
  return {
    start: formatDatePt(row.start_date),
    end: formatDatePt(row.end_date),
  };
}
