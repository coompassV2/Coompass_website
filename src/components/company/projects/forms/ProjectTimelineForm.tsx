
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectTimelineFormProps {
  formData: {
    startDate: string;
    endDate: string;
  };
  onInputChange: (field: string, value: string) => void;
  errors?: {
    startDate?: string;
    endDate?: string;
  };
}

export function ProjectTimelineForm({ formData, onInputChange, errors }: ProjectTimelineFormProps) {
  const { t } = useTranslation();
  const startDateInputRef = useRef<HTMLInputElement | null>(null);
  const endDateInputRef = useRef<HTMLInputElement | null>(null);

  const openDatePicker = (input: HTMLInputElement | null) => {
    if (!input) return;
    const inputWithPicker = input as HTMLInputElement & { showPicker?: () => void };
    if (typeof inputWithPicker.showPicker === "function") {
      inputWithPicker.showPicker();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        {t('Timeline')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">{t('Start Date')} *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              ref={startDateInputRef}
              onClick={() => openDatePicker(startDateInputRef.current)}
              onChange={(e) => onInputChange('startDate', e.target.value)}
              aria-invalid={Boolean(errors?.startDate)}
              className={cn("pl-10", errors?.startDate && "border-destructive focus-visible:ring-destructive")}
              required
            />
          </div>
          {errors?.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">{t('End Date')} *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              ref={endDateInputRef}
              onClick={() => openDatePicker(endDateInputRef.current)}
              onChange={(e) => onInputChange('endDate', e.target.value)}
              aria-invalid={Boolean(errors?.endDate)}
              className={cn("pl-10", errors?.endDate && "border-destructive focus-visible:ring-destructive")}
              required
            />
          </div>
          {errors?.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
        </div>
      </div>
    </div>
  );
}
