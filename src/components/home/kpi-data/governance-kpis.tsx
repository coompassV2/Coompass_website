import { DollarSign } from "lucide-react";
import { KPICardProps } from "../KPICard";

export const governanceKPIs: KPICardProps[] = [
  {
    icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
    title: "Funding Secured",
    value: "—",
    description: "Will be revealed soon with our donations launch",
    colorClass: "bg-emerald-500/10",
    bgColorClass: "from-emerald-50 to-emerald-100",
    textColorClass: "text-emerald-600",
    delay: 150,
    className: "relative after:content-['Soon'] after:absolute after:top-2 after:right-2 after:bg-yellow-200 after:text-yellow-800 after:text-xs after:rounded after:px-2 after:py-0.5 after:font-semibold after:shadow"
  }
];
