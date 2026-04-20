
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  Users, 
  Heart, 
  CheckCircle, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Repeat,
  BarChart3,
  PieChart,
  Calendar
} from "lucide-react";
import { GeneratedReport } from "@/services/reportGeneratorService";
import { formatDatePt } from "@/lib/dateFormat";

interface ReportPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  report: GeneratedReport | null;
}

const iconMap: { [key: string]: any } = {
  users: Users,
  heart: Heart,
  'check-circle': CheckCircle,
  'dollar-sign': DollarSign,
  clock: Clock,
  'trending-up': TrendingUp,
  repeat: Repeat,
};

export function ReportPreviewDialog({ 
  isOpen, 
  onClose, 
  report 
}: ReportPreviewDialogProps) {
  const { t } = useTranslation();

  if (!report) return null;

  const handleDownload = () => {
    // Create comprehensive report data
    const reportContent = {
      title: report.title,
      organization: report.organizationName,
      period: report.reportPeriod,
      generatedAt: report.generatedAt,
      metadata: report.metadata,
      sections: report.sections
    };
    
    const dataStr = JSON.stringify(reportContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const renderMetricsSection = (section: any) => {
    const metrics = section.content.metrics;
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(metrics).map(([key, metric]: [string, any]) => {
          const IconComponent = iconMap[metric.icon] || FileText;
          return (
            <Card key={key} className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                  <div className="text-xs text-green-600">{metric.change}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderChartSection = (section: any) => {
    const { data, title, additionalData } = section.content;
    
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h4 className="font-medium">{title}</h4>
          </div>
          <div className="space-y-2">
            {data?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{item.month}</span>
                <div className="flex items-center gap-2">
                  <Progress value={(item.hours / 2500) * 100} className="w-20 h-2" />
                  <span className="text-sm font-medium">{item.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {additionalData?.topVolunteers && (
          <Card className="p-4">
            <h4 className="font-medium mb-3">{t('Top Contributors')}</h4>
            <div className="space-y-2">
              {additionalData.topVolunteers.map((volunteer: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">{volunteer.name}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{volunteer.hours}h</span>
                    <span>•</span>
                    <span>{volunteer.projects} projects</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  };

  const renderTableSection = (section: any) => {
    const { headers, rows } = section.content;
    
    return (
      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {headers.map((header: string, index: number) => (
                  <th key={index} className="text-left py-2 px-3 font-medium text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: string[], index: number) => (
                <tr key={index} className="border-b last:border-b-0">
                  {row.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex} className="py-2 px-3 text-sm">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };

  const renderFinancialSection = (section: any) => {
    const { revenue, expenses, efficiency, donationTrends } = section.content;
    
    return (
      <div className="space-y-4">
        {revenue && (
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h4 className="font-medium">{t('Total Revenue')}</h4>
            </div>
            <div className="text-2xl font-bold text-green-600">{revenue.formatted}</div>
          </Card>
        )}
        
        {expenses && (
          <Card className="p-4">
            <h4 className="font-medium mb-3">{t('Expense Breakdown')}</h4>
            <div className="space-y-3">
              {expenses.breakdown.map((expense: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{expense.category}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={expense.percentage} className="w-20 h-2" />
                    <span className="text-sm font-medium">{expense.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        
        {efficiency && (
          <Card className="p-4 bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h4 className="font-medium">{t('Program Efficiency')}</h4>
            </div>
            <div className="text-lg font-semibold text-green-600">{efficiency.text}</div>
          </Card>
        )}
      </div>
    );
  };

  const renderSDGSection = (section: any) => {
    const { alignment, projectMapping } = section.content;
    
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-medium mb-3">{t('SDG Alignment Scores')}</h4>
          <div className="space-y-3">
            {alignment?.map((sdg: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">SDG {sdg.sdg}</Badge>
                    <span className="text-sm font-medium">{sdg.title}</span>
                  </div>
                  <span className="text-sm font-bold">{sdg.percentage}%</span>
                </div>
                <Progress value={sdg.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
        
        {projectMapping && (
          <Card className="p-4">
            <h4 className="font-medium mb-3">{t('Project Mapping')}</h4>
            <div className="space-y-2">
              {projectMapping.map((sdg: any, index: number) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">SDG {sdg.sdg}: {sdg.title}</div>
                  <div className="text-muted-foreground ml-4">
                    {sdg.projects.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  };

  const renderNarrativeSection = (section: any) => {
    const { text, stories, skills, timeline, categories } = section.content;
    
    return (
      <div className="space-y-4">
        {text && (
          <Card className="p-4">
            <p className="text-sm leading-relaxed">{text}</p>
          </Card>
        )}
        
        {stories && (
          <div className="space-y-3">
            {stories.map((story: any, index: number) => (
              <Card key={index} className="p-4">
                <h5 className="font-medium mb-2">{story.title}</h5>
                <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium">{story.beneficiary}</span>
                  <span className="text-muted-foreground">{story.date}</span>
                </div>
                <div className="mt-2 text-sm font-medium text-green-600">{story.impact}</div>
              </Card>
            ))}
          </div>
        )}
        
        {skills && (
          <Card className="p-4">
            <h5 className="font-medium mb-2">{t('Skills Contributed')}</h5>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{section.content.skillsText}</p>
          </Card>
        )}
      </div>
    );
  };

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'overview':
        return (
          <Card className="p-4">
            <p className="text-sm leading-relaxed mb-4">{section.content.text}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {section.content.highlights.map((highlight: string, index: number) => (
                <div key={index} className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm font-medium text-primary">{highlight}</div>
                </div>
              ))}
            </div>
          </Card>
        );
      case 'metrics':
        return renderMetricsSection(section);
      case 'chart':
        return renderChartSection(section);
      case 'table':
        return renderTableSection(section);
      case 'financial':
        return renderFinancialSection(section);
      case 'sdg':
        return renderSDGSection(section);
      case 'narrative':
        return renderNarrativeSection(section);
      default:
        return (
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              {t('Content preview not available for this section type')}
            </p>
          </Card>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {report.title}
              </DialogTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>{report.organizationName}</span>
                <span>•</span>
                <span>{report.reportPeriod}</span>
                <span>•</span>
                <span>{formatDatePt(report.generatedAt)}</span>
              </div>
            </div>
            <Button onClick={handleDownload} size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t('Download')}
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card className="p-3 text-center">
            <div className="text-lg font-bold">{report.metadata.totalPages}</div>
            <div className="text-xs text-muted-foreground">{t('Pages')}</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold">{report.metadata.wordCount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{t('Words')}</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold">{report.metadata.dataPoints}</div>
            <div className="text-xs text-muted-foreground">{t('Data Points')}</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold">{report.sections.length}</div>
            <div className="text-xs text-muted-foreground">{t('Sections')}</div>
          </Card>
        </div>
        
        <ScrollArea className="h-[60vh]">
          <div className="space-y-6 pr-4">
            {report.sections.map((section, index) => (
              <div key={section.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <h3 className="text-lg font-medium">{section.title}</h3>
                </div>
                {renderSection(section)}
                {index < report.sections.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
