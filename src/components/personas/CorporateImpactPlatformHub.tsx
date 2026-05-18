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

const ORBIT_RADIUS_MD = 32;
const ORBIT_RADIUS_LG = 38;

function orbitPosition(index: number, total: number, radiusPercent: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    left: `${50 + radiusPercent * Math.cos(angle)}%`,
    top: `${50 + radiusPercent * Math.sin(angle)}%`,
  };
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
        <line
          key={`line-${index}`}
          x1={hub.x}
          y1={hub.y}
          x2={node.x}
          y2={node.y}
          stroke="currentColor"
          strokeWidth="0.35"
          className="text-sky-400/40"
        />
      ))}
      {nodes.map((node, index) => (
        <circle key={`node-${index}`} cx={node.x} cy={node.y} r="0.75" className="fill-sky-400/55" />
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

function HubFeatureCard({
  feature,
  layout = "orbit",
}: {
  feature: CorporateImpactFeature;
  layout?: "orbit" | "stack";
}) {
  return (
    <article
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12),0_4px_12px_-6px_rgba(15,23,42,0.08)]",
        layout === "stack"
          ? "w-full p-4 sm:p-5"
          : "w-[10.5rem] p-3 sm:w-[11.5rem] sm:p-3.5 lg:w-[13.25rem] lg:p-4",
        feature.cardClassName,
      )}
    >
      <h3 className="text-sm font-medium leading-snug tracking-tight text-[#111827] sm:text-[0.9375rem]">
        {feature.title}
      </h3>
      <p className="mt-1.5 text-xs font-light leading-relaxed text-slate-600 sm:line-clamp-3">
        {feature.description}
      </p>
      <span className="mt-2.5 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 px-2.5 py-1 text-center text-[0.625rem] font-medium leading-snug tracking-wide text-white sm:mt-3">
        {feature.tag}
      </span>
    </article>
  );
}

function HubLogo({ logoSrc, logoAlt, size = "md" }: { logoSrc: string; logoAlt: string; size?: "sm" | "md" }) {
  return (
    <div
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
      <div className="relative mx-auto aspect-square w-full max-w-[min(100%,36rem)] origin-center sm:max-w-[min(100%,40rem)] lg:max-w-[min(100%,52rem)] xl:max-w-6xl">
        {/* md–lg orbit */}
        <div className="absolute inset-0 lg:hidden">
          <HubConnectors count={features.length} radiusPercent={ORBIT_RADIUS_MD} />
          {features.map((feature, index) => (
            <div
              key={`md-${feature.title}`}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={orbitPosition(index, features.length, ORBIT_RADIUS_MD)}
            >
              <HubFeatureCard feature={feature} layout="orbit" />
            </div>
          ))}
        </div>

        {/* lg+ orbit */}
        <div className="absolute inset-0 hidden lg:block">
          <HubConnectors count={features.length} radiusPercent={ORBIT_RADIUS_LG} />
          {features.map((feature, index) => (
            <div
              key={`lg-${feature.title}`}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={orbitPosition(index, features.length, ORBIT_RADIUS_LG)}
            >
              <HubFeatureCard feature={feature} layout="orbit" />
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <HubLogo logoSrc={logoSrc} logoAlt={logoAlt} />
        </div>
      </div>
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

        <OrbitHub features={features} logoSrc={logoSrc} logoAlt={logoAlt} />

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
      </div>
    </Reveal>
  );
}
