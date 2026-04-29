
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  speed?: number;
  initiallyVisible?: boolean;
}

export function Marquee({
  children,
  direction = "left",
  pauseOnHover = false,
  className,
  speed = 50,
  initiallyVisible = false,
  ...props
}: MarqueeProps) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;
    
    const scrollContainer = scrollerRef.current;
    const scrollContent = Array.from(scrollContainer.children);

    if (scrollContent.length <= 0) return;

    // Clone more items to ensure we always have enough visible items
    for (let i = 0; i < 5; i++) {
      scrollContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollContainer.appendChild(duplicatedItem);
      });
    }

    return () => {
      // Clean up cloned nodes when component unmounts
      while (scrollContainer.childElementCount > scrollContent.length) {
        scrollContainer.removeChild(scrollContainer.lastChild!);
      }
    };
  }, [children]);

  // Calculate duration based on speed (higher number = slower animation)
  const duration = Math.max(30, 180 - speed);

  return (
    <div
      ref={containerRef}
      className={cn("flex w-full overflow-hidden space-y-0", className)}
      onMouseEnter={() => pauseOnHover && setIsHovering(true)}
      onMouseLeave={() => pauseOnHover && setIsHovering(false)}
      {...props}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-0.5 py-1",
          direction === "right" ? "animate-marquee-right" : "animate-marquee-left",
          initiallyVisible ? "opacity-100" : undefined
        )}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: isHovering ? "paused" : "running",
          animationDelay: initiallyVisible ? "0s" : undefined
        }}
      >
        {children}
      </div>
    </div>
  );
}
