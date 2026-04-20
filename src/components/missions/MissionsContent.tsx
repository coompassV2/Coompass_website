import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MissionsFilters } from "./MissionsFilters";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useMissionFilters } from "@/hooks/useMissionFilters";
import { MissionCardGrid } from "./MissionCardGrid";
import { Mission } from "@/types/organization";
import { SelectedFilters } from "@/components/shared/SelectedFilters";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { useAuth } from "@/contexts/AuthContext";
import { apiGet, getStoredToken } from "@/services/authApi";
import { ApiMission, MissionsResponse } from "@/types/missions";
import { formatDatePt } from "@/lib/dateFormat";
import { PORTUGAL_DISTRICTS } from "@/constants/portugalDistricts";

interface MissionsContentProps {
  showCreateButton?: boolean;
  onOpenCreateDialog?: () => void;
}

export function MissionsContent({ showCreateButton = false, onOpenCreateDialog }: MissionsContentProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const missionsBasePath = location.pathname.startsWith("/company") ? "/company/missions" : "/missions";

  const { user } = useAuth();
  const isVolunteer = user?.role === "volunteer";
  const { 
    searchValue, 
    setSearchValue, 
    showActiveMissionsOnly, 
    setShowActiveMissionsOnly,
    showInPersonOnly,
    setShowInPersonOnly,
    showSuitableOnly,
    setShowSuitableOnly,
    selectedCauses,
    toggleCause,
    selectedSkills,
    toggleSkill,
    selectedDistrict,
    setSelectedDistrict,
    clearFilters,
    filteredMissions,
    setMissions
  } = useMissionFilters([], {
    initialShowSuitableOnly: false,
    initialShowActiveOnly: true,
  });
  const { causes, skills } = useTaxonomyLists();
  const causeNames = causes.map((cause) => cause.name);
  const skillNames = skills.map((skill) => skill.name);
  const canCreateMissions = user?.role === "company_admin" || user?.role === "nonprofit";
  const activeOnlyLabel = t("Active Missions Only");
  const inPersonOnlyLabel = t("In-Person Only");
  const suitableForMeLabel = t("Suitable for me");

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    const isMissionActive = (mission: ApiMission) =>
      mission.approval_status === "approved" &&
      mission.execution_status !== "completed" &&
      mission.execution_status !== "cancelled";
    const toMissionCardModel = (mission: ApiMission): Mission => ({
      id: mission.id,
      title: mission.title,
      organization: mission.organization_name ?? mission.company_name ?? "Organization",
      companyId: mission.company_id,
      createdByEntityType: mission.created_by_entity_type,
      description: mission.description ?? "",
      hours: mission.hours ?? 0,
      volunteers: mission.volunteers_required ?? 0,
      location: mission.is_virtual ? "Virtual" : mission.location || "In-Person",
      isVirtual: mission.is_virtual,
      scheduleType: mission.schedule_type ?? "one_time",
      postedDate: mission.created_at ? formatDatePt(mission.created_at, "") : "",
      startDate: mission.start_date ? formatDatePt(mission.start_date, "") : undefined,
      endDate: mission.end_date ? formatDatePt(mission.end_date, "") : undefined,
      isActive: isMissionActive(mission),
      approvalStatus: mission.approval_status,
      executionStatus: mission.execution_status ?? "not_started",
      causes: mission.causes ?? [],
      skills: mission.skills ?? [],
      isSkillMatch: mission.is_skill_match,
      matchedSkillsCount: mission.matched_skills_count,
      missionSkillsCount: mission.mission_skills_count,
      participantsCount: mission.participants_count,
      spotsLeft: mission.spots_left,
      isFull: mission.is_full,
      isJoined: mission.is_joined,
      image: mission.mission_image_url ?? undefined,
      organizationLogoUrl:
        mission.organization_logo_url ?? mission.company_logo_url ?? undefined,
      projectCategory: mission.project_category ?? null,
      projectTitle: mission.project_title ?? null,
      district: mission.district ?? null,
    });

    const query = isVolunteer ? `?skill_match_only=${showSuitableOnly ? "true" : "false"}` : "";
    apiGet<MissionsResponse>(`/api/missions${query}`, token)
      .then(({ data, error }) => {
        if (cancelled || error) return;
        setMissions((data?.missions ?? []).map(toMissionCardModel));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isVolunteer, setMissions, showSuitableOnly]);

  const handleMissionClick = (mission: Mission) => {
    navigate(`${missionsBasePath}/${mission.id}`);
  };

  // Prepare selected filters for display
  const activeFilters = [
    ...(showActiveMissionsOnly ? [activeOnlyLabel] : []),
    ...(showInPersonOnly ? [inPersonOnlyLabel] : []),
    ...(isVolunteer && showSuitableOnly ? [suitableForMeLabel] : []),
    ...selectedCauses.map(cause => `Cause: ${cause}`),
    ...selectedSkills.map(skill => `Skill: ${skill}`),
    ...(selectedDistrict ? [`District: ${selectedDistrict}`] : []),
  ];

  // Handle removing a filter
  const handleRemoveFilter = (filter: string) => {
    if (filter === activeOnlyLabel) {
      setShowActiveMissionsOnly(false);
    } else if (filter === inPersonOnlyLabel) {
      setShowInPersonOnly(false);
    } else if (filter === suitableForMeLabel) {
      setShowSuitableOnly(false);
    } else if (filter.startsWith("Cause: ")) {
      const cause = filter.substring(7);
      toggleCause(cause);
    } else if (filter.startsWith("Skill: ")) {
      const skill = filter.substring(7);
      toggleSkill(skill);
    } else if (filter.startsWith("District: ")) {
      setSelectedDistrict("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex-1">
          <MissionsFilters
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            showActiveMissionsOnly={showActiveMissionsOnly}
            onActiveToggle={setShowActiveMissionsOnly}
            showInPersonOnly={showInPersonOnly}
            onInPersonToggle={setShowInPersonOnly}
            showSuitableOnly={showSuitableOnly}
            onSuitableToggle={setShowSuitableOnly}
            showSuitableToggle={isVolunteer}
            selectedCauses={selectedCauses}
            onCauseToggle={toggleCause}
            selectedSkills={selectedSkills}
            onSkillToggle={toggleSkill}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            districts={[...PORTUGAL_DISTRICTS]}
            onClearFilters={clearFilters}
            causeAreas={causeNames}
            skills={skillNames}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {showCreateButton && canCreateMissions && (
            <Button 
              size="sm"
              onClick={onOpenCreateDialog}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs"
            >
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
              {t("Create Initiative")}
            </Button>
          )}
        </div>
      </div>

      {/* Display selected filters */}
      {activeFilters.length > 0 && (
        <SelectedFilters
          filters={activeFilters}
          onRemove={handleRemoveFilter}
        />
      )}

      <MissionCardGrid missions={filteredMissions} onMissionClick={handleMissionClick} />
    </div>
  );
}
