
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrentMissions } from "@/components/volunteer/CurrentMissions";
import { PastMissions } from "@/components/volunteer/PastMissions";
import { MissionApplications } from "@/components/volunteer/MissionApplications";

export default function VolunteerMissions() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse the tab from URL if present
  const getInitialTab = () => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    if (tab === "current" || tab === "past" || tab === "applications") return tab;
    return "current";
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Update URL when tab changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', activeTab);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [activeTab, location.pathname, navigate]);

  // Update active tab if URL changes
  useEffect(() => {
    const tab = getInitialTab();
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-background">
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Mission Management')}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <Tabs
          defaultValue="current"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="current">{t("Current")}</TabsTrigger>
            <TabsTrigger value="past">{t("Past")}</TabsTrigger>
            <TabsTrigger value="applications">{t("Applications")}</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <CurrentMissions />
          </TabsContent>

          <TabsContent value="past">
            <PastMissions />
          </TabsContent>

          <TabsContent value="applications">
            <MissionApplications />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
