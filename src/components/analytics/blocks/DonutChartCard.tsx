import * as React from "react";
import { PieChart, Pie, Cell } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChartCardShell } from "./ChartCardShell";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface DonutItem {
  name: string;
  value: number;
}

export interface DonutChartCardProps {
  title: string;
  description?: string;
  controls?: React.ReactNode;
  data: DonutItem[];
  loading?: boolean;
  className?: string;
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function DonutChartCard({
  title,
  description,
  controls,
  data,
  loading = false,
  className,
}: DonutChartCardProps) {
  const config: ChartConfig = React.useMemo(() => {
    const c: ChartConfig = {};
    (data || []).forEach((d, i) => {
      c[d.name] = {
        label: d.name,
        color: CHART_COLORS[i % CHART_COLORS.length],
      };
    });
    return c;
  }, [data]);

  if (loading) {
    return (
      <ChartCardShell title={title} description={description} className={className}>
        <Skeleton className="h-[220px] w-full rounded-md" />
      </ChartCardShell>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChartCardShell title={title} description={description} controls={controls} className={className}>
        <div className="flex h-[220px] items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
          No data available yet.
        </div>
      </ChartCardShell>
    );
  }

  return (
    <ChartCardShell title={title} description={description} controls={controls} className={className}>
      <ChartContainer config={config} className="mx-auto h-[220px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            stroke="transparent"
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell
                key={data[index].name}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
        </PieChart>
      </ChartContainer>
    </ChartCardShell>
  );
}
