const PT_LOCALE = "pt-PT";

type DateInput = Date | string | number | null | undefined;

function toDate(value: DateInput): Date | null {
  if (value == null) return null;
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatWithOptions(
  value: DateInput,
  options: Intl.DateTimeFormatOptions,
  fallback = "-"
): string {
  const date = toDate(value);
  if (!date) return fallback;
  return new Intl.DateTimeFormat(PT_LOCALE, options).format(date);
}

export function formatDatePt(value: DateInput, fallback = "-"): string {
  return formatWithOptions(
    value,
    { day: "numeric", month: "short", year: "numeric" },
    fallback
  );
}

export function formatDateShortPt(value: DateInput, fallback = "-"): string {
  return formatWithOptions(value, { day: "2-digit", month: "2-digit", year: "numeric" }, fallback);
}

export function formatDayMonthPt(value: DateInput, fallback = "-"): string {
  return formatWithOptions(value, { day: "numeric", month: "short" }, fallback);
}

export function formatDateTimePt(value: DateInput, fallback = "—"): string {
  return formatWithOptions(
    value,
    { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" },
    fallback
  );
}

export function formatDateRangePt(
  start: DateInput,
  end?: DateInput,
  separator = " - ",
  fallback = "-"
): string {
  const startLabel = formatDatePt(start, "");
  if (!startLabel) return fallback;
  const endLabel = formatDatePt(end, "");
  return endLabel ? `${startLabel}${separator}${endLabel}` : startLabel;
}

export function formatMonthLabelPt(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const parsed = new Date(Number(year), Number(month) - 1, 1);
  if (Number.isNaN(parsed.getTime())) return monthKey;
  return new Intl.DateTimeFormat(PT_LOCALE, { month: "short" }).format(parsed);
}

export function formatMonthLabelLongPt(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const parsed = new Date(Number(year), Number(month) - 1, 1);
  if (Number.isNaN(parsed.getTime())) return monthKey;
  const label = new Intl.DateTimeFormat(PT_LOCALE, { month: "long" }).format(parsed);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatMonthYearPt(value: DateInput, fallback = "-"): string {
  return formatWithOptions(value, { month: "long", year: "numeric" }, fallback);
}

export function toISODateKey(value: DateInput): string {
  const date = toDate(value);
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

