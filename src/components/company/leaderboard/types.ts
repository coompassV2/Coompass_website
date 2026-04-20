
export type TimeframeType = 'week' | 'month' | 'quarter' | 'year' | 'allTime';

export interface LeaderboardEmployee {
  id: number;
  name: string;
  avatar: string;
  department: string;
  hours: number;
  missions: number;
  impact: number;
  recognition: string[];
}

export interface LeaderboardHeaderProps {
  timeframe: TimeframeType;
  onTimeframeChange: (timeframe: TimeframeType) => void;
}

export interface LeaderboardTableProps {
  data: LeaderboardEmployee[];
  onRowClick: (employee: LeaderboardEmployee) => void;
}
