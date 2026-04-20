
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { employeesData, pendingEmployeesData } from "@/data/employees";
import { getAvatarUrl, getInitials } from "@/utils/avatarUtils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function EmployeesStats() {
  const { t } = useTranslation();

  // Calculate employee statistics
  const activeEmployees = employeesData.filter(emp => emp.activeMissions > 0).length;
  const totalEmployees = employeesData.length;
  const pendingCount = pendingEmployeesData.length;

  // Get top 3 employees by volunteer hours
  const topVolunteers = [...employeesData]
    .sort((a, b) => b.volunteerHours - a.volunteerHours)
    .slice(0, 3);

  return (
    <div className="glass-card p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{t('Employees')}</h3>
        <Link 
          to="/employees"
          className="text-sm text-gray-400 hover:text-coompass-success transition-colors"
        >
          {t('View All')}
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-foreground/5 rounded-lg p-4">
          <div className="text-2xl font-bold mb-2">{activeEmployees}</div>
          <div className="text-sm text-muted-foreground">{t('Active')}</div>
        </div>
        <div className="bg-foreground/5 rounded-lg p-4">
          <div className="text-2xl font-bold mb-2">{totalEmployees - activeEmployees}</div>
          <div className="text-sm text-muted-foreground">{t('Inactive')}</div>
        </div>
        <div className="bg-foreground/5 rounded-lg p-4">
          <div className="text-2xl font-bold mb-2">{pendingCount}</div>
          <div className="text-sm text-muted-foreground">{t('Pending')}</div>
        </div>
      </div>

      <div className="space-y-4">
        {topVolunteers.map((employee, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 hover:bg-coompass-success/10 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage src={getAvatarUrl(employee.name)} alt={employee.name} />
                <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{employee.name}</div>
                <div className="text-sm text-muted-foreground">
                  {employee.volunteerHours} {t('volunteer hours')}
                </div>
              </div>
            </div>
            <div className={cn(
              "px-2 py-1 rounded-full text-xs",
              employee.activeMissions > 0 
                ? "bg-green-500/10 text-green-500" 
                : "bg-gray-500/10 text-gray-500"
            )}>
              {employee.activeMissions > 0 ? t('Active') : t('Inactive')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
