
import { cn } from "@/lib/utils";
import { Building2, Users, Heart, Briefcase } from "lucide-react";
import { PersonaType } from "@/utils/personaLabels";

interface PersonaCardProps {
  type: PersonaType;
  isSelected: boolean;
  onClick: (type: PersonaType) => void;
  title?: string;
  description?: string;
}

const personaConfig = {
  company: {
    title: "Company",
    icon: Building2,
    description: "For businesses engaging employees in ESG initiatives to drive impact and reporting."
  },
  organization: {
    title: "Organization",
    icon: Users,
    description: "For nonprofits and social projects looking for resources and corporate partnerships to scale their mission."
  },
  volunteer: {
    title: "Volunteer",
    icon: Heart,
    description: "For individuals looking to contribute, support causes, and earn rewards."
  },
  stakeholder: {
    title: "Stakeholder",
    icon: Building2,
    description: "For external partners viewing ESG performance and impact progress."
  }
};

export function PersonaCard({ type, isSelected, onClick, title, description }: PersonaCardProps) {
  const config = personaConfig[type];
  const Icon = config.icon;

  return (
    <div
      onClick={() => onClick(type)}
      className={cn(
        "bg-white/10 border border-white/20 p-6 cursor-pointer transition-all duration-300 backdrop-blur-sm",
        "flex flex-col items-center justify-center gap-4 rounded-xl",
        "hover:bg-white/30 hover:border-white/40 hover:scale-105 group",
        isSelected && "bg-white/30 border-white/40"
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </span>
        <h3 className="text-lg font-semibold text-white m-0">{title || config.title}</h3>
      </div>
      <p className="text-sm text-white/90 text-center">
        {description || config.description}
      </p>
    </div>
  );
}
