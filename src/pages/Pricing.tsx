import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";

type CtaLabel = "Get Started" | "Subscribe" | "Request";
type SegmentToggle = "Volunteers" | "Nonprofits" | "Companies";

type PricingPlan = {
  name: string;
  price: string;
  billing: string;
  description: string;
  cta: CtaLabel;
  features: string[];
};

type PricingSegment = {
  title: "Volunteers" | "Nonprofits" | "Companies";
  plans: PricingPlan[];
};

const ctaRoutes: Record<CtaLabel, string> = {
  "Get Started": "/register",
  Subscribe: "https://buy.stripe.com/00w4gzaYs9Q60Jmc4s1Nu04",
  Request: "https://calendly.com/hello-coompass/sessao-coompass",
};

const nonprofitSubscribeUrl = "https://buy.stripe.com/cNiaEX7Mg6DU3Vyc4s1Nu05";

const pricingSegments: PricingSegment[] = [
  {
    title: "Volunteers",
    plans: [
      {
        name: "Basic",
        price: "0€",
        billing: "Free",
        description: "Access volunteer opportunities and get involved in social impact.",
        cta: "Get Started",
        features: [
          "Browse volunteer opportunities",
          "Apply to missions",
        ],
      },
      {
        name: "Coompass Member",
        price: "5,99€",
        billing: "/month",
        description: "Unlock your full impact journey.",
        cta: "Subscribe",
        features: [
          "Engagement tracking",
          "Activity history",
          "Impact certificate",
          "Vote on causes",
          "Donations",
          "Access to international volunteering",
        ],
      },
    ],
  },
  {
    title: "Nonprofits",
    plans: [
      {
        name: "Basic",
        price: "0€",
        billing: "Free",
        description: "Start sharing opportunities and engaging volunteers.",
        cta: "Get Started",
        features: [
          "Post volunteer opportunities",
          "Engage with volunteers",
        ],
      },
      {
        name: "Pro Plan",
        price: "29,99€",
        billing: "/month",
        description: "Manage and showcase your organization's impact.",
        cta: "Subscribe",
        features: [
          "Impact tracking",
          "Volunteer management",
          "AI-powered impact tools",
          "Impact reports",
        ],
      },
    ],
  },
  {
    title: "Companies",
    plans: [
      {
        name: "Basic",
        price: "Starting at 250€",
        billing: "/month",
        description: "Engage employees and track your company's social impact.",
        cta: "Request",
        features: [
          "Employee engagement stats",
          "Company impact reports",
          "Activity log",
          "Nonprofit partnerships",
          "Access to nonprofit community",
        ],
      },
      {
        name: "Custom Solution",
        price: "Custom",
        billing: "",
        description: "Fully tailored solution for large organizations.",
        cta: "Request",
        features: [
          "Everything in Basic",
          "Custom integrations",
          "Advanced reporting",
          "Dedicated onboarding & support",
        ],
      },
    ],
  },
];

const segmentLabelClasses =
  "rounded-full px-5 py-2 text-sm font-light tracking-[0.01em] transition-colors";

export default function Pricing() {
  const [selectedSegment, setSelectedSegment] = useState<SegmentToggle>("Volunteers");

  const pageData = {
    name: "Coompass Pricing",
    description:
      "Simple pricing for volunteers, nonprofits, and companies creating measurable social impact.",
    url: "https://coompass.org/pricing",
  };
  const selectedPlans =
    pricingSegments.find((segment) => segment.title === selectedSegment)?.plans ?? [];
  const getPlanCtaRoute = (plan: PricingPlan): string => {
    if (plan.cta === "Subscribe" && selectedSegment === "Nonprofits") {
      return nonprofitSubscribeUrl;
    }
    return ctaRoutes[plan.cta];
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOManager
        title="Pricing"
        description="Simple pricing for volunteers, nonprofits, and companies creating measurable social impact."
        canonicalUrl="/pricing"
      />
      <StructuredData type="WebPage" data={pageData} />

      <Header />

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(115deg,#0b1a3a_0%,#123268_48%,#9bd9b3_100%)] pb-14 pt-28">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-4 sm:px-6 lg:px-12">
            <section className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-light leading-[1.02] tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
                Simple Plans. No Complexity.
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base font-light leading-relaxed text-slate-300 md:text-lg">
                Choose the plan that fits your impact
              </p>
            </section>

            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/80 p-1">
                <button
                  type="button"
                  className={cn(
                    segmentLabelClasses,
                    selectedSegment === "Volunteers"
                      ? "bg-white text-slate-900"
                      : "text-slate-300 hover:text-white"
                  )}
                  onClick={() => setSelectedSegment("Volunteers")}
                >
                  Individuals
                </button>
                <button
                  type="button"
                  className={cn(
                    segmentLabelClasses,
                    selectedSegment === "Nonprofits"
                      ? "bg-white text-slate-900"
                      : "text-slate-300 hover:text-white"
                  )}
                  onClick={() => setSelectedSegment("Nonprofits")}
                >
                  Nonprofits
                </button>
                <button
                  type="button"
                  className={cn(
                    segmentLabelClasses,
                    selectedSegment === "Companies"
                      ? "bg-white text-slate-900"
                      : "text-slate-300 hover:text-white"
                  )}
                  onClick={() => setSelectedSegment("Companies")}
                >
                  Companies
                </button>
              </div>
            </div>
            {selectedSegment !== "Companies" ? (
              <div className="mt-3 flex justify-center">
                <span className="inline-flex rounded-full border border-slate-600 bg-slate-900/70 px-4 py-1 text-xs font-light tracking-[0.01em] text-slate-200">
                  14-day money-back guarantee.
                </span>
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSegment}
                className="mt-8 grid gap-6 md:grid-cols-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {selectedPlans.map((plan, index) => {
                  const isFreePlan = plan.cta === "Get Started";
                  const isCompanySegment = selectedSegment === "Companies";
                  return (
                    <motion.div
                      key={`${selectedSegment}-${plan.name}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: index * 0.05, ease: "easeOut" }}
                    >
                      <Card
                        className={cn(
                          "flex h-full flex-col rounded-2xl border p-6",
                          isFreePlan
                            ? "border-slate-700 bg-slate-900/75 text-white"
                            : "border-cyan-400/40 bg-slate-900 text-white shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_16px_40px_-24px_rgba(34,211,238,0.65)]",
                          isCompanySegment &&
                            "border-cyan-300/70 shadow-[0_0_0_1px_rgba(125,211,252,0.5),0_0_30px_-10px_rgba(56,189,248,0.8),0_18px_45px_-24px_rgba(34,211,238,0.75)]",
                          (plan.name === "Coompass Member" || plan.name === "Pro Plan") &&
                            "border-cyan-300/70 shadow-[0_0_0_1px_rgba(125,211,252,0.5),0_0_30px_-10px_rgba(56,189,248,0.8),0_18px_45px_-24px_rgba(34,211,238,0.75)]"
                        )}
                      >
                        <div>
                          <h2 className="text-xl font-semibold tracking-[-0.01em]">{plan.name}</h2>
                          <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span
                              className={cn(
                                "font-semibold tracking-[-0.01em]",
                                isCompanySegment ? "text-2xl" : "text-3xl",
                                !isFreePlan && "text-yellow-200"
                              )}
                            >
                              {plan.price}
                            </span>
                            {plan.billing ? (
                              <span className={cn("text-sm font-light tracking-[0.01em] text-slate-300", !isFreePlan && "text-yellow-100")}>
                                {plan.billing}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-3 text-sm font-light leading-relaxed text-slate-300">{plan.description}</p>
                        </div>

                        <ul className="mt-6 grow space-y-3 text-sm font-light text-slate-100">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          asChild
                          size="lg"
                          className={cn(
                            "mt-6 w-full rounded-full",
                            isFreePlan
                              ? "bg-slate-200 text-slate-900 hover:bg-white"
                              : plan.cta === "Subscribe" || plan.cta === "Request"
                                ? "bg-sky-500 text-white hover:bg-sky-600"
                                : "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
                          )}
                        >
                          <Link to={getPlanCtaRoute(plan)}>{plan.cta}</Link>
                        </Button>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
