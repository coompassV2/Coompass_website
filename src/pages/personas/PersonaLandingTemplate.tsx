import { useId } from "react";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import { Header } from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEOManager } from "@/components/shared/SEOManager";

function FeatureHandUnderline({ className }: { className?: string }) {
  const gradientId = `feature-title-ul-${useId().replace(/:/g, "")}`;

  return (
    <svg
      className={className}
      viewBox="0 0 200 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="52%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <path
        d="M 5 9.75 Q 100 3.75 195 9.75"
        stroke={`url(#${gradientId})`}
        strokeWidth="5.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

type PersonaFeature = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

type PlatformFeatureCard = {
  title: string;
  description: string;
  tag: string;
  /** Shown in the preview strip when no `previewImageSrc` */
  icon?: LucideIcon;
  /** Optional screenshot; when set, replaces the icon area (e.g. product UI mock) */
  previewImageSrc?: string;
  previewImageAlt?: string;
};

type ProcessStep = {
  number: number;
  title: string;
};

type PersonaLandingTemplateProps = {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  whyTitle?: string;
  whyPoints?: string[];
  featureTitle: string;
  featureSubtitle?: string;
  centerFeatureHeading?: boolean;
  features: PersonaFeature[];
  resultsSectionTitle?: string;
  resultsImageSrc?: string;
  resultsImageAlt?: string;
  processSectionTitle?: string;
  processSectionDescription?: string;
  processSteps?: ProcessStep[];
  ctaTitle: string;
  ctaDescription: string;
  icon?: LucideIcon;
  hideWhyCard?: boolean;
  heroBackgroundImageSrc?: string;
  heroBackgroundSize?: string;
  heroBackgroundPosition?: string;
  /** Soft alpha fade on the left edge of the hero background image */
  heroBackgroundFadeLeft?: boolean;
  /** Dark “platform” grid (companies-style) rendered after the light feature cards */
  platformSectionTitle?: string;
  platformSectionSubtitle?: string;
  platformFeatures?: PlatformFeatureCard[];
};

const calendlyUrl = "https://calendly.com/hello-coompass/sessao-coompass";

/** Alpha mask: stronger left fade so more of the image blends into the section background */
const HERO_BG_LEFT_FADE_MASK =
  "linear-gradient(to right, transparent 0%, transparent 34%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.82) 58%, #000 70%, #000 100%)";

export default function PersonaLandingTemplate({
  seoTitle,
  seoDescription,
  canonicalUrl,
  eyebrow,
  heroTitle,
  heroDescription,
  whyTitle,
  whyPoints,
  featureTitle,
  featureSubtitle,
  centerFeatureHeading = false,
  features,
  resultsSectionTitle,
  resultsImageSrc,
  resultsImageAlt = "Results section image",
  processSectionTitle,
  processSectionDescription,
  processSteps,
  ctaTitle,
  ctaDescription,
  icon: Icon,
  hideWhyCard = false,
  heroBackgroundImageSrc,
  heroBackgroundSize = "100% auto",
  heroBackgroundPosition = "right center",
  heroBackgroundFadeLeft = false,
  platformSectionTitle,
  platformSectionSubtitle,
  platformFeatures,
}: PersonaLandingTemplateProps) {
  const heroGridClassName = hideWhyCard
    ? "grid grid-cols-1 items-center gap-10"
    : "grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr]";

  return (
    <div className="min-h-screen bg-white">
      <SEOManager title={seoTitle} description={seoDescription} canonicalUrl={canonicalUrl} />
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#07263f]">
          {heroBackgroundImageSrc && (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-no-repeat"
                style={{
                  backgroundImage: `url(${heroBackgroundImageSrc})`,
                  backgroundPosition: heroBackgroundPosition,
                  backgroundSize: heroBackgroundSize,
                  ...(heroBackgroundFadeLeft
                    ? {
                        WebkitMaskImage: HERO_BG_LEFT_FADE_MASK,
                        maskImage: HERO_BG_LEFT_FADE_MASK,
                        WebkitMaskSize: "100% 100%",
                        maskSize: "100% 100%",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                      }
                    : {}),
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(90deg,rgba(7,38,63,0.98)_0%,rgba(7,38,63,0.88)_28%,rgba(7,38,63,0.58)_50%,rgba(7,38,63,0.28)_70%,rgba(7,38,63,0.08)_100%)]"
              />
            </>
          )}
          <div className="mx-auto w-full max-w-7xl px-8 pb-20 pt-40 lg:px-12 lg:pb-24 lg:pt-48">
            <div className={`${heroGridClassName} relative z-10`}>
            <div>
              <p className="text-sm font-light tracking-[0.12em] text-white/80">{eyebrow}</p>
              <h1 className="mt-4 whitespace-pre-line text-4xl font-light leading-tight tracking-[-0.02em] text-white md:text-5xl">
                {heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-slate-100 md:text-lg">
                {heroDescription}
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600">
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Request a demo
                  </a>
                </Button>
              </div>
            </div>
            {!hideWhyCard && whyTitle != null && whyPoints != null && Icon != null && (
              <Card className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="mt-4 text-2xl font-medium text-white">{whyTitle}</h2>
                <ul className="mt-4 space-y-3">
                  {whyPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-100">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-8 lg:px-12">
            <h2 className={`text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl ${centerFeatureHeading ? "text-center" : ""}`}>
              {featureTitle}
            </h2>
            {featureSubtitle && (
              <p className={`mt-4 max-w-4xl text-base font-light leading-relaxed text-slate-600 md:text-lg ${centerFeatureHeading ? "mx-auto text-center" : ""}`}>
                {featureSubtitle}
              </p>
            )}
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="rounded-2xl border-0 bg-white p-5 text-center shadow-none"
                >
                  {feature.icon && (
                    <div className="mb-3 flex justify-center">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400">
                        <feature.icon className="h-6 w-6 text-white [stroke-width:2.8]" />
                      </span>
                    </div>
                  )}
                  <div className="flex justify-center">
                    <span className="inline-flex max-w-full flex-col items-center gap-0">
                      <h3 className="inline-block text-xl font-medium leading-snug text-[#174c43]">{feature.title}</h3>
                      <FeatureHandUnderline className="-mt-1 h-[12px] w-full min-w-[6.5rem] shrink-0" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-light leading-relaxed text-slate-700">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {platformSectionTitle && platformFeatures && platformFeatures.length > 0 && (
          <section className="bg-[linear-gradient(165deg,#0b3555_0%,#07263f_38%,#051a2c_72%,#082f4a_100%)] py-20 lg:py-28">
            <div className="mx-auto w-full max-w-7xl px-8 lg:px-12">
              <h2 className="text-center text-3xl font-light leading-tight tracking-[-0.02em] text-white md:text-4xl">
                {platformSectionTitle}
              </h2>
              {platformSectionSubtitle && (
                <p className="mx-auto mt-4 max-w-3xl text-center text-base font-light leading-relaxed text-slate-400 md:text-lg">
                  {platformSectionSubtitle}
                </p>
              )}
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {platformFeatures.map((item) => {
                  const PlatformIcon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0a0f16] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                    >
                      {(item.previewImageSrc || PlatformIcon) && (
                        <div className="relative mb-5 flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-black">
                          {item.previewImageSrc ? (
                            <img
                              src={item.previewImageSrc}
                              alt={item.previewImageAlt ?? ""}
                              className="max-h-[88%] max-w-[88%] object-contain"
                              loading="lazy"
                            />
                          ) : PlatformIcon ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-800/90 to-slate-950/90 px-4 py-10">
                              <PlatformIcon
                                className="mx-auto h-12 w-12 text-slate-400 [stroke-width:1.65]"
                                aria-hidden
                              />
                            </div>
                          ) : null}
                        </div>
                      )}
                      <h3 className="text-left text-lg font-medium tracking-tight text-white">{item.title}</h3>
                      <p className="mt-2 flex-1 text-left text-sm font-light leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                      <span className="mt-4 inline-flex w-fit rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-left text-xs font-medium tracking-wide text-sky-300/95">
                        {item.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {resultsSectionTitle && resultsImageSrc && (
          <section className="bg-white pb-16 lg:pb-20">
            <div className="mx-auto w-full max-w-6xl px-8 lg:px-12">
              <h2 className="text-center text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">
                {resultsSectionTitle}
              </h2>
              <div className="mt-8 flex justify-center">
                <img
                  src={resultsImageSrc}
                  alt={resultsImageAlt}
                  className="w-full max-w-5xl rounded-2xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        )}

        {processSectionTitle && processSteps && processSteps.length > 0 && (
          <section className="bg-[radial-gradient(120%_120%_at_10%_10%,#1f3b7a_0%,#1a1b6c_45%,#231a5b_100%)] py-16 lg:py-20">
            <div className="mx-auto grid w-full max-w-6xl gap-10 px-8 lg:grid-cols-[1fr_1.6fr] lg:px-12">
              <div className="flex h-full flex-col justify-center">
                <h2 className="text-4xl font-light leading-tight tracking-[-0.02em] text-white md:text-5xl">
                  {processSectionTitle}
                </h2>
                {processSectionDescription && (
                  <p className="mt-5 max-w-md text-base font-light leading-relaxed text-slate-200 md:text-lg">
                    {processSectionDescription}
                  </p>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="flex min-h-[180px] flex-col justify-center rounded-full border border-white/30 bg-white/5 p-8 text-center backdrop-blur-sm"
                  >
                    <p className="text-4xl font-semibold text-white">{String(step.number).padStart(2, "0")}</p>
                    <p className="mt-3 text-sm font-medium leading-snug text-slate-100">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-5xl px-8 text-center lg:px-12">
            <h2 className="text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">
              {ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base font-light leading-relaxed text-slate-600">
              {ctaDescription}
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600">
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Request a demo
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
