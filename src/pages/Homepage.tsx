import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { FeaturesOverview } from "@/components/home/FeaturesOverview";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { Footer } from "@/components/home/Footer";
import { ESGKPISection } from "@/components/home/ESGKPISection";
import { CallToActionSection } from "@/components/about/CallToActionSection";
import { SEOManager } from "@/components/shared/SEOManager";
import { ImpactOutcomesSection } from "@/components/home/ImpactOutcomesSection";
import { ImpactAndESGSection } from "@/components/home/ImpactAndESGSection";
import { ValuePropositionCards } from "@/components/home/ValuePropositionCards";

export default function Homepage() {
  const organizationStructuredData = {
    '@type': 'Organization',
    name: 'Coompass',
    url: 'https://coompass.org',
    logo: 'https://i.ibb.co/G43g8L2j/lovable-thumbnail-join-coompass.png',
    description: 'All-in-one platform connecting companies, nonprofits, and volunteers for ESG initiatives and social impact',
    sameAs: [
      'https://twitter.com/coompassio',
      'https://www.linkedin.com/company/coompass',
      'https://coompass.medium.com/',
      'https://t.me/coompass_official'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lisboa',
      addressCountry: 'Portugal'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@coompass.org'
    },
    foundingDate: '2023',
    industry: 'ESG Technology Platform',
    numberOfEmployees: '10-50',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://coompass.org/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="min-h-screen relative">
      <SEOManager 
        title="Connect for Impact - Companies, Nonprofits & Volunteers Unite"
        description="All-in-one platform connecting companies, nonprofits, and volunteers for ESG initiatives and social impact. Transform your corporate social responsibility with skill-based volunteering."
        canonicalUrl="/"
        keywords="ESG platform, corporate volunteering, social impact, sustainability initiatives, nonprofit partnerships, CSR platform, employee engagement, volunteering, corporate social responsibility, ESG reporting, sustainable development goals, business ESG solutions"
        structuredData={organizationStructuredData}
      />
      
      {/* Header is fixed and will stay visible when scrolling */}
      <div className="relative z-50">
        <Header />
      </div>
      
      {/* Hero section with A/B testing taking full viewport height */}
      <div className="relative z-10 h-screen">
        <Hero />
      </div>
      
      {/* Rest of the content with regular background */}
      <div className="relative z-10 bg-white">
        {/* TrustedCompanies section */}
        <div className="py-6 bg-white">
          <TrustedCompanies />
        </div>

        {/* ImpactAndESGSection - unified real data section */}
        <ImpactAndESGSection />

        {/* Value Proposition Cards Section - moved here */}
        <ValuePropositionCards />

        {/* FeaturesOverview */}
        <FeaturesOverview />
        
        {/* Call to Action Section */}
        <div className="container mx-auto px-4 py-16">
          <CallToActionSection />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
