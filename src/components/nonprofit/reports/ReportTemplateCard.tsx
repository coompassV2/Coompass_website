
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Zap } from "lucide-react";

interface ReportTemplate {
  id: number;
  name: string;
  lastGenerated: string;
  type: string;
  isComingSoon: boolean;
}

interface ReportTemplateCardProps {
  template: ReportTemplate;
  isGenerating: boolean;
  onGenerate: (templateId: number, templateName: string, isComingSoon: boolean) => void;
}

export function ReportTemplateCard({ template, isGenerating, onGenerate }: ReportTemplateCardProps) {
  const { t } = useTranslation();

  const getTemplateDescription = (name: string) => {
    if (name === "Annual Impact Report") {
      return t('Comprehensive yearly overview with detailed metrics, financial data, and impact stories');
    }
    if (name === "Volunteer Hours Summary") {
      return t('Detailed volunteer engagement analysis with hours tracking and recognition data');
    }
    if (name === "Project Completion Report") {
      return t('Complete project outcomes, timelines, and lessons learned documentation');
    }
    return '';
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "detailed": return t('Detailed');
      case "summarized": return t('Summary');
      case "statistical": return t('Statistical');
      default: return t('Financial');
    }
  };

  return (
    <Card className={`p-4 flex flex-col justify-between transition-colors ${
      template.isComingSoon 
        ? "hover:bg-accent/5 opacity-80 border-dashed border-2" 
        : "hover:bg-accent/5"
    }`}>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className={`h-5 w-5 ${template.isComingSoon ? "text-muted-foreground" : "text-primary"}`} />
          <h3 className={`font-medium ${template.isComingSoon ? "text-muted-foreground" : ""}`}>
            {template.name}
          </h3>
          {template.isComingSoon && (
            <div className="flex items-center gap-1 ml-auto">
              <Zap className="h-3 w-3 text-amber-500" />
              <span className="text-xs text-amber-600 font-medium">
                {t('Coming Soon')}
              </span>
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {template.lastGenerated !== "Never" 
            ? `${t('Last generated')}: ${template.lastGenerated}`
            : t('Never generated')}
        </div>
        {!template.isComingSoon && (
          <div className="text-xs text-muted-foreground mb-3">
            {getTemplateDescription(template.name)}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="text-xs px-2 py-1 rounded-full bg-accent/50">
          {getTypeLabel(template.type)}
        </Badge>
        <Button 
          size="sm" 
          onClick={() => onGenerate(template.id, template.name, template.isComingSoon)}
          disabled={template.isComingSoon || isGenerating}
          variant={template.isComingSoon ? "outline" : "default"}
        >
          {isGenerating ? t('Generating...') : 
           template.isComingSoon ? t('Coming Soon') : t('Generate')}
        </Button>
      </div>
    </Card>
  );
}
