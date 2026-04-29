
import { ReportTemplateCard } from "./ReportTemplateCard";

interface ReportTemplate {
  id: number;
  name: string;
  lastGenerated: string;
  type: string;
  isComingSoon: boolean;
}

interface ReportTemplatesTabProps {
  templates: ReportTemplate[];
  isGenerating: boolean;
  onGenerateReport: (templateId: number, templateName: string, isComingSoon: boolean) => void;
}

export function ReportTemplatesTab({ templates, isGenerating, onGenerateReport }: ReportTemplatesTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => (
        <ReportTemplateCard
          key={template.id}
          template={template}
          isGenerating={isGenerating}
          onGenerate={onGenerateReport}
        />
      ))}
    </div>
  );
}
