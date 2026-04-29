import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompareFeaturesProps {
  selectedPersona: 'volunteer' | 'company' | 'nonprofit';
}

export function CompareFeatures({ selectedPersona }: CompareFeaturesProps) {
  const features = [
    {
      category: "Core Features",
      items: [
        {
          feature: "Impact Tracking",
          volunteer: { free: true, member: true },
          nonprofit: { free: true, pro: true, enterprise: true },
          company: { starter: true, professional: true, enterprise: true }
        },
        {
          feature: "Blockchain Verification",
          volunteer: { free: true, member: true },
          nonprofit: { free: true, pro: true, enterprise: true },
          company: { starter: true, professional: true, enterprise: true }
        },
        {
          feature: "Digital Certificates",
          volunteer: { free: "Limited", member: "Unlimited" },
          nonprofit: { free: "Basic", pro: "Advanced", enterprise: "Custom" },
          company: { starter: "Basic", professional: "Advanced", enterprise: "Custom" }
        }
      ]
    },
    {
      category: "Volunteer Features",
      items: [
        {
          feature: "Mission Matching",
          volunteer: { free: "Basic", member: "Advanced" },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: "N/A" },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        },
        {
          feature: "Skills Development",
          volunteer: { free: false, member: true },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: "N/A" },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        },
        {
          feature: "International Opportunities",
          volunteer: { free: false, member: true },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: "N/A" },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        }
      ]
    },
    {
      category: "Nonprofit Features",
      items: [
        {
          feature: "Volunteer Management",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: "Basic", pro: "Advanced", enterprise: "Full Suite" },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        },
        {
          feature: "Mission Creation",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: "5 active", pro: "Unlimited", enterprise: "Unlimited" },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        },
        {
          feature: "Donation Tracking",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: false, pro: true, enterprise: true },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        }
      ]
    },
    {
      category: "Service Provider Features",
      items: [
        {
          feature: "Client Matching",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: "N/A" },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        },
        {
          feature: "Project Management",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: "N/A" },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        },
        {
          feature: "Payment Processing",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: "N/A" },
          company: { starter: "N/A", professional: "N/A", enterprise: "N/A" }
        }
      ]
    },
    {
      category: "Company Features",
      items: [
        {
          feature: "ESG Reporting",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: "N/A" },
          company: { starter: "Basic", professional: "Advanced", enterprise: "Full Suite" }
        },
        {
          feature: "Employee Engagement",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: "N/A" },
          company: { starter: "Basic", professional: "Advanced", enterprise: "Full Suite" }
        },
        {
          feature: "Custom Branding",
          volunteer: { free: "N/A", member: "N/A" },
          nonprofit: { free: "N/A", pro: "N/A", enterprise: true },
          company: { starter: false, professional: true, enterprise: true }
        }
      ]
    },
    {
      category: "Support & Analytics",
      items: [
        {
          feature: "Email Support",
          volunteer: { free: false, member: true },
          nonprofit: { free: false, pro: true, enterprise: true },
          company: { starter: true, professional: true, enterprise: true }
        },
        {
          feature: "Phone Support",
          volunteer: { free: false, member: false },
          nonprofit: { free: false, pro: false, enterprise: true },
          company: { starter: false, professional: false, enterprise: true }
        },
        {
          feature: "Advanced Analytics",
          volunteer: { free: false, member: false },
          nonprofit: { free: false, pro: false, enterprise: true },
          company: { starter: false, professional: true, enterprise: true }
        }
      ]
    }
  ];

  // Filter features to show only relevant categories for the selected persona
  const getRelevantCategories = () => {
    const allCategories = features;
    
    if (selectedPersona === 'volunteer') {
      return allCategories.filter(cat => 
        cat.category === "Core Features" || 
        cat.category === "Volunteer Features" || 
        cat.category === "Support & Analytics"
      );
    } else if (selectedPersona === 'nonprofit') {
      return allCategories.filter(cat => 
        cat.category === "Core Features" || 
        cat.category === "Nonprofit Features" || 
        cat.category === "Support & Analytics"
      );
    } else if (selectedPersona === 'company') {
      return allCategories.filter(cat => 
        cat.category === "Core Features" || 
        cat.category === "Company Features" || 
        cat.category === "Support & Analytics"
      );
    }
    
    return allCategories;
  };

  const relevantCategories = getRelevantCategories();

  // Get plan names for the selected persona
  const getPlanNames = () => {
    switch (selectedPersona) {
      case 'volunteer':
        return [
          { name: 'Free', key: 'free', color: 'text-green-500' },
          { name: 'Member', key: 'member', color: 'text-purple-500' }
        ];
      case 'nonprofit':
        return [
          { name: 'Free', key: 'free', color: 'text-green-500' },
          { name: 'Pro', key: 'pro', color: 'text-blue-500' },
          { name: 'Enterprise', key: 'enterprise', color: 'text-purple-500' }
        ];
      case 'company':
        return [
          { name: 'Starter', key: 'starter', color: 'text-green-500' },
          { name: 'Professional', key: 'professional', color: 'text-blue-500' },
          { name: 'Enterprise', key: 'enterprise', color: 'text-purple-500' }
        ];
      default:
        return [];
    }
  };

  const planNames = getPlanNames();

  const renderValue = (value: boolean | string | undefined) => {
    if (value === true) {
      return <Check className="h-4 w-4 text-green-500" />;
    }
    if (value === false) {
      return <X className="h-4 w-4 text-red-500" />;
    }
    if (value === "N/A") {
      return <span className="text-gray-500 text-xs">N/A</span>;
    }
    return <span className="text-xs text-gray-300">{value}</span>;
  };

  return (
    <div className="container mx-auto py-16 px-4 max-w-7xl">
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Feature Comparison</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Compare features across all plans to find the perfect fit for your impact goals.
          </p>
        </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-4 font-semibold text-white align-middle">Features</th>
              {planNames.map((plan, index) => (
                <th
                  key={index}
                  className="text-center py-4 px-4 font-semibold text-white align-middle"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className={plan.color}>{plan.name}</span>
                    <span className="text-xs text-gray-400">
                      {selectedPersona === 'volunteer' && 'Volunteer'}
                      {selectedPersona === 'nonprofit' && 'Nonprofit'}
                      {selectedPersona === 'company' && 'Company'}
                  </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {relevantCategories.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="border-b border-gray-800">
                  <td colSpan={planNames.length + 1} className="py-3 px-4 align-middle">
                    <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                  </td>
                </tr>
                {category.items.map((item, itemIndex) => (
                  <tr key={itemIndex} className="border-b border-gray-700 hover:bg-gray-800/30">
                    <td className="py-4 px-4 font-medium text-white align-middle">{item.feature}</td>
                    {planNames.map((plan, planIndex) => (
                      <td
                        key={planIndex}
                        className="text-center py-4 px-4 align-middle"
                      >
                        <div className="flex items-center justify-center h-full min-h-[24px]">
                          {renderValue(item[selectedPersona as keyof typeof item]?.[plan.key as keyof typeof item[typeof selectedPersona]])}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2 text-white">Need a Custom Plan?</h3>
          <p className="text-gray-300 mb-4">
            Contact us for enterprise solutions and custom integrations.
          </p>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium"
            onClick={() => window.location.href = "mailto:hello@coompass.org"}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
