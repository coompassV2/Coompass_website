
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectOption {
  id: number | string;
  name: string;
}

interface MultiSelectDropdownProps {
  label: string;
  placeholder: string;
  options: MultiSelectOption[];
  selectedValues: (number | string)[];
  onSelectionChange: (values: (number | string)[]) => void;
  helpText?: string;
}

export function MultiSelectDropdown({
  label,
  placeholder,
  options,
  selectedValues,
  onSelectionChange,
  helpText
}: MultiSelectDropdownProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value: number | string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter(v => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const handleRemoveItem = (value: number | string) => {
    onSelectionChange(selectedValues.filter(v => v !== value));
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    return `${selectedValues.length} ${t('selected')}`;
  };

  const getSelectedItems = () => {
    return selectedValues.map(value => {
      const option = options.find(opt => opt.id === value);
      return option ? option : null;
    }).filter(Boolean);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left font-normal"
          >
            <span className="truncate">{getDisplayText()}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 opacity-50" />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 z-50" align="start">
          <div className="max-h-60 overflow-y-auto p-3">
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${option.id}`}
                    checked={selectedValues.includes(option.id)}
                    onCheckedChange={() => handleToggle(option.id)}
                  />
                  <Label 
                    htmlFor={`option-${option.id}`} 
                    className="text-sm cursor-pointer flex-1"
                  >
                    {typeof option.id === 'number' ? `${option.id}. ` : ''}{option.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Selected Items Display */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {getSelectedItems().map((item) => (
            <Badge key={item.id} variant="secondary" className="px-2 py-1">
              {typeof item.id === 'number' ? `${item.id}. ` : ''}{item.name}
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      {helpText && (
        <p className="text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
    </div>
  );
}
