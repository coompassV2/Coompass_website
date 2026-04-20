
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Mission } from "@/components/missions/MissionCard";

interface MissionAboutProps {
  mission: Mission;
}

export function MissionAbout({ mission }: MissionAboutProps) {
  const { t } = useTranslation();
  const requirements = mission.requirements?.trim() ?? "";
  const hasRequirements = requirements.length > 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">{t("About this Mission")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {mission.description}
        </p>
        {mission.district ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {t("District")}: <span className="font-medium text-foreground">{mission.district}</span>
          </p>
        ) : null}
        {mission.requiresInterview ? (
          <p className="mt-4 text-sm font-medium text-foreground">
            {t("Requires prior interview")}
          </p>
        ) : null}
        {hasRequirements ? (
          <div className="mt-6 border-t border-border pt-4">
            <h3 className="text-sm font-medium mb-2">{t("Additional requirements")}</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{requirements}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
