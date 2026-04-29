
import { Handshake, Users, BadgeDollarSign, Lightbulb } from "lucide-react";
import { BenefitCard } from "../BenefitCard";

/**
 * Each benefit below now reflects a real dashboard section/feature.
 */
export function NonprofitBenefits() {
  const benefits = [
    {
      icon: Handshake,
      title: "Partnership Management",
      description:
        "Easily track which companies or organizations currently support your nonprofit in the Partnerships dashboard. Start, end, or view collaboration details with real organizations.",
      bgColor: "green"
    },
    {
      icon: Users,
      title: "Volunteer Directory",
      description:
        "Maintain a list of skilled and engaged volunteers. Onboard, contact, and organize volunteers linked to your actual projects—with hours, missions, and participation tracked.",
      bgColor: "purple"
    },
    {
      icon: BadgeDollarSign,
      title: "Donation Tracking",
      description:
        "See an up-to-date record of donations received, including amounts, supporter details, and your funding progress, directly from the Donations overview section.",
      bgColor: "blue"
    },
    {
      icon: Lightbulb,
      title: "Simple Project & Impact Reporting",
      description:
        "Create project reports and download simple activity summaries to share impact with funders, partners, and volunteers—generated from your real dashboard data.",
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
