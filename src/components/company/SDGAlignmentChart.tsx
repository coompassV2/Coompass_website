import { useTranslation } from "react-i18next";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import type { SdgAlignmentPoint } from "@/types/analytics";
import { translateSdgName } from "@/utils/sdgI18n";

interface SDGAlignmentChartProps {
  radar?: SdgAlignmentPoint[];
  mostUsed?: SdgAlignmentPoint[];
  loading?: boolean;
}

export function SDGAlignmentChart({
  radar = [],
  mostUsed = [],
  loading = false,
}: SDGAlignmentChartProps) {
  const { t } = useTranslation();

  const allPresentSdgs = normalizeSdgPercentages(
    dedupeAndMergeById([...radar, ...mostUsed]).filter((point) => point.percentage > 0)
  );

  const sdgData = allPresentSdgs
    .slice()
    .sort((a, b) => a.id - b.id)
    .map((point) => ({
      sdg: translateSdgName(point, t),
      value: point.normalizedPercentage,
    }));

  return (
    <div className="glass-card p-4">
      <div>
        <h2 className="text-sm font-semibold mb-3">{t("SDG Alignment")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[300px]">
          {loading ? (
            <div className="h-full w-full animate-pulse rounded-md bg-muted" />
          ) : sdgData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={120} data={sdgData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="sdg" tick={{ fontSize: 10 }} />
                <Radar
                  name={t("SDG Alignment")}
                  dataKey="value"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
              {t("No data available yet.")}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">
            {t("SDGs")}
          </h3>
          {loading ? (
            <div className="h-[220px] animate-pulse rounded-md bg-muted" />
          ) : allPresentSdgs.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {allPresentSdgs
                .slice()
                .sort((a, b) => b.normalizedPercentage - a.normalizedPercentage)
                .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2 border border-border rounded-lg"
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={`SDG ${item.id}`}
                      className="h-10 w-10 rounded object-cover shrink-0"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded bg-muted text-xs flex items-center justify-center shrink-0">
                      {item.id}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium block truncate">
                      {translateSdgName(item, t)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.normalizedPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[220px] items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
              {t("No data available yet.")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type NormalizedSdgPoint = SdgAlignmentPoint & { normalizedPercentage: number };

function dedupeAndMergeById(points: SdgAlignmentPoint[]): SdgAlignmentPoint[] {
  const map = new Map<number, SdgAlignmentPoint>();
  for (const point of points) {
    const existing = map.get(point.id);
    if (!existing || point.percentage > existing.percentage) {
      map.set(point.id, point);
    }
  }
  return Array.from(map.values());
}

function normalizeSdgPercentages(points: SdgAlignmentPoint[]): NormalizedSdgPoint[] {
  if (points.length === 0) return [];
  const total = points.reduce((sum, point) => sum + Math.max(point.percentage, 0), 0);
  if (total <= 0) {
    return points.map((point) => ({ ...point, normalizedPercentage: 0 }));
  }

  const normalized = points.map((point) => ({
    ...point,
    normalizedPercentage: (Math.max(point.percentage, 0) / total) * 100,
  }));

  // Keep a stable 100.0% total after display rounding.
  const rounded = normalized.map((point) => ({
    ...point,
    normalizedPercentage: Number(point.normalizedPercentage.toFixed(1)),
  }));
  const roundedSum = rounded.reduce((sum, point) => sum + point.normalizedPercentage, 0);
  const delta = Number((100 - roundedSum).toFixed(1));
  if (rounded.length > 0 && delta !== 0) {
    rounded[0] = {
      ...rounded[0],
      normalizedPercentage: Number((rounded[0].normalizedPercentage + delta).toFixed(1)),
    };
  }

  return rounded;
}
