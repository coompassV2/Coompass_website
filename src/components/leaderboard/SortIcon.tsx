
import { ArrowUp, ArrowDown } from "lucide-react";

interface SortIconProps {
  field: string;
  sortField: string | null;
  sortDirection: "asc" | "desc" | null;
}

export function SortIcon({ field, sortField, sortDirection }: SortIconProps) {
  return (
    <span className="inline-flex items-center ml-1">
      <ArrowUp 
        className={`h-3 w-3 ${sortField === field && sortDirection === "asc" ? "text-green-500" : "text-gray-400"}`}
      />
      <ArrowDown 
        className={`h-3 w-3 ${sortField === field && sortDirection === "desc" ? "text-green-500" : "text-gray-400"}`}
      />
    </span>
  );
}
