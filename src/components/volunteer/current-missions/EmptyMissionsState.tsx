
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyMissionsStateProps {
  title?: string;
  description?: string;
}

export function EmptyMissionsState({ title, description }: EmptyMissionsStateProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="text-center py-8">
      <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
      <h3 className="mt-2 text-lg font-medium">{title ?? t("No current missions")}</h3>
      <p className="text-muted-foreground">
        {description ?? t("You are not currently participating in any missions")}
      </p>
      <Button className="mt-4" onClick={() => navigate("/missions")}>
        {t("Find Missions")}
      </Button>
    </div>
  );
}
