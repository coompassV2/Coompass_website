import type { PersonaType } from "@/utils/personaLabels";
import type { KpiItem } from "@/components/analytics/blocks";
import type { LineSeriesConfig } from "@/components/analytics/blocks";
import type { BarSeriesConfig } from "@/components/analytics/blocks";
import type { DonutItem } from "@/components/analytics/blocks";

/** Config for a single KPI block (page supplies actual values from data) */
export interface KpiBlockConfig {
  id: string;
  label: string;
  /** Optional key to resolve value from data source */
  valueKey?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
}

/** Config for a line chart block */
export interface LineChartBlockConfig {
  id: string;
  title: string;
  description?: string;
  xKey: string;
  series: LineSeriesConfig[];
}

/** Config for a bar chart block */
export interface BarChartBlockConfig {
  id: string;
  title: string;
  description?: string;
  xKey: string;
  series: BarSeriesConfig[];
}

/** Config for a donut chart block */
export interface DonutChartBlockConfig {
  id: string;
  title: string;
  description?: string;
}

/** Timeframe options for filters */
export type TimeframeOption = "7d" | "30d" | "90d" | "quarter" | "year";

export interface AnalyticsPersonaConfig {
  /** KPI cards to show (order and labels) */
  kpis: KpiBlockConfig[];
  /** Line charts to show */
  lineCharts: LineChartBlockConfig[];
  /** Bar charts to show */
  barCharts: BarChartBlockConfig[];
  /** Donut charts to show */
  donutCharts: DonutChartBlockConfig[];
  /** Available timeframe filters */
  timeframes: TimeframeOption[];
}

const companyKpis: KpiBlockConfig[] = [
  { id: "hours", label: "Volunteer hours", valueKey: "totalHours", suffix: "h" },
  { id: "participation", label: "Participation rate", valueKey: "participationRate", suffix: "%" },
  { id: "missions", label: "Missions completed", valueKey: "missionsCompleted" },
  { id: "employees", label: "Active employees", valueKey: "activeEmployees" },
];

const companyLineCharts: LineChartBlockConfig[] = [];

const companyBarCharts: BarChartBlockConfig[] = [
  {
    id: "hours-trend",
    title: "Volunteer hours over time",
    description: "Monthly volunteer hours",
    xKey: "month",
    series: [{ dataKey: "hours", label: "Hours" }],
  },
];

const companyDonutCharts: DonutChartBlockConfig[] = [
  { id: "sdg-split", title: "SDG distribution", description: "Impact by SDG" },
];

const organizationKpis: KpiBlockConfig[] = [
  { id: "volunteers", label: "Volunteers engaged", valueKey: "volunteersEngaged" },
  { id: "missions", label: "Missions completed", valueKey: "missionsCompleted" },
  { id: "hours", label: "Hours contributed", valueKey: "hoursContributed", suffix: "h" },
];

const organizationLineCharts: LineChartBlockConfig[] = [
  {
    id: "activity-trend",
    title: "Mission activity",
    description: "Completed missions over time",
    xKey: "month",
    series: [{ dataKey: "missions", label: "Missions" }],
  },
];

const organizationBarCharts: BarChartBlockConfig[] = [];
const organizationDonutCharts: DonutChartBlockConfig[] = [
  { id: "skills", title: "Top skills", description: "Volunteer skills" },
];

const volunteerKpis: KpiBlockConfig[] = [
  { id: "hours", label: "My hours", valueKey: "myHours", suffix: "h" },
  { id: "missions", label: "Missions done", valueKey: "missionsDone" },
];

const volunteerLineCharts: LineChartBlockConfig[] = [];
const volunteerBarCharts: BarChartBlockConfig[] = [];
const volunteerDonutCharts: DonutChartBlockConfig[] = [];

const stakeholderKpis: KpiBlockConfig[] = [
  { id: "esg-score", label: "ESG score", valueKey: "esgScore", suffix: "%" },
  { id: "hours", label: "Total hours", valueKey: "totalHours", suffix: "h" },
  { id: "participation", label: "Participation", valueKey: "participationRate", suffix: "%" },
];

const stakeholderLineCharts: LineChartBlockConfig[] = [
  {
    id: "impact-trend",
    title: "Impact trend",
    description: "Quarterly impact",
    xKey: "quarter",
    series: [{ dataKey: "hours", label: "Hours" }, { dataKey: "impact", label: "Impact" }],
  },
];

const stakeholderBarCharts: BarChartBlockConfig[] = [];
const stakeholderDonutCharts: DonutChartBlockConfig[] = [
  { id: "sdg", title: "SDG alignment", description: "By goal" },
];

const defaultTimeframes: TimeframeOption[] = ["30d", "90d", "quarter", "year"];

export const analyticsDefinitions: Record<PersonaType, AnalyticsPersonaConfig> = {
  company: {
    kpis: companyKpis,
    lineCharts: companyLineCharts,
    barCharts: companyBarCharts,
    donutCharts: companyDonutCharts,
    timeframes: defaultTimeframes,
  },
  organization: {
    kpis: organizationKpis,
    lineCharts: organizationLineCharts,
    barCharts: organizationBarCharts,
    donutCharts: organizationDonutCharts,
    timeframes: defaultTimeframes,
  },
  volunteer: {
    kpis: volunteerKpis,
    lineCharts: volunteerLineCharts,
    barCharts: volunteerBarCharts,
    donutCharts: volunteerDonutCharts,
    timeframes: ["30d", "90d", "year"],
  },
  stakeholder: {
    kpis: stakeholderKpis,
    lineCharts: stakeholderLineCharts,
    barCharts: stakeholderBarCharts,
    donutCharts: stakeholderDonutCharts,
    timeframes: defaultTimeframes,
  },
};

/**
 * Resolve KPI items for display. Use when you have a data object keyed by valueKey.
 * Returns "Not available yet" for missing values.
 */
export function resolveKpiItems(
  persona: PersonaType,
  data: Record<string, string | number | undefined>
): KpiItem[] {
  const config = analyticsDefinitions[persona];
  return config.kpis.map((k) => ({
    id: k.id,
    label: k.label,
    value: data[k.valueKey ?? k.id] ?? "Not available yet",
    suffix: k.suffix,
    trend: k.trend,
  }));
}
