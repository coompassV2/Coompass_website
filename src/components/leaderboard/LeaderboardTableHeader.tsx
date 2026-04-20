
import { User, Clock, Target, Building, Users, Coins } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SortIcon } from "./SortIcon";
import { LeaderboardEntry } from "@/types/organization";

interface LeaderboardTableHeaderProps {
  handleSort: (field: string) => void;
  sortField: string | null;
  sortDirection: "asc" | "desc" | null;
  isLightMode: boolean;
}

export function LeaderboardTableHeader({ 
  handleSort, 
  sortField, 
  sortDirection,
  isLightMode 
}: LeaderboardTableHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <thead>
      <tr className={cn(
        "border-b border-border",
        isLightMode ? "bg-gray-50" : ""
      )}>
        <th className="text-left px-4 py-3">
          <span className="text-xs font-medium flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            {t("Employee")}
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-4 py-3 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("volunteerHours")}
        >
          <span className="text-xs font-medium flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {t("Volunteer hours")}
            <SortIcon field="volunteerHours" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-4 py-3 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("engagedCauseAreas")}
        >
          <span className="text-xs font-medium flex items-center">
            <Target className="h-3.5 w-3.5 mr-1" />
            {t("Engaged Cause Areas")}
            <SortIcon field="engagedCauseAreas" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-4 py-3 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("engagedNGOs")}
        >
          <span className="text-xs font-medium flex items-center">
            <Building className="h-3.5 w-3.5 mr-1" />
            {t("Engaged NGOs")}
            <SortIcon field="engagedNGOs" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-4 py-3 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("completedMissions")}
        >
          <span className="text-xs font-medium flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            {t("Completed missions")}
            <SortIcon field="completedMissions" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th 
          className={cn(
            "text-left px-4 py-3 cursor-pointer",
            isLightMode ? "hover:bg-gray-100" : "hover:bg-foreground/5"
          )}
          onClick={() => handleSort("passEarned")}
        >
          <span className="text-xs font-medium flex items-center">
            <Coins className="h-3.5 w-3.5 mr-1" /> 
            {t("Digital coins")}
            <SortIcon field="passEarned" sortField={sortField} sortDirection={sortDirection} />
          </span>
        </th>
        <th className="text-left px-4 py-3">
          <span className="text-xs font-medium flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            {t("Badges")}
          </span>
        </th>
      </tr>
    </thead>
  );
}
