
import { ReactNode } from "react";

interface BenefitsSectionProps {
  title: string;
  children: ReactNode;
}

export function BenefitsSection({ title, children }: BenefitsSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {children}
      </div>
    </section>
  );
}
