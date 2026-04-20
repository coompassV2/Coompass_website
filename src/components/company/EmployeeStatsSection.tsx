import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function EmployeeStatsSection() {
  const { t } = useTranslation();

  const totalEmployees = 125;
  const activeEmployees = 92;

  return (
    <div className="glass-card p-4 h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="text-base font-semibold">{t("Employee Engagement")}</h3>
        <Link to="/company/employees" className="text-xs text-muted-foreground hover:text-coompass-success transition-colors">
          {t("View All")}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        <div className="bg-foreground/5 rounded-lg p-3">
          <div className="text-lg font-bold mb-1">{activeEmployees}</div>
          <div className="text-xs text-muted-foreground">{t("Active Volunteers")}</div>
        </div>
        <div className="bg-foreground/5 rounded-lg p-3">
          <div className="text-lg font-bold mb-1">{totalEmployees - activeEmployees}</div>
          <div className="text-xs text-muted-foreground">{t("Inactive")}</div>
        </div>
      </div>
    </div>
  );
}
