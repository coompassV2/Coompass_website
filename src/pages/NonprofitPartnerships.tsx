
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { SearchInput } from "@/components/shared/SearchInput";
import { NonprofitPartnersDirectory } from "@/components/nonprofit/NonprofitPartnersDirectory";
import { NonprofitPartnershipMetrics } from "@/components/nonprofit/NonprofitPartnershipMetrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";

export default function NonprofitPartnerships() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("directory");

  // Set active tab based on navigation state
  useEffect(() => {
    if (location.state && location.state.defaultTab) {
      setActiveTab(location.state.defaultTab);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Partnership Management')}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <div className="relative w-full md:w-80">
            <SearchInput
              placeholder={t("Search partners...")}
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
          <TabsList className="grid grid-cols-2 gap-2 max-w-md h-9">
            <TabsTrigger value="directory" className="text-xs py-1.5">{t('Directory')}</TabsTrigger>
            <TabsTrigger value="metrics" className="text-xs py-1.5">{t('Impact')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="directory" className="mt-3">
            <NonprofitPartnersDirectory searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-3">
            <NonprofitPartnershipMetrics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
