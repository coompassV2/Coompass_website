
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SortIcon } from "../leaderboard/SortIcon";
import { Employee } from "./types";

interface EmployeeTableHeaderProps {
  handleSort: (field: keyof Employee) => void;
  sortField: keyof Employee | null;
  sortDirection: "asc" | "desc" | null;
  isLightMode: boolean;
  hideActions?: boolean;
}

export function EmployeeTableHeader({
  handleSort,
  sortField,
  sortDirection,
  isLightMode,
  hideActions
}: EmployeeTableHeaderProps) {
  const { t } = useTranslation();
  const [isBrisaUser, setIsBrisaUser] = useState(false);

  useEffect(() => {
    // Check if user came from login-brisa
    const selectedBrisaCompany = localStorage.getItem("selected-brisa-company");
    setIsBrisaUser(!!selectedBrisaCompany);
  }, []);

  return (
    <thead>
      <tr className={cn(
        "border-b border-border",
        isLightMode ? "bg-gray-50" : ""
      )}>
        {isBrisaUser && (
          <th className="text-left px-3 py-2">
            <span className="text-xs font-medium flex items-center">
              {t("Company")}
            </span>
          </th>
        )}
        <th 
          className={cn(
            "text-left px-3 py-2 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("name")}
        >
          <span className="text-xs font-medium flex items-center">
            {t("Volunteer")}
            <SortIcon field="name" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-3 py-2 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("joinDate")}
        >
          <span className="text-xs font-medium flex items-center">
            {t("Join date")}
            <SortIcon field="joinDate" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-3 py-2 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("lastLogin")}
        >
          <span className="text-xs font-medium flex items-center">
            {t("Last login")}
            <SortIcon field="lastLogin" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-3 py-2 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("activeMissions")}
        >
          <span className="text-xs font-medium flex items-center">
            {t("Active missions")}
            <SortIcon field="activeMissions" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-3 py-2 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("completeMissions")}
        >
          <span className="text-xs font-medium flex items-center">
            {t("Complete missions")}
            <SortIcon field="completeMissions" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-3 py-2 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("volunteerHours")}
        >
          <span className="text-xs font-medium flex items-center">
            {t("Volunteer Hours")}
            <SortIcon field="volunteerHours" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        {!hideActions && (
          <th className="text-left px-3 py-2">
            <span className="text-xs font-medium">
              {t("Actions")}
            </span>
          </th>
        )}
      </tr>
    </thead>
  );
}
