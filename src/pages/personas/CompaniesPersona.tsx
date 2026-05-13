import PersonaLandingTemplate from "@/pages/personas/PersonaLandingTemplate";

export default function CompaniesPersona() {
  return (
    <PersonaLandingTemplate
      seoTitle="Coompass for Companies"
      seoDescription="Empower employee volunteering and manage corporate social impact programs with clear reporting and automation."
      canonicalUrl="/personas/companies"
      eyebrow="EMPLOYEE VOLUNTEERING PLATFORM"
      heroTitle="Complete CSR solutions for your team."
      heroDescription="Coompass offers companies the platform to better run social initiatives with less manual work, stronger employee engagement and clear ESG evidence."
      heroBackgroundImageSrc="/covers/companies-csr-hero.png"
      heroBackgroundSize="80% auto"
      heroBackgroundPosition="right center"
      heroBackgroundFadeLeft
      hideWhyCard
      centerFeatureHeading
      featureTitle="Less complexity. More action."
      features={[
        {
          title: "Program automation",
          description: "Reduce administrative overhead with structured workflows, reminders and standardized records.",
        },
        {
          title: "Employee experience",
          description: "Give teams an easy way to discover opportunities and register participation in one place.",
        },
        {
          title: "Impact visibility",
          description: "Track volunteer activity and engagement trends with practical dashboards for decision-making.",
        },
      ]}
      platformSectionTitle="Comprehensive Platform for Corporate Impact"
      platformSectionSubtitle="One connected flow for volunteering, partnerships, and reporting—built so teams spend less time on admin and more time on outcomes."
      platformFeatures={[
        {
          title: "Employee Engagement Hub",
          description:
            "Boost team morale and retention by enabling employees to participate in causes aligned with their values, skills, and interests.",
          tag: "75% higher employee satisfaction",
          previewImageSrc: "/covers/platform-card-employee-engagement.png",
          previewImageAlt: "Employee engagement icon",
        },
        {
          title: "ESG Metrics",
          description:
            "Easily track and report on environmental, social, and governance metrics for compliance and stakeholders.",
          tag: "Real-time reporting",
          previewImageSrc: "/covers/platform-card-esg-metrics.png",
          previewImageAlt: "ESG metrics icon",
        },
        {
          title: "Mission Builder",
          description:
            "Create custom volunteering missions aligned with your company values and the UN Sustainable Development Goals.",
          tag: "Customizable templates",
          previewImageSrc: "/covers/platform-card-mission-builder.png",
          previewImageAlt: "Mission builder icon",
        },
        {
          title: "Partnership Ecosystem",
          description:
            "Access a curated network of verified nonprofits and service providers to create meaningful partnerships and initiatives that align with your company's mission.",
          tag: "1000+ verified partners worldwide",
          previewImageSrc: "/covers/platform-card-partnership.png",
          previewImageAlt: "Partnership network icon",
        },
        {
          title: "Recognition & Rewards",
          description:
            "Celebrate employee contributions with badges, certificates, and leaderboards that showcase individual and team impact across your organization.",
          tag: "Gamified engagement",
          previewImageSrc: "/covers/platform-card-recognition.png",
          previewImageAlt: "Recognition and rewards icon",
        },
        {
          title: "Impact Verification",
          description: "Blockchain-based verification ensures transparency and trust in your CSR reporting.",
          tag: "Tamper-proof records",
          previewImageSrc: "/covers/platform-card-impact-verification.png",
          previewImageAlt: "Impact verification icon",
        },
        {
          title: "Event Management",
          description:
            "Organize company-wide volunteering days and team-building activities with our intuitive scheduling tools.",
          tag: "Integrated calendar",
          previewImageSrc: "/covers/platform-card-events.png",
          previewImageAlt: "Event management icon",
        },
        {
          title: "Analytics Dashboard",
          description:
            "Gain actionable insights from comprehensive reports and visualizations showing the impact of your CSR initiatives across regions, teams, and causes.",
          tag: "Custom reporting",
          previewImageSrc: "/covers/platform-card-analytics.png",
          previewImageAlt: "Analytics dashboard icon",
        },
      ]}
      ctaTitle="See Coompass in action for your company"
      ctaDescription="Book a walkthrough focused on your CSR priorities, employee engagement goals and reporting requirements."
    />
  );
}
