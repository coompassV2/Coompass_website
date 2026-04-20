import { useState } from "react";
import { PricingCard } from "./PricingCard";
import { RocketIcon, Users2, Building, Briefcase, Heart, UsersRound } from "lucide-react";

type Persona = "volunteer" | "nonprofit" | "company";

interface PricingSectionProps {
  selectedPersona: 'volunteer' | 'company' | 'nonprofit';
  onPersonaChange: (persona: 'volunteer' | 'company' | 'nonprofit') => void;
}

export function PricingSection({ selectedPersona, onPersonaChange }: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const currentPersona = selectedPersona as Persona;

  // Competitive pricing with free tiers for all personas
  const prices = {
    // Volunteer Plans
    free: { monthly: 0, annual: 0 },
    member: { monthly: 4.99, annual: 47.90 }, // 20% off for annual
    
    // Nonprofit Plans
    nonprofitFree: { monthly: 0, annual: 0 },
    nonprofitPro: { monthly: 49, annual: 470 },
    nonprofitEnterprise: { monthly: 149, annual: 1430 },
    
    // Company Plans
    companyStarter: { monthly: 99, annual: 950 },
    companyProfessional: { monthly: 199, annual: 1910 },
    companyEnterprise: { monthly: 399, annual: 3830 },
  };

  // Calculate maximum annual savings for each persona
  const getMaxAnnualSavings = (persona: Persona): number => {
    switch (persona) {
      case 'volunteer':
        // Member plan: (4.99 * 12) - 47.90 = 59.88 - 47.90 = 11.98
        return Math.round((prices.member.monthly * 12) - prices.member.annual);
      case 'nonprofit':
        // Max savings from Enterprise: (149 * 12) - 1430 = 1788 - 1430 = 358
        return Math.max(
          (prices.nonprofitPro.monthly * 12) - prices.nonprofitPro.annual,
          (prices.nonprofitEnterprise.monthly * 12) - prices.nonprofitEnterprise.annual
        );
      case 'company':
        // Max savings from Enterprise: (399 * 12) - 3830 = 4788 - 3830 = 958
        return Math.max(
          (prices.companyStarter.monthly * 12) - prices.companyStarter.annual,
          (prices.companyProfessional.monthly * 12) - prices.companyProfessional.annual,
          (prices.companyEnterprise.monthly * 12) - prices.companyEnterprise.annual
        );
      default:
        return 0;
    }
  };

  const personaConfig = {
    volunteer: {
      title: "For Volunteers",
      icon: <UsersRound className="h-4 w-4" />,
      plans: [
        {
          title: "Free",
          subtitle: "For Volunteers",
          icon: <UsersRound className="h-5 w-5 text-green-500" />,
          price: prices.free[billingPeriod],
          period: billingPeriod === "monthly" ? "forever" : "forever",
          features: [
            "Access to volunteer opportunities",
            "Personal dashboard & impact tracking",
            "Basic mission matching",
            "Volunteer hours logging",
            "Digital certificates (limited)",
            "Community access"
          ],
          buttonText: "Get Started Free",
          buttonVariant: "default" as const,
          popular: false
        },
        {
          title: "Member",
          subtitle: "For Volunteers",
          icon: <Users2 className="h-5 w-5 text-purple-500" />,
          price: prices.member[billingPeriod],
          period: billingPeriod === "monthly" ? "per month" : "per year",
          features: [
            "Everything in Free, plus:",
            "International volunteering opportunities",
            "Verified impact resume & certificates",
            "Skills development tracking",
            "Advanced community networking",
            "Launch personal initiatives",
            "Advanced mission matching",
            "Rewards & recognition system",
            "Priority support"
          ],
          buttonText: "Upgrade Now",
          buttonVariant: "accent" as const,
          popular: true
        }
      ]
    },
    nonprofit: {
      title: "For Nonprofits",
      icon: <Heart className="h-4 w-4" />,
      plans: [
        {
          title: "Free",
          subtitle: "For Nonprofits",
          icon: <Heart className="h-5 w-5 text-green-500" />,
          price: prices.nonprofitFree[billingPeriod],
          period: billingPeriod === "monthly" ? "forever" : "forever",
          features: [
            "Up to 10 volunteer seats",
            "Basic volunteer management",
            "Mission creation (5 active)",
            "Partnership directory access",
            "Basic impact tracking",
            "Community support"
          ],
          buttonText: "Start Free",
          buttonVariant: "default" as const,
          popular: false
        },
        {
          title: "Pro",
          subtitle: "For Nonprofits",
          icon: <Heart className="h-5 w-5 text-blue-500" />,
          price: prices.nonprofitPro[billingPeriod],
          period: billingPeriod === "monthly" ? "per month" : "per year",
          features: [
            "Up to 50 volunteer seats",
            "Advanced volunteer management",
            "Unlimited mission creation",
            "Partnership management tools",
            "Donation tracking system",
            "Impact reporting tools",
            "Recognition programs",
            "Priority matching",
            "Email support"
          ],
          buttonText: "Start Free Trial",
          buttonVariant: "default" as const,
          popular: true
        },
        {
          title: "Enterprise",
          subtitle: "For Nonprofits",
          icon: <Heart className="h-5 w-5 text-purple-500" />,
          price: prices.nonprofitEnterprise[billingPeriod],
          period: billingPeriod === "monthly" ? "per month" : "per year",
          features: [
            "Unlimited volunteer seats",
            "Advanced analytics dashboard",
            "Custom branding options",
            "API integrations",
            "Advanced reporting suite",
            "Dedicated account manager",
            "Custom training sessions",
            "Phone & email support"
          ],
          buttonText: "Contact Sales",
          buttonVariant: "default" as const,
          popular: false
        }
      ]
    },
    company: {
      title: "For Companies",
      icon: <Building className="h-4 w-4" />,
      plans: [
        {
          title: "Starter",
          subtitle: "For Small Companies",
          icon: <Building className="h-5 w-5 text-green-500" />,
          price: prices.companyStarter[billingPeriod],
          period: billingPeriod === "monthly" ? "per month" : "per year",
          features: [
            "Up to 100 employee seats",
            "Basic ESG reporting",
            "Volunteer management",
            "Partnership directory",
            "Basic analytics",
            "Email support"
          ],
          buttonText: "Start Free Trial",
          buttonVariant: "default" as const,
          popular: false
        },
        {
          title: "Professional",
          subtitle: "For Growing Companies",
          icon: <Building className="h-5 w-5 text-orange-500" />,
          price: prices.companyProfessional[billingPeriod],
          period: billingPeriod === "monthly" ? "per month" : "per year",
          features: [
            "Up to 500 employee seats",
            "Advanced ESG reporting",
            "Employee engagement analytics",
            "Mission builder tools",
            "Partnership ecosystem access",
            "Custom branding",
            "Priority support"
          ],
          buttonText: "Start Free Trial",
          buttonVariant: "default" as const,
          popular: true
        },
        {
          title: "Enterprise",
          subtitle: "For Large Organizations",
          icon: <Building className="h-5 w-5 text-purple-500" />,
          price: prices.companyEnterprise[billingPeriod],
          period: billingPeriod === "monthly" ? "per month" : "per year",
          features: [
            "Unlimited employee seats",
            "Full ESG compliance suite",
            "Advanced analytics & AI insights",
            "Custom integrations",
            "Dedicated success team",
            "Custom training & onboarding",
            "Phone & email support",
            "SLA guarantees"
          ],
          buttonText: "Contact Sales",
          buttonVariant: "default" as const,
          popular: false
        }
      ]
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 max-w-7xl text-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">Choose Your Coompass Plan</h1>
        <p className="text-base text-gray-300 max-w-3xl mx-auto">
          Start free and scale as you grow. All plans include our core impact tracking technology 
          and blockchain-verified reporting.
        </p>
      </div>

      {/* Persona and Billing Toggles */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        {/* Persona Selector */}
        <div className="bg-[#1D2335] rounded-full p-1 inline-flex items-center">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
              selectedPersona === "volunteer" ? "bg-[#232B42] text-white" : "text-gray-400"
            }`}
            onClick={() => onPersonaChange("volunteer")}
          >
            <span className="hidden sm:inline">Volunteers</span>
          </button>
          
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
              selectedPersona === "nonprofit" ? "bg-[#232B42] text-white" : "text-gray-400"
            }`}
            onClick={() => onPersonaChange("nonprofit")}
          >
            <span className="hidden sm:inline">Nonprofits</span>
          </button>
          
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
              selectedPersona === "company" ? "bg-[#232B42] text-white" : "text-gray-400"
            }`}
            onClick={() => onPersonaChange("company")}
          >
            <span className="hidden sm:inline">Companies</span>
          </button>
      </div>

      {/* Billing period toggle */}
        <div className="bg-[#1D2335] rounded-full p-1 inline-flex items-center">
          <button
            className={`px-6 py-2 rounded-full text-sm ${
              billingPeriod === "monthly" ? "bg-[#232B42] text-white" : "text-gray-400"
            }`}
            onClick={() => setBillingPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm flex items-center ${
              billingPeriod === "annual" ? "bg-[#232B42] text-white" : "text-gray-400"
            }`}
            onClick={() => setBillingPeriod("annual")}
          >
            Annual
            <span className="ml-2 bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Savings calculator */}
      {billingPeriod === "annual" && (
        <div className="text-center mb-6">
          <p className="text-green-400 text-sm">
            💰 Save up to €{getMaxAnnualSavings(currentPersona).toLocaleString()}/year with annual billing
          </p>
        </div>
      )}

      {/* Current Persona Plans */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">{personaConfig[currentPersona].title}</h2>
        <div className={`grid gap-6 ${
          personaConfig[currentPersona].plans.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : 
          personaConfig[currentPersona].plans.length === 3 ? "md:grid-cols-3" : "md:grid-cols-1"
        }`}>
          {personaConfig[currentPersona].plans.map((plan, index) => (
        <PricingCard
              key={index}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              buttonText={plan.buttonText}
              buttonVariant={plan.buttonVariant}
              buttonAction={() => window.location.href = plan.buttonText.includes("Contact") ? "/contact" : "/register"}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>

      {/* Free Trial Banner */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2 text-white">Start Free, Scale as You Grow</h3>
          <p className="text-gray-300 mb-4">
            All paid plans include a 14-day free trial. No credit card required to start.
          </p>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium"
            onClick={() => window.location.href = "/register"}
          >
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}
