
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { translateSkillName } from "@/utils/taxonomyI18n";
import { ImpactResumeSkillsSectionProps } from "./types";

export function ImpactResumeSkillsSection({ skills }: ImpactResumeSkillsSectionProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-3">{t('Top Skills')}</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline" className="bg-green-500/10 text-green-700 dark:bg-green-950 dark:text-green-400">
              {translateSkillName({ name: skill }, t)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
