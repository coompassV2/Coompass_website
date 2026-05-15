import { Award, ExternalLink } from "lucide-react";

const ISEG_CSP_URL =
  "https://www.iseg.ulisboa.pt/sustentabilidade/en/sustainability-in-education/csp/";

/** Vertical testimonial banner for ISEG Civic Scholar Programme (official Coompass reference on ISEG site). */
export function IsegCspCoompassBanner() {
  return (
    <a
      href={ISEG_CSP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group/banner flex w-full flex-col gap-3 rounded-2xl border border-slate-200/95 bg-gradient-to-b from-white via-white to-slate-50/80 p-4 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] transition hover:border-sky-300/80 hover:shadow-[0_14px_36px_-14px_rgba(14,165,233,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
    >
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
        <Award className="h-3 w-3 shrink-0" aria-hidden />
        Live programme
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">ISEG Lisbon</span>
      <div className="flex items-center gap-3">
        <img
          src="/logos/trusted/iseg-symbol.png"
          alt=""
          className="h-10 w-auto shrink-0 object-contain object-left"
          loading="lazy"
          decoding="async"
        />
        <span className="min-w-0 flex-1 text-base font-medium leading-snug text-[#111827] md:text-lg">
          Civic Scholar Programme
        </span>
      </div>
      <span className="border-t border-slate-200/90 pt-3 text-xs font-light leading-relaxed text-slate-600">
        {`ISEG publicly describes Coompass as the technology platform supporting this civic engagement and recognition programme for Master's students.`}
      </span>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 transition group-hover/banner:text-sky-500">
        Programme details
        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
      </span>
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
