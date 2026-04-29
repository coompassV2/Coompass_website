import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface DomainHoursRanking {
  domain: string;
  display_name: string;
  hours: number;
}

interface GroupParticipationRankingCardProps {
  title: string;
  description?: string;
  data: DomainHoursRanking[];
  loading?: boolean;
  className?: string;
}

export function GroupParticipationRankingCard({
  title,
  description,
  data,
  loading = false,
  className,
}: GroupParticipationRankingCardProps) {
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[220px] animate-pulse rounded-md bg-muted" />
        </CardContent>
      </Card>
    );
  }

  const ranked = [...data].sort((a, b) => b.hours - a.hours);

  if (!ranked.length) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex h-[220px] items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
            No data available yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {ranked.map((row, index) => (
            <div
              key={row.domain}
              className="flex items-center gap-3 rounded-md border border-border/60 bg-muted/30 px-3 py-2"
            >
              <span className="tabular-nums text-xs font-medium text-muted-foreground w-5">
                {index + 1}.
              </span>
              <div className="h-8 w-8 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold uppercase shrink-0">
                {row.display_name.slice(0, 2)}
              </div>
              <span className="text-sm font-medium flex-1 truncate">
                {row.display_name}
              </span>
              <span className="text-sm font-semibold tabular-nums shrink-0">
                {row.hours.toLocaleString(undefined, {
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
