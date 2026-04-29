import { formatDateTimePt, formatMonthLabelLongPt } from "@/lib/dateFormat";

export function formatLastUpdated(value: string | null | undefined): string {
  return formatDateTimePt(value, "—");
}

export function formatMonthLabel(monthKey: string): string {
  return formatMonthLabelLongPt(monthKey);
}
