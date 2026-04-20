
import { useState } from "react";
import { LeaderboardEntry } from "@/types/organization";

type SortField = keyof LeaderboardEntry | null;
type SortDirection = "asc" | "desc" | null;

export function useLeaderboardSort(initialData: LeaderboardEntry[]) {
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  
  const handleSort = (field: keyof LeaderboardEntry) => {
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
  
  const getSortedData = (data: LeaderboardEntry[]) => {
    if (!sortField || !sortDirection) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (
        (typeof aValue === "number" && typeof bValue === "number") ||
        (Array.isArray(aValue) && Array.isArray(bValue))
      ) {
        return sortDirection === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
      
      return 0;
    });
  };
  
  return {
    sortField,
    sortDirection,
    handleSort,
    getSortedData
  };
}
