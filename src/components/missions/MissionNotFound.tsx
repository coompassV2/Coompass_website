
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MissionNotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="glass-card p-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">{t("Mission not found")}</h1>
      <p className="mb-4">{t("The mission you are looking for does not exist.")}</p>
      <Button asChild>
        <Link to="/missions">{t("Go back to missions")}</Link>
      </Button>
    </div>
  );
}
