import { CircleHelp, LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const GRADIENT = "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 40%, #5a9c6e 100%)";

export interface ImpactKpiMetric {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
  helpText?: string;
}

interface ImpactKpiCardsProps {
  /** Optional section title (e.g. "Organization Impact") */
  title?: string;
  metrics: ImpactKpiMetric[];
  /** Optional class for the wrapper */
  className?: string;
  /** Use gradient styling (navy -> green), hide change stats */
  variant?: "default" | "gradient";
}

export function ImpactKpiCards({ title, metrics, className, variant = "default" }: ImpactKpiCardsProps) {
  const { t } = useTranslation();
  const useGradient = variant === "gradient";

  const gridCols = metrics.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 md:grid-cols-4";

  return (
    <div className={cn(title ? "mt-0" : "mt-3", className)}>
      {title ? (
        <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
      ) : null}
      <div className={cn("grid gap-3", gridCols)}>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className={cn(
                "rounded-lg overflow-hidden p-4",
                useGradient ? "" : "border border-border bg-background/80"
              )}
              style={useGradient ? { background: GRADIENT } : undefined}
            >
              <div className={cn(
                "flex items-center justify-between text-xs",
                useGradient ? "text-white/90" : "text-muted-foreground"
              )}>
                <span className="font-medium inline-flex items-center gap-1">
                  {metric.label}
                  {metric.helpText ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="opacity-90 hover:opacity-100 transition-opacity"
                          aria-label={t("Formula details")}
                        >
                          <CircleHelp className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[240px] text-xs leading-5">
                        {metric.helpText}
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                </span>
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5 flex-wrap">
                <span className={cn(
                  "text-2xl font-semibold",
                  useGradient ? "text-white drop-shadow-sm" : "text-foreground"
                )}>
                  {metric.value}
                </span>
              </div>
              {!useGradient && metric.change != null && (
                <p
                  className={cn(
                    "mt-2 text-xs font-medium",
                    metric.positive ? "text-emerald-600" : "text-red-500"
                  )}
                >
                  {metric.change} {t("from last month")}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
