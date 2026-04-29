import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MetricsTimeframe } from "@/types/analytics";
import { useTranslation } from "react-i18next";

const OPTIONS: Array<{ value: MetricsTimeframe; labelKey: string }> = [
  { value: "30d", labelKey: "30 days" },
  { value: "90d", labelKey: "90 days" },
  { value: "1y", labelKey: "1 year" },
  { value: "all", labelKey: "All time" },
];

interface TimeframeSelectorProps {
  value: MetricsTimeframe;
  onChange: (next: MetricsTimeframe) => void;
  className?: string;
}

export function TimeframeSelector({ value, onChange, className }: TimeframeSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-md border p-1", className)}>
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={value === option.value ? "default" : "ghost"}
          className="h-8 px-2 text-xs"
          onClick={() => onChange(option.value)}
        >
          {t(option.labelKey)}
        </Button>
      ))}
    </div>
  );
}
