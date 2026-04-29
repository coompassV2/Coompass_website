
import { HowItWorksSection } from "../HowItWorksSection";

export function CompanyHowItWorks() {
  const steps = [
    { text: "Set up your company profile and ESG goals" },
    { text: "Connect with verified nonprofits and service providers" },
    { text: "Create missions aligned with your company values" },
    { text: "Enable employees to participate based on their skills and interests" },
    { text: "Track impact through our transparent blockchain-based system" },
    { text: "Generate comprehensive reports for stakeholders and regulatory compliance" }
  ];

  return (
    <HowItWorksSection 
      title="How It Works"
      description="Our platform streamlines the process of creating, managing, and tracking corporate volunteering and donation initiatives:"
      steps={steps}
    />
  );
}
