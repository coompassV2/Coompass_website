import { FileText, Shield, TrendingUp, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

type OutcomeFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  placement: "left" | "right" | "bottom";
};

const OUTCOMES: OutcomeFeature[] = [
  {
    title: "Clearer performance narratives",
    description:
      "Transform dispersed initiatives into a coherent story of progress, value creation, and accountability.",
    icon: FileText,
    placement: "left",
  },
  {
    title: "Stronger stakeholder trust",
    description:
      "Provide investors, boards, partners, and institutional audiences with credible, structured information.",
    icon: Shield,
    placement: "right",
  },
  {
    title: "Better strategic decisions",
    description:
      "Understand what is working, where to scale, and how social sustainability supports long-term organizational goals.",
    icon: TrendingUp,
    placement: "bottom",
  },
];

function BranchLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1000 560"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <line x1="500" y1="200" x2="170" y2="200" stroke="currentColor" strokeWidth="1.5" className="text-[#0f5f4d]/30" />
      <line x1="500" y1="200" x2="830" y2="200" stroke="currentColor" strokeWidth="1.5" className="text-[#0f5f4d]/30" />
      <line x1="500" y1="200" x2="500" y2="430" stroke="currentColor" strokeWidth="1.5" className="text-[#0f5f4d]/30" />
      {[
        [500, 200],
        [170, 200],
        [830, 200],
        [500, 430],
      ].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="4" className="fill-[#0f5f4d]/40" />
      ))}
    </svg>
  );
}

function OutcomeCard({ feature }: { feature: OutcomeFeature }) {
  const Icon = feature.icon;

  return (
    <article
      className={cn(
        "group relative rounded-2xl border border-[#174c43]/12 bg-white p-6 shadow-[0_18px_40px_-36px_rgba(15,23,42,0.35)]",
        "transition-all duration-300 hover:border-[#0f5f4d]/25 hover:shadow-[0_24px_48px_-32px_rgba(15,95,77,0.28)]",
        feature.placement === "left" && "lg:col-start-1 lg:row-start-1 lg:self-center",
        feature.placement === "right" && "lg:col-start-3 lg:row-start-1 lg:self-center",
        feature.placement === "bottom" && "lg:col-start-2 lg:row-start-2 lg:max-w-md lg:justify-self-center",
      )}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#123268]/40 bg-[#0b1a3a]">
        <Icon className="h-5 w-5 text-sky-300" strokeWidth={1.65} aria-hidden />
      </span>
      <h3 className="mt-4 text-lg font-medium leading-snug tracking-tight text-[#174c43] md:text-xl">
        {feature.title}
      </h3>
      <p className="mt-3 text-sm font-light leading-relaxed text-slate-600 md:text-[0.9375rem]">
        {feature.description}
      </p>
    </article>
  );
}

function CentralNode() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center lg:col-start-2 lg:row-start-1 lg:px-4">
      <div className="w-full max-w-xs rounded-2xl border border-slate-400/30 bg-[linear-gradient(165deg,#94a3b8_0%,#64748b_45%,#475569_100%)] px-8 py-9 shadow-[0_28px_56px_-28px_rgba(15,23,42,0.22)] md:max-w-sm md:px-10 md:py-10">
        <p className="text-xs font-medium tracking-[0.18em] text-slate-100/90">CORE FRAMEWORK</p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-white md:text-[1.65rem]">Executive Layer</h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-slate-100/90 md:text-[0.9375rem]">
          Connecting performance, governance, and stakeholder confidence.
        </p>
      </div>
    </div>
  );
}

export function InvestorsExecutiveLayerOutcomesSection() {
  const left = OUTCOMES.find((o) => o.placement === "left")!;
  const right = OUTCOMES.find((o) => o.placement === "right")!;
  const bottom = OUTCOMES.find((o) => o.placement === "bottom")!;

  return (
    <Reveal as="section" className="bg-white py-16 lg:py-24" aria-labelledby="investors-layer-outcomes-heading">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <h2
          id="investors-layer-outcomes-heading"
          className="mx-auto max-w-3xl text-center text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl"
        >
          What this layer enables
        </h2>

        {/* Desktop branching layout */}
        <div className="relative mx-auto mt-14 hidden max-w-5xl lg:block lg:min-h-[560px]">
          <BranchLines />
          <div className="relative grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto] items-start gap-x-10 gap-y-14 pt-6">
            <OutcomeCard feature={left} />
            <CentralNode />
            <OutcomeCard feature={right} />
            <OutcomeCard feature={bottom} />
          </div>
        </div>

        {/* Mobile stacked layout */}
        <div className="mt-12 space-y-6 lg:hidden">
          <CentralNode />
          {OUTCOMES.map((feature) => (
            <OutcomeCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
