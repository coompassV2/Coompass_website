import * as React from "react";
import { KpiStatCard, KpiStatCardProps } from "./KpiStatCard";
import { cn } from "@/lib/utils";

export interface KpiItem extends Omit<KpiStatCardProps, "loading"> {
  id: string;
}

export interface KpiStatGridProps {
  items: KpiItem[];
  loading?: boolean;
  /** Number of columns; default responsive 1/2/4 */
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const gridCols: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function KpiStatGrid({
  items,
  loading = false,
  columns = 4,
  className,
}: KpiStatGridProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "grid gap-3",
          gridCols[columns],
          className
        )}
      >
        {Array.from({ length: Math.min(4, columns) }).map((_, i) => (
          <KpiStatCard key={i} label="" value="" loading />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div
        className={cn(
          "grid gap-4",
          gridCols[columns],
          className
        )}
      >
        <div className="col-span-full rounded-lg border border-dashed border-border bg-muted/30 p-5 text-center text-xs text-muted-foreground">
          No KPIs available yet.
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-3", gridCols[columns], className)}>
      {items.map((item) => (
        <KpiStatCard
          key={item.id}
          label={item.label}
          value={item.value}
          suffix={item.suffix}
          trend={item.trend}
        />
      ))}
    </div>
  );
}
