import { formatDayMonthPt } from "@/lib/dateFormat";

// Time range options for charts
export const timeOptions = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 90 days", value: 90 }
];

// Define the chart data point interface
export interface ChartDataPoint {
  date: string;
  volunteers: number;
  hours: number;
}

// Generate mock data for the volunteers chart
export const generateData = (days: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(today.getDate() - (days - i - 1));
    
    data.push({
      date: formatDayMonthPt(date),
      volunteers: Math.floor(Math.random() * 50) + 10,
      hours: Math.floor(Math.random() * 100) + 20
    });
  }
  
  return data;
};
