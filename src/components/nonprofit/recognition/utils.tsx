
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

export const useRecognitionUtils = () => {
  const { t } = useTranslation();

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "monthly": return t('Monthly');
      case "quarterly": return t('Quarterly');
      case "annual": return t('Annual');
      case "one-time": return t('One-time');
      case "milestone": return t('Milestone');
      default: return frequency;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "awarded":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{t('Awarded')}</Badge>;
      case "nominated":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{t('Nominated')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return {
    getFrequencyLabel,
    getStatusBadge
  };
};
