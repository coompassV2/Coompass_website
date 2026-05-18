import type { ReactNode } from "react";
import { Reveal, RevealStagger } from "@/components/motion";

interface BenefitsSectionProps {
  title: string;
  children: ReactNode;
}

export function BenefitsSection({ title, children }: BenefitsSectionProps) {
  return (
    <Reveal as="section" className="mb-8">
      <Reveal>
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      </Reveal>
      <RevealStagger className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.1}>
        {children}
      </RevealStagger>
    </Reveal>
  );
}
