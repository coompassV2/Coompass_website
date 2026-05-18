import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getABTestVariant, trackABTestEvent } from '@/utils/abTesting';

// Video URLs for A/B testing
const heroVideos = {
  A: "https://videos.pexels.com/video-files/7056594/7056594-uhd_2732_1318_30fps.mp4",
  B: "https://videos.pexels.com/video-files/7517692/7517692-uhd_2560_1440_25fps.mp4",
  C: "https://videos.pexels.com/video-files/4770929/4770929-uhd_2560_1440_24fps.mp4",
  E: "https://videos.pexels.com/video-files/6893741/6893741-uhd_3840_2160_25fps.mp4",
};

export function Hero() {
  // Generate random video selection on every component render
  const variants = ['A', 'B', 'C', 'E'];
  const randomVariant = variants[Math.floor(Math.random() * variants.length)];
  const selectedVideo = heroVideos[randomVariant as keyof typeof heroVideos];

  useEffect(() => {
    // Track the video view
    trackABTestEvent('heroVideo', randomVariant, 'view');
  }, [randomVariant]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
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

  const headlineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative flex min-h-full w-full flex-col overflow-hidden">
      {/* Video Background with overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover"
        >
          <source src={selectedVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>
      
      {/* Main Content Area - left-aligned, vertically centered */}
      <motion.div 
        className="relative z-20 mt-20 flex flex-1 items-end justify-start px-4 pb-8 sm:mt-24 sm:px-6 lg:pb-12 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl w-full">
          {/* Headline */}
          <motion.h1 
            className="mb-6 text-3xl font-light leading-tight sm:mb-8 sm:text-4xl md:text-5xl md:leading-none lg:text-6xl xl:text-7xl"
            variants={headlineVariants}
          >
            <motion.span 
              className="block text-white mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              Your Company’s Impact, Finally Connected. Fully Structured.
            </motion.span>
          </motion.h1>
          
          {/* Paragraph */}
          <motion.p 
            className="lg:max-w-3xl text-white font-normal text-lg leading-relaxed"
            variants={textVariants}
          >
            Connect your company with the social economy, mobilize your people, track every initiative, and report your impact with the same rigor you apply to financial performance.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            variants={textVariants}
          >
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/70 bg-black/25 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/40"
            >
              Open App
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Custom Solution
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
