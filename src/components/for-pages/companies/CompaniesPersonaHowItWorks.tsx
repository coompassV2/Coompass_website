import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/hello-coompass/sessao-coompass";

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
    <section className="border-t border-slate-200/80 bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-8 lg:px-12">
        <h2 className="text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">How It Works</h2>
        <p className="mt-4 max-w-3xl text-base font-light leading-relaxed text-slate-600 md:text-lg">
          Our platform streamlines the process of creating, managing, and tracking corporate volunteering and donation
          initiatives:
        </p>
        <ol className="mt-10 max-w-3xl space-y-5">
          {STEPS.map((text, index) => (
            <li key={text} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#07263f] text-sm font-medium text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-base font-light leading-relaxed text-slate-700">{text}</span>
            </li>
          ))}
        </ol>

        <Card className="mt-12 max-w-3xl rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <h3 className="text-xl font-medium tracking-tight text-[#111827] md:text-2xl">Need a custom solution?</h3>
          <p className="mt-3 text-base font-light leading-relaxed text-slate-600">
            For organizations with specific requirements, we can design a tailored solution aligned with your goals,
            workflows, and impact strategy.
          </p>
          <div className="mt-6">
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
      </div>
    </section>
  );
}
