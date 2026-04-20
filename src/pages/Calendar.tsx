
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { MissionsFilters } from "@/components/missions/MissionsFilters";
import { missions } from "@/data/missions";
import { CalendarView } from "@/components/calendar/CalendarView";
import { CalendarViewSelector } from "@/components/calendar/CalendarViewSelector";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { Card, CardContent } from "@/components/ui/card";

export default function Calendar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { causes, skills } = useTaxonomyLists();
  const causeAreas = causes.map((cause) => cause.name);
  const skillNames = skills.map((skill) => skill.name);
  
  // Filtering state
  const [searchValue, setSearchValue] = useState("");
  const [showActiveMissionsOnly, setShowActiveMissionsOnly] = useState(false);
  const [showInPersonOnly, setShowInPersonOnly] = useState(false);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [viewType, setViewType] = useState<'month' | 'week'>('month');

  // Toggle functions for filters
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
  };

  // Filter missions based on selected filters
  const filteredMissions = missions.filter(mission => {
    if (showActiveMissionsOnly && !mission.isActive) return false;
    if (showInPersonOnly && mission.location !== "In-Person") return false;
    if (selectedCauses.length > 0 && !mission.causes.some(cause => selectedCauses.includes(cause))) return false;
    if (selectedSkills.length > 0 && !mission.skills.some(skill => selectedSkills.includes(skill))) return false;
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      return (
        mission.title.toLowerCase().includes(searchLower) ||
        mission.organization.toLowerCase().includes(searchLower) ||
        mission.description.toLowerCase().includes(searchLower) ||
        mission.causes.some(cause => cause.toLowerCase().includes(searchLower)) ||
        mission.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("Calendar")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div className="mt-6">
          <Card>
            <CardContent className="py-8">
              <p className="text-sm text-muted-foreground">
                {t("Under construction")}
              </p>
            </CardContent>
          </Card>
        </div>


      </main>
    </div>
  );
}
