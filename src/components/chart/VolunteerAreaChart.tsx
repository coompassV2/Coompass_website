
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChartDataPoint } from '@/utils/chartData';

interface VolunteerAreaChartProps {
  data: ChartDataPoint[];
}

export function VolunteerAreaChart({ data }: VolunteerAreaChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="volunteersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#666"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#666"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <Area
            type="monotone"
            dataKey="volunteers"
            stroke="#9b87f5"
            fillOpacity={1}
            fill="url(#volunteersGradient)"
            name="Volunteers"
          />
          <Area
            type="monotone"
            dataKey="hours"
            stroke="#4CAF50"
            fillOpacity={1}
            fill="url(#hoursGradient)"
            name="Volunteer Hours"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
