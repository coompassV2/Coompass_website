
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface HoursLogEntry {
  id: string;
  date: string;
  hours: number;
  description: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
}

interface HoursLogEntryProps {
  entry: HoursLogEntry;
}

export function HoursLogEntry({ entry }: HoursLogEntryProps) {
  const { t } = useTranslation();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">{t("Approved")}</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">{t("Rejected")}</Badge>;
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">{t("Pending")}</Badge>;
    }
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {entry.date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {entry.hours} {t('hours')}
          </div>
        </div>
        {entry.description && (
          <p className="text-sm text-muted-foreground">{entry.description}</p>
        )}
        {entry.status === "rejected" && entry.rejectionReason && (
          <div className="mt-1">
            <span className="text-xs text-red-600 dark:text-red-400">
              {t("Rejection reason")}: {entry.rejectionReason}
            </span>
          </div>
        )}
      </div>
      <div className="ml-4">
        {getStatusBadge(entry.status)}
      </div>
    </div>
  );
}
