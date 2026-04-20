
import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
}

export function BenefitCard({ icon: Icon, title, description, bgColor }: BenefitCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className={`bg-${bgColor}-50 p-3 rounded-full`}>
          <Icon className={`h-6 w-6 text-${bgColor}-500`} />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
}
