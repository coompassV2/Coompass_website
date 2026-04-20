
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "lucide-react";
import { ImpactResumeOrganizationsSectionProps } from "./types";

export function ImpactResumeOrganizationsSection({ organizations }: ImpactResumeOrganizationsSectionProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-3">{t('Organizations Engaged')}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {organizations.map((org) => (
            <div key={org} className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{org}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
