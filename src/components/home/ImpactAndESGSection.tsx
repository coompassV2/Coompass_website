import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KPICard } from "./KPICard";
import { networkKPIs } from "./kpi-data/network-kpis";
import { socialKPIs } from "./kpi-data/social-kpis";
import { governanceKPIs } from "./kpi-data/governance-kpis";

export function ImpactAndESGSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Only selected KPIs included
  const allKPIs = [
    ...networkKPIs,
    ...socialKPIs,
    ...governanceKPIs
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-12 relative z-10 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Real Impact & ESG Metrics</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All data shown below reflects real, up-to-date impact from our ecosystem.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {allKPIs.map((kpi, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <KPICard {...kpi} className="min-w-[220px]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
