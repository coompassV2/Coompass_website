
import { HowItWorksSection } from "../HowItWorksSection";

export function VolunteerHowItWorks() {
  const steps = [
    { text: "Create your volunteer profile highlighting your skills and interests" },
    { text: "Browse opportunities matched to your profile and preferences" },
    { text: "Apply for missions that align with your values and availability" },
    { text: "Complete impactful volunteer work with nonprofits and social enterprises" },
    { text: "Track your contributions and impact through our platform" },
    { text: "Receive certificates and recognition for your volunteer efforts" }
  ];

  return (
    <HowItWorksSection 
      title="How It Works"
      description="Our platform makes it easy to find and engage in meaningful volunteer opportunities:"
      steps={steps}
    />
  );
}
