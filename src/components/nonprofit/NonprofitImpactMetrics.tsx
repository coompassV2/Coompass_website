
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { DetailedImpactReportDialog } from "./DetailedImpactReportDialog";
import { CAUSE_AREA_NAMES, CAUSE_HOURS_SEED } from "@/data/causeAreas";
import { CauseAreasByHoursCard } from "@/components/shared/CauseAreasByHoursCard";

export function NonprofitImpactMetrics() {
  const { t } = useTranslation();
  const [isDetailedReportOpen, setIsDetailedReportOpen] = useState(false);

  const causeAreasHoursData = CAUSE_AREA_NAMES.map((name) => ({
    name,
    hours: CAUSE_HOURS_SEED[name] ?? 150,
  }));

  const impactData = {
    peopleBenefitted: 2450,
    fundingSecured: 120000,
    volunteersEngaged: 375,
    projectsCompleted: 18,
    impactCategories: causeAreasHoursData,
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Impact Metrics Report',
        text: `Our organization has benefitted ${impactData.peopleBenefitted} people and secured $${impactData.fundingSecured.toLocaleString()} in funding.`,
        url: window.location.href
      }).catch(() => {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success(t("Link copied to clipboard"));
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("Link copied to clipboard"));
    }
  };

  const handleExport = () => {
    const reportData = {
      date: new Date().toISOString().split('T')[0],
      metrics: {
        peopleBenefitted: impactData.peopleBenefitted,
        fundingSecured: impactData.fundingSecured,
        volunteersEngaged: impactData.volunteersEngaged,
        projectsCompleted: impactData.projectsCompleted
      },
      impactByCategory: impactData.impactCategories
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `impact-metrics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    toast.success(t("Impact metrics exported successfully"));
  };

  const handleViewDetailedReport = () => {
    setIsDetailedReportOpen(true);
  };
  
  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">{t('Impact Metrics')}</h2>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="text-xs" onClick={handleShare}>
            <Share2 className="h-3.5 w-3.5 mr-1.5" />
            {t('Share')}
          </Button>
          <Button variant="outline" size="sm" className="text-xs" onClick={handleExport}>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            {t('Export')}
          </Button>
          <Button size="sm" className="text-xs" onClick={handleViewDetailedReport}>
            {t('View Detailed Impact Report')}
            <ArrowUpRight className="h-3 w-3 ml-1.5" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Card className="p-3 border-border bg-blue-50/30 dark:bg-blue-900/20">
          <div className="text-xs text-muted-foreground mb-0.5">{t('People Benefitted')}</div>
          <div className="text-xl font-bold">{impactData.peopleBenefitted.toLocaleString()}</div>
        </Card>
        
        <Card className="p-3 border-border bg-green-50/30 dark:bg-green-900/20">
          <div className="text-xs text-muted-foreground mb-0.5">{t('Funding Secured')}</div>
          <div className="text-xl font-bold">${impactData.fundingSecured.toLocaleString()}</div>
        </Card>
        
        <Card className="p-3 border-border bg-purple-50/30 dark:bg-purple-900/20">
          <div className="text-xs text-muted-foreground mb-0.5">{t('Volunteers Engaged')}</div>
          <div className="text-xl font-bold">{impactData.volunteersEngaged}</div>
        </Card>
        
        <Card className="p-3 border-border bg-amber-50/30 dark:bg-amber-900/20">
          <div className="text-xs text-muted-foreground mb-0.5">{t('Projects Completed')}</div>
          <div className="text-xl font-bold">{impactData.projectsCompleted}</div>
        </Card>
      </div>
      
      <div className="mt-4">
        <CauseAreasByHoursCard
          title={t("Impact by Cause Areas")}
          data={causeAreasHoursData}
        />
      </div>

      <DetailedImpactReportDialog
        isOpen={isDetailedReportOpen}
        onClose={() => setIsDetailedReportOpen(false)}
        impactData={impactData}
      />
    </div>
  );
}
