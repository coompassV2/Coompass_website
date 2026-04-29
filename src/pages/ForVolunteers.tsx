
import { IntroSection } from "@/components/for-pages/IntroSection";
import { BenefitsSection } from "@/components/for-pages/BenefitsSection";
import { ContentSection } from "@/components/for-pages/ContentSection";
import { PageLayout } from "@/components/for-pages/PageLayout";
import { CallToActionSection } from "@/components/for-pages/CallToActionSection";
import { VolunteerBenefits } from "@/components/for-pages/volunteers/VolunteerBenefits";
import { VolunteerBentoGrid } from "@/components/for-pages/volunteers/VolunteerBentoGrid";
import { VolunteerHowItWorks } from "@/components/for-pages/volunteers/VolunteerHowItWorks";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";
import VolunteersHero from "@/components/for-pages/volunteers/VolunteersHero";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function ForVolunteers() {
  const serviceData = {
    name: "Coompass for Volunteers",
    description: "Make an impact with your skills and time by connecting with meaningful volunteer opportunities through Coompass's AI-powered matching system.",
    url: "https://coompass.org/for-volunteers",
    provider: {
      '@type': 'Organization',
      name: 'Coompass',
      url: 'https://coompass.org'
    }
  };

  return (
    <>
      <SEOManager 
        title="For Volunteers"
        description="Make an impact with your skills and time by connecting with meaningful volunteer opportunities through Coompass's AI-powered matching system."
        canonicalUrl="/for-volunteers"
      />
      
      <StructuredData type="Service" data={serviceData} />

      {/* New Hero Section */}
      <VolunteersHero />

      <PageLayout
        title="Volunteers"
        subtitle="Make an impact with your skills and time"
        textColor="blue-500"
      >
        <div className="relative w-full">
          <AnimatedGridPattern className="absolute inset-0 w-full h-full z-0" />
          <div className="relative z-10 py-16">
            <ContentSection>
              <IntroSection 
                title="Unlock Your Impact Potential"
                description="Coompass empowers professionals to contribute their skills and time to meaningful causes, creating positive social impact while developing personally and professionally."
              />
              <BenefitsSection title="Key Benefits for Volunteers">
                <VolunteerBenefits />
              </BenefitsSection>
              <VolunteerBentoGrid />
              <VolunteerHowItWorks />
              <CallToActionSection 
                title="Ready to start your volunteering journey?"
                description="Join thousands of professionals using their skills to create positive change through meaningful volunteer opportunities."
                buttonText="Sign Up as Volunteer"
                buttonHref="/register"
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
