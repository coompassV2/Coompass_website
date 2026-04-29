import { 
  Users, 
  GraduationCap, 
  Handshake,
  HeartHandshake,
  Briefcase,
  Shield,
  Leaf,  // Add Leaf icon for Environmental Initiatives
  CheckCircle,
  Clock,
  Target,
  DollarSign,
  BarChart3,
  Globe
} from "lucide-react";
import { KPICardProps } from "../KPICard";

export const socialKPIs: KPICardProps[] = [
  {
    icon: <GraduationCap className="h-6 w-6 text-indigo-600" />,
    title: "Skills Development",
    value: "100+",
    description: "Employees upskilled through ESG programs",
    colorClass: "bg-indigo-500/10",
    bgColorClass: "from-indigo-50 to-indigo-100",
    textColorClass: "text-indigo-600",
    delay: 150
  },
  {
    icon: <Briefcase className="h-6 w-6 text-rose-600" />,
    title: "Service Provider Network",
    value: "10+",
    description: "Specialized sustainability service providers",
    colorClass: "bg-rose-500/10",
    bgColorClass: "from-rose-50 to-rose-100",
    textColorClass: "text-rose-600",
    delay: 175
  },
  {
    icon: <Shield className="h-6 w-6 text-amber-600" />,
    title: "Governance Transparency",
    value: "100%",
    description: "Blockchain-verified impact reporting",
    colorClass: "bg-amber-500/10",
    bgColorClass: "from-amber-50 to-amber-100",
    textColorClass: "text-amber-600",
    delay: 200
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-green-600" />,
    title: "Projects Completed",
    value: "50+",
    description: "Successful projects delivered by our ecosystem",
    colorClass: "bg-green-500/10",
    bgColorClass: "from-green-50 to-green-100",
    textColorClass: "text-green-600",
    delay: 75
  },
  {
    icon: <Clock className="h-6 w-6 text-purple-600" />,
    title: "Volunteer Hours",
    value: "200+",
    description: "Total hours contributed by volunteers",
    colorClass: "bg-purple-500/10",
    bgColorClass: "from-purple-50 to-purple-100",
    textColorClass: "text-purple-600",
    delay: 100
  },
  {
    icon: <Target className="h-6 w-6 text-amber-600" />,
    title: "Focused Areas",
    value: "10+",
    description: "Key impact areas: Education, Environment, Health, Community",
    colorClass: "bg-amber-500/10",
    bgColorClass: "from-amber-50 to-amber-100",
    textColorClass: "text-amber-600",
    delay: 125
  },
  {
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    title: "Environmental Initiatives",
    value: "100+",
    description: "Active environmental missions across our platform",
    colorClass: "bg-green-500/10",
    bgColorClass: "from-green-50 to-green-100",
    textColorClass: "text-green-600",
    delay: 250
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-pink-600" />,
    title: "Volunteer Retention Rate",
    value: "82%",
    description: "Percentage of volunteers who return for more than one project",
    colorClass: "bg-pink-500/10",
    bgColorClass: "from-pink-50 to-pink-100",
    textColorClass: "text-pink-600",
    delay: 175
  },
  {
    icon: <Handshake className="h-6 w-6 text-cyan-600" />,
    title: "Projects in Progress",
    value: "17",
    description: "Active projects currently underway across our ecosystem",
    colorClass: "bg-cyan-500/10",
    bgColorClass: "from-cyan-50 to-cyan-100",
    textColorClass: "text-cyan-600",
    delay: 200
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: "Comprehensive Metrics",
    value: "50+",
    description: "ESG, social impact, and performance KPIs tracked",
    colorClass: "bg-blue-500/10",
    bgColorClass: "from-blue-50 to-blue-100",
    textColorClass: "text-blue-600",
    delay: 50
  },
  {
    icon: <Globe className="h-6 w-6 text-cyan-600" />,
    title: "SDG Alignment",
    value: "14/17",
    description: "UN Sustainable Development Goals actively supported",
    colorClass: "bg-cyan-500/10",
    bgColorClass: "from-cyan-50 to-cyan-100",
    textColorClass: "text-cyan-600",
    delay: 50
  }
];
