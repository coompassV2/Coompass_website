
import { RecentReportCard } from "./RecentReportCard";

interface RecentReport {
  id: number;
  name: string;
  generated: string;
  format: string;
  size: string;
}

interface RecentReportsTabProps {
  reports: RecentReport[];
  onDownloadReport: (reportId: number, reportName: string, format: string) => void;
}

export function RecentReportsTab({ reports, onDownloadReport }: RecentReportsTabProps) {
  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <RecentReportCard
          key={report.id}
          report={report}
          onDownload={onDownloadReport}
        />
      ))}
    </div>
  );
}
