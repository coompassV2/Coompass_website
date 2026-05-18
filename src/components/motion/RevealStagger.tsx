import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { defaultViewport, fadeUp, staggerContainer } from "@/lib/motion-presets";

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  immediate?: boolean;
};

export function RevealStagger({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.05,
  once = true,
  amount = defaultViewport.amount,
  immediate = false,
}: RevealStaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once, amount, margin: defaultViewport.margin } })}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <motion.div className={cn(className)} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
