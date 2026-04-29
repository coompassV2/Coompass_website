import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DonationDialog } from "@/components/organizations/DonationDialog";
import { SearchInput } from "@/components/shared/SearchInput";
import { PartnershipsProvider, usePartnerships } from "@/contexts/PartnershipsContext";
import { PartnershipsList } from "@/components/partnerships/PartnershipsList";
import { SEOManager } from "@/components/shared/SEOManager";

function PartnershipsContent() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const { getFilteredOrganizations, handlePartnershipToggle } = usePartnerships();

  const currentPartners = getFilteredOrganizations(searchValue, true);
  const availableOrganizations = getFilteredOrganizations(searchValue, false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <SearchInput
            placeholder={t("Search by keyword...")}
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
      </div>

      <PartnershipsList
        organizations={currentPartners}
        isPartnersList={true}
        onDonate={() => setDonationDialogOpen(true)}
        onTogglePartnership={handlePartnershipToggle}
      />

      <PartnershipsList
        organizations={availableOrganizations}
        isPartnersList={false}
        onDonate={() => setDonationDialogOpen(true)}
        onTogglePartnership={handlePartnershipToggle}
      />

      <DonationDialog 
        open={donationDialogOpen} 
        onOpenChange={setDonationDialogOpen}
      />
    </>
  );
}

export default function Partnerships() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const partnershipsStructuredData = {
    '@type': 'CollectionPage',
    name: 'Corporate-Nonprofit Partnerships',
    description: 'Manage and discover partnerships between companies and nonprofit organizations for social impact',
    url: 'https://coompass.org/partnerships'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOManager 
        title={t("Partnerships - Connect Companies & Nonprofits")}
        description={t("Manage corporate-nonprofit partnerships and discover collaboration opportunities. Connect companies with aligned nonprofits to maximize social impact and ESG outcomes.")}
        canonicalUrl="/partnerships"
        keywords="corporate partnerships, nonprofit partnerships, CSR partnerships, ESG collaborations, social impact partnerships, corporate-nonprofit alliances"
        structuredData={partnershipsStructuredData}
      />
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("Partnerships")}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <PartnershipsProvider>
          <PartnershipsContent />
        </PartnershipsProvider>
      </main>
    </div>
  );
}
