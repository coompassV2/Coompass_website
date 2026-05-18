import { MunicipalitiesCsrEuropeContextSection } from "@/components/personas/MunicipalitiesCsrEuropeContextSection";
import { MunicipalitiesTerritorialImpactSection } from "@/components/personas/MunicipalitiesTerritorialImpactSection";
import PersonaLandingTemplate from "@/pages/personas/PersonaLandingTemplate";

export default function MunicipalitiesPersona() {
  return (
    <PersonaLandingTemplate
      seoTitle="Coompass for Municipalities"
      seoDescription="Coordinate local social impact initiatives across territories, partners and public programs."
      canonicalUrl="/personas/municipalities"
      eyebrow="MUNICIPAL IMPACT PLATFORM"
      heroTitle={"Bridge the gap between public resources\nand community needs"}
      heroDescription="Coordinate local stakeholders, activate social programs, and track impact across the territory with real-time data."
      heroBackgroundImageSrc="/covers/municipalities-hero.png"
      heroBackgroundSize="auto 100%"
      heroBackgroundPosition="right center"
      heroBackgroundFadeLeft
      hideWhyCard
      featuresSection={
        <>
          <MunicipalitiesTerritorialImpactSection />
          <MunicipalitiesCsrEuropeContextSection />
        </>
      }
      ctaTitle="Directly target local community needs"
      ctaDescription="Book a walkthrough focused on your local priorities, operational needs and transparency goals."
    />
  );
}
