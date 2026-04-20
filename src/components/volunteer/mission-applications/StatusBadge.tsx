
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();
  
  switch(status) {
    case "Pending":
      return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400">{t('Pending')}</Badge>;
    case "Accepted":
      return <Badge className="bg-green-500/10 text-green-700 dark:bg-green-950 dark:text-green-400">{t('Accepted')}</Badge>;
    case "Rejected":
      return <Badge variant="destructive">{t('Rejected')}</Badge>;
    case "Withdrawn":
      return <Badge variant="outline">{t("Withdrawn")}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
