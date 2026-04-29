
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { TimeRangeSelector } from './chart/TimeRangeSelector';
import { VolunteerAreaChart } from './chart/VolunteerAreaChart';
import { generateData } from '@/utils/chartData';

interface WorkHoursChartProps {
  onOpenCertificate: () => void;
}

export function WorkHoursChart({ onOpenCertificate }: WorkHoursChartProps) {
  const { t } = useTranslation();
  const [selectedDays, setSelectedDays] = useState(7);
  const data = generateData(selectedDays);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{t('Work Hour Analysis')}</h3>
          <Button 
            variant="outline" 
            className="bg-gray-800 text-white hover:bg-[#F2FCE2] hover:text-black transition-colors duration-200"
            onClick={onOpenCertificate}
          >
            {t("Request certificate")}
          </Button>
        </div>
        <div className="flex justify-end">
          <TimeRangeSelector
            selectedDays={selectedDays}
            onSelectedDaysChange={setSelectedDays}
          />
        </div>
      </div>

      <div className="text-xl md:text-2xl font-bold mb-6">38 hours · 12 mins</div>
      <div className="mt-4">
        <VolunteerAreaChart data={data} />
      </div>
    </div>
  );
}
