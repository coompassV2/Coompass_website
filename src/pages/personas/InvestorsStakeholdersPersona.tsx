import { InvestorsEsgRatingActivitiesSection } from "@/components/personas/InvestorsEsgRatingActivitiesSection";
import { InvestorsExecutiveGovernanceSection } from "@/components/personas/InvestorsExecutiveGovernanceSection";
import { InvestorsExecutiveLayerOutcomesSection } from "@/components/personas/InvestorsExecutiveLayerOutcomesSection";
import PersonaLandingTemplate from "@/pages/personas/PersonaLandingTemplate";

export default function InvestorsStakeholdersPersona() {
  return (
    <PersonaLandingTemplate
      seoTitle="Coompass for Investors and Stakeholders"
      seoDescription="Access clear and comparable social impact visibility across portfolios, programs and partners."
      canonicalUrl="/personas/investors-stakeholders"
      eyebrow="IMPACT INTELLIGENCE PLATFORM"
      heroTitle="Investor: Relations & Governance"
      heroDescription="Give investors, boards, and strategic stakeholders a clear executive layer to evaluate social impact, program performance, governance quality, and long-term value creation."
      heroSectionClassName="bg-black"
      heroBackgroundImageSrc="/covers/investors-esg-globe-hero.png"
      heroBackgroundFadeLeft
      heroImageOverlayClassName="bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.9)_32%,rgba(0,0,0,0.55)_52%,rgba(0,0,0,0.15)_72%,transparent_100%)]"
      hideWhyCard
      featuresSection={
        <>
          <InvestorsExecutiveGovernanceSection />
          <InvestorsExecutiveLayerOutcomesSection />
          <InvestorsEsgRatingActivitiesSection />
        </>
      }
      ctaTitle="Add an executive layer to your governance strategy"
      ctaDescription="See how Coompass helps leadership teams connect social sustainability performance with investor expectations, stakeholder trust, and strategic decision-making."
    />
  );
}
