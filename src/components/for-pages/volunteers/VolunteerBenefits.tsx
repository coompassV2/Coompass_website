
import { Users, Award, BadgeCheck, Briefcase } from "lucide-react";
import { BenefitCard } from "../BenefitCard";

export function VolunteerBenefits() {
  const benefits = [
    {
      icon: Users,
      title: "Community Connection",
      description: "Join a network of like-minded professionals committed to creating positive social impact through their skills and expertise.",
      bgColor: "purple"
    },
    {
      icon: Award,
      title: "Professional Development",
      description: "Enhance your resume and develop new skills through meaningful volunteer experiences with nonprofits and social enterprises.",
      bgColor: "blue"
    },
    {
      icon: BadgeCheck,
      title: "Impact Recognition",
      description: "Receive digital certificates and badges that verify your contributions and can be shared on professional platforms.",
      bgColor: "green"
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Discover potential career paths in the impact sector by engaging with organizations aligned with your values.",
      bgColor: "amber"
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
