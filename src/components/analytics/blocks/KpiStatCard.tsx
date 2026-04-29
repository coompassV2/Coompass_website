import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface KpiStatCardProps {
  label: string;
  value: string | number;
  /** Optional suffix e.g. "%", "h" */
  suffix?: string;
  /** Optional trend: "up" | "down" | "neutral" */
  trend?: "up" | "down" | "neutral";
  /** Loading state */
  loading?: boolean;
  className?: string;
}

export function KpiStatCard({
  label,
  value,
  suffix = "",
  trend,
  loading = false,
  className,
}: KpiStatCardProps) {
  if (loading) {
    return (
      <Card className={cn(className)}>
        <CardContent className="p-4">
          <Skeleton className="mb-1.5 h-3.5 w-20" />
          <Skeleton className="h-6 w-16" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(className)}>
      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-xl font-semibold tabular-nums tracking-tight">
            {value}
            {suffix}
          </span>
          {trend === "up" && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              ↑
            </span>
          )}
          {trend === "down" && (
            <span className="text-xs font-medium text-destructive">↓</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
