
import { HowItWorksSection } from "../HowItWorksSection";

/**
 * Steps strictly match real onboarding & workflow visible in the demo dashboard.
 */
export function NonprofitHowItWorks() {
  const steps = [
    { text: "Sign up and create your organization’s public profile with your core mission and details." },
    { text: "Post new projects or missions, listing your current needs for volunteers or partnerships." },
    { text: "Respond to companies or volunteers who message or apply to help with your missions." },
    { text: "Use the dashboard to track volunteer involvement, manage partners, and update your organization’s status." },
    { text: "Download basic reports to share activity updates and demonstrate your impact with supporters." }
  ];

  return (
    <HowItWorksSection 
      title="How It Works"
      description="See exactly how your nonprofit can use Coompass today—each step matches the real dashboard:"
      steps={steps}
    />
  );
}
