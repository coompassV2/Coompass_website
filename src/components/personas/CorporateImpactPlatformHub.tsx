import { useCallback, useLayoutEffect, useRef, useState, type Ref } from "react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export type CorporateImpactFeature = {
  title: string;
  description: string;
  tag: string;
  cardClassName?: string;
};

type CorporateImpactPlatformHubProps = {
  title: string;
  subtitle?: string;
  logoSrc: string;
  logoAlt?: string;
  features: CorporateImpactFeature[];
};

/** Orbit layout works well for ~5 or fewer; more cards use a grid on md+ */
const ORBIT_FEATURE_LIMIT = 5;

const ORBIT_RADIUS = 30;

const CONNECTOR_STROKE = "stroke-sky-400/45";
const CONNECTOR_DOT = "fill-sky-400/60";

function orbitPosition(index: number, total: number, radiusPercent: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    left: `${50 + radiusPercent * Math.cos(angle)}%`,
    top: `${50 + radiusPercent * Math.sin(angle)}%`,
  };
}

/** Quadratic curve between two points in viewBox space */
function curvedPath(x1: number, y1: number, x2: number, y2: number, bend = 0.14) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend * len;
  const cy = my + (dx / len) * bend * len;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/** Cubic curve for logo-to-card links in pixel space */
function smoothConnectorPath(x1: number, y1: number, x2: number, y2: number) {
  const dy = y2 - y1;
  const verticalBias = Math.max(28, Math.abs(dy) * 0.42);
  return `M ${x1} ${y1} C ${x1} ${y1 + verticalBias}, ${x2} ${y2 - verticalBias}, ${x2} ${y2}`;
}

function HubConnectors({ count, radiusPercent }: { count: number; radiusPercent: number }) {
  const hub = { x: 50, y: 50 };
  const nodes = Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
    return {
      x: hub.x + radiusPercent * Math.cos(angle),
      y: hub.y + radiusPercent * Math.sin(angle),
    };
  });

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-slate-300"
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <circle
        cx={hub.x}
        cy={hub.y}
        r={radiusPercent}
        stroke="currentColor"
        strokeWidth="0.35"
        strokeDasharray="1.4 1.6"
        className="text-slate-300/80"
      />
      {nodes.map((node, index) => (
        <path
          key={`path-${index}`}
          d={curvedPath(hub.x, hub.y, node.x, node.y)}
          stroke="currentColor"
          strokeWidth="0.4"
          strokeLinecap="round"
          className={CONNECTOR_STROKE}
        />
      ))}
      {nodes.map((node, index) => (
        <circle key={`node-${index}`} cx={node.x} cy={node.y} r="0.75" className={CONNECTOR_DOT} />
      ))}
      <circle
        cx={hub.x}
        cy={hub.y}
        r="2.8"
        className="fill-white stroke-sky-400/50"
        strokeWidth="0.45"
      />
    </svg>
  );
}

type GridConnector = {
  d: string;
  endX: number;
  endY: number;
};

function GridHubConnectors({
  connectors,
  width,
  height,
}: {
  connectors: GridConnector[];
  width: number;
  height: number;
}) {
  if (width === 0 || height === 0 || connectors.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
    >
      {connectors.map((connector, index) => (
        <g key={`grid-connector-${index}`}>
          <path
            d={connector.d}
            strokeWidth="1.5"
            strokeLinecap="round"
            className={CONNECTOR_STROKE}
            stroke="currentColor"
          />
          <circle cx={connector.endX} cy={connector.endY} r="3" className={CONNECTOR_DOT} />
        </g>
      ))}
    </svg>
  );
}

function HubFeatureCard({
  feature,
  layout = "orbit",
}: {
  feature: CorporateImpactFeature;
  layout?: "orbit" | "stack" | "grid";
}) {
  return (
    <article
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12),0_4px_12px_-6px_rgba(15,23,42,0.08)]",
        layout === "stack" && "w-full p-4 sm:p-5",
        layout === "grid" && "relative z-10 flex h-full w-full flex-col bg-white p-4 sm:p-5",
        layout === "orbit" && "w-[10.5rem] p-3 sm:w-[11.5rem] sm:p-3.5 lg:w-[13.25rem] lg:p-4",
        feature.cardClassName,
      )}
    >
      <h3 className="text-sm font-medium leading-snug tracking-tight text-[#111827] sm:text-[0.9375rem]">
        {feature.title}
      </h3>
      <p className="mt-1.5 text-xs font-light leading-relaxed text-slate-600 sm:line-clamp-3">
        {feature.description}
      </p>
      <span className="mt-auto flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 px-2.5 py-1 pt-2.5 text-center text-[0.625rem] font-medium leading-snug tracking-wide text-white sm:mt-3 sm:pt-0">
        {feature.tag}
      </span>
    </article>
  );
}

function HubLogo({
  logoSrc,
  logoAlt,
  size = "md",
  innerRef,
}: {
  logoSrc: string;
  logoAlt: string;
  size?: "sm" | "md";
  innerRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      className={cn(
        "relative z-20 flex shrink-0 items-center justify-center rounded-full border-[3px] border-sky-400/35 bg-[#1a1f26] p-0.5 shadow-[0_0_0_8px_rgba(255,255,255,0.95),0_12px_40px_-10px_rgba(7,38,63,0.28)]",
        size === "sm" ? "h-24 w-24 sm:h-28 sm:w-28" : "h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36",
      )}
    >
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-full w-full rounded-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function OrbitHub({
  features,
  logoSrc,
  logoAlt,
}: {
  features: CorporateImpactFeature[];
  logoSrc: string;
  logoAlt: string;
}) {
  return (
    <div className="relative mx-auto mt-10 hidden w-full px-2 sm:px-4 md:block lg:mt-14">
      <div className="relative mx-auto aspect-square w-full max-w-[min(100%,36rem)] sm:max-w-[min(100%,40rem)]">
        <HubConnectors count={features.length} radiusPercent={ORBIT_RADIUS} />
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={orbitPosition(index, features.length, ORBIT_RADIUS)}
          >
            <HubFeatureCard feature={feature} layout="orbit" />
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <HubLogo logoSrc={logoSrc} logoAlt={logoAlt} />
        </div>
      </div>
    </div>
  );
}

function GridHub({
  features,
  logoSrc,
  logoAlt,
}: {
  features: CorporateImpactFeature[];
  logoSrc: string;
  logoAlt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [connectors, setConnectors] = useState<GridConnector[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const updateConnectors = useCallback(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    const containerRect = container.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();

    setSvgSize({
      width: containerRect.width,
      height: containerRect.height,
    });

    const startX = logoRect.left + logoRect.width / 2 - containerRect.left;
    const startY = logoRect.bottom - containerRect.top;

    const nextConnectors: GridConnector[] = [];

    features.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (!card) return;

      const cardRect = card.getBoundingClientRect();
      const endX = cardRect.left + cardRect.width / 2 - containerRect.left;
      const endY = cardRect.top - containerRect.top;

      nextConnectors.push({
        d: smoothConnectorPath(startX, startY, endX, endY),
        endX,
        endY,
      });
    });

    setConnectors(nextConnectors);
  }, [features]);

  useLayoutEffect(() => {
    updateConnectors();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => updateConnectors());
    resizeObserver.observe(container);

    window.addEventListener("resize", updateConnectors);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(updateConnectors);
    });
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateConnectors);
    };
  }, [updateConnectors]);

  return (
    <div ref={containerRef} className="relative mt-10 hidden md:block lg:mt-14">
      <GridHubConnectors connectors={connectors} width={svgSize.width} height={svgSize.height} />

      <div className="relative z-10 flex flex-col items-center">
        <HubLogo innerRef={logoRef} logoSrc={logoSrc} logoAlt={logoAlt} />
      </div>

      <ul className="relative z-10 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-5">
        {features.map((feature, index) => (
          <li
            key={feature.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="min-w-0"
          >
            <HubFeatureCard feature={feature} layout="grid" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileStack({
  features,
  logoSrc,
  logoAlt,
}: {
  features: CorporateImpactFeature[];
  logoSrc: string;
  logoAlt: string;
}) {
  return (
    <div className="mt-8 md:hidden">
      <div className="flex justify-center">
        <HubLogo logoSrc={logoSrc} logoAlt={logoAlt} size="sm" />
      </div>
      <ul className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
        {features.map((feature) => (
          <li key={feature.title}>
            <HubFeatureCard feature={feature} layout="stack" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CorporateImpactPlatformHub({
  title,
  subtitle,
  logoSrc,
  logoAlt = "Coompass logo",
  features,
}: CorporateImpactPlatformHubProps) {
  const useGridLayout = features.length > ORBIT_FEATURE_LIMIT;

  return (
    <Reveal
      as="section"
      className="overflow-x-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50 py-12 sm:py-16 lg:py-28"
      aria-labelledby="corporate-impact-hub-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <h2
          id="corporate-impact-hub-heading"
          className="text-center text-2xl font-light leading-tight tracking-[-0.02em] text-[#111827] sm:text-3xl md:text-4xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm font-light leading-relaxed text-slate-600 sm:mt-4 sm:text-base md:text-lg">
            {subtitle}
          </p>
        )}

        {useGridLayout ? (
          <GridHub features={features} logoSrc={logoSrc} logoAlt={logoAlt} />
        ) : (
          <OrbitHub features={features} logoSrc={logoSrc} logoAlt={logoAlt} />
        )}

        <MobileStack features={features} logoSrc={logoSrc} logoAlt={logoAlt} />
      </div>
    </Reveal>
  );
}
