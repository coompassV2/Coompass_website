
import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { NonprofitProfileHeader } from "@/components/nonprofit/NonprofitProfileHeader";
import { NonprofitTeam } from "@/components/nonprofit/NonprofitTeam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NonprofitProfile() {
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
          title={t("Organization Profile")}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="space-y-6">
          <NonprofitProfileHeader />

          <Tabs defaultValue="about" className="space-y-4">
            <TabsList className="grid grid-cols-2 gap-4 max-w-md">
              <TabsTrigger value="about">{t('About')}</TabsTrigger>
              <TabsTrigger value="team">{t('Team')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('About Our Organization')}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-md">{t('Mission')}</h4>
                    <p className="text-muted-foreground mt-1">
                      To empower communities through education, sustainable practices, and access to resources, 
                      creating a more equitable and environmentally conscious world.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-md">{t('Vision')}</h4>
                    <p className="text-muted-foreground mt-1">
                      A world where all people have the opportunity to thrive in healthy, 
                      sustainable communities with access to education, clean environments, and economic opportunity.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-md">{t('History')}</h4>
                    <p className="text-muted-foreground mt-1">
                      Founded in 2018, our organization began with a small team committed to providing 
                      educational resources to underserved communities. Over time, we expanded our scope 
                      to include environmental initiatives and community development programs.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team">
              <NonprofitTeam />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
