import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { SDGAlignmentChart } from "@/components/company/SDGAlignmentChart";
import { NonprofitAnalyticsCards } from "@/components/nonprofit/NonprofitAnalyticsCards";
import { RelatorioMensalDialog } from "@/components/nonprofit/RelatorioMensalDialog";
import { RelatorioAnualDialog } from "@/components/nonprofit/RelatorioAnualDialog";
import { TimeframeSelector } from "@/components/analytics/TimeframeSelector";
import type { MetricsTimeframe } from "@/types/analytics";
import { useNonprofitMissionMetrics } from "@/hooks/useNonprofitMissionMetrics";
import { useNonprofitExtendedMetrics } from "@/hooks/useNonprofitExtendedMetrics";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NonprofitImpact() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [relatorioMensalOpen, setRelatorioMensalOpen] = useState(false);
  const [relatorioAnualOpen, setRelatorioAnualOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<MetricsTimeframe>("90d");
  const { data, loading, error } = useNonprofitMissionMetrics(timeframe);
  const {
    data: extendedMetrics,
    loading: extendedLoading,
    error: extendedError,
  } = useNonprofitExtendedMetrics(timeframe);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader
          title={t("Impact Reporting")}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="space-y-3 mt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("Metrics")}</p>
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <TimeframeSelector value={timeframe} onChange={setTimeframe} />
              <div className="ml-auto flex flex-wrap gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={() => setRelatorioMensalOpen(true)}
                >
                  <FileText className="h-4 w-4" />
                  Relatório Mensal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setRelatorioAnualOpen(true)}
                >
                  <FileText className="h-4 w-4" />
                  Relatório Anual
                </Button>
              </div>
            </div>
          </div>
          {extendedError ? (
            <Alert variant="destructive">
              <AlertDescription>{extendedError}</AlertDescription>
            </Alert>
          ) : null}
          <NonprofitAnalyticsCards
            timeframe={timeframe}
            metricsData={data}
            metricsLoading={loading}
            metricsError={error}
          />
          <SDGAlignmentChart
            radar={extendedMetrics?.sdg_alignment.radar ?? []}
            mostUsed={extendedMetrics?.sdg_alignment.most_used ?? []}
            loading={extendedLoading}
          />
        </div>
      </main>

      <RelatorioMensalDialog
        isOpen={relatorioMensalOpen}
        onClose={() => setRelatorioMensalOpen(false)}
      />
      <RelatorioAnualDialog
        isOpen={relatorioAnualOpen}
        onClose={() => setRelatorioAnualOpen(false)}
      />
    </div>
  );
}
