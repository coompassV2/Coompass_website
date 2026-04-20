
import { Network, BarChart, Briefcase, Users } from "lucide-react";
import { BenefitCard } from "../BenefitCard";

export function ProviderBenefits() {
  const benefits = [
    {
      icon: Network,
      title: "Access to Clients",
      description: "Connect with companies and nonprofits actively seeking expertise in sustainability, social impact, and ESG compliance.",
      bgColor: "teal"
    },
    {
      icon: BarChart,
      title: "Verified Credentials",
      description: "Showcase your expertise and track record through our blockchain-based verification system, building trust with potential clients.",
      bgColor: "blue"
    },
    {
      icon: Briefcase,
      title: "Project Opportunities",
      description: "Find projects that match your specific expertise, from sustainability consulting to impact measurement and reporting.",
      bgColor: "orange"
    },
    {
      icon: Users,
      title: "Collaborative Network",
      description: "Join a community of like-minded professionals and organizations committed to driving positive social and environmental impact.",
      bgColor: "purple"
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
