
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { toast } from "sonner";

import { SearchBar } from "./available-missions/SearchBar";
import { FilterDialog } from "./available-missions/FilterDialog";
import { MissionList } from "./available-missions/MissionList";
import { DetailsDialog } from "./available-missions/DetailsDialog";
import { ApplyDialog } from "./available-missions/ApplyDialog";
import { Mission } from "./available-missions/types";
import { missions as allMissions } from "@/data/missions";
import type { Mission as GlobalMission } from "@/types/organization";

export function AvailableMissions() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  // Filter states
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [causesFilter, setCausesFilter] = useState<string[]>([]);
  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
  
  // Use shared demo missions catalog as source of truth for available missions
  const availableMissions: Mission[] = (allMissions as GlobalMission[]).map((m) => ({
    id: m.id,
    title: m.title,
    organization: m.organization,
    location: m.location,
    date: m.postedDate,
    hours: m.hours,
    causes: m.causes ?? [],
    skills: m.skills ?? [],
    // Simple deterministic match score for demo purposes
    matchScore: 80,
    description: m.description,
  }));
  
  const availableLocations = Array.from(new Set(availableMissions.map((m) => m.location))).filter(Boolean);
  const availableCauses = Array.from(new Set(availableMissions.flatMap((m) => m.causes)));
  const availableSkills = Array.from(new Set(availableMissions.flatMap((m) => m.skills)));
  
  // Apply filters to missions
  const filteredMissions = availableMissions.filter(mission => {
    // Apply search query filter
    const matchesQuery = 
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mission.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply location filter if any locations are selected
    const matchesLocation = locationFilter.length === 0 || 
      locationFilter.includes(mission.location);
    
    // Apply causes filter if any causes are selected
    const matchesCauses = causesFilter.length === 0 || 
      mission.causes.some(cause => causesFilter.includes(cause));
    
    // Apply skills filter if any skills are selected
    const matchesSkills = skillsFilter.length === 0 || 
      mission.skills.some(skill => skillsFilter.includes(skill));
    
    return matchesQuery && matchesLocation && matchesCauses && matchesSkills;
  });
  
  const handleViewDetails = (mission: Mission) => {
    setSelectedMission(mission);
    setShowDetailsDialog(true);
  };
  
  const handleApply = (mission: Mission) => {
    setSelectedMission(mission);
    setShowApplyDialog(true);
  };

  const handleSubmitApplication = () => {
    toast.success(t('Application submitted successfully!'));
    setShowApplyDialog(false);
    // In a real application, you would submit to an API here
  };
  
  const toggleLocationFilter = (location: string) => {
    setLocationFilter(prev => 
      prev.includes(location) 
        ? prev.filter(loc => loc !== location) 
        : [...prev, location]
    );
  };
  
  const toggleCauseFilter = (cause: string) => {
    setCausesFilter(prev => 
      prev.includes(cause) 
        ? prev.filter(c => c !== cause) 
        : [...prev, cause]
    );
  };
  
  const toggleSkillFilter = (skill: string) => {
    setSkillsFilter(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };
  
  const clearFilters = () => {
    setLocationFilter([]);
    setCausesFilter([]);
    setSkillsFilter([]);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Button variant="outline" onClick={() => setShowFilterDialog(true)}>
          <Filter className="h-4 w-4 mr-2" />
          {t('Filter')}
        </Button>
      </div>
      
      <MissionList
        filteredMissions={filteredMissions}
        onViewDetails={handleViewDetails}
        onApply={handleApply}
      />

      {/* Dialogs */}
      <FilterDialog
        open={showFilterDialog}
        onOpenChange={setShowFilterDialog}
        locationFilter={locationFilter}
        causesFilter={causesFilter}
        skillsFilter={skillsFilter}
        availableLocations={availableLocations}
        availableCauses={availableCauses}
        availableSkills={availableSkills}
        toggleLocationFilter={toggleLocationFilter}
        toggleCauseFilter={toggleCauseFilter}
        toggleSkillFilter={toggleSkillFilter}
        clearFilters={clearFilters}
      />

      <DetailsDialog
        mission={selectedMission}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        onApply={handleApply}
      />

      <ApplyDialog
        mission={selectedMission}
        open={showApplyDialog}
        onOpenChange={setShowApplyDialog}
        onSubmit={handleSubmitApplication}
      />
    </div>
  );
}
