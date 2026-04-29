
import { HowItWorksSection } from "../HowItWorksSection";

export function ProviderHowItWorks() {
  const steps = [
    { text: "Create your detailed service provider profile showcasing your expertise" },
    { text: "Specify your specialized services and areas of focus" },
    { text: "Get discovered by companies and nonprofits seeking your skills" },
    { text: "Collaborate on projects through our secure platform" },
    { text: "Build your reputation with verified client reviews" },
    { text: "Expand your impact-focused business network" }
  ];

  return (
    <HowItWorksSection 
      title="How It Works"
      description="Our platform connects impact-focused service providers with organizations that need your expertise:"
      steps={steps}
    />
  );
}
