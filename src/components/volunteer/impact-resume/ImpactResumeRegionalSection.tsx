
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { ImpactResumeRegionalSectionProps } from "./types";

export function ImpactResumeRegionalSection({ regions }: ImpactResumeRegionalSectionProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-3">{t('Regional Impact')}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {regions.map((region) => (
            <div key={region} className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{region}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
