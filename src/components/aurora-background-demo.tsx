
"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface AuroraBackgroundDemoProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function AuroraBackgroundDemo({ title, subtitle, children }: AuroraBackgroundDemoProps) {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 py-16 text-center"
      >
        {title && <h1 className="text-4xl font-bold text-white">{title}</h1>}
        {subtitle && <p className="text-xl text-white/80 max-w-2xl">{subtitle}</p>}
        {children}
      </motion.div>
    </AuroraBackground>
  );
}
