
import { useState } from "react";
import { Employee } from "@/components/employees/types";

type SortField = keyof Employee | null;
type SortDirection = "asc" | "desc" | null;

export function useEmployeeSort(initialData: Employee[]) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  
  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const getSortedEmployees = (employees: Employee[]) => {
    if (!sortField || !sortDirection) return employees;
    
    return [...employees].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
  };
  
  return {
    sortField,
    sortDirection,
    handleSort,
    getSortedEmployees
  };
}
