
import { useTranslation } from "react-i18next";
import { Mission } from "@/components/missions/MissionCard";

interface KeyDetailsProps {
  mission: Mission;
}

export function KeyDetails({ mission }: KeyDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl border border-border/70 bg-background/90 dark:bg-zinc-900/70 shadow-sm backdrop-blur-sm p-4">
      <h3 className="text-sm font-semibold mb-3 text-foreground">{t("Details")}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="mt-1 px-3 py-2 rounded-md inline-block border border-amber-200/70 dark:border-amber-500/30 bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200 font-medium">
          {mission.hours} {t("Hours")}
        </div>
        <div className="mt-1 px-3 py-2 rounded-md inline-block border border-orange-200/70 dark:border-orange-500/30 bg-orange-100 text-orange-900 dark:bg-orange-500/15 dark:text-orange-200 font-medium">
          {mission.volunteers} {t("Volunteers")}
        </div>
      </div>
    </div>
  );
}
