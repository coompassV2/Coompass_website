
import { Building2, BarChart4, Globe2, Award } from "lucide-react";
import { BenefitCard } from "../BenefitCard";

export function CompanyBenefits() {
  const benefits = [
    {
      icon: Building2,
      title: "ESG Compliance",
      description: "Simplify reporting and ensure compliance with evolving ESG standards through transparent blockchain-based verification.",
      bgColor: "blue"
    },
    {
      icon: BarChart4,
      title: "Impact Tracking",
      description: "Measure and showcase your company's social impact with real-time analytics and comprehensive dashboards.",
      bgColor: "green"
    },
    {
      icon: Globe2,
      title: "Community Engagement",
      description: "Connect with pre-vetted nonprofits and service providers to create meaningful partnerships and initiatives.",
      bgColor: "purple"
    },
    {
      icon: Award,
      title: "Employee Engagement",
      description: "Boost morale and retention by empowering employees to participate in causes aligned with their values and skills.",
      bgColor: "orange"
    }
  ];

  return (
    <>
      {benefits.map((benefit, index) => (
        <BenefitCard 
          key={index}
          icon={benefit.icon}
          title={benefit.title}
          description={benefit.description}
          bgColor={benefit.bgColor}
        />
      ))}
    </>
  );
}
