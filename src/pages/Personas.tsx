import { Building2, Landmark, LineChart, Users, type LucideIcon } from "lucide-react";
import { Header } from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEOManager } from "@/components/shared/SEOManager";

type PersonaSection = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  offers: string[];
};

const meetingUrl = "https://calendly.com/hello-coompass/sessao-coompass";

const personaSections: PersonaSection[] = [
  {
    title: "Companies",
    subtitle: "Centralize CSR execution, employee engagement and impact reporting in one platform.",
    icon: Building2,
    offers: [
      "Plan and run volunteering and social initiatives with clear ownership and timelines.",
      "Track participation, mission completion and impact KPIs in real time.",
      "Generate structured social impact evidence for ESG and stakeholder reporting.",
    ],
  },
  {
    title: "Nonprofits and Institutions",
    subtitle: "Run programs with less manual coordination and stronger operational visibility.",
    icon: Users,
    offers: [
      "Coordinate volunteers, partnerships and initiatives from a single workspace.",
      "Organize beneficiary needs, activity records and field updates in a traceable flow.",
      "Share outcomes with partners using clear progress and impact data.",
    ],
  },
  {
    title: "Municipalities",
    subtitle: "Coordinate local impact programs across departments, territories and partners.",
    icon: Landmark,
    offers: [
      "Map local priorities and connect them with active nonprofit and company initiatives.",
      "Monitor municipal programs with standardized indicators and execution status.",
      "Improve transparency with consistent reports for internal teams and the community.",
    ],
  },
  {
    title: "Investors and Stakeholders",
    subtitle: "Access objective and structured insight into social sustainability performance.",
    icon: LineChart,
    offers: [
      "Track social impact progress across supported organizations and programs.",
      "Evaluate consistency and evolution of reported outcomes over time.",
      "Use comparable evidence to support funding, governance and partnership decisions.",
    ],
  },
];

export default function Personas() {
  return (
    <div className="min-h-screen bg-white">
      <SEOManager
        title="Who Coompass Serves"
        description="Discover how Coompass supports companies, nonprofits, municipalities and stakeholders with structured social impact management."
        canonicalUrl="/personas"
      />
      <Header />
      <main>
        <section className="bg-[linear-gradient(115deg,#0b1a3a_0%,#123268_48%,#9bd9b3_100%)] py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl px-8 text-center lg:px-12">
            <p className="text-sm font-light tracking-[0.12em] text-white/80">Who We Serve</p>
            <h1 className="mt-4 text-4xl font-light leading-tight tracking-[-0.02em] text-white md:text-5xl">
              A dedicated Coompass path for each impact persona
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-relaxed text-slate-100 md:text-lg">
              Coompass offers focused workflows for companies, nonprofits and institutions, municipalities, investors and stakeholders.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12">
            <div className="grid gap-5 md:grid-cols-2">
              {personaSections.map((persona) => {
                const Icon = persona.icon;
                return (
                  <Card
                    key={persona.title}
                    className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_22px_45px_-32px_rgba(15,23,42,0.38)]"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf8ef]">
                      <Icon className="h-5 w-5 text-[#0f5f4d]" />
                    </div>
                    <h2 className="mt-4 text-2xl font-medium text-[#174c43]">{persona.title}</h2>
                    <p className="mt-2 text-sm font-light leading-relaxed text-slate-700">{persona.subtitle}</p>
                    <ul className="mt-5 space-y-2">
                      {persona.offers.map((offer) => (
                        <li key={offer} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                          {offer}
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#0b1a3a] py-16 lg:py-20">
          <div className="mx-auto w-full max-w-5xl px-8 text-center lg:px-12">
            <h2 className="text-3xl font-light leading-tight tracking-[-0.02em] text-white md:text-4xl">
              Need a walkthrough for your organization type?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base font-light leading-relaxed text-slate-200">
              Book a session to see the Coompass workflow aligned with your priorities and reporting needs.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600">
                <a href={meetingUrl} target="_blank" rel="noopener noreferrer">
                  Schedule a meeting
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
