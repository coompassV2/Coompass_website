
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

interface ProjectDateFieldsProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
}

export function ProjectDateFields({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange 
}: ProjectDateFieldsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>{t('Start Date')} *</Label>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 opacity-70" />
          <DatePicker 
            date={startDate} 
            onSelect={onStartDateChange} 
            placeholder={t('Select date')}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>{t('End Date')} *</Label>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 opacity-70" />
          <DatePicker 
            date={endDate} 
            onSelect={onEndDateChange}
            placeholder={t('Select date')}
          />
        </div>
      </div>
    </div>
  );
}
