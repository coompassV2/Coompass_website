import { 
  UsersRound, 
  Building, 
  Award, 
  HeartPulse 
} from "lucide-react";
import { KPICardProps } from "../KPICard";

export const networkKPIs: KPICardProps[] = [
  {
    icon: <UsersRound className="h-6 w-6 text-sky-600" />,
    title: "Active Volunteers",
    value: "3,000+",
    description: "Passionate volunteers engaged across projects",
    colorClass: "bg-sky-500/10",
    bgColorClass: "from-sky-50 to-sky-100",
    textColorClass: "text-sky-600",
    delay: 50,
    colSpan: 2
  },
  {
    icon: <Building className="h-6 w-6 text-slate-600" />,
    title: "Partner Nonprofits",
    value: "150+",
    description: "Verified nonprofit organizations on our platform",
    colorClass: "bg-slate-500/10",
    bgColorClass: "from-slate-50 to-slate-100",
    textColorClass: "text-slate-600",
    delay: 75
  },
  {
    icon: <Award className="h-6 w-6 text-violet-600" />,
    title: "Corporate Partners",
    value: "5+",
    description: "Businesses committed to community impact",
    colorClass: "bg-violet-500/10",
    bgColorClass: "from-violet-50 to-violet-100",
    textColorClass: "text-violet-600",
    delay: 100
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-pink-600" />,
    title: "Lives Impacted",
    value: "500+",
    description: "Beneficiaries reached through our initiatives",
    colorClass: "bg-pink-500/10",
    bgColorClass: "from-pink-50 to-pink-100",
    textColorClass: "text-pink-600",
    delay: 125,
    colSpan: 2
  }
];
