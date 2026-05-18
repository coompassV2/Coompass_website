import { motion } from "framer-motion";
import { BarChart3, FileText, Settings2, Target, type LucideIcon } from "lucide-react";

type WhatWeDoFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  imageClassName?: string;
};

const FEATURES: WhatWeDoFeature[] = [
  {
    title: "Centralise all Your Initiatives",
    description:
      "Bring volunteering, donations, partnerships and internal programs into one single platform with full visibility across your organisation.",
    icon: Target,
    image: "https://unsplash.com/photos/aEPGPO5ofz8/download?force=true&w=1200",
    imageAlt: "Wind turbines in a field",
    imageClassName: "scale-y-[1.34] scale-x-[1.78] object-[center_58%]",
  },
  {
    title: "Manage and Execute with Control",
    description:
      "Plan, launch and manage initiatives at scale, with the structure and tools your team needs to execute consistently.",
    icon: Settings2,
    image: "https://unsplash.com/photos/Lks7vei-eAg/download?force=true&w=1200",
    imageAlt: "Data dashboard on a laptop screen",
  },
  {
    title: "Track and Measure Real Impact",
    description:
      "Access real-time data on participation, outcomes and performance, turning activity into measurable results.",
    icon: BarChart3,
    image: "https://unsplash.com/photos/IrRbSND5EUc/download?force=true&w=1200",
    imageAlt: "Solar panels and clean energy landscape",
  },
  {
    title: "Report with Clarity and Confidence",
    description:
      "Generate structured reports that make it easy to communicate impact internally and externally, without manual work.",
    icon: FileText,
    image:
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Nature restoration and environmental monitoring",
  },
];

interface FeatureCardProps {
  feature: WhatWeDoFeature;
}

function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex h-full flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_24px_44px_-30px_rgba(15,23,42,0.35)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_44%,rgba(0,0,0,0)_100%)]"
      />
      <div className="px-6 pb-5 pt-6 md:px-7 md:pt-7">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0f5f4d]/25 bg-[#9bd9b3]/35">
          <Icon className="h-5 w-5 text-[#0f5f4d]" strokeWidth={1.5} />
        </div>
        <h3 className="text-[30px] font-light leading-[1.05] tracking-[-0.01em] text-[#174c43]">{feature.title}</h3>
        <p className="mt-4 text-sm font-light leading-relaxed text-[#174c43]/85">{feature.description}</p>
      </div>
      <div className="relative mt-auto h-[180px] w-full shrink-0 overflow-hidden border-t border-black/10">
        <img
          src={feature.image}
          alt={feature.imageAlt}
          className={`absolute inset-0 block h-full w-full object-cover object-center ${feature.imageClassName ?? ""}`}
          loading="lazy"
        />
      </div>
    </motion.article>
  );
}

export function WhatWeDoSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto mb-10 max-w-[700px] text-center md:mb-12">
          <p className="mb-3 text-sm font-light text-black/60">Our Work</p>
          <h2 className="text-4xl font-light leading-tight text-black md:text-5xl">What we do?</h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-black/70 md:text-base">
            Services designed to turn insight into action, with structure built for execution.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
