import PersonaLandingTemplate from "@/pages/personas/PersonaLandingTemplate";

export default function MunicipalitiesPersona() {
  return (
    <PersonaLandingTemplate
      seoTitle="Coompass for Municipalities"
      seoDescription="Coordinate local social impact initiatives across territories, partners and public programs."
      canonicalUrl="/personas/municipalities"
      eyebrow="MUNICIPAL IMPACT PLATFORM"
      heroTitle={"Manage local social impact programs\nwith structure and transparency"}
      heroDescription="Coompass helps municipalities coordinate community initiatives, activate partners and monitor progress across neighborhoods."
      heroBackgroundImageSrc="/covers/municipalities-hero.png"
      heroBackgroundSize="80% auto"
      heroBackgroundPosition="right center"
      heroBackgroundFadeLeft
      hideWhyCard
      featureTitle="Built for municipal coordination"
      features={[
        {
          title: "Territory monitoring",
          description: "Track what is happening by district, program and partner with standardized indicators.",
        },
        {
          title: "Cross-sector collaboration",
          description: "Coordinate municipal teams, nonprofits and companies through shared execution visibility.",
        },
        {
          title: "Public reporting",
          description: "Generate consistent progress views that support governance and community communication.",
        },
      ]}
      ctaTitle="See Coompass for municipal programs"
      ctaDescription="Book a walkthrough focused on your local priorities, operational needs and transparency goals."
    />
  );
}
