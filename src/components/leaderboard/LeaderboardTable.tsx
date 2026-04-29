
import { LeaderboardEntry } from "@/types/organization";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useLeaderboardSort } from "@/hooks/useLeaderboardSort";
import { LeaderboardTableHeader } from "./LeaderboardTableHeader";
import { LeaderboardTableRow } from "./LeaderboardTableRow";

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  const { theme } = useTheme();
  const { sortField, sortDirection, handleSort, getSortedData } = useLeaderboardSort(data);
  
  const sortedData = getSortedData(data);
  const isLightMode = theme === "light";
  
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
        <LeaderboardTableHeader 
          handleSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          isLightMode={isLightMode}
        />
        <tbody>
          {sortedData.map((entry) => (
            <LeaderboardTableRow 
              key={entry.id} 
              entry={entry}
              isLightMode={isLightMode}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
