
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useTheme } from "@/hooks/useTheme";

interface WalletChartProps {
  chartData: Array<{time: string; value: number}>;
}

export function WalletChart({ chartData }: WalletChartProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="h-[400px] w-full mt-4 relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: isLight ? '#666' : '#aaa', fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis 
            domain={[0, 'dataMax + 500']} 
            axisLine={false} 
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
            tick={{ fill: isLight ? '#666' : '#aaa', fontSize: 12 }}
          />
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={isLight ? "#eee" : "#333"} 
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className={`p-3 rounded-lg ${isLight ? 'bg-white shadow-md border border-gray-200' : 'bg-gray-800 border border-gray-700'}`}>
                    <p className="text-sm font-medium">{`${label}`}</p>
                    <p className={`text-sm font-mono ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                      <span className="text-[#4CAF50] font-medium">Balance: </span>
                      ${payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#4CAF50" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
