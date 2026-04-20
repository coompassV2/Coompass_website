import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { translateCauseName } from "@/utils/taxonomyI18n";
import { ImpactResumeCausesSectionProps } from "./types";

export function ImpactResumeCausesSection({ causes }: ImpactResumeCausesSectionProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-3">{t('Causes Supported')}</h4>
        <div className="flex flex-wrap gap-2">
          {causes.map((cause) => (
            <Badge key={cause} variant="outline" className="bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              {translateCauseName({ name: cause }, t)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
