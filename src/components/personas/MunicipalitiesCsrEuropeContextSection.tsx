import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";

const CSR_EUROPE_MANIFESTO_URL =
  "https://www.csreurope.org/action-over-ambition-delivering-on-a-just-industrial-transition-for-a-sustainable-europe-2030";

export function MunicipalitiesCsrEuropeContextSection() {
  return (
    <Reveal
      as="section"
      className="bg-[linear-gradient(120deg,#0b1a3a_0%,#123268_38%,#051a2c_100%)] py-16 lg:py-20"
      aria-labelledby="municipalities-csr-europe-context-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12">
        <article className="mx-auto max-w-3xl text-center md:text-left">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-400">
            European CSR context
          </p>
          <h2
            id="municipalities-csr-europe-context-heading"
            className="mt-4 text-2xl font-light leading-tight tracking-[-0.02em] text-white md:text-3xl"
          >
            From ambition to action
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-slate-300 md:text-[1.0625rem] md:leading-relaxed">
            CSR Europe&apos;s Business Manifesto 2024–2029 calls for a just industrial transition built on
            collaboration, meaningful disclosure, inclusive prosperity, and stronger links between business, society,
            and sustainability.
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-slate-300/95 md:text-base">
            Coompass helps municipalities respond to this shift by turning social responsibility, sustainability, and
            community programs into structured, measurable, and reportable action. Local governments can move beyond
            isolated initiatives and build a practical operating system for local impact.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between md:items-start">
            <a
              href={CSR_EUROPE_MANIFESTO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 underline-offset-4 transition hover:text-sky-200 hover:underline"
            >
              Read CSR Europe&apos;s Manifesto
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
            </a>
            <p className="max-w-xs text-center text-[0.6875rem] font-light leading-relaxed text-slate-400 sm:text-right md:text-left">
              External reference only. Not a partnership or endorsement.
            </p>
          </div>
        </article>
      </div>
    </Reveal>
  );
}
