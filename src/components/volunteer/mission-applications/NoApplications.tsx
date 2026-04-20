
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { NoApplicationsProps } from "./types";

export function NoApplications({ browseMissions }: NoApplicationsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-8">
      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
      <h3 className="mt-2 text-lg font-medium">{t('No applications found')}</h3>
      <p className="text-muted-foreground">
        {t('You have not applied to any missions yet')}
      </p>
      <Button className="mt-4" onClick={browseMissions}>
        {t('Browse Available Missions')}
      </Button>
    </div>
  );
}
