import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  BarChart4, 
  Brain, 
  Bot, 
  Coins, 
  Receipt, 
  Globe2, 
  Award, 
  Users 
} from "lucide-react";

const features = [
  {
    icon: BarChart4,
    title: "ESG Reporting & Impact Metrics",
    description: "Automatically generate reports that align with ESG standards, offering insights on volunteer efforts and donations, helping you meet your sustainability goals."
  },
  {
    icon: Brain,
    title: "AI-Powered Volunteering",
    description: "Our AI-powered system automatically matches employee skills with the specific needs of social organizations, ensuring maximum impact through strategic volunteer engagement."
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Our AI Agents—combining AI Mission Builder and Sustainability AI Assistant—help you design and implement impactful volunteer missions while providing actionable sustainability insights."
  },
  {
    icon: Coins,
    title: "Donations",
    description: "Support causes through simple, secure donations. Coompass accepts both traditional and crypto donations, making it easy for companies and individuals to contribute."
  },
  {
    icon: Receipt,
    title: "Tax Optimization",
    description: "Our platform automatically tracks donations and generates detailed tax reports, so you can maximize your eligible tax deductions while contributing to the causes you care about."
  },
  {
    icon: Globe2,
    title: "Pool of Impact Programs",
    description: "Connect your team with a global pool of impact programs from environmental projects to inclusion and diversity programs or philanthropic tasks."
  },
  {
    icon: Award,
    title: "Recognition and Reward",
    description: "Be recognized for your dedication! Coompass rewards you with a straightforward incentive system when you complete ESG initiatives on the platform."
  },
  {
    icon: Users,
    title: "Full Collaborative Workspace",
    description: "Our platform integrates a collaborative workspace for easy interaction between organizations and companies, enabling effective coordination and engagement."
  }
];

export function FeaturesOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div id="features-overview" className="relative z-10 bg-white/95 py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Features Overview</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Discover how our comprehensive platform empowers organizations to achieve their sustainability goals and create lasting social impact.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Icon className="h-5 w-5 text-green-600" />
                  </motion.div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
