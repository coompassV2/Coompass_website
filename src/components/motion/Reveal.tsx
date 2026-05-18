import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { defaultViewport, easeOut, motionVariantMap, type MotionVariantName } from "@/lib/motion-presets";

type RevealElement = "motion.div" | "section" | "article" | "header" | "footer" | "main" | "aside" | "li";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: RevealElement;
  variant?: MotionVariantName;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  /** Use for above-the-fold hero content (animates on mount, not scroll). */
  immediate?: boolean;
} & Omit<HTMLMotionProps<"motion.div">, "children" | "initial" | "animate" | "whileInView" | "variants" | "viewport">;

const motionComponents = {
  "motion.div": motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  aside: motion.aside,
  li: motion.li,
} as const;

export function Reveal({
  children,
  className,
  as = "motion.div",
  variant = "fadeUp",
  delay = 0,
  duration = 0.65,
  once = true,
  amount = defaultViewport.amount,
  immediate = false,
  ...rest
}: RevealProps) {
  const Component = motionComponents[as];
  const base = motionVariantMap[variant];
  const hidden = base.hidden;
  const visibleBase = typeof base.visible === "object" ? base.visible : { opacity: 1 };

  const variants = {
    hidden,
    visible: {
      ...visibleBase,
      transition: { duration, ease: easeOut, delay },
    },
  };

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once, amount, margin: defaultViewport.margin } })}
      {...rest}
    >
      {children}
    </Component>
  );
}
