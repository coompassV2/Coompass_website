
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { ConfigureTemplatesDialog } from "./ConfigureTemplatesDialog";
import { ScheduleReportDialog } from "./ScheduleReportDialog";
import { ReportPreviewDialog } from "./ReportPreviewDialog";
import { ReportTemplateService } from "@/services/reportTemplateService";
import { ReportDataService } from "@/services/reportDataService";
import { ReportGeneratorService, GeneratedReport } from "@/services/reportGeneratorService";
import { ReportTemplatesTab } from "./reports/ReportTemplatesTab";
import { RecentReportsTab } from "./reports/RecentReportsTab";
import { ScheduledReportsTab } from "./reports/ScheduledReportsTab";

export function NonprofitReportsGenerator() {
  const { t } = useTranslation();
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<GeneratedReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Get templates from service
  const reportTemplates = ReportTemplateService.getAllTemplates().map(template => ({
    id: template.id === 'annual-impact' ? 1 : template.id === 'volunteer-hours' ? 3 : 4,
    name: template.name,
    lastGenerated: template.id === 'annual-impact' ? "Feb 15, 2025" : 
                   template.id === 'volunteer-hours' ? "Apr 1, 2025" : "Never",
    type: template.type,
    isComingSoon: false
  })).concat([
    { id: 2, name: "Quarterly Donor Update", lastGenerated: "Never", type: "summarized", isComingSoon: true }
  ]);

  // Mock recent reports
  const recentReports = [
    { id: 1, name: "Q1 2025 Donor Impact", generated: "Apr 2, 2025", format: "PDF", size: "2.4 MB" },
    { id: 2, name: "Beach Cleanup Project Report", generated: "Mar 28, 2025", format: "PDF", size: "3.1 MB" },
    { id: 3, name: "Volunteer Program Summary", generated: "Mar 15, 2025", format: "DOCX", size: "1.8 MB" },
  ];

  const handleGenerateReport = async (templateId: number, templateName: string, isComingSoon: boolean) => {
    if (isComingSoon) {
      toast.info(t("This feature is coming soon!"));
      return;
    }

    setIsGenerating(true);
    toast.success(t("Generating comprehensive report: {{name}}", { name: templateName }));
    
    try {
      // Get template by name
      const template = ReportTemplateService.getAllTemplates().find(t => t.name === templateName);
      if (!template) {
        throw new Error('Template not found');
      }

      // Get report data
      const reportData = ReportDataService.getMockReportData();
      
      // Generate comprehensive report
      const generatedReport = await ReportGeneratorService.generateReport(template, reportData);
      
      // Show preview
      setCurrentReport(generatedReport);
      setIsPreviewDialogOpen(true);
      
      toast.success(t("Report generated successfully! Click to preview and download."));
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error(t("Failed to generate report. Please try again."));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = (reportId: number, reportName: string, format: string) => {
    // Mock download of existing report
    const mockData = `Mock report content for ${reportName}`;
    const dataBlob = new Blob([mockData], { 
      type: format === 'PDF' ? 'application/pdf' : 
            format === 'DOCX' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
            'text/plain'
    });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportName.toLowerCase().replace(/\s+/g, '-')}.${format.toLowerCase()}`;
    link.click();
    
    URL.revokeObjectURL(url);
    toast.success(t("Report downloaded successfully"));
  };

  const handleConfigureTemplates = () => {
    setIsConfigureDialogOpen(true);
  };

  const handleScheduleReport = () => {
    setIsScheduleDialogOpen(true);
  };
  
  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">{t('Report Generator')}</h2>
        <Button variant="outline" size="sm" className="text-xs" onClick={handleConfigureTemplates}>
          <Settings className="h-3.5 w-3.5 mr-1.5" />
          {t('Configure Templates')}
        </Button>
      </div>
      
      <Tabs defaultValue="templates" className="space-y-3">
        <TabsList className="h-9">
          <TabsTrigger value="templates" className="text-xs py-1.5">{t('Report Templates')}</TabsTrigger>
          <TabsTrigger value="recent" className="text-xs py-1.5">{t('Recent Reports')}</TabsTrigger>
          <TabsTrigger value="scheduled" className="text-xs py-1.5">{t('Scheduled')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-3 mt-3">
          <ReportTemplatesTab 
            templates={reportTemplates}
            isGenerating={isGenerating}
            onGenerateReport={handleGenerateReport}
          />
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-3 mt-3">
          <RecentReportsTab 
            reports={recentReports}
            onDownloadReport={handleDownloadReport}
          />
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-3">
          <ScheduledReportsTab onScheduleReport={handleScheduleReport} />
        </TabsContent>
      </Tabs>

      <ConfigureTemplatesDialog 
        isOpen={isConfigureDialogOpen}
        onClose={() => setIsConfigureDialogOpen(false)}
        templates={reportTemplates}
      />

      <ScheduleReportDialog 
        isOpen={isScheduleDialogOpen}
        onClose={() => setIsScheduleDialogOpen(false)}
        templates={reportTemplates}
      />

      <ReportPreviewDialog 
        isOpen={isPreviewDialogOpen}
        onClose={() => setIsPreviewDialogOpen(false)}
        report={currentReport}
      />
    </div>
  );
}
