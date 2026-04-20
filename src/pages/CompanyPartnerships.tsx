
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { CompanyPartnershipsList } from "@/components/company/CompanyPartnershipsList";
import { PartnershipAnalytics } from "@/components/company/PartnershipAnalytics";
import { PartnershipExplorer } from "@/components/company/PartnershipExplorer";
import { usePartnershipsData } from "@/hooks/usePartnershipsData";

export default function CompanyPartnerships() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { addPartnershipFromExplorer } = usePartnershipsData();

  return (
    <div className="min-h-screen bg-background">
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Partnership Management')}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CompanyPartnershipsList />
            <PartnershipExplorer onAddPartnership={addPartnershipFromExplorer} />
          </div>
          <div>
            <PartnershipAnalytics />
          </div>
        </div>
      </main>
    </div>
  );
}
