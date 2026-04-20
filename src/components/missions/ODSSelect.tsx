import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { translateSdgName } from "@/utils/sdgI18n";

interface ODSSelectProps {
  form: any;
}

const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

function getSdgImageUrl(goalId: number): string {
  return `${SDG_IMAGE_BASE}-${goalId}.jpg`;
}

export function ODSSelect({ form }: ODSSelectProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { sdgs } = useTaxonomyLists();

  return (
    <FormField
      control={form.control}
      name="ods"
      rules={{
        validate: (value) =>
          Array.isArray(value) && value.length > 0 ? true : t("Select at least one ODS"),
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-foreground dark:text-white">
            {t("ODS")} <span className="font-normal">({t("Sustainable Development Goals")})</span>
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white hover:bg-muted dark:hover:bg-coompass-success/20 focus:bg-muted dark:focus:bg-coompass-success/20"
              >
                {(field.value?.length ?? 0) > 0
                  ? t("{{count}} ODS selected", { count: field.value.length })
                  : t("Select ODS")}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-popover dark:bg-black/90 border-border dark:border-white/10 max-w-md">
              <div className="grid grid-cols-2 gap-2 p-4 max-h-[320px] overflow-y-auto">
                {sdgs.map((sdg) => {
                  const checked = (field.value || []).includes(sdg.id);
                  return (
                    <div
                      key={sdg.id}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5"
                    >
                      <Checkbox
                        id={`ods-${sdg.id}`}
                        checked={checked}
                        onCheckedChange={(c) => {
                          const current = field.value || [];
                          const updated = c
                            ? [...current, sdg.id].sort((a, b) => a - b)
                            : current.filter((id: number) => id !== sdg.id);
                          field.onChange(updated);
                        }}
                      className="border-border dark:border-white/10 data-[state=checked]:bg-coompass-success data-[state=checked]:border-coompass-success shrink-0"
                      />
                      <label
                        htmlFor={`ods-${sdg.id}`}
                        className="flex items-center gap-2 cursor-pointer text-foreground dark:text-white text-sm min-w-0 flex-1"
                      >
                        <img
                          src={getSdgImageUrl(sdg.id)}
                          alt={`ODS ${sdg.id}`}
                          className="h-8 w-8 rounded object-cover shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span className="truncate">
                          {sdg.id}. {translateSdgName(sdg, t)}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
