
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Mission } from "@/types/organization";

interface MissionFilterOptions {
  initialShowSuitableOnly?: boolean;
  initialShowActiveOnly?: boolean;
}

function normalizeDistrict(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function useMissionFilters(
  initialMissions: Mission[] = [],
  options: MissionFilterOptions = {}
) {
  const location = useLocation();
  const initialShowSuitableOnly = options.initialShowSuitableOnly === true;
  const initialShowActiveOnly = options.initialShowActiveOnly === true;
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [searchValue, setSearchValue] = useState("");
  const [showActiveMissionsOnly, setShowActiveMissionsOnly] = useState(initialShowActiveOnly);
  const [showInPersonOnly, setShowInPersonOnly] = useState(false);
  const [showSuitableOnly, setShowSuitableOnly] = useState(initialShowSuitableOnly);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [organizationFilter, setOrganizationFilter] = useState<string | null>(null);

  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orgParam = queryParams.get('organization');
    
    if (orgParam) {
      setOrganizationFilter(orgParam);
      setShowActiveMissionsOnly(true); // Auto-filter to active missions when coming from org page
    } else {
      setOrganizationFilter(null);
    }
  }, [location.search]);

  const toggleCause = (cause: string) => {
    setSelectedCauses(prev => 
      prev.includes(cause)
        ? prev.filter(c => c !== cause)
        : [...prev, cause]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedCauses([]);
    setSelectedSkills([]);
    setOrganizationFilter(null);
    setSearchValue("");
    setShowActiveMissionsOnly(initialShowActiveOnly);
    setShowInPersonOnly(false);
    setShowSuitableOnly(initialShowSuitableOnly);
    setSelectedDistrict("");
  };

  // Apply all filters to get the filtered missions
  const filteredMissions = missions.filter(mission => {
    // Apply organization filter first if present
    if (organizationFilter && mission.organization?.toLowerCase() !== organizationFilter.toLowerCase()) {
      return false;
    }
    
    // Apply active missions filter
    const hasExplicitLifecycleStatus = mission.approvalStatus != null && mission.executionStatus != null;
    const isExecutionActive =
      mission.executionStatus === "not_started" || mission.executionStatus === "in_progress";
    const isMissionActive = hasExplicitLifecycleStatus
      ? mission.approvalStatus === "approved" && isExecutionActive
      : false;
    if (showActiveMissionsOnly && !isMissionActive) {
      return false;
    }
    
    // Apply in-person filter
    if (
      showInPersonOnly &&
      (mission.isVirtual === true || mission.location.toLowerCase() === "virtual")
    ) {
      return false;
    }

    if (selectedDistrict) {
      const missionDistrict = normalizeDistrict(mission.district);
      const missionLocation = normalizeDistrict(mission.location);
      const selectedDistrictNormalized = normalizeDistrict(selectedDistrict);
      const matchesDistrictField =
        missionDistrict.length > 0 &&
        missionDistrict === selectedDistrictNormalized;
      const matchesLocationFallback =
        missionLocation.length > 0 &&
        missionLocation.includes(selectedDistrictNormalized);
      if (!matchesDistrictField && !matchesLocationFallback) {
        return false;
      }
    }
    
    // Apply cause filter
    if (selectedCauses.length > 0 && !mission.causes?.some(cause => selectedCauses.includes(cause))) {
      return false;
    }
    
    // Apply skills filter
    if (selectedSkills.length > 0 && !mission.skills?.some(skill => selectedSkills.includes(skill))) {
      return false;
    }

    // Apply suitable-for-me filter (volunteer default behavior)
    if (showSuitableOnly && mission.isSkillMatch === false) {
      return false;
    }
    
    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      return (
        mission.title?.toLowerCase().includes(searchLower) ||
        mission.organization?.toLowerCase().includes(searchLower) ||
        mission.description?.toLowerCase().includes(searchLower) ||
        mission.causes?.some(cause => cause.toLowerCase().includes(searchLower)) ||
        mission.skills?.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  return {
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
    organizationFilter,
    clearFilters,
    filteredMissions,
    setMissions
  };
}
