
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BadgeDisplay } from "./BadgeDisplay";
import { cn } from "@/lib/utils";
import { LeaderboardEntry } from "@/types/organization";
import { getInitials } from "@/utils/avatarUtils";

interface LeaderboardTableRowProps {
  entry: LeaderboardEntry;
  isLightMode: boolean;
}

export function LeaderboardTableRow({ entry, isLightMode }: LeaderboardTableRowProps) {
  const getRankColor = (rank: number): string => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-foreground";
  };

  return (
    <tr 
      className={cn(
        "border-b border-border",
        isLightMode 
          ? "hover:bg-gray-50 text-gray-700" 
          : "hover:bg-foreground/5",
        entry.rank <= 3 && isLightMode && "bg-yellow-50/70"
      )}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Badge 
            variant={isLightMode ? "outline" : "outline"} 
            className={cn(
              "w-6 h-6 flex items-center justify-center p-0 border-2",
              getRankColor(entry.rank),
              isLightMode && entry.rank <= 3 && "border-yellow-400"
            )}
          >
            {entry.rank <= 3 ? (
              <User className="h-3 w-3" />
            ) : (
              entry.rank
            )}
          </Badge>
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={entry.employeeAvatar} alt={entry.employeeName} />
            <AvatarFallback>{getInitials(entry.employeeName || entry.name || "US")}</AvatarFallback>
          </Avatar>
          <span className={cn(
            entry.rank <= 3 && "font-medium",
            entry.rank === 1 && isLightMode && "text-yellow-700",
            isLightMode ? "text-gray-900" : ""
          )}>
            {entry.employeeName || entry.name || "Unknown User"}
          </span>
        </div>
      </td>
      <td className={cn(
        "px-4 py-3",
        isLightMode ? "text-gray-900" : "",
        entry.rank <= 3 && isLightMode && "font-medium"
      )}>
        {entry.volunteerHours || entry.hours || 0}
      </td>
      <td className={cn(
        "px-4 py-3",
        isLightMode ? "text-gray-900" : "",
        entry.rank <= 3 && isLightMode && "font-medium"
      )}>
        {entry.engagedCauseAreas || 0}
      </td>
      <td className={cn(
        "px-4 py-3",
        isLightMode ? "text-gray-900" : "",
        entry.rank <= 3 && isLightMode && "font-medium"
      )}>
        {entry.engagedNGOs || 0}
      </td>
      <td className={cn(
        "px-4 py-3",
        isLightMode ? "text-gray-900" : "",
        entry.rank <= 3 && isLightMode && "font-medium"
      )}>
        {entry.completedMissions || entry.missions || 0}
      </td>
      <td className={cn(
        "px-4 py-3",
        isLightMode ? "text-gray-900" : "",
        entry.rank <= 3 && isLightMode && "font-medium"
      )}>
        {entry.passEarned || (entry.volunteerHours ? entry.volunteerHours * 10 : entry.impact) || 0}
      </td>
      <td className="px-4 py-3">
        <BadgeDisplay badgeIds={entry.badges} />
      </td>
    </tr>
  );
}
