
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// UN Sustainable Development Goals
const sdgGoals = [
  { 
    id: 1, 
    name: "No Poverty", 
    color: "bg-red-600",
    description: "End poverty in all its forms everywhere"
  },
  { 
    id: 2, 
    name: "Zero Hunger", 
    color: "bg-yellow-600",
    description: "End hunger, achieve food security and improved nutrition"
  },
  { 
    id: 3, 
    name: "Good Health and Well-being", 
    color: "bg-green-600",
    description: "Ensure healthy lives and promote well-being for all at all ages"
  },
  { 
    id: 4, 
    name: "Quality Education", 
    color: "bg-red-700",
    description: "Ensure inclusive and equitable quality education"
  },
  { 
    id: 5, 
    name: "Gender Equality", 
    color: "bg-orange-600",
    description: "Achieve gender equality and empower all women and girls"
  },
  { 
    id: 6, 
    name: "Clean Water and Sanitation", 
    color: "bg-blue-600",
    description: "Ensure availability and sustainable management of water and sanitation"
  },
  { 
    id: 7, 
    name: "Affordable and Clean Energy", 
    color: "bg-yellow-500",
    description: "Ensure access to affordable, reliable, sustainable and modern energy"
  },
  { 
    id: 8, 
    name: "Decent Work and Economic Growth", 
    color: "bg-red-800",
    description: "Promote sustained, inclusive and sustainable economic growth"
  },
  { 
    id: 9, 
    name: "Industry, Innovation and Infrastructure", 
    color: "bg-orange-700",
    description: "Build resilient infrastructure and foster innovation"
  },
  { 
    id: 10, 
    name: "Reduced Inequalities", 
    color: "bg-pink-600",
    description: "Reduce inequality within and among countries"
  },
  { 
    id: 11, 
    name: "Sustainable Cities and Communities", 
    color: "bg-yellow-700",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable"
  },
  { 
    id: 12, 
    name: "Responsible Consumption and Production", 
    color: "bg-amber-800",
    description: "Ensure sustainable consumption and production patterns"
  },
  { 
    id: 13, 
    name: "Climate Action", 
    color: "bg-green-700",
    description: "Take urgent action to combat climate change and its impacts"
  },
  { 
    id: 14, 
    name: "Life Below Water", 
    color: "bg-blue-700",
    description: "Conserve and sustainably use the oceans, seas and marine resources"
  },
  { 
    id: 15, 
    name: "Life on Land", 
    color: "bg-lime-600",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems"
  },
  { 
    id: 16, 
    name: "Peace, Justice and Strong Institutions", 
    color: "bg-blue-800",
    description: "Promote peaceful and inclusive societies for sustainable development"
  },
  { 
    id: 17, 
    name: "Partnerships for the Goals", 
    color: "bg-indigo-600",
    description: "Strengthen the means of implementation and revitalize the global partnership"
  }
];

export function SDGAlignment() {
  const { t } = useTranslation();
  const [selectedGoals, setSelectedGoals] = useState<number[]>([1, 3, 4, 13]);
  
  const toggleGoal = (id: number) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(goalId => goalId !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };
  
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{t('SDG Alignment')}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t('Select the UN Sustainable Development Goals that you\'re most passionate about supporting.')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sdgGoals.map((goal) => (
          <Tooltip key={goal.id}>
            <TooltipTrigger asChild>
              <div 
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors hover:bg-muted ${
                  selectedGoals.includes(goal.id) ? 'bg-muted/70' : ''
                }`}
                onClick={() => toggleGoal(goal.id)}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-sm ${goal.color}`}>
                  {goal.id}
                </div>
                <span className="text-sm flex-1">{goal.name}</span>
                <Checkbox 
                  checked={selectedGoals.includes(goal.id)} 
                  onCheckedChange={() => toggleGoal(goal.id)} 
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="max-w-xs">{goal.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
