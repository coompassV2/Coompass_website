
import { useTranslation } from "react-i18next";

interface EmptyProjectsStateProps {
  status: "active" | "completed";
}

export function EmptyProjectsState({ status }: EmptyProjectsStateProps) {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-5 text-muted-foreground text-sm">
      {status === "active"
        ? t("projectsEmpty.activeMatching")
        : t("projectsEmpty.completedMatching")}
    </div>
  );
}
