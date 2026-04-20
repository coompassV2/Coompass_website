
import { IntroSection } from "@/components/for-pages/IntroSection";
import { BenefitsSection } from "@/components/for-pages/BenefitsSection";
import { ContentSection } from "@/components/for-pages/ContentSection";
import { PageLayout } from "@/components/for-pages/PageLayout";
import { CallToActionSection } from "@/components/for-pages/CallToActionSection";
import { NonprofitBenefits } from "@/components/for-pages/nonprofits/NonprofitBenefits";
import { NonprofitBentoGrid } from "@/components/for-pages/nonprofits/NonprofitBentoGrid";
import { NonprofitHowItWorks } from "@/components/for-pages/nonprofits/NonprofitHowItWorks";
import { NonprofitDemoButton } from "@/components/for-pages/nonprofits/NonprofitDemoButton";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";
import NonprofitsHero from "@/components/for-pages/nonprofits/NonprofitsHero";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function ForNonprofits() {
  const serviceData = {
    name: "Coompass for Nonprofits",
    description: "Expand your nonprofit's reach and amplify your impact by connecting with mission-aligned companies and skilled volunteers through Coompass.",
    url: "https://coompass.org/for-nonprofits",
    provider: {
      '@type': 'Organization',
      name: 'Coompass',
      url: 'https://coompass.org'
    }
  };

  return (
    <>
      <SEOManager 
        title="For Nonprofits"
        description="Expand your nonprofit's reach and amplify your impact by connecting with mission-aligned companies and skilled volunteers through Coompass."
        canonicalUrl="/for-nonprofits"
      />
      
      <StructuredData type="Service" data={serviceData} />

      {/* New Hero Section */}
      <NonprofitsHero />

      <PageLayout
        title="Nonprofits"
        subtitle="Expand your reach and amplify your impact"
        textColor="green-500"
      >
        <div className="relative w-full">
          <AnimatedGridPattern className="absolute inset-0 w-full h-full z-0" />
          <div className="relative z-10 py-16">
            <ContentSection>
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Unlock New Opportunities</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                  Coompass connects your nonprofit with mission-aligned companies and skilled volunteers, providing a sustainable ecosystem to help you achieve your social impact goals.
                </p>
                <NonprofitDemoButton />
              </section>
              <BenefitsSection title="Key Benefits for Nonprofits">
                <NonprofitBenefits />
              </BenefitsSection>
              <NonprofitBentoGrid />
              <NonprofitHowItWorks />
              <CallToActionSection 
                title="Ready to expand your organization's impact?"
                description="Join our network of nonprofits connecting with corporate resources and skilled volunteers."
                buttonText="Join the Network"
                buttonHref="https://tally.so/r/3xYk7o"
                bgColor="green-50"
                buttonColor="green-600"
              />
            </ContentSection>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
