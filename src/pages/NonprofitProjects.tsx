
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { SearchInput } from "@/components/shared/SearchInput";
import { Card, CardContent } from "@/components/ui/card";

export default function NonprofitProjects() {
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
          title={t('Project Management')}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="mt-6">
          <Card>
            <CardContent className="py-8">
              <p className="text-sm text-muted-foreground">
                {t("Under construction")}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
