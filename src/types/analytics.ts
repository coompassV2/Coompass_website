export type MetricsTimeframe = "30d" | "90d" | "1y" | "all";

export interface MissionMetricsBlock {
  active: number;
  finished: number;
  started_in_period: number;
  completion_rate: number;
}

export interface ParticipantMetricsBlock {
  active: number;
  completed: number;
  dropped: number;
  enrolled_total: number;
  completion_rate: number;
}

export interface MonthlyMissionPoint {
  month: string;
  count: number;
}

export interface MonthlyParticipantPoint {
  month: string;
  enrolled: number;
  completed: number;
}

export interface MissionMetricsResponse {
  timeframe: MetricsTimeframe;
  generated_at: string;
  total_missions?: number;
  total_active_missions?: number;
  volunteer_hours_total?: number;
  beneficiaries_completed_total: number;
  missions: MissionMetricsBlock;
  participants: ParticipantMetricsBlock;
  timeseries: {
    missions_by_month: MonthlyMissionPoint[];
    participants_by_month: MonthlyParticipantPoint[];
    volunteer_hours_by_month: Array<{ month: string; hours: number }>;
  };
}

export interface VolunteerMissionMetricsResponse extends MissionMetricsResponse {
  volunteer_hours_total: number;
}

export interface SdgAlignmentPoint {
  id: number;
  key: string;
  name: string;
  image_url: string | null;
  percentage: number;
}

export interface CauseAreaHoursPoint {
  name: string;
  hours: number;
}

export interface DomainHoursPoint {
  domain: string;
  display_name: string;
  hours: number;
}

export interface CompanyExtendedMetricsResponse {
  timeframe: MetricsTimeframe;
  generated_at: string;
  sdg_alignment: {
    radar: SdgAlignmentPoint[];
    most_used: SdgAlignmentPoint[];
  };
  cause_areas_by_hours: CauseAreaHoursPoint[];
  domain_hours_ranking: DomainHoursPoint[];
}

export interface NonprofitExtendedMetricsResponse {
  timeframe: MetricsTimeframe;
  generated_at: string;
  sdg_alignment: {
    radar: SdgAlignmentPoint[];
    most_used: SdgAlignmentPoint[];
  };
  cause_areas_by_hours: CauseAreaHoursPoint[];
}
