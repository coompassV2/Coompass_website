
import { useTranslation } from "react-i18next";

interface ProjectsListHeaderProps {
  status: "active" | "completed";
}

export function ProjectsListHeader({ status }: ProjectsListHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-sm font-semibold">
        {status === 'active' ? t('Active Projects') : t('Completed Projects')}
      </h2>
    </div>
  );
}
