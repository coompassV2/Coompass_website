import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays, CalendarRange } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CalendarViewSelectorProps {
  viewType: 'month' | 'week';
  onViewChange: (view: 'month' | 'week') => void;
}

export function CalendarViewSelector({ viewType, onViewChange }: CalendarViewSelectorProps) {
  const { t } = useTranslation();
  
  // Component now returns an empty div since we're removing the buttons
  // but maintaining the component for potential future use
  return (
    <div className="flex justify-end space-x-2">
      {/* Buttons removed as requested */}
    </div>
  );
}
