import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function TrustedCompanies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredPartners = useMemo(() => [
    {
      id: "grupo-brisa",
      name: "Grupo Brisa",
      logo: "https://grupobrisa.pt/media/tsoo3anu/logo_grupo-brisa_sem-assinatura_pt_horizontal_rgb-01.png"
    }
  ], []);

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

  const titleVariants = {
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

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
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

  const logoHoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.h3 
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Trusted by Businesses and Nonprofits worldwide
        </motion.h3>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredPartners.map((partner, index) => (
            <motion.div 
              key={partner.id} 
              className="flex items-center justify-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              variants={logoVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.div 
                className="relative w-28 h-20 flex items-center justify-center"
                variants={logoHoverVariants}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-w-full max-h-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${partner.id}`;
                  }}
                />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
