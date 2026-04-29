
import { BentoGridSection } from "../BentoGridSection";
import { 
  Handshake,
  BarChart4,
  Users,
  Heart,
  MessageSquare,
  FileText,
  CheckCircle,
  Calendar,
  Globe,
  TrendingUp
} from "lucide-react";

/**
 * Each grid item revised: language and claims strictly match visible dashboard functionality.
 */
export function NonprofitBentoGrid() {
  const bentoItems = [
    {
      icon: Handshake,
      title: "Partnerships",
      description: "Track and update partnerships with companies supporting your nonprofit.",
      badge: "Manage connections",
      bgColorClass: "from-green-50 to-green-100",
      textColorClass: "text-green-600",
      colSpan: 2
    },
    {
      icon: BarChart4,
      title: "Impact Overview",
      description: "See summaries of recent activities, new donations, and volunteer involvement.",
      badge: "Dashboard summary",
      bgColorClass: "from-blue-50 to-blue-100",
      textColorClass: "text-blue-600"
    },
    {
      icon: Users,
      title: "Volunteer Directory",
      description: "Browse all currently enrolled volunteers and view their missions or hours.",
      badge: "Active volunteers",
      bgColorClass: "from-purple-50 to-purple-100",
      textColorClass: "text-purple-600"
    },
    {
      icon: Heart,
      title: "Mission Showcase",
      description: "Show your purpose, live missions, and achievements—visible to partners.",
      badge: "Profile display",
      bgColorClass: "from-amber-50 to-amber-100",
      textColorClass: "text-amber-600",
      colSpan: 2
    },
    {
      icon: MessageSquare,
      title: "Team Messaging",
      description: "Send direct updates to active team members or partner contacts.",
      badge: "Internal comms",
      bgColorClass: "from-indigo-50 to-indigo-100",
      textColorClass: "text-indigo-600",
      colSpan: 2
    },
    {
      icon: FileText,
      title: "Document Center",
      description: "Store downloadable reports, funding documents, or records for projects.",
      badge: "Document storage",
      bgColorClass: "from-rose-50 to-rose-100",
      textColorClass: "text-rose-600"
    },
    {
      icon: CheckCircle,
      title: "Project Tracking",
      description: "List each project and track basic milestones such as launch dates.",
      badge: "Current projects",
      bgColorClass: "from-teal-50 to-teal-100",
      textColorClass: "text-teal-600"
    },
    {
      icon: Calendar,
      title: "Events & Calendar",
      description: "Keep deadlines and important activities organized for your whole team.",
      badge: "Shared calendar",
      bgColorClass: "from-cyan-50 to-cyan-100",
      textColorClass: "text-cyan-600"
    },
    {
      icon: Globe,
      title: "Cause Profile",
      description: "Highlight your nonprofit’s cause and SDG priorities for supporters.",
      badge: "Public profile",
      bgColorClass: "from-emerald-50 to-emerald-100",
      textColorClass: "text-emerald-600"
    },
    {
      icon: TrendingUp,
      title: "Growth Metrics",
      description: "Track participation, donations, and hours—no exaggerated KPIs.",
      badge: "Live activity",
      bgColorClass: "from-fuchsia-50 to-fuchsia-100",
      textColorClass: "text-fuchsia-600",
      colSpan: 3
    }
  ];

  return (
    <BentoGridSection 
      title="Your Coompass Nonprofit Dashboard"
      items={bentoItems}
    />
  );
}
