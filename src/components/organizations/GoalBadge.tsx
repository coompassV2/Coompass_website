
import { cn } from "@/lib/utils";

interface GoalBadgeProps {
  goal: number;
  size?: "sm" | "md" | "lg";
}

export const goalColors: Record<number, string> = {
  1: "#E5243B", // No Poverty
  2: "#DDA63A", // Zero Hunger
  3: "#4C9F38", // Good Health and Well-being
  4: "#C5192D", // Quality Education
  5: "#FF3A21", // Gender Equality
  6: "#26BDE2", // Clean Water and Sanitation
  7: "#FCC30B", // Affordable and Clean Energy
  8: "#A21942", // Decent Work and Economic Growth
  9: "#FD6925", // Industry, Innovation and Infrastructure
  10: "#DD1367", // Reduced Inequalities
  11: "#FD9D24", // Sustainable Cities and Communities
  12: "#BF8B2E", // Responsible Consumption and Production
  13: "#3F7E44", // Climate Action
  14: "#0A97D9", // Life Below Water
  15: "#56C02B", // Life on Land
  16: "#00689D", // Peace, Justice and Strong Institutions
  17: "#19486A", // Partnerships for the Goals
};

export function GoalBadge({ goal, size = "md" }: GoalBadgeProps) {
  const sizeClasses = {
    sm: "h-5 w-5 text-xs",
    md: "h-7 w-7 text-sm",
    lg: "h-10 w-10 text-base",
  };

  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center text-white font-bold",
        sizeClasses[size]
      )}
      style={{ backgroundColor: goalColors[goal] || "#000000" }}
    >
      {goal}
    </div>
  );
}
