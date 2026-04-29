import { KPICard } from "./KPICard";
import { networkKPIs, environmentalKPIs, socialKPIs, governanceKPIs } from "./kpi-data";
import { Marquee } from "@/components/ui/marquee";
export function ESGKPISection() {
  // Combine all KPIs and divide them into two rows
  const allKPIs = [...networkKPIs, ...environmentalKPIs, ...socialKPIs, ...governanceKPIs];
  const firstRow = allKPIs.slice(0, Math.ceil(allKPIs.length / 2));
  const secondRow = allKPIs.slice(Math.ceil(allKPIs.length / 2));
  return <section className="py-12 relative z-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">ESG Impact Metrics</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Measuring our collective impact across Environmental, Social, and Governance dimensions
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover speed={30} className="mb-1">
            {firstRow.map((kpi, index) => <KPICard key={`row1-${index}`} {...kpi} className="min-w-[280px] mx-0.5" />)}
          </Marquee>
          
          <Marquee pauseOnHover direction="right" speed={30} initiallyVisible>
            {secondRow.map((kpi, index) => <KPICard key={`row2-${index}`} {...kpi} className="min-w-[280px] mx-0.5" />)}
          </Marquee>
          
          {/* Narrower gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>;
}