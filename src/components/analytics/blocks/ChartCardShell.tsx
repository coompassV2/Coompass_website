import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ChartCardShellProps {
  title: string;
  description?: string;
  /** Right-side controls (e.g. timeframe selector) */
  controls?: React.ReactNode;
  /** Footer content (e.g. total score) */
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCardShell({
  title,
  description,
  controls,
  footer,
  children,
  className,
}: ChartCardShellProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 p-4 pb-1.5">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold leading-none tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {controls && (
          <div className="flex items-center shrink-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-md">
            {controls}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {children}
        {footer && (
          <div className="mt-3 pt-3 border-t border-border text-xs font-medium text-muted-foreground">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
