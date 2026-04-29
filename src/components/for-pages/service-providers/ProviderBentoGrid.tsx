
import { BentoGridSection } from "../BentoGridSection";
import { 
  Building,
  ScrollText,
  Wallet,
  Award,
  LineChart,
  Clock,
  MessageSquare,
  Target,
  Globe,
  BadgeCheck
} from "lucide-react";

export function ProviderBentoGrid() {
  const bentoItems = [
    {
      icon: Building,
      title: "Client Matching",
      description: "Our AI-powered algorithm connects you with organizations seeking your specific expertise, helping you find the perfect clients for your services.",
      badge: "85% match rate",
      bgColorClass: "from-teal-50 to-teal-100",
      textColorClass: "text-teal-600",
      colSpan: 2
    },
    {
      icon: ScrollText,
      title: "Credential Showcase",
      description: "Display your certifications, past projects, and expertise with blockchain verification that builds trust with potential clients.",
      badge: "Verified by blockchain",
      bgColorClass: "from-blue-50 to-blue-100",
      textColorClass: "text-blue-600"
    },
    {
      icon: Wallet,
      title: "Streamlined Payments",
      description: "Secure payment processing, milestone-based billing, and transparent fee structure to ensure you get paid on time, every time.",
      badge: "98% on-time payments",
      bgColorClass: "from-amber-50 to-amber-100",
      textColorClass: "text-amber-600"
    },
    {
      icon: Award,
      title: "Reputation Building",
      description: "Collect verified reviews and ratings from clients to build your professional reputation and attract more high-quality projects.",
      badge: "4.8/5 avg provider rating",
      bgColorClass: "from-purple-50 to-purple-100",
      textColorClass: "text-purple-600",
      colSpan: 2
    },
    {
      icon: LineChart,
      title: "Business Analytics",
      description: "Detailed analytics dashboard to track your performance, project outcomes, client satisfaction, and business growth over time.",
      badge: "Data-driven insights",
      bgColorClass: "from-green-50 to-green-100",
      textColorClass: "text-green-600",
      colSpan: 2
    },
    {
      icon: Clock,
      title: "Project Management",
      description: "All-in-one tools to manage your projects, track milestones, and collaborate with clients in real-time.",
      badge: "30% time saved",
      bgColorClass: "from-rose-50 to-rose-100",
      textColorClass: "text-rose-600"
    },
    {
      icon: MessageSquare,
      title: "Client Communication",
      description: "Secure messaging, file sharing, and collaboration tools built right into the platform for seamless client interactions.",
      badge: "Centralized communication",
      bgColorClass: "from-indigo-50 to-indigo-100",
      textColorClass: "text-indigo-600"
    },
    {
      icon: Target,
      title: "Service Optimization",
      description: "Gain insights on which of your services are most in-demand and how to optimize your offerings for better client satisfaction.",
      badge: "Service refinement",
      bgColorClass: "from-cyan-50 to-cyan-100",
      textColorClass: "text-cyan-600"
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Access projects and clients from around the world, expanding your business beyond geographical constraints.",
      badge: "40+ countries",
      bgColorClass: "from-fuchsia-50 to-fuchsia-100",
      textColorClass: "text-fuchsia-600"
    },
    {
      icon: BadgeCheck,
      title: "Impact Portfolio",
      description: "Build a comprehensive portfolio that showcases your social and environmental impact, enabling you to attract clients who share your values and vision for a better world. Demonstrate the tangible results of your services with impact metrics and success stories.",
      badge: "Prove your impact",
      bgColorClass: "from-emerald-50 to-emerald-100",
      textColorClass: "text-emerald-600",
      colSpan: 3
    }
  ];

  return (
    <BentoGridSection 
      title="A Complete Platform for Service Providers"
      items={bentoItems}
    />
  );
}
