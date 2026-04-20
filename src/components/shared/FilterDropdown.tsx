
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type FilterOption =
  | string
  | {
      value: string;
      label: string;
      iconUrl?: string;
    };

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedOptions: string[];
  onOptionToggle: (option: string) => void;
  buttonClassName?: string;
}

export function FilterDropdown({
  label,
  options,
  selectedOptions,
  onOptionToggle,
  buttonClassName
}: FilterDropdownProps) {
  const normalizedOptions = options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option, iconUrl: undefined }
      : option
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          size="sm"
          className={cn(
            "text-xs",
            selectedOptions.length > 0 && !buttonClassName && "bg-green-500 text-white hover:bg-green-600 border-green-500",
            buttonClassName
          )}
        >
          <Filter className="h-3.5 w-3.5 mr-1.5" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 bg-background border border-border max-h-[400px] overflow-y-auto">
        {normalizedOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedOptions.includes(option.value)}
            onCheckedChange={() => onOptionToggle(option.value)}
            className="focus:bg-green-500 focus:text-white data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
          >
            <span className="inline-flex items-center gap-2">
              {option.iconUrl ? (
                <img
                  src={option.iconUrl}
                  alt=""
                  className="h-5 w-5 rounded-sm object-cover"
                  aria-hidden
                />
              ) : null}
              <span>{option.label}</span>
            </span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
