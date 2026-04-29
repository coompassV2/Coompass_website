
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { CompanyProfileHeader } from "@/components/company/CompanyProfileHeader";
import { CompanyDetailsSection } from "@/components/company/CompanyDetailsSection";
import { CompanyTeamStructure } from "@/components/company/CompanyTeamStructure";

export default function CompanyProfile() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Company Profile')}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="space-y-6">
          <CompanyProfileHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CompanyDetailsSection />
            </div>
            <div>
              <CompanyTeamStructure />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
