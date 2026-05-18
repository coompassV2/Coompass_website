import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import { Header } from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion";
import { SEOManager } from "@/components/shared/SEOManager";
import { CorporateImpactPlatformHub } from "@/components/personas/CorporateImpactPlatformHub";
import { heroContainer, heroItem } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

type PersonaFeature = {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconSrc?: string;
  iconAlt?: string;
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
  /** Merged after defaults; use to override border/background (e.g. accent card). */
  cardClassName?: string;
};

type ProcessStep = {
  number: number;
  title: string;
};

type PersonaLandingTemplateProps = {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  eyebrow?: string;
  heroTitle: string;
  heroDescription: string;
  whyTitle?: string;
  whyPoints?: string[];
  featureTitle?: string;
  featureSubtitle?: string;
  centerFeatureHeading?: boolean;
  features?: PersonaFeature[];
  /** When set, replaces the default light feature cards section (e.g. municipalities). */
  featuresSection?: ReactNode;
  /** Optional row after feature cards: left-aligned title + body, image on the right (large screens). */
  afterFeaturesAsideTitle?: string;
  afterFeaturesAsideBody?: string;
  afterFeaturesAsideImageSrc?: string;
  afterFeaturesAsideImageAlt?: string;
  /** Rendered above the aside heading (e.g. university certification banner). */
  afterFeaturesAsideBanner?: ReactNode;
  /** Inserted immediately after the “after features” aside block (e.g. research carousel). */
  afterFeaturesAsideSection?: ReactNode;
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
  /** Override hero section background (default: dark blue) */
  heroSectionClassName?: string;
  /** Override gradient overlay on top of hero background image */
  heroImageOverlayClassName?: string;
  /** Dark “platform” grid (companies-style) rendered after the light feature cards */
  platformSectionTitle?: string;
  platformSectionSubtitle?: string;
  platformFeatures?: PlatformFeatureCard[];
  /** When set, platform features render in a hub layout around this logo (companies). */
  platformHubLogoSrc?: string;
  platformHubLogoAlt?: string;
  /** Rendered after the dark platform grid section (e.g. companies “How it works”). */
  afterPlatformSection?: ReactNode;
};

const calendlyUrl = "https://calendly.com/hello-coompass/sessao-coompass";

/** Shared hero layout — aligned to municipalities persona */
const PERSONA_HERO_MIN_HEIGHT = "min-h-[28rem] sm:min-h-[30rem] lg:min-h-[34rem]";
const PERSONA_HERO_INNER = "mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-12 lg:pb-24 lg:pt-48";
const PERSONA_HERO_BG_SIZE = "auto 100%";
const PERSONA_HERO_BG_POSITION = "right center";

/** Alpha mask on the photo layer — stops aligned to each background-size so the left edge softens, not the viewport */
const HERO_MASK_HEIGHT_FIT =
  "linear-gradient(to right, transparent 0%, transparent 34%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.82) 58%, #000 70%, #000 100%)";
const HERO_MASK_WIDTH_80 =
  "linear-gradient(to right, transparent 0%, transparent 17%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.88) 30%, #000 35%, #000 100%)";
const HERO_MASK_WIDTH_100 =
  "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0,0,0,0.25) 12%, rgba(0,0,0,0.75) 22%, #000 32%, #000 100%)";
const HERO_MASK_WIDTH_62 =
  "linear-gradient(to right, transparent 0%, transparent 35%, rgba(0,0,0,0.25) 38%, rgba(0,0,0,0.65) 43%, rgba(0,0,0,0.9) 48%, #000 53%, #000 100%)";

function resolveHeroBackgroundSize(
  size: string,
  isDefaultHeightFit: boolean,
  isWidthFit: boolean,
): string {
  if (isDefaultHeightFit) return PERSONA_HERO_BG_SIZE;
  if (isWidthFit) return "100% auto";
  return size;
}

function getHeroPhotoFadeMask(backgroundSize: string): string {
  if (backgroundSize === "80% auto") return HERO_MASK_WIDTH_80;
  if (backgroundSize === "100% auto") return HERO_MASK_WIDTH_100;
  if (backgroundSize.includes("62%")) return HERO_MASK_WIDTH_62;
  return HERO_MASK_HEIGHT_FIT;
}

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
  featuresSection,
  afterFeaturesAsideTitle,
  afterFeaturesAsideBody,
  afterFeaturesAsideImageSrc,
  afterFeaturesAsideImageAlt,
  afterFeaturesAsideBanner,
  afterFeaturesAsideSection,
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
  heroBackgroundSize = PERSONA_HERO_BG_SIZE,
  heroBackgroundPosition = PERSONA_HERO_BG_POSITION,
  heroBackgroundFadeLeft = false,
  heroSectionClassName = "bg-[#07263f]",
  heroImageOverlayClassName,
  platformSectionTitle,
  platformSectionSubtitle,
  platformFeatures,
  platformHubLogoSrc,
  platformHubLogoAlt,
  afterPlatformSection,
}: PersonaLandingTemplateProps) {
  const heroGridClassName = hideWhyCard
    ? "grid grid-cols-1 items-center gap-10"
    : "grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr]";

  const isWidthFitHero = heroBackgroundSize === "100% auto";
  const isDefaultHeightFitHero = heroBackgroundSize === PERSONA_HERO_BG_SIZE;
  const resolvedHeroBgSize = resolveHeroBackgroundSize(
    heroBackgroundSize,
    isDefaultHeightFitHero,
    isWidthFitHero,
  );

  return (
    <div className="min-h-screen bg-white">
      <SEOManager title={seoTitle} description={seoDescription} canonicalUrl={canonicalUrl} />
      <Header />
      <main>
        <section className={cn("relative overflow-hidden", PERSONA_HERO_MIN_HEIGHT, heroSectionClassName)}>
          {heroBackgroundImageSrc && (
            <>
              <div
                aria-hidden="true"
                className="persona-hero-bg"
                style={{
                  backgroundImage: `url(${heroBackgroundImageSrc})`,
                  backgroundPosition: heroBackgroundPosition,
                  backgroundSize: resolvedHeroBgSize,
                  ...(heroBackgroundFadeLeft
                    ? {
                        WebkitMaskImage: getHeroPhotoFadeMask(resolvedHeroBgSize),
                        maskImage: getHeroPhotoFadeMask(resolvedHeroBgSize),
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
                className={heroImageOverlayClassName ?? "persona-hero-overlay"}
              />
            </>
          )}
          <div className={cn(PERSONA_HERO_INNER, "flex h-full min-h-0 flex-col justify-center")}>
            <div className={cn(heroGridClassName, "relative z-10 w-full")}>
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className={cn(hideWhyCard && "flex min-h-[14rem] flex-col justify-center sm:min-h-[15rem] lg:min-h-[16rem]")}
            >
              {eyebrow ? (
                <motion.p variants={heroItem} className="text-sm font-light tracking-[0.12em] text-white/80">
                  {eyebrow}
                </motion.p>
              ) : null}
              <motion.h1
                className={cn(
                  "whitespace-pre-line text-4xl font-light leading-tight tracking-[-0.02em] text-white md:text-5xl",
                  eyebrow ? "mt-4" : "",
                )}
              >
                {heroTitle}
              </motion.h1>
              <motion.p
                variants={heroItem}
                className="mt-6 max-w-2xl text-base font-light leading-relaxed text-slate-100 md:text-lg"
              >
                {heroDescription}
              </motion.p>
              <motion.div variants={heroItem} className="mt-8">
                <Button asChild size="lg" className="rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600">
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Request a demo
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            {!hideWhyCard && whyTitle != null && whyPoints != null && Icon != null && (
              <Reveal variant="slideLeft" delay={0.2} immediate>
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
              </Reveal>
            )}
            </div>
          </div>
        </section>

        {featuresSection ??
          (featureTitle && features && features.length > 0 ? (
            <Reveal as="section" className="bg-white py-16 lg:py-20">
              <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12">
                <Reveal>
                <h2
                  className={`text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl ${centerFeatureHeading ? "text-center" : ""}`}
                >
                  {featureTitle}
                </h2>
            {featureSubtitle && (
              <p className={`mt-4 max-w-4xl text-base font-light leading-relaxed text-slate-600 md:text-lg ${centerFeatureHeading ? "mx-auto text-center" : ""}`}>
                {featureSubtitle}
              </p>
            )}
                </Reveal>
            <RevealStagger className="mt-8 grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <RevealItem key={feature.title} className="rounded-2xl bg-white p-5 text-center">
                  {feature.iconSrc ? (
                    <div className="mb-4 flex justify-center">
                      <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-sky-400/30 shadow-sm md:h-16 md:w-16">
                        <img
                          src={feature.iconSrc}
                          alt={feature.iconAlt ?? ""}
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  ) : feature.icon ? (
                    <div className="mb-4 flex justify-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 md:h-16 md:w-16">
                        <feature.icon className="h-7 w-7 text-white [stroke-width:2.8] md:h-8 md:w-8" aria-hidden />
                      </span>
                    </div>
                  ) : null}
                  <h3 className="text-xl font-medium leading-snug text-[#174c43]">{feature.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-slate-700">{feature.description}</p>
                </RevealItem>
              ))}
            </RevealStagger>
              </div>
            </Reveal>
          ) : null)}

        {afterFeaturesAsideTitle && afterFeaturesAsideBody && afterFeaturesAsideImageSrc && (
          <Reveal as="section" className="bg-white py-16 lg:py-20">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,1.35fr)] lg:gap-12 lg:px-12">
              <div className="flex max-w-xl flex-col gap-6 text-left lg:gap-7">
                {afterFeaturesAsideBanner}
                <h2 className="text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">
                  {afterFeaturesAsideTitle}
                </h2>
                <p className="text-base font-light leading-relaxed text-slate-600 md:text-lg">
                  {afterFeaturesAsideBody}
                </p>
              </div>
              <div className="flex min-h-0 w-full max-w-[800px] justify-center bg-white lg:ml-auto lg:justify-end">
                <div className="relative inline-block max-w-full">
                  <img
                    src={afterFeaturesAsideImageSrc}
                    alt={afterFeaturesAsideImageAlt ?? ""}
                    className="relative z-0 h-auto w-[min(100%,600px)] max-h-[min(108vh,840px)] max-w-full object-contain object-right mix-blend-multiply sm:w-[600px]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(2.5rem,28%,11rem)] bg-gradient-to-r from-white via-white/85 to-transparent"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {afterFeaturesAsideSection}

        {platformSectionTitle && platformFeatures && platformFeatures.length > 0 && platformHubLogoSrc ? (
          <CorporateImpactPlatformHub
            title={platformSectionTitle}
            subtitle={platformSectionSubtitle}
            logoSrc={platformHubLogoSrc}
            logoAlt={platformHubLogoAlt}
            features={platformFeatures}
          />
        ) : null}
        {platformSectionTitle && platformFeatures && platformFeatures.length > 0 && !platformHubLogoSrc ? (
          <section className="border-t border-slate-200/80 bg-white py-20 lg:py-28">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
              <h2 className="text-center text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">
                {platformSectionTitle}
              </h2>
              {platformSectionSubtitle && (
                <p className="mx-auto mt-4 max-w-3xl text-center text-base font-light leading-relaxed text-slate-600 md:text-lg">
                  {platformSectionSubtitle}
                </p>
              )}
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {platformFeatures.map((item) => {
                  return (
                    <div
                      key={item.title}
                      className={cn(
                        "flex flex-col rounded-2xl border border-slate-200/90 bg-slate-100 p-5 shadow-sm",
                        item.cardClassName,
                      )}
                    >
                      <h3 className="text-left text-lg font-medium tracking-tight text-[#111827]">{item.title}</h3>
                      <p className="mt-2 flex-1 text-left text-sm font-light leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                      <span className="mt-4 inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs font-medium tracking-wide text-sky-700">
                        {item.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {afterPlatformSection}

        {resultsSectionTitle && resultsImageSrc && (
          <Reveal as="section" className="bg-white pb-16 lg:pb-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12">
              <Reveal>
                <h2 className="text-center text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">
                  {resultsSectionTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.1} variant="scaleIn">
                <div className="mt-8 flex justify-center">
                  <img
                    src={resultsImageSrc}
                    alt={resultsImageAlt}
                    className="w-full max-w-5xl rounded-2xl object-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
          </Reveal>
        )}

        {processSectionTitle && processSteps && processSteps.length > 0 && (
          <Reveal as="section" className="bg-[radial-gradient(120%_120%_at_10%_10%,#1f3b7a_0%,#1a1b6c_45%,#231a5b_100%)] py-16 lg:py-20">
            <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-12">
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

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="flex min-h-[140px] flex-col justify-center rounded-2xl border border-white/30 bg-white/5 p-5 text-center backdrop-blur-sm sm:min-h-[180px] sm:rounded-full sm:p-8"
                  >
                    <p className="text-4xl font-semibold text-white">{String(step.number).padStart(2, "0")}</p>
                    <p className="mt-3 text-sm font-medium leading-snug text-slate-100">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal as="section" className="bg-white py-16 lg:py-20">
          <RevealStagger className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-12">
            <RevealItem>
            <h2 className="text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">
              {ctaTitle}
            </h2>
            </RevealItem>
            <RevealItem>
            <p className="mx-auto mt-4 max-w-3xl text-base font-light leading-relaxed text-slate-600">
              {ctaDescription}
            </p>
            </RevealItem>
            <RevealItem>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600">
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Request a demo
                </a>
              </Button>
            </div>
            </RevealItem>
          </RevealStagger>
        </Reveal>
      </main>
    </div>
  );
}
