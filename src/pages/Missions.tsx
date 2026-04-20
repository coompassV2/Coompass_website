import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MissionsContent } from "@/components/missions/MissionsContent";
import { SEOManager } from "@/components/shared/SEOManager";
import { useNavigate } from "react-router-dom";

export default function Missions() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isUnderCompanyLayout = location.pathname.startsWith("/company");
  const createPath = useMemo(() => "/missions/create", []);

  const missionsStructuredData = {
    '@type': 'CollectionPage',
    name: t('Volunteer Missions - Find Impact Opportunities'),
    description: t('Browse and join missions from our partners.'),
    url: 'https://coompass.org/missions',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: []
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOManager 
        title={t("Volunteer Missions - Find Impact Opportunities")}
        description={t("Discover volunteer missions and social impact opportunities. Browse by cause, skills, location, and join meaningful projects with companies and nonprofits.")}
        canonicalUrl="/missions"
        keywords="volunteer missions, social impact opportunities, volunteering, CSR missions, skill-based volunteering, corporate volunteering, nonprofit missions"
        structuredData={missionsStructuredData}
      />
      {!isUnderCompanyLayout && <AppSidebar />}
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("All Missions")}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <MissionsContent
          showCreateButton={true}
          onOpenCreateDialog={() => navigate(createPath)}
        />
      </main>
    </div>
  );
}
