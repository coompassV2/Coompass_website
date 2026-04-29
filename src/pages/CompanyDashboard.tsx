import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { CompanyProfileCard } from "@/components/company/CompanyProfileCard";
import { ActivityFeed } from "@/components/company/ActivityFeed";
import { CompanyPartnerOrganizationsSection } from "@/components/company/CompanyPartnerOrganizationsSection";
import { SEOManager } from "@/components/shared/SEOManager";

export default function CompanyDashboard() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <SEOManager 
        title={t("Company Dashboard")}
        noIndex={true}
      />
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Company Dashboard')}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <CompanyProfileCard />

        <div className="space-y-4 md:space-y-8 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-8">
              <ActivityFeed />
            </div>
            <div className="space-y-4 md:space-y-8">
              <CompanyPartnerOrganizationsSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
