
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { EmployeeProfileCard } from "@/components/employees/EmployeeProfileCard";
import { EmployeeInterestsCard } from "@/components/employees/EmployeeInterestsCard";
import { EmployeeExperience } from "@/components/employees/EmployeeExperience";
import { employeesData } from "@/data/employees";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EmployeeProfile() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();
  
  // Find the employee by ID
  const employeeId = parseInt(id || "0", 10);
  const employee = employeesData.find(emp => emp.id === employeeId);
  
  if (!employee) {
    return (
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <main className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}>
          <PageHeader 
            title={t("Employee not found")}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t("Employee not found")}</h2>
            <p className="mb-6">{t("The employee you are looking for doesn't exist or has been removed.")}</p>
            <Link to="/employees">
              <Button>
                <ChevronLeft className="mr-2 h-4 w-4" />
                {t("Back to Employees")}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={employee.name}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link 
                  to="/employees" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('Employees')}
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">{employee.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-4">
            <EmployeeProfileCard employee={employee} />
          </div>
          <div className="lg:col-span-8">
            <EmployeeInterestsCard employeeName={employee.name} />
          </div>
        </div>
        
        <div className="space-y-6">
          <EmployeeExperience employeeName={employee.name} />
        </div>
      </main>
    </div>
  );
}
