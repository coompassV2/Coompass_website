import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/newsroom/HeroSection";
import NewsCategoriesSection from "@/components/newsroom/NewsCategoriesSection";
import LatestNewsSection from "@/components/newsroom/LatestNewsSection";
import MissionTicker from "@/components/newsroom/MissionTicker";
import BrisaImpactOverview from "@/components/newsroom/BrisaImpactOverview";
import { SEOManager } from "@/components/shared/SEOManager";

const Newsroom = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [isBrisaUser, setIsBrisaUser] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if user came from login-brisa
    const selectedBrisaCompany = localStorage.getItem("selected-brisa-company");
    setIsBrisaUser(!!selectedBrisaCompany);
  }, []);
  
  const newsroomStructuredData = {
    '@type': 'CollectionPage',
    name: 'Coompass Newsroom',
    description: 'Latest news, updates, and stories about social impact, ESG initiatives, and volunteering',
    url: 'https://coompass.org/newsroom'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOManager 
        title={t("Newsroom - Latest Impact Stories & Updates")}
        description={t("Stay updated with the latest news, impact stories, and updates from Coompass. Discover how companies, nonprofits, and volunteers are creating meaningful social change.")}
        canonicalUrl="/newsroom"
        keywords="ESG news, social impact stories, corporate volunteering news, sustainability updates, CSR news, nonprofit updates"
        structuredData={newsroomStructuredData}
      />
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("Newsroom")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div className="space-y-8 mt-6">
          {isBrisaUser && <BrisaImpactOverview />}
          <HeroSection />
          <MissionTicker />
          <NewsCategoriesSection />
          <LatestNewsSection viewType={viewType} setViewType={setViewType} />
        </div>
      </main>
    </div>
  );
};

export default Newsroom;
