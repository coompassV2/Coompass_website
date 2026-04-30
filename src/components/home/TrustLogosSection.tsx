const TRUST_LOGOS: { src: string; alt: string; className?: string; wrapperClassName?: string }[] = [
  { src: "/logos/trusted/sierra-sonae.png", alt: "Sierra Sonae logo", className: "h-12 md:h-14" },
  { src: "/logos/trusted/cruz-vermelha-portuguesa.png", alt: "Cruz Vermelha Portuguesa logo" },
  { src: "/logos/trusted/via-verde.png", alt: "Via Verde logo", className: "h-16 md:h-20" },
  { src: "/logos/trusted/a-to-be.png", alt: "A-to-Be logo", className: "h-16 md:h-20" },
  { src: "/logos/trusted/controlauto.png", alt: "Controlauto logo" },
  { src: "/logos/trusted/brisa.png", alt: "Brisa logo", className: "h-20" },
  { src: "/logos/trusted/colibri.png", alt: "Colibri logo", className: "h-20" },
  { src: "/logos/trusted/iseg-symbol.png", alt: "ISEG symbol logo", className: "h-14 md:h-16" },
];

interface TrustLogosSectionProps {
  variant?: "default" | "embedded";
}

export function TrustLogosSection({ variant = "default" }: TrustLogosSectionProps) {
  const containerClassName =
    variant === "embedded"
      ? "mt-12 pt-8 md:mt-14 md:pt-10"
      : "mt-14 border-t border-slate-200 pt-8 md:pt-10";

  const titleClassName =
    variant === "embedded"
      ? "text-base font-light text-center text-white/90 md:text-lg"
      : "text-base font-light text-center text-slate-700 md:text-lg";

  const logoFilterClassName =
    variant === "embedded" ? "[filter:brightness(0)_saturate(100%)_invert(100%)]" : "";

  const logoWrapperSpacingClassName = variant === "embedded" ? "py-2" : "py-2";
  const logosGridClassName =
    variant === "embedded"
      ? "mt-[42px] mx-auto grid max-w-5xl grid-cols-2 justify-items-center gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4"
      : "mt-6 mx-auto grid max-w-5xl grid-cols-2 justify-items-center gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={containerClassName}>
      <p className={titleClassName}>Trusted by leading organizations, including:</p>
      <div className={logosGridClassName}>
        {TRUST_LOGOS.map((logo) => (
          <div
            key={logo.alt}
            className={`flex h-16 items-center justify-center px-2 ${logoWrapperSpacingClassName} ${logo.wrapperClassName ?? ""}`}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className={`h-10 w-auto max-w-full object-contain opacity-90 ${logoFilterClassName} ${logo.className ?? ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
