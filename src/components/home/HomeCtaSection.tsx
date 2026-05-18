import { Reveal, RevealItem, RevealStagger } from "@/components/motion";

interface HomeCtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function HomeCtaSection({
  title = "Here when you're ready to begin",
  description = "Reach out for a quick conversation with someone from our team.",
  buttonText = "Talk to the team",
  buttonHref = "https://calendly.com/hello-coompass/sessao-coompass",
}: HomeCtaSectionProps) {
  return (
    <Reveal as="section" className="bg-white">
      <div className="mx-auto mb-[37px] mt-[37px] w-full max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-12 lg:pb-16">
        <Reveal variant="scaleIn" className="relative overflow-hidden rounded-[28px] bg-[#93eac1] md:rounded-[30px]">
          <img
            src="https://unsplash.com/photos/vasBHKO3GSs/download?force=true&w=1920"
            alt="Team collaborating around charts"
            className="absolute inset-0 h-full w-full object-cover object-right [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] md:[mask-image:linear-gradient(to_left,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] md:[-webkit-mask-image:linear-gradient(to_left,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]"
            loading="lazy"
          />

          <div className="relative z-10 flex min-h-[260px] items-center md:min-h-[300px]">
            <RevealStagger className="w-full max-w-xl px-6 py-9 sm:px-8 md:px-12 md:py-12">
              <RevealItem>
                <h2 className="text-4xl font-light leading-[0.95] text-[#2f3542] sm:text-[44px] md:text-[58px]">
                  {title}
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-[520px] text-sm font-light leading-relaxed text-[#2f3542]/85 sm:text-base">
                  {description}
                </p>
              </RevealItem>
              <RevealItem>
                <a
                  href={buttonHref}
                  className="mt-7 inline-flex items-center justify-center rounded-full border border-[#2f3542] bg-[#2f3542] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b4252]"
                >
                  {buttonText}
                </a>
              </RevealItem>
            </RevealStagger>
          </div>
        </Reveal>
      </div>
    </Reveal>
  );
}
