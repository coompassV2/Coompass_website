import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Ear, Handshake, TrendingUp, type LucideIcon } from "lucide-react";
import { TrustLogosSection } from "@/components/home/TrustLogosSection";

type WhyChooseCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const CARDS: WhyChooseCard[] = [
  {
    title: "We hear you",
    description:
      "We listen closely to your company’s goals, challenges and internal processes before shaping the right impact infrastructure.",
    icon: Ear,
  },
  {
    title: "We co-create",
    description:
      "We build with your team, adapting Coompass to the way your organisation wants to manage, measure and scale impact.",
    icon: Handshake,
  },
  {
    title: "We grow with you",
    description:
      "From first rollout to long-term expansion, Coompass supports your impact operations as your needs evolve.",
    icon: TrendingUp,
  },
];

export function WhyChooseCoompassSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 55%"],
  });

  const leftCardX = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const rightCardX = useTransform(scrollYProgress, [0, 1], [0, 26]);
  const sideCardY = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const sideCardScale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
  const midCardY = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const midCardScale = useTransform(scrollYProgress, [0, 1], [0.99, 1]);

  return (
    <section
      ref={sectionRef}
      className="bg-[linear-gradient(115deg,#0b1a3a_0%,#123268_48%,#9bd9b3_100%)]"
    >
      <div className="mx-auto w-full max-w-7xl px-8 py-20 lg:px-12 lg:py-24">
        <div className="mb-10 max-w-[700px] md:mb-12">
          <h2 className="text-4xl font-light leading-tight text-white md:text-5xl">
            Why choose Coompass
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-white/85 md:text-lg">
            One size does not fit all. Impact looks different across every sector and every business.
            Unique needs deserve a unique solution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            const desktopStyle =
              index === 0
                ? { x: leftCardX, y: sideCardY, scale: sideCardScale }
                : index === 1
                  ? { y: midCardY, scale: midCardScale }
                  : { x: rightCardX, y: sideCardY, scale: sideCardScale };

            return (
              <motion.article
                key={card.title}
                style={desktopStyle}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className={`rounded-2xl border border-white/22 bg-white/[0.11] p-6 shadow-[0_18px_48px_-26px_rgba(0,0,0,0.6)] backdrop-blur-[10px] md:min-h-[220px] md:p-7 ${
                  index === 1 ? "md:z-20" : "md:z-10"
                } ${
                  index === 0
                    ? "md:translate-x-[22px]"
                    : index === 2
                      ? "md:-translate-x-[22px]"
                      : ""
                }`}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-[#9bd9b3]/35">
                  <Icon className="h-5 w-5 text-white/90" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-2xl font-light leading-tight text-white md:text-[28px]">{card.title}</h3>
                <p className="text-base font-light leading-relaxed text-white">{card.description}</p>
              </motion.article>
            );
          })}
        </div>

        <TrustLogosSection variant="embedded" />

      </div>
    </section>
  );
}
