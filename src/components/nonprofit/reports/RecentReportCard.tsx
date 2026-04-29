
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface RecentReport {
  id: number;
  name: string;
  generated: string;
  format: string;
  size: string;
}

interface RecentReportCardProps {
  report: RecentReport;
  onDownload: (reportId: number, reportName: string, format: string) => void;
}

export function RecentReportCard({ report, onDownload }: RecentReportCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-4 hover:bg-accent/5 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="font-medium">{report.name}</h3>
            <p className="text-sm text-muted-foreground">{t('Generated')}: {report.generated}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <span className="block text-sm font-medium">{report.format}</span>
            <span className="text-xs text-muted-foreground">{report.size}</span>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onDownload(report.id, report.name, report.format)}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
