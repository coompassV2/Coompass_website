import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

const ESG_RATING_URL =
  "https://finance.ec.europa.eu/sustainable-finance/tools-and-standards/esg-rating-activities_en";

function EsgAbstractVisual() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:max-w-none" aria-hidden>
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_70%_at_30%_20%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(52,211,153,0.14),transparent_50%)]" />
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_40%,transparent_100%)]" />

      <div className="relative flex h-full min-h-[280px] flex-col justify-between p-6 md:min-h-[320px] md:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-medium tracking-[0.2em] text-slate-400">ESG RATINGS</span>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Comparable data
          </span>
        </div>

        <div className="space-y-4">
          {[
            { label: "Environmental", value: 78, color: "bg-emerald-400" },
            { label: "Social", value: 85, color: "bg-sky-400" },
            { label: "Governance", value: 92, color: "bg-amber-300" },
          ].map((pillar) => (
            <div key={pillar.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs text-slate-300">
                <span>{pillar.label}</span>
                <span className="font-medium text-white">{pillar.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${pillar.color} opacity-90`}
                  style={{ width: `${pillar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {["Risk", "Impact", "Transparency"].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-3 text-center backdrop-blur-sm"
            >
              <p className="text-[0.65rem] font-medium uppercase tracking-wider text-slate-500">{item}</p>
              <p className="mt-1 text-sm font-light text-slate-200">Signal</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute -right-4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-sky-400/20 bg-sky-400/5 blur-sm md:-right-8 md:h-40 md:w-40" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl" />
    </div>
  );
}

export function InvestorsEsgRatingActivitiesSection() {
  return (
    <Reveal as="section" className="bg-[#060b12] py-20 lg:py-28" aria-labelledby="investors-esg-rating-heading">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-1">
            <EsgAbstractVisual />
          </div>

          <div className="order-2 lg:pl-4">
            <h2
              id="investors-esg-rating-heading"
              className="text-3xl font-light leading-tight tracking-[-0.02em] text-white md:text-4xl lg:text-[2.5rem]"
            >
              European Commission: ESG Rating Activities
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-slate-300 md:text-lg">
              ESG ratings are becoming an essential reference for investors, companies, and stakeholders. They help
              assess sustainability performance, exposure to ESG risks, and impact on people and the environment,
              supporting more reliable, comparable, and transparent sustainable finance decisions.
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-sky-500 px-8 text-white transition-colors hover:bg-sky-400"
              >
                <a href={ESG_RATING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  Learn more
                  <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
