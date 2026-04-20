
import { LucideIcon } from "lucide-react";

interface BentoItem {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  bgColorClass: string;
  textColorClass: string;
  colSpan?: number;
}

interface BentoGridSectionProps {
  title: string;
  items: BentoItem[];
}

export function BentoGridSection({ title, items }: BentoGridSectionProps) {
  return (
    <section className="my-12">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${item.bgColorClass} rounded-2xl p-6 ${
              item.colSpan ? `md:col-span-${item.colSpan}` : ''
            } hover:shadow-md transition-all flex flex-col`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`${item.bgColorClass.replace('from-', '').replace('-50 to-', '-500/10')} p-2 rounded-lg`}>
                <item.icon className={`h-6 w-6 ${item.textColorClass}`} />
              </div>
              <h3 className={`font-semibold ${item.textColorClass.replace('600', '900')}`}>{item.title}</h3>
            </div>
            <p className={`text-sm ${item.textColorClass.replace('600', '700')} mb-4 flex-grow`}>
              {item.description}
            </p>
            <div className="mt-auto">
              <span className={`text-xs ${item.textColorClass} font-semibold ${item.bgColorClass.replace('from-', 'bg-').replace(' to-' + item.bgColorClass.split(' to-')[1], '')} py-1 px-2 rounded-full`}>
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
