import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface MultiSelectProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  optionLabels?: Record<string, string>;
}

export function MultiSelect({
  form,
  name,
  label,
  placeholder,
  options,
  optionLabels = {},
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const getOptionLabel = (option: string) => optionLabels[option] ?? option;
  const sortedOptions = [...options].sort((a, b) =>
    new Intl.Collator(i18n.language, { sensitivity: "base", numeric: true }).compare(
      getOptionLabel(a),
      getOptionLabel(b)
    )
  );

  return (
    <FormField
      control={form.control}
      name={name}
      rules={{
        validate: (value) =>
          Array.isArray(value) && value.length > 0
            ? true
            : t("Select at least one item from {{label}}", { label: t(label).toLowerCase() }),
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-foreground dark:text-white">{t(label)}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white hover:bg-muted dark:hover:bg-coompass-success/20 focus:bg-muted dark:focus:bg-coompass-success/20"
              >
                {field.value?.length > 0 
                  ? t("{{count}} selected", { count: field.value.length })
                  : t(placeholder)}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-popover dark:bg-black/90 border-border dark:border-white/10">
              <div className="space-y-2 p-4 max-h-[300px] overflow-y-auto">
                {sortedOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${name}-${option}`}
                      checked={field.value?.includes(option)}
                      onCheckedChange={(checked) => {
                        const currentValue = field.value || [];
                        const updatedValue = checked
                          ? [...currentValue, option]
                          : currentValue.filter((x: string) => x !== option);
                        field.onChange(updatedValue);
                      }}
                      className={cn(
                        "border-border dark:border-white/10",
                        field.value?.includes(option) && "bg-coompass-success border-coompass-success"
                      )}
                    />
                    <label 
                      htmlFor={`${name}-${option}`}
                      className="text-sm text-foreground dark:text-white cursor-pointer"
                    >
                      {getOptionLabel(option)}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}