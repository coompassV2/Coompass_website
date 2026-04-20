import { useTranslation } from "react-i18next";

interface ProjectsListHeaderProps {
  status: "active" | "completed";
}

export function ProjectsListHeader({ status }: ProjectsListHeaderProps) {
  const { t } = useTranslation();
  const titleKey =
    status === "active"
      ? "companyProject.listSectionActiveTitle"
      : "companyProject.listSectionCompletedTitle";

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">
        {t(titleKey)}
      </h2>
    </div>
  );
}
