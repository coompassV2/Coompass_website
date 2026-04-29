
import { BentoGridSection } from "../BentoGridSection";
import { 
  Users, 
  BarChart4, 
  HandHeart, 
  Boxes, 
  Medal,
  BadgeCheck,
  Calendar,
  TrendingUp
} from "lucide-react";

export function CompanyBentoGrid() {
  const bentoItems = [
    {
      icon: Users,
      title: "Employee Engagement Hub",
      description: "Boost team morale and retention by enabling employees to participate in causes aligned with their values, skills, and interests.",
      badge: "75% higher employee satisfaction",
      bgColorClass: "from-blue-50 to-blue-100",
      textColorClass: "text-blue-600",
      colSpan: 2
    },
    {
      icon: BarChart4,
      title: "ESG Metrics",
      description: "Easily track and report on environmental, social, and governance metrics for compliance and stakeholders.",
      badge: "Real-time reporting",
      bgColorClass: "from-green-50 to-green-100",
      textColorClass: "text-green-600"
    },
    {
      icon: HandHeart,
      title: "Mission Builder",
      description: "Create custom volunteering missions aligned with your company values and the UN Sustainable Development Goals.",
      badge: "Customizable templates",
      bgColorClass: "from-amber-50 to-amber-100",
      textColorClass: "text-amber-600"
    },
    {
      icon: Boxes,
      title: "Partnership Ecosystem",
      description: "Access a curated network of verified nonprofits and service providers to create meaningful partnerships and initiatives that align with your company's mission.",
      badge: "1000+ verified partners worldwide",
      bgColorClass: "from-indigo-50 to-indigo-100",
      textColorClass: "text-indigo-600",
      colSpan: 2
    },
    {
      icon: Medal,
      title: "Recognition & Rewards",
      description: "Celebrate employee contributions with badges, certificates, and leaderboards that showcase individual and team impact across your organization.",
      badge: "Gamified engagement",
      bgColorClass: "from-purple-50 to-purple-100",
      textColorClass: "text-purple-600",
      colSpan: 2
    },
    {
      icon: BadgeCheck,
      title: "Impact Verification",
      description: "Blockchain-based verification ensures transparency and trust in your CSR reporting.",
      badge: "Tamper-proof records",
      bgColorClass: "from-rose-50 to-rose-100",
      textColorClass: "text-rose-600"
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Organize company-wide volunteering days and team-building activities with our intuitive scheduling tools.",
      badge: "Integrated calendar",
      bgColorClass: "from-teal-50 to-teal-100",
      textColorClass: "text-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Gain actionable insights from comprehensive reports and visualizations showing the impact of your CSR initiatives across regions, teams, and causes.",
      badge: "Custom reporting",
      bgColorClass: "from-cyan-50 to-cyan-100",
      textColorClass: "text-cyan-600",
      colSpan: 2
    }
  ];

  return (
    <BentoGridSection 
      title="Comprehensive Platform for Corporate Impact"
      items={bentoItems}
    />
  );
}
