
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function EmployeeEngagementMetrics() {
  const { t } = useTranslation();
  const [timeframe, setTimeframe] = useState("quarter");

  // Mock employee engagement metrics (2-3 max)
  const engagementMetrics = [
    { label: t('Overall Participation Rate'), value: 74 },
    { label: t('Recurring Volunteers'), value: 62 },
    { label: t('Employee Satisfaction'), value: 92 }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">{t('Employee Engagement')}</h3>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('Select timeframe')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarter">{t('This Quarter')}</SelectItem>
              <SelectItem value="year">{t('This Year')}</SelectItem>
              <SelectItem value="alltime">{t('All Time')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {engagementMetrics.map((metric, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">{metric.label}</span>
                <span className="font-semibold">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
