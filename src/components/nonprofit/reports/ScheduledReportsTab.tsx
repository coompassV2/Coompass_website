
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FileText, Clock } from "lucide-react";

interface ScheduledReportsTabProps {
  onScheduleReport: () => void;
}

export function ScheduledReportsTab({ onScheduleReport }: ScheduledReportsTabProps) {
  const { t } = useTranslation();

  return (
    <div className="p-4 text-center">
      <div className="py-8">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">{t('No Scheduled Reports')}</h3>
        <p className="text-muted-foreground mb-6">
          {t('You haven\'t set up any scheduled reports yet. Schedule reports to be automatically generated.')}
        </p>
        <Button onClick={onScheduleReport}>
          <Clock className="h-4 w-4 mr-2" />
          {t('Schedule a Report')}
        </Button>
      </div>
    </div>
  );
}
