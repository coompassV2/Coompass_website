
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { timeOptions } from '@/utils/chartData';
import { useTheme } from '@/hooks/useTheme';

interface TimeRangeSelectorProps {
  selectedDays: number;
  onSelectedDaysChange: (days: number) => void;
}

export function TimeRangeSelector({ selectedDays, onSelectedDaysChange }: TimeRangeSelectorProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={isLight 
            ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" 
            : "bg-gray-800 text-white hover:bg-gray-700"
          }
        >
          {timeOptions.find(option => option.value === selectedDays)?.label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={isLight 
          ? "bg-white border border-gray-200" 
          : "bg-gray-800 border border-gray-700"
        }
      >
        {timeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelectedDaysChange(option.value)}
            className={
              isLight 
                ? "cursor-pointer hover:bg-gray-100" 
                : "text-white hover:bg-gray-700 cursor-pointer"
            }
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
