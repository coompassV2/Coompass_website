import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartCardShell } from "./ChartCardShell";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface BarSeriesConfig {
  dataKey: string;
  label: string;
}

export interface BarChartCardProps {
  title: string;
  description?: string;
  controls?: React.ReactNode;
  /** Array of { [xKey]: string, [dataKey]: number } */
  data: Record<string, string | number>[];
  xKey: string;
  series: BarSeriesConfig[];
  loading?: boolean;
  className?: string;
  /** Y-axis domain [min, max] */
  domain?: [number, number];
  /** Footer content (e.g. total score) */
  footer?: React.ReactNode;
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function BarChartCard({
  title,
  description,
  controls,
  data,
  xKey,
  series,
  loading = false,
  className,
  domain,
  footer,
}: BarChartCardProps) {
  const config: ChartConfig = React.useMemo(() => {
    const c: ChartConfig = {};
    series.forEach((s, i) => {
      c[s.dataKey] = {
        label: s.label,
        color: CHART_COLORS[i % CHART_COLORS.length],
      };
    });
    return c;
  }, [series]);

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
    <ChartCardShell title={title} description={description} controls={controls} footer={footer} className={className}>
      <ChartContainer config={config} className="h-[220px] w-full">
        <BarChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} />
          <YAxis type="number" domain={domain} tickLine={false} axisLine={false} tickFormatter={(v) => String(v)} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {series.map((s, i) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              radius={[0, 4, 4, 0]}
            />
          ))}
        </BarChart>
      </ChartContainer>
    </ChartCardShell>
  );
}
