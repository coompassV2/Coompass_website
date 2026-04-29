
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Toaster } from "sonner";
import { VolunteerHeader } from "@/components/nonprofit/volunteer/VolunteerHeader";
import { VolunteerTabs } from "@/components/nonprofit/volunteer/VolunteerTabs";
import { useVolunteerActions } from "@/components/nonprofit/volunteer/VolunteerActionHandlers";

export default function NonprofitVolunteers() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    volunteers,
    pendingVolunteers,
    handleRejectVolunteer,
    loading,
    error,
    rejectingApplicationId,
    refreshVolunteers,
  } = useVolunteerActions();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <Toaster richColors position="top-right" />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Volunteer Management')}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <VolunteerHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="mt-6">
          <VolunteerTabs
            searchQuery={searchQuery}
            volunteers={volunteers}
            pendingVolunteers={pendingVolunteers}
            onRejectVolunteer={handleRejectVolunteer}
            loading={loading}
            error={error}
            rejectingApplicationId={rejectingApplicationId}
            onRetry={refreshVolunteers}
          />
        </div>
      </main>
    </div>
  );
}
