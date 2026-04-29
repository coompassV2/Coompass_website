import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CauseAreaHoursItem {
  name: string;
  hours: number;
}

interface CauseAreasByHoursCardProps {
  title: string;
  /** Cause areas with hours. Uses first 16 colors; more items reuse colors. */
  data: CauseAreaHoursItem[];
  className?: string;
}

export function CauseAreasByHoursCard({
  title,
  data,
  className,
}: CauseAreasByHoursCardProps) {
  const { t } = useTranslation();

  const sortedData = [...data].sort((a, b) => b.hours - a.hours);

  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
            No data available yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {sortedData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <span className="text-muted-foreground truncate">
                {t(item.name)}
              </span>
              <span className="font-medium shrink-0">
                {item.hours.toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })} h
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
