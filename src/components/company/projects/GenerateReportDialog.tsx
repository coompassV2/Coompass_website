
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, BarChart3, Users, Target, DollarSign, TrendingUp, Clock, Building2 } from "lucide-react";
import { toast } from "sonner";
import type { CompanyProject } from "./types";

interface GenerateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: CompanyProject | null;
}

export function GenerateReportDialog({
  open,
  onOpenChange,
  project
}: GenerateReportDialogProps) {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState("comprehensive");
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Define sections for each report type
  const reportSectionsMap = {
    comprehensive: [
      { id: "overview", label: t("Project Overview"), icon: FileText },
      { id: "progress", label: t("Progress & Milestones"), icon: BarChart3 },
      { id: "team", label: t("Team Performance"), icon: Users },
      { id: "financials", label: t("Budget & Expenses"), icon: DollarSign },
      { id: "impact", label: t("Impact Metrics"), icon: Target },
      { id: "partnerships", label: t("Partnership Analysis"), icon: Building2 },
      { id: "timeline", label: t("Timeline Analysis"), icon: Clock },
      { id: "risks", label: t("Risk Assessment"), icon: TrendingUp }
    ],
    executive: [
      { id: "summary", label: t("Executive Summary"), icon: FileText },
      { id: "key-metrics", label: t("Key Performance Metrics"), icon: BarChart3 },
      { id: "financials", label: t("Financial Summary"), icon: DollarSign },
      { id: "recommendations", label: t("Strategic Recommendations"), icon: Target }
    ],
    financial: [
      { id: "budget", label: t("Budget Overview"), icon: DollarSign },
      { id: "expenses", label: t("Expense Breakdown"), icon: BarChart3 },
      { id: "cost-analysis", label: t("Cost Analysis"), icon: TrendingUp },
      { id: "roi", label: t("Return on Investment"), icon: Target },
      { id: "forecasting", label: t("Financial Forecasting"), icon: Calendar }
    ],
    progress: [
      { id: "milestones", label: t("Milestone Status"), icon: BarChart3 },
      { id: "timeline", label: t("Timeline Progress"), icon: Calendar },
      { id: "deliverables", label: t("Deliverables Status"), icon: FileText },
      { id: "team-progress", label: t("Team Progress"), icon: Users },
      { id: "blockers", label: t("Issues & Blockers"), icon: Clock }
    ]
  };

  // Get sections for current report type
  const availableSections = reportSectionsMap[reportType as keyof typeof reportSectionsMap] || [];

  // Set default selected sections when report type changes
  const handleReportTypeChange = (newReportType: string) => {
    setReportType(newReportType);
    
    // Set default sections based on report type
    const defaultSections = {
      comprehensive: ["overview", "progress", "team", "financials"],
      executive: ["summary", "key-metrics", "financials"],
      financial: ["budget", "expenses", "cost-analysis"],
      progress: ["milestones", "timeline", "deliverables"]
    };
    
    setSelectedSections(defaultSections[newReportType as keyof typeof defaultSections] || []);
  };

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleGenerate = async () => {
    if (selectedSections.length === 0) {
      toast.error(t("Please select at least one section"));
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    toast.success(t("Report generated successfully! Download started."));
    onOpenChange(false);
  };

  // Calculate estimated pages based on report type and sections
  const getEstimatedPages = () => {
    const basePagesPerSection = {
      comprehensive: 3,
      executive: 1,
      financial: 2,
      progress: 2
    };
    
    const basePages = basePagesPerSection[reportType as keyof typeof basePagesPerSection] || 2;
    return Math.max(2, selectedSections.length * basePages);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t("Generate Project Report")}
          </DialogTitle>
          <DialogDescription>
            {t("Create a detailed report for")} "{project?.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="report-type">{t("Report Type")}</Label>
            <Select value={reportType} onValueChange={handleReportTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">{t("Comprehensive Report")}</SelectItem>
                <SelectItem value="executive">{t("Executive Summary")}</SelectItem>
                <SelectItem value="financial">{t("Financial Report")}</SelectItem>
                <SelectItem value="progress">{t("Progress Report")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium">{t("Include Sections")}</Label>
            <div className="mt-3 space-y-3">
              {availableSections.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => toggleSection(section.id)}
                  />
                  <Label
                    htmlFor={section.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <section.icon className="h-4 w-4" />
                    {section.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 p-3 rounded-md">
            <h4 className="font-medium text-sm mb-1">{t("Report Preview")}</h4>
            <p className="text-xs text-muted-foreground">
              {t("Format")}: PDF • {t("Sections")}: {selectedSections.length} • {t("Estimated pages")}: {getEstimatedPages()}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Cancel")}
          </Button>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || selectedSections.length === 0}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                {t("Generating...")}
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                {t("Generate Report")}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
