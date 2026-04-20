
import { Badge as BadgeType } from "@/types/organization";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { badges } from "@/data/leaderboard";

interface BadgeDisplayProps {
  badgeIds: string[];
  size?: "sm" | "md" | "lg";
}

export function BadgeDisplay({ badgeIds, size = "md" }: BadgeDisplayProps) {
  const { t } = useTranslation();
  
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };
  
  return (
    <div className="flex gap-1">
      {badgeIds.map((badgeId) => {
        const badge = badges.find(b => b.id === badgeId);
        if (!badge) return null;
        
        return (
          <TooltipProvider key={badgeId}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("cursor-help rounded-full overflow-hidden border-2", sizeClasses[size])}>
                  <img 
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${badge.id}&backgroundColor=${badge.color.replace('#', '')}`}
                    alt={badge.name}
                    className="w-full h-full"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
