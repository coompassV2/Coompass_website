import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface MonthlyCountItem {
  month: string;
  count: number;
}

interface MonthlyCountTableProps {
  title: string;
  description?: string;
  valueColumnLabel: string;
  data: MonthlyCountItem[];
  loading?: boolean;
  className?: string;
}

export function MonthlyCountTable({
  title,
  description,
  valueColumnLabel,
  data,
  loading = false,
  className,
}: MonthlyCountTableProps) {
  const { t } = useTranslation();

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

  if (!data || data.length === 0) {
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
        <div className="max-h-[360px] overflow-y-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs sticky top-0 z-10 bg-card">
                  {t("Month")}
                </TableHead>
                <TableHead className="text-xs text-right sticky top-0 z-10 bg-card">
                  {valueColumnLabel}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.month}>
                  <TableCell className="text-sm">{row.month}</TableCell>
                  <TableCell className="text-sm text-right font-medium">
                    {row.count.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
