
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { DonationDialog } from "@/components/organizations/DonationDialog";
import { InviteOrganizationDialog } from "@/components/company/InviteOrganizationDialog";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { OrganizationsList } from "@/components/organizations/OrganizationsList";
import { OrganizationsFilters } from "@/components/organizations/OrganizationsFilters";
import { SelectedFilters } from "@/components/shared/SelectedFilters";
import { Button } from "@/components/ui/button";
import { SDGs } from "@/data/sdgs";
import { translateSdgName } from "@/utils/sdgI18n";
import { SEOManager } from "@/components/shared/SEOManager";
import { apiGet, getStoredToken } from "@/services/authApi";
import type { Organization } from "@/types/organization";
import { Building2 } from "lucide-react";

export default function Organizations() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const location = useLocation();
  const isUnderCompanyLayout = location.pathname.startsWith("/company");
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [inviteOrganizationDialogOpen, setInviteOrganizationDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSDGs, setSelectedSDGs] = useState<number[]>([]);
  const [showActiveMissionsOnly, setShowActiveMissionsOnly] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loadingOrganizations, setLoadingOrganizations] = useState(true);
  const [organizationsError, setOrganizationsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadOrganizations = async () => {
      setLoadingOrganizations(true);
      const token = getStoredToken();
      const { data, error } = await apiGet<{ organizations: Organization[] }>(
        "/api/organizations",
        token
      );
      if (!isMounted) return;
      if (error) {
        setOrganizationsError(error);
        setOrganizations([]);
      } else {
        const orgs = data?.organizations ?? [];
        setOrganizations(
          orgs.map((org) => ({
            ...org,
            isPartner: org.isPartner ?? false,
            activeMissions: org.activeMissions ?? 0,
          }))
        );
        setOrganizationsError(null);
      }
      setLoadingOrganizations(false);
    };

    loadOrganizations();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSDG = (goalId: number) => {
    setSelectedSDGs(prev => 
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const filteredOrganizations = organizations
    .filter(org => {
      if (showActiveMissionsOnly && org.activeMissions === 0) {
        return false;
      }
      if (selectedSDGs.length > 0 && !org.goals?.some(goal => selectedSDGs.includes(goal))) {
        return false;
      }
      if (searchValue) {
        const searchLower = searchValue.toLowerCase();
        return (
          org.name.toLowerCase().includes(searchLower) ||
          org.description?.toLowerCase().includes(searchLower) ||
          org.goals?.some(goal => 
            (() => {
              const sdg = SDGs.find((item) => item.id === goal);
              if (!sdg) return false;
              return translateSdgName(sdg, t).toLowerCase().includes(searchLower);
            })()
          )
        );
      }
      return true;
    });

  const organizationsStructuredData = {
    '@type': 'CollectionPage',
    name: 'Nonprofit Organizations',
    description: 'Discover verified nonprofit organizations working on social impact and sustainability initiatives',
    url: 'https://coompass.org/organizations'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOManager 
        title={t("Nonprofit Organizations - Discover Impact Partners")}
        description={t("Browse verified nonprofit organizations working on social impact, sustainability, and community development.")}
        canonicalUrl="/organizations"
        keywords="nonprofit organizations, social impact organizations, verified nonprofits, ESG partners, sustainability organizations, community development, charitable organizations"
        structuredData={organizationsStructuredData}
      />
      {!isUnderCompanyLayout && <AppSidebar />}
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("Organizations")}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
          <div className="w-full">
            <OrganizationsFilters
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              showActiveMissionsOnly={showActiveMissionsOnly}
              onActiveToggle={setShowActiveMissionsOnly}
              selectedSDGs={selectedSDGs}
              onSDGToggle={toggleSDG}
              SDGs={SDGs}
              rightActions={
                isUnderCompanyLayout ? (
                  <Button variant="outline" onClick={() => setInviteOrganizationDialogOpen(true)}>
                    <Building2 className="mr-2 h-4 w-4" />
                    {t("Invite organization")}
                  </Button>
                ) : null
              }
            />
          </div>
        </div>

        <SelectedFilters
          filters={selectedSDGs.map(id => {
            const sdg = SDGs.find(s => s.id === id);
            return sdg ? `${id}. ${translateSdgName(sdg, t)}` : "";
          }).filter(Boolean)}
          onRemove={(filter) => {
            const id = parseInt(filter.split('.')[0]);
            toggleSDG(id);
          }}
        />

        {loadingOrganizations && (
          <p className="text-sm text-muted-foreground mt-4">Loading organizations...</p>
        )}
        {organizationsError && (
          <p className="text-sm text-destructive mt-4">
            Failed to load organizations.
          </p>
        )}

        <OrganizationsList 
          organizations={filteredOrganizations}
          onDonate={() => setDonationDialogOpen(true)}
          onTogglePartnership={() => {}}
          showPartnershipButton={false}
        />

        <DonationDialog 
          open={donationDialogOpen} 
          onOpenChange={setDonationDialogOpen}
        />
        {isUnderCompanyLayout ? (
          <InviteOrganizationDialog
            isOpen={inviteOrganizationDialogOpen}
            onClose={() => setInviteOrganizationDialogOpen(false)}
          />
        ) : null}
      </main>
    </div>
  );
}
