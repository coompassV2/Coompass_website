import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

const INVESTOPEDIA_URL = "https://www.investopedia.com/terms/c/corp-social-responsibility.asp";
const IBM_CSR_URL = "https://www.ibm.com/think/topics/corporate-social-responsibility";

const FRAMEWORK_STEPS = [
  { step: "01", title: "Program design", detail: "Goals, scope, and local priorities" },
  { step: "02", title: "Implementation", detail: "Partners, delivery, and coordination" },
  { step: "03", title: "Reporting", detail: "Benchmarks, disclosure, and review" },
];

function CsrAbstractVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none" aria-hidden>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(8,20,42,0.98)_0%,rgba(11,35,72,0.92)_100%)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <div
          className="border-b border-white/10 px-6 py-5 text-center md:px-8"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-400">CSR structure</p>
          <p className="mt-1 text-base font-medium text-white">Program framework</p>
        </div>

        <div className="divide-y divide-white/10 p-4 md:p-5">
          {FRAMEWORK_STEPS.map((item) => (
            <div key={item.step} className="grid grid-cols-[3rem_1fr] items-center gap-4 py-4 first:pt-0 last:pb-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-500/10 text-xs font-semibold text-sky-200">
                {item.step}
              </span>
              <div className="min-w-0 text-left">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="mt-0.5 text-xs font-light leading-relaxed text-slate-400">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CompaniesCsrResourcesSection() {
  return (
    <Reveal
      as="section"
      className="bg-[linear-gradient(120deg,#0b1a3a_0%,#123268_38%,#051a2c_100%)] py-20 lg:py-28"
      aria-labelledby="companies-csr-resources-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-1">
            <CsrAbstractVisual />
          </div>

          <div className="order-2">
            <h2
              id="companies-csr-resources-heading"
              className="text-3xl font-light leading-tight tracking-[-0.02em] text-white md:text-4xl lg:text-[2.5rem]"
            >
              Explore CSR Program Design and Benchmarks
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-slate-300 md:text-lg">
              Explore how structured CSR programs are designed and implemented in your local area. Review practical
              guidelines and industry benchmarks through trusted global resources such as Investopedia&apos;s Corporate
              Social Responsibility Overview and IBM&apos;s Thought Leadership on CSR.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-sky-500 px-8 text-white transition-colors hover:bg-sky-400"
              >
                <a href={INVESTOPEDIA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  Read Investopedia Overview
                  <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-transparent px-8 text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                <a href={IBM_CSR_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  Read IBM CSR Insights
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
