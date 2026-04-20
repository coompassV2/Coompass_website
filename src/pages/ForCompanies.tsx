
import { IntroSection } from "@/components/for-pages/IntroSection";
import { BenefitsSection } from "@/components/for-pages/BenefitsSection";
import { ContentSection } from "@/components/for-pages/ContentSection";
import { PageLayout } from "@/components/for-pages/PageLayout";
import { CallToActionSection } from "@/components/for-pages/CallToActionSection";
import { CompanyBenefits } from "@/components/for-pages/companies/CompanyBenefits";
import { CompanyBentoGrid } from "@/components/for-pages/companies/CompanyBentoGrid";
import { CompanyHowItWorks } from "@/components/for-pages/companies/CompanyHowItWorks";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";
import ForCompaniesHero from "@/components/for-pages/companies/ForCompaniesHero";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function ForCompanies() {
  const serviceData = {
    name: "Coompass for Companies",
    description: "Enhance your ESG strategy and employee engagement with Coompass's comprehensive platform for corporate social responsibility initiatives.",
    url: "https://coompass.org/for-companies",
    provider: {
      '@type': 'Organization',
      name: 'Coompass',
      url: 'https://coompass.org'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  };

  // BreadcrumbList schema for navigation structure
  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://coompass.org/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "For Companies",
        "item": "https://coompass.org/for-companies"
      }
    ]
  };

  return (
    <>
      <SEOManager 
        title="For Companies - Enhance ESG & Employee Engagement"
        description="Enhance your ESG strategy and employee engagement with Coompass's comprehensive platform for corporate social responsibility initiatives."
        canonicalUrl="/for-companies"
        keywords="corporate social responsibility, ESG strategy, employee engagement, CSR platform, sustainability reporting, social impact for companies, corporate volunteering"
      />
      
      <StructuredData type="Service" data={serviceData} />
      <StructuredData type="BreadcrumbList" data={breadcrumbData} />

      {/* New Hero Section */}
      <ForCompaniesHero />

      <PageLayout
        title="Companies"
        subtitle="Enhance your ESG strategy and employee engagement"
        textColor="green-500"
      >
        <div className="relative w-full">
          <AnimatedGridPattern className="absolute inset-0 w-full h-full z-0" />
          <div className="relative z-10 py-16">
            <ContentSection>
              <IntroSection 
                title="Empower Your CSR Initiatives"
                description="Coompass provides a comprehensive platform for companies to manage and track their corporate social responsibility (CSR) initiatives with full transparency and impact measurement."
              />
              <BenefitsSection title="Key Benefits for Companies">
                <CompanyBenefits />
              </BenefitsSection>
              <CompanyBentoGrid />
              <CompanyHowItWorks />
              <CallToActionSection 
                title="Ready to transform your CSR strategy?"
                description="Schedule a demo to see how Coompass can help your company make a measurable impact."
                buttonText="Schedule a Demo"
                buttonHref="https://tally.so/r/3xYk7o"
                bgColor="blue-50"
                buttonColor="blue-600"
              />
            </ContentSection>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
