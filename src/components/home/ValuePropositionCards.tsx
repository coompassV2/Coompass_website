import { useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Shield, 
  Zap, 
  BarChart3, 
  Handshake,
  Leaf,
  Star,
  CheckCircle,
  Lightbulb,
  Building2,
  Sparkles,
  Network,
  BadgeCheck
} from "lucide-react";
import { getABTestVariant, trackABTestEvent } from '@/utils/abTesting';
import { valuePropositionTest } from '@/config/abTests';

export function ValuePropositionCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Generate random variant selection on every component render
  const variants = ['A', 'B', 'C', 'D', 'E', 'F'];
  const variant = variants[Math.floor(Math.random() * variants.length)];

  useEffect(() => {
    trackABTestEvent(valuePropositionTest.testName, variant, 'view');
  }, [variant]);

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

  const cardHoverVariants = {
    hover: {
      scale: 1.03,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Variant A: Original ESG-focused cards
  const renderVariantA = () => (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-green-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <TrendingUp className="h-8 w-8 text-green-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">ESG Ratings</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Improve your sustainability scores and enhance your corporate reputation</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-blue-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <FileText className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">ESG Reporting</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Streamlined compliance and automated reporting for better transparency</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-orange-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Clock className="h-8 w-8 text-orange-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Time Savings</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Automated matching and management reduce admin time by 80%</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-purple-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Users className="h-8 w-8 text-purple-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Employee Engagement</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Boost team satisfaction and retention through meaningful volunteer opportunities</p>
        </div>
      </motion.div>
    </motion.div>
  );

  // Variant B: Impact and Community focus
  const renderVariantB = () => (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-emerald-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Target className="h-8 w-8 text-emerald-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Impact Measurement</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Track and measure your social impact with real-time analytics and comprehensive reporting</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-indigo-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Globe className="h-8 w-8 text-indigo-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Community Building</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Connect with nonprofits and volunteers to build lasting partnerships and meaningful relationships</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-amber-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Award className="h-8 w-8 text-amber-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Recognition & Rewards</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Recognize and reward volunteers with certificates, badges, and meaningful incentives</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-rose-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <BarChart3 className="h-8 w-8 text-rose-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Data Analytics</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Gain insights from comprehensive reports and visualizations showing your impact</p>
        </div>
      </motion.div>
    </motion.div>
  );

  // Variant C: Technology and Innovation focus
  const renderVariantC = () => (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-cyan-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="h-8 w-8 text-cyan-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">AI-Powered Matching</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Smart algorithms connect skills with needs for maximum impact and efficiency</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-green-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Shield className="h-8 w-8 text-green-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Blockchain Security</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Tamper-proof verification ensures transparency and trust in your impact reporting</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-purple-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="h-8 w-8 text-purple-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Automation</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Streamlined processes reduce administrative overhead and maximize your impact</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-orange-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Network className="h-8 w-8 text-orange-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Global Network</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Access a worldwide network of verified nonprofits and service providers</p>
        </div>
      </motion.div>
    </motion.div>
  );

  // Variant D: Business and ROI focus
  const renderVariantD = () => (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-blue-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Building2 className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Corporate Benefits</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Enhance brand reputation, attract talent, and meet stakeholder expectations</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-emerald-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">ROI Tracking</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Measure the return on your social investment with detailed impact metrics</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-amber-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Handshake className="h-8 w-8 text-amber-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Partnerships</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Build strategic partnerships with nonprofits and other organizations</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-rose-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="h-8 w-8 text-rose-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Compliance</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Meet regulatory requirements and industry standards for ESG reporting</p>
        </div>
      </motion.div>
    </motion.div>
  );

  // Variant E: Sustainability and Environment focus
  const renderVariantE = () => (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-green-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Leaf className="h-8 w-8 text-green-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Environmental Impact</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Drive environmental initiatives and track your sustainability progress</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-teal-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Target className="h-8 w-8 text-teal-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">SDG Alignment</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Align your initiatives with UN Sustainable Development Goals</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-blue-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Globe className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Climate Action</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Contribute to climate change mitigation and adaptation efforts</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-emerald-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Star className="h-8 w-8 text-emerald-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Green Leadership</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Position your organization as a leader in environmental stewardship</p>
        </div>
      </motion.div>
    </motion.div>
  );

  // Variant F: Social Impact and Community focus
  const renderVariantF = () => (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-pink-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className="h-8 w-8 text-pink-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Social Impact</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Create meaningful change in communities through targeted volunteer programs</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-indigo-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Users className="h-8 w-8 text-indigo-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Community Service</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Engage in local community service and support grassroots initiatives</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-amber-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <BadgeCheck className="h-8 w-8 text-amber-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Verified Impact</h3>
          <p className="text-gray-600 text-sm leading-relaxed">All impact is verified and transparent for maximum credibility</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="bg-purple-100 p-4 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Lightbulb className="h-8 w-8 text-purple-600" />
          </motion.div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">Innovation</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Leverage cutting-edge technology to solve social challenges</p>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'A':
        return renderVariantA();
      case 'B':
        return renderVariantB();
      case 'C':
        return renderVariantC();
      case 'D':
        return renderVariantD();
      case 'E':
        return renderVariantE();
      case 'F':
        return renderVariantF();
      default:
        return renderVariantA();
    }
  };

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Coompass?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your organization's social impact with our comprehensive platform
          </p>
        </motion.div>

        {renderVariant()}
      </div>
    </section>
  );
}
