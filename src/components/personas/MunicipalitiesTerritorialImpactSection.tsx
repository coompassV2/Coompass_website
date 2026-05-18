import { useState } from "react";
import { BarChart3, Compass, Network, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

type TerritorialFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentClassName: string;
};

const FEATURES: TerritorialFeature[] = [
  {
    title: "Strategic philanthropy",
    description:
      "Design and manage social investment programs aligned with municipal priorities, local needs, and measurable outcomes.",
    icon: Compass,
    accentClassName: "from-[#0f5f4d]/20 via-[#0f5f4d]/8 to-transparent",
  },
  {
    title: "Local coordination",
    description:
      "Connect nonprofits, schools, companies, young volunteers, donations, and resources across the territory in one shared platform.",
    icon: Network,
    accentClassName: "from-[#174c43]/15 via-[#174c43]/6 to-transparent",
  },
  {
    title: "Impact intelligence",
    description:
      "Monitor initiatives, beneficiaries, stock, volunteering, and results with real-time information always available at your fingertips.",
    icon: BarChart3,
    accentClassName: "from-[#0f5f4d]/18 via-[#0f5f4d]/6 to-transparent",
  },
];

type TerritorialTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const TABS: TerritorialTab[] = [
  {
    id: "strategic-planning",
    label: "Strategic planning",
    title: "Strategic Social Responsibility Planning",
    description:
      "Turn scattered initiatives into a clear municipal impact strategy. Coompass helps municipalities map local priorities, define measurable goals, and align social responsibility actions with territorial needs.",
    imageSrc: "/covers/services-org-municipalities.png",
    imageAlt: "Municipal team reviewing social impact priorities",
  },
  {
    id: "coordination",
    label: "Coordination",
    title: "Stakeholder & Community Coordination",
    description:
      "Connect municipalities, nonprofits, schools, companies, residents, and volunteers in one shared platform. Coordinate projects, assign responsibilities, and activate the local ecosystem more efficiently.",
    imageSrc: "/covers/municipalities-coordination-dashboard.png",
    imageAlt: "Municipal staff reviewing community impact dashboard on a laptop",
  },
  {
    id: "environment",
    label: "Environment",
    title: "Environmental & Circular Economy Activation",
    description:
      "Launch and manage practical initiatives such as environmental volunteering, donation redistribution, stock management, reuse programs, and community awareness campaigns across the territory.",
    imageSrc: "/covers/impact-food-distribution.png",
    imageAlt: "Community environmental and donation redistribution program",
  },
  {
    id: "impact-reporting",
    label: "Impact reporting",
    title: "Impact Measurement & Public Reporting",
    description:
      "Track initiatives, volunteers, beneficiaries, partners, donations, and resources in real time. Generate clear dashboards and reports to support decision-making, transparency, and public communication.",
    imageSrc: "/covers/municipalities-impact-report.png",
    imageAlt: "Impact Report 2026 cover showing communities supported, local partners, and initiatives delivered",
  },
];

function FeatureCard({ feature }: { feature: TerritorialFeature }) {
  const Icon = feature.icon;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#174c43]/10",
        "bg-[#f8faf9] shadow-[0_18px_40px_-32px_rgba(15,23,42,0.28)]",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b",
          feature.accentClassName,
        )}
      />
      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex shrink-0 flex-col items-center gap-2">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#0f5f4d]/20 bg-white shadow-sm">
              <Icon className="h-5 w-5 text-[#0f5f4d]" strokeWidth={1.65} aria-hidden />
            </span>
            <span className="h-8 w-px bg-gradient-to-b from-[#0f5f4d]/50 to-transparent" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="text-xl font-medium leading-snug tracking-tight text-[#174c43] md:text-[1.35rem]">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-slate-600 md:text-[0.9375rem] md:leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function TerritorialCapabilitiesTabs() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id);
  const activeTab = TABS.find((tab) => tab.id === activeTabId) ?? TABS[0];

  return (
    <div className="mt-16 lg:mt-20">
      <div
        className="flex gap-0 overflow-x-auto border-b border-slate-200 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Territorial impact capabilities"
      >
        {TABS.map((tab, index) => {
          const isActive = tab.id === activeTabId;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`territorial-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`territorial-panel-${tab.id}`}
              onClick={() => setActiveTabId(tab.id)}
              className={cn(
                "relative min-w-[9.5rem] shrink-0 px-4 pb-3 text-sm font-medium transition-colors md:min-w-0 md:flex-1 md:px-6 md:text-base",
                index < TABS.length - 1 && "border-r border-slate-200",
                isActive ? "text-[#174c43]" : "text-slate-500 hover:text-slate-700",
              )}
            >
              {tab.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#34d399] transition-opacity md:inset-x-6",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        id={`territorial-panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`territorial-tab-${activeTab.id}`}
        className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
      >
        <div className="min-w-0">
          <h3 className="text-2xl font-medium leading-snug tracking-tight text-[#174c43] md:text-[1.75rem]">
            {activeTab.title}
          </h3>
          <p className="mt-4 text-base font-light leading-relaxed text-slate-600 md:text-lg">
            {activeTab.description}
          </p>
        </div>
        <div className="relative min-w-0">
          <div className="overflow-hidden rounded-2xl border border-[#174c43]/10 bg-[#f8faf9] shadow-[0_18px_40px_-32px_rgba(15,23,42,0.28)]">
            <img
              src={activeTab.imageSrc}
              alt={activeTab.imageAlt}
              className="aspect-[4/3] h-auto w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MunicipalitiesTerritorialImpactSection() {
  return (
    <Reveal as="section" className="bg-white py-16 lg:py-20" aria-labelledby="municipalities-territorial-impact-heading">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="municipalities-territorial-impact-heading"
            className="text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl"
          >
            Unlocking Public-Private Resources
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-slate-600 md:text-lg">
            Coompass helps municipalities design strategic philanthropy programs, coordinate social impact across the
            territory, activate local stakeholders, and measure impact with real-time information.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>

        <TerritorialCapabilitiesTabs />
      </div>
    </Reveal>
  );
}
