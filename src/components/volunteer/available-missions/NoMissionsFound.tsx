
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function NoMissionsFound() {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-8">
      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
      <h3 className="mt-2 text-lg font-medium">{t('No missions found')}</h3>
      <p className="text-muted-foreground">
        {t('Try adjusting your filters or search query')}
      </p>
    </div>
  );
}
