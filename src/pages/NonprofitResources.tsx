import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonationTracker } from "@/components/nonprofit/DonationTracker";
import { CorporateResources } from "@/components/nonprofit/CorporateResources";
import { GrantOpportunities } from "@/components/nonprofit/GrantOpportunities";
import { InKindDonations } from "@/components/nonprofit/InKindDonations";

export default function NonprofitResources() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Resource Hub')}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <Tabs defaultValue="donations" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4 max-w-md">
            <TabsTrigger value="donations">{t('Donations')}</TabsTrigger>
            <TabsTrigger value="corporate">{t('Corporate')}</TabsTrigger>
            <TabsTrigger value="grants">{t('Grants')}</TabsTrigger>
            <TabsTrigger value="inkind">{t('In-Kind')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="donations">
            <DonationTracker />
          </TabsContent>
          
          <TabsContent value="corporate">
            <CorporateResources />
          </TabsContent>
          
          <TabsContent value="grants">
            <GrantOpportunities />
          </TabsContent>
          
          <TabsContent value="inkind">
            <InKindDonations />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
