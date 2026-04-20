
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { PendingEmployeesTable } from "@/components/employees/PendingEmployeesTable";
import { SearchInput } from "@/components/shared/SearchInput";
import { employeesData, pendingEmployeesData } from "@/data/employees";
import { useToast } from "@/hooks/use-toast";
import { Employee } from "@/components/employees/types";
import { VolunteerDialog } from "@/components/employees/VolunteerDialog";

export default function Employees() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingEmployees, setPendingEmployees] = useState(pendingEmployeesData);
  const [employees, setEmployees] = useState(employeesData);
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isVolunteerDialogOpen, setIsVolunteerDialogOpen] = useState(false);

  const filteredEmployees = employees.filter(employee => {
    const searchLower = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchLower) ||
      employee.joinDate.toLowerCase().includes(searchLower) ||
      employee.lastLogin.toLowerCase().includes(searchLower)
    );
  });

  const handleRemoveEmployee = (employeeName: string) => {
    setEmployees(prev => prev.filter(emp => emp.name !== employeeName));
    toast({
      title: "Employee Removed",
      description: `${employeeName} has been removed from the company.`,
    });
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsVolunteerDialogOpen(true);
  };

  const handleAcceptEmployee = (employeeName: string) => {
    const acceptedEmployee = pendingEmployees.find(emp => emp.name === employeeName);
    if (acceptedEmployee) {
      // Generate a new unique ID for the employee
      const maxId = employees.reduce((max, emp) => Math.max(max, emp.id), 0);
      const newId = maxId + 1;
      
      const newEmployee: Employee = {
        id: newId,
        name: acceptedEmployee.name,
        joinDate: acceptedEmployee.joinDate,
        lastLogin: acceptedEmployee.joinDate, // Initially set last login to join date
        activeMissions: 0,
        completeMissions: 0,
        volunteerHours: 0,
        photoUrl: acceptedEmployee.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${acceptedEmployee.name}`
      };
      
      setEmployees(prev => [...prev, newEmployee]);
      setPendingEmployees(prev => prev.filter(emp => emp.name !== employeeName));
      
      toast({
        title: "Employee Accepted",
        description: `${employeeName} has been accepted to join the company.`,
      });
    }
  };

  const handleRejectEmployee = (employeeName: string) => {
    setPendingEmployees(prev => prev.filter(emp => emp.name !== employeeName));
    toast({
      title: "Employee Rejected",
      description: `${employeeName}'s application has been rejected.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Employees')}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="space-y-6">
          <div className="w-[400px]">
            <SearchInput
              placeholder={t("Search by keyword...")}
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>

          <EmployeeTable 
            employees={filteredEmployees}
            onRemoveEmployee={handleRemoveEmployee}
            onViewEmployee={handleViewEmployee}
          />

          {pendingEmployees.length > 0 && (
            <PendingEmployeesTable 
              employees={pendingEmployees}
              onAcceptEmployee={handleAcceptEmployee}
              onRejectEmployee={handleRejectEmployee}
            />
          )}
        </div>
        
        {/* Employee volunteer dialog */}
        <VolunteerDialog 
          employee={selectedEmployee} 
          isOpen={isVolunteerDialogOpen} 
          onClose={() => setIsVolunteerDialogOpen(false)} 
        />
      </main>
    </div>
  );
}
