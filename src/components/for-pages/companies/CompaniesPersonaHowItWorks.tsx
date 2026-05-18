import { Reveal } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/hello-coompass/sessao-coompass";

const HOW_IT_WORKS_IMAGE = "/covers/companies-how-it-works-volunteering.png";

const STEPS = [
  "Set up your company profile and ESG goals",
  "Connect with verified nonprofits and service providers",
  "Create missions aligned with your company values",
  "Enable employees to participate based on their skills and interests",
  "Track impact through transparent activity records and verified participation",
  "Generate comprehensive reports for stakeholders and regulatory compliance",
] as const;

export function CompaniesPersonaHowItWorks() {
  return (
    <Reveal as="section" className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <Reveal>
        <h2 className="text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">How It Works</h2>
        <p className="mt-4 max-w-3xl text-base font-light leading-relaxed text-slate-600 md:text-lg">
          Our platform helps organizations structure, activate, and measure their social impact programs from strategy
          to reporting.
        </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,28rem)_1fr] xl:gap-16">
          <ol className="max-w-xl space-y-5 lg:max-w-none">
            {STEPS.map((text, index) => (
              <li key={text} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#07263f] text-sm font-medium text-white">
                  {index + 1}
                </span>
                <span className="pt-1 text-base font-light leading-relaxed text-slate-700">{text}</span>
              </li>
            ))}
          </ol>

          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-[28rem] xl:max-w-[32rem] lg:justify-self-end">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={HOW_IT_WORKS_IMAGE}
                alt="Volunteers packing donation boxes with impact metrics for volunteer hours, employees, and beneficiaries"
                className="aspect-square h-auto w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(1.25rem,14%,5rem)] bg-gradient-to-r from-white via-white/55 to-transparent lg:w-[clamp(1.5rem,18%,6rem)]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
        <Card className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 text-center shadow-sm backdrop-blur-sm md:p-8">
          <h3 className="text-xl font-medium tracking-tight text-[#111827] md:text-2xl">Need a custom solution?</h3>
          <p className="mt-3 text-base font-light leading-relaxed text-slate-600">
            For organizations with specific requirements, we can design a tailored solution aligned with your goals,
            workflows, and impact strategy.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600",
              )}
            >
              Talk to the team
            </a>
          </div>
        </Card>
        </Reveal>
      </div>
    </Reveal>
  );
}
