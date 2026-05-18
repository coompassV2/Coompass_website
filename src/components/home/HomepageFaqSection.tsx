import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion";

const faqItems = [
  {
    question: "What is Coompass?",
    answer:
      "Coompass is a software platform designed to help companies manage their entire corporate responsibility operations in one place. From planning and execution to tracking and reporting, Coompass provides the infrastructure to run impact programs with clarity and control.",
  },
  {
    question: "What can companies do with Coompass?",
    answer:
      "Companies use Coompass to centralise initiatives such as volunteering, donations, partnerships and internal programs, while gaining full visibility over their impact and performance.",
  },
  {
    question: "Does Coompass offer customised solutions?",
    answer:
      "Yes. Coompass is designed to adapt to each organisation. We work closely with companies to shape solutions that match their structure, goals and internal processes.",
  },
  {
    question: "Is Coompass only for large enterprises?",
    answer:
      "No. While Coompass is built with enterprise needs in mind, it can be adapted to organisations of different sizes looking to structure and scale their impact operations.",
  },
  {
    question: "Is there a way for individuals to get involved?",
    answer:
      "Yes. Coompass also offers a base application where individuals can discover and support nonprofit organisations, making it easier to contribute to meaningful causes.",
  },
];

export function HomepageFaqSection() {
  return (
    <Reveal as="section" className="bg-white">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12">
        <Reveal>
          <span className="inline-flex rounded-full border border-[#161616]/15 bg-[#161616]/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#161616]/75">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-light leading-[1.12] tracking-[-0.02em] text-[#161616] md:text-[38px] lg:text-[40px]">
            Frequently asked questions
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 w-full" stagger={0.08}>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <RevealItem key={item.question}>
                <AccordionItem value={`faq-${index}`} className="border-black/10">
                  <AccordionTrigger className="py-6 text-left text-[19px] font-medium leading-[1.35] text-[#161616] hover:no-underline md:text-[21px]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="max-w-[920px] text-[16px] font-normal leading-[1.7] text-[#161616]/75">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </RevealItem>
            ))}
          </Accordion>
        </RevealStagger>
      </div>
    </Reveal>
  );
}
