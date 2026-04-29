
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useEmployeeSort } from "@/hooks/useEmployeeSort";
import { EmployeeTableHeader } from "./EmployeeTableHeader";
import { EmployeeTableRow } from "./EmployeeTableRow";
import { EmployeeTableProps } from "./types";

export function EmployeeTable({ employees, onRemoveEmployee, onViewEmployee, hideActions }: EmployeeTableProps) {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const { sortField, sortDirection, handleSort, getSortedEmployees } = useEmployeeSort(employees);
  
  const sortedEmployees = getSortedEmployees(employees);

  return (
    <div className={cn(
      "rounded-lg overflow-hidden border border-border shadow-sm",
      isLightMode ? "shadow-md" : ""
    )}>
      <table className={cn(
        "w-full",
        isLightMode 
          ? "bg-white" 
          : "bg-black/20 backdrop-blur-sm"
      )}>
        <EmployeeTableHeader
          handleSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          isLightMode={isLightMode}
          hideActions={hideActions}
        />
        <tbody>
          {sortedEmployees.map((employee) => (
            <EmployeeTableRow 
              key={employee.id} 
              employee={employee}
              isLightMode={isLightMode}
              onRemove={onRemoveEmployee}
              onView={() => onViewEmployee(employee)}
              hideActions={hideActions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
