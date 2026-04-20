
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { WorkHoursChart } from "@/components/WorkHoursChart";
import { ScoreCard } from "@/components/ScoreCard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/useTheme";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CertificateDialog } from "@/components/employees/CertificateDialog";
import { MissionsSection } from "@/components/dashboard/MissionsSection";
import { EmployeesStats } from "@/components/dashboard/EmployeesStats";
import { ScheduleSection } from "@/components/dashboard/ScheduleSection";

export default function Index() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <AppSidebar />
        
        <main className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}>
          <PageHeader 
            title={t('Dashboard')}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-8 order-2 md:order-1">
              <div className="glass-card p-4 md:p-6">
                <WorkHoursChart onOpenCertificate={() => setShowCertificate(true)} />
              </div>
              <MissionsSection />
            </div>

            <div className="space-y-4 md:space-y-8 order-1 md:order-2">
              <EmployeesStats />
              <ScoreCard />
              <ScheduleSection />
            </div>
          </div>

          <CertificateDialog 
            open={showCertificate} 
            onOpenChange={setShowCertificate}
          />
        </main>
      </div>
    </TooltipProvider>
  );
}
