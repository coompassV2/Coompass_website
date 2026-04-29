
import { BentoGridSection } from "../BentoGridSection";
import { 
  Search,
  BarChart4, 
  Award,
  Users,
  Globe,
  Calendar,
  Heart,
  BadgeCheck,
  BookOpen
} from "lucide-react";

export function VolunteerBentoGrid() {
  const bentoItems = [
    {
      icon: Search,
      title: "Personalized Opportunity Matching",
      description: "Our advanced algorithm matches you with volunteer opportunities that align with your skills, interests, and availability.",
      badge: "Smart matching technology",
      bgColorClass: "from-purple-50 to-purple-100",
      textColorClass: "text-purple-600",
      colSpan: 2
    },
    {
      icon: BarChart4,
      title: "Impact Dashboard",
      description: "Track your volunteering hours, skills utilized, and social impact metrics in one comprehensive personal dashboard.",
      badge: "Visual impact tracking",
      bgColorClass: "from-blue-50 to-blue-100",
      textColorClass: "text-blue-600"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Find opportunities that fit your schedule, whether you're looking for one-time events or recurring commitments.",
      badge: "Work-life balance",
      bgColorClass: "from-amber-50 to-amber-100",
      textColorClass: "text-amber-600"
    },
    {
      icon: Award,
      title: "Skills Development",
      description: "Enhance your professional toolkit by applying existing skills or learning new ones through guided volunteer experiences.",
      badge: "Career advancement",
      bgColorClass: "from-green-50 to-green-100",
      textColorClass: "text-green-600",
      colSpan: 2
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with other professionals who share your passion for social impact and build meaningful relationships.",
      badge: "5,000+ active volunteers",
      bgColorClass: "from-indigo-50 to-indigo-100",
      textColorClass: "text-indigo-600",
      colSpan: 2
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Contribute to causes around the world with remote volunteering opportunities that transcend geographical boundaries.",
      badge: "Cross-border impact",
      bgColorClass: "from-teal-50 to-teal-100",
      textColorClass: "text-teal-600"
    },
    {
      icon: BadgeCheck,
      title: "Verified Certificates",
      description: "Receive blockchain-verified certificates that document your contributions and can be shared on LinkedIn and other professional platforms.",
      badge: "Professional recognition",
      bgColorClass: "from-rose-50 to-rose-100",
      textColorClass: "text-rose-600",
      colSpan: 2
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access workshops, webinars, and learning materials to deepen your understanding of social impact and specific cause areas.",
      badge: "Continuous learning",
      bgColorClass: "from-emerald-50 to-emerald-100",
      textColorClass: "text-emerald-600"
    },
    {
      icon: Heart,
      title: "Personal Wellbeing",
      description: "Experience increased job satisfaction and personal fulfillment through meaningful contribution to causes you care about.",
      badge: "Purpose-driven engagement",
      bgColorClass: "from-cyan-50 to-cyan-100",
      textColorClass: "text-cyan-600",
      colSpan: 3
    }
  ];

  return (
    <BentoGridSection 
      title="Complete Platform for Volunteer Engagement"
      items={bentoItems}
    />
  );
}
