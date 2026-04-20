import { useRef, useEffect, useState } from "react";
import { MissionCard } from "@/components/missions/MissionCard";
import type { Mission } from "@/components/missions/MissionCard";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 220;

interface MarqueeProps {
  missions: Mission[];
  className?: string;
}

export function Marquee({ missions, className }: MarqueeProps) {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(-1);

  useEffect(() => {
    const h1 = col1Ref.current?.offsetHeight ?? 0;
    const h2 = col2Ref.current?.offsetHeight ?? 0;
    const h3 = col3Ref.current?.offsetHeight ?? 0;
    const h = Math.max(h1, h2, h3, 1);
    setOffsetY(-h);
  }, [missions.length]);

  const trackStyle = () =>
    ({ "--marquee-offset-y": offsetY >= 0 ? `${offsetY}px` : "-50%" } as React.CSSProperties);

  if (missions.length === 0) return null;

  const third = Math.ceil(missions.length / 3);
  const col1Missions = missions.slice(0, third);
  const col2Missions = missions.slice(third, third * 2);
  const col3Missions = missions.slice(third * 2);

  const renderColumn = (
    missionsSlice: Mission[],
    keyPrefix: string,
    copyRef: React.RefObject<HTMLDivElement | null>,
    trackClass: string,
    columnClassName?: string
  ) => (
    <div className={cn("overflow-hidden h-full min-w-0", columnClassName)}>
      <div
        className={cn("flex flex-col gap-3", trackClass)}
        style={{
          width: "100%",
          maxWidth: CARD_WIDTH,
          margin: "0 auto",
          ...trackStyle(),
        }}
      >
        <div
          ref={copyRef}
          className="flex flex-col gap-3 shrink-0"
        >
          {missionsSlice.map((mission) => (
            <div
              key={`${keyPrefix}-${mission.id}`}
              className="pointer-events-none select-none"
              style={{ width: "100%" }}
              aria-hidden
            >
              <MissionCard mission={mission} marqueeMode />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          {missionsSlice.map((mission) => (
            <div
              key={`${keyPrefix}-copy-${mission.id}`}
              className="pointer-events-none select-none"
              style={{ width: "100%" }}
              aria-hidden
            >
              <MissionCard mission={mission} marqueeMode />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("marquee-root relative w-full flex flex-col min-h-0", className)}>
      {/* Responsive bento grid: 1 col (mobile), 2 col (tablet), 3 col (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 flex-1 min-h-0">
        {renderColumn(col1Missions, "L", col1Ref, "marquee-track-vertical-up")}
        {renderColumn(
          col2Missions,
          "M",
          col2Ref,
          "marquee-track-vertical-down",
          "hidden sm:block"
        )}
        {renderColumn(
          col3Missions,
          "R",
          col3Ref,
          "marquee-track-vertical-up-offset",
          "hidden lg:block"
        )}
      </div>
    </div>
  );
}
