
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface KPICardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  description: string;
  colorClass: string;
  bgColorClass: string;
  textColorClass: string;
  delay?: number;
  colSpan?: number;
  className?: string;
}

export function KPICard({ 
  icon, 
  title, 
  value, 
  description, 
  colorClass, 
  bgColorClass, 
  textColorClass,
  delay = 0,
  colSpan = 1,
  className
}: KPICardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={cn(
        `bg-gradient-to-br ${bgColorClass} rounded-xl p-4 transition-all duration-500 transform shrink-0 border border-white/10 shadow-sm`,
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(`p-2 rounded-lg ${colorClass}`)}>
          {icon}
        </div>
        <div>
          <h3 className={`text-base font-semibold ${textColorClass.replace('600', '900')}`}>{title}</h3>
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold ${textColorClass}`}>{value}</span>
          </div>
          <p className={`text-xs ${textColorClass.replace('600', '700')} mt-0.5 line-clamp-2`}>{description}</p>
        </div>
      </div>
    </div>
  );
}
