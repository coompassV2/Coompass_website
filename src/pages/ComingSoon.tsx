import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

export interface ComingSoonProps {
  /** When true, render only main content (for use inside layout with its own sidebar) */
  embedded?: boolean;
  /** Optional custom title; defaults to "Under construction" */
  title?: string;
}

export default function ComingSoon({ embedded = false, title }: ComingSoonProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const message = title ?? t("Under construction");

  const main = (
    <main
      className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}
    >
      <PageHeader title={message} theme={theme} toggleTheme={toggleTheme} />
      <div className="mt-6">
          <Card>
            <CardContent className="py-8">
              <p className="text-sm text-muted-foreground">
                {t("Under construction")}
              </p>
            </CardContent>
          </Card>
        </div>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-muted-foreground">
        <p className="text-lg">{message}</p>
      </div>
    </main>
  );

  if (embedded) {
    return <div className="min-h-screen bg-background">{main}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      {main}
    </div>
  );
}
