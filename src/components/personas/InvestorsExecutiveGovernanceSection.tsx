import { Reveal } from "@/components/motion";

type GovernanceCard = {
  title: string;
  description: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
};

const CARDS: GovernanceCard[] = [
  {
    title: "Investor confidence",
    description:
      "Provide investors and strategic stakeholders with credible visibility over social impact performance, execution quality, and measurable outcomes.",
    tag: "Investors",
    imageSrc: "/covers/investors-board-meeting.png",
    imageAlt: "Executive board meeting reviewing impact and governance performance",
  },
  {
    title: "Governance visibility",
    description:
      "Give boards and leadership teams a structured view of risks, opportunities, program progress, and portfolio-level impact.",
    tag: "Governance",
    imageSrc: "/covers/investors-governance-presentation.png",
    imageAlt: "Leadership team reviewing impact overview and ESG indicators in a boardroom",
  },
  {
    title: "Long-term value creation",
    description:
      "Translate social sustainability data into evidence that supports trust, accountability, reputation, and strategic decision-making.",
    tag: "Strategy",
    imageSrc: "/covers/investors-long-term-impact.png",
    imageAlt: "Professionals reviewing a solar energy installation for long-term sustainability impact",
  },
];

function GovernanceCardItem({ card }: { card: GovernanceCard }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_22px_45px_-32px_rgba(15,23,42,0.38)]">
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#111827] md:text-[1.35rem]">
          {card.title}
        </h3>
        <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-slate-600 md:text-[0.9375rem]">
          {card.description}
        </p>
        <p className="mt-6 text-sm font-semibold text-[#111827]">{card.tag}</p>
      </div>
      <div className="px-4 pb-4 pt-0 md:px-5 md:pb-5">
        <div className="overflow-hidden rounded-xl">
          <img
            src={card.imageSrc}
            alt={card.imageAlt}
            className="aspect-[16/10] h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </article>
  );
}

export function InvestorsExecutiveGovernanceSection() {
  return (
    <Reveal as="section" className="bg-[#f3f4f6] py-16 lg:py-20" aria-labelledby="investors-governance-heading">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <h2
          id="investors-governance-heading"
          className="mx-auto max-w-4xl text-center text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl"
        >
          Add an executive layer for performance visibility.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <GovernanceCardItem key={card.title} card={card} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
