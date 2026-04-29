
import { useTranslation } from "react-i18next";

export function RejectionMessage() {
  const { t } = useTranslation();
  
  return (
    <div className="p-3 bg-red-500/10 border border-red-200 rounded-md">
      <h4 className="text-sm font-medium text-red-700 dark:text-red-400">{t('Rejection Reason')}</h4>
      <p className="text-sm text-red-700 dark:text-red-400 mt-1">
        {t('Thank you for your interest, but we have selected other volunteers whose skills better match our current needs.')}
      </p>
    </div>
  );
}
