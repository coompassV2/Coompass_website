import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    // Scroll to the top of the page after navigation
    window.scrollTo(0, 0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      y: -3,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section ref={ref}>
      <motion.div 
        className="bg-gradient-to-r from-blue-900 to-teal-900 text-white rounded-xl p-10 text-center relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.3 }
        }}
      >
        {/* Animated background elements - FIXED: Added pointer-events-none */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-semibold mb-3">Ready to make an impact?</h3>
          <p className="text-3xl font-bold mb-6">Find your place in the Coompass ecosystem</p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 relative z-10"
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={buttonHoverVariants}
            whileHover="hover"
          >
            <Button 
              className="bg-white text-blue-900 hover:bg-gray-100 shadow-lg"
              onClick={() => handleNavigation('/for-companies')}
            >
              For Companies
            </Button>
          </motion.div>
          
          <motion.div
            variants={buttonHoverVariants}
            whileHover="hover"
          >
            <Button 
              className="bg-white text-green-900 hover:bg-gray-100 shadow-lg"
              onClick={() => handleNavigation('/for-nonprofits')}
            >
              For Nonprofits
            </Button>
          </motion.div>
          
          <motion.div
            variants={buttonHoverVariants}
            whileHover="hover"
          >
            <Button 
              className="bg-white text-indigo-900 hover:bg-gray-100 shadow-lg"
              onClick={() => handleNavigation('/for-volunteers')}
            >
              For Volunteers
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
