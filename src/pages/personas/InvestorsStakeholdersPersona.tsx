import PersonaLandingTemplate from "@/pages/personas/PersonaLandingTemplate";

export default function InvestorsStakeholdersPersona() {
  return (
    <PersonaLandingTemplate
      seoTitle="Coompass for Investors and Stakeholders"
      seoDescription="Access clear and comparable social impact visibility across portfolios, programs and partners."
      canonicalUrl="/personas/investors-stakeholders"
      eyebrow="IMPACT INTELLIGENCE PLATFORM"
      heroTitle={"Evaluate social sustainability performance\nwith confidence"}
      heroDescription="Coompass gives investors and stakeholders structured visibility into program execution, participation and social outcomes."
      heroBackgroundImageSrc="/covers/investors-stakeholders-hero.png"
      heroBackgroundSize="80% auto"
      heroBackgroundPosition="right center"
      heroBackgroundFadeLeft
      hideWhyCard
      featureTitle="Built for portfolio-level impact visibility"
      features={[
        {
          title: "Cross-program insight",
          description: "Aggregate social impact activity across partners without fragmented spreadsheets.",
        },
        {
          title: "Performance trends",
          description: "Monitor participation, execution rhythm and outcome indicators through clear dashboards.",
        },
        {
          title: "Decision support",
          description: "Use reliable evidence to prioritize investments and validate strategic impact goals.",
        },
      ]}
      ctaTitle="See Coompass for stakeholder visibility"
      ctaDescription="Book a walkthrough focused on portfolio monitoring and social impact intelligence."
    />
  );
}
