import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { translateSdgName } from "@/utils/taxonomyI18n";
import { ImpactResumeSdgsSectionProps } from "./types";

const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

function getSdgImageUrl(goalId: number): string {
  return `${SDG_IMAGE_BASE}-${goalId}.jpg`;
}

export function ImpactResumeSdgsSection({ sdgs }: ImpactResumeSdgsSectionProps) {
  const { t } = useTranslation();

  if (sdgs.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-3">{t("Sustainable Development Goals")}</h4>
        <div className="flex flex-wrap gap-2 items-center">
          {sdgs.map((sdg) => {
            const label = translateSdgName(sdg, t);
            const src = sdg.image_url?.trim() || getSdgImageUrl(sdg.id);
            return (
              <img
                key={sdg.id}
                src={src}
                alt={label}
                title={label}
                className="h-10 w-10 rounded object-cover border border-border/50 shadow-sm"
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
