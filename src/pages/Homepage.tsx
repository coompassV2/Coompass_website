import { Hero } from "@/components/home/Hero";
import { ImpactOperationsSection } from "@/components/home/ImpactOperationsSection";
import { Header } from "@/components/home/Header";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { ImpactStatsSection } from "@/components/home/ImpactStatsSection";
import { WhyChooseCoompassSection } from "@/components/home/WhyChooseCoompassSection";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { HomepageFaqSection } from "@/components/home/HomepageFaqSection";
import { SEOManager } from "@/components/shared/SEOManager";

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
    <div className="relative min-h-screen overflow-x-hidden">
      <SEOManager 
        title="Connect for Impact - Companies, Nonprofits & Volunteers Unite"
        description="All-in-one platform connecting companies, nonprofits, and volunteers for ESG initiatives and social impact. Transform your corporate social responsibility with skill-based volunteering."
        canonicalUrl="/"
        keywords="ESG platform, corporate volunteering, social impact, sustainability initiatives, nonprofit partnerships, CSR platform, employee engagement, volunteering, corporate social responsibility, ESG reporting, sustainable development goals, business ESG solutions"
        structuredData={organizationStructuredData}
      />

      <Header />
      
      {/* Hero section */}
      <div className="relative z-10 min-h-[100dvh]">
        <Hero />
      </div>

      <WhatWeDoSection />

      <ImpactStatsSection />

      <WhyChooseCoompassSection />

      <ImpactOperationsSection />

      <HomepageFaqSection />

      <HomeCtaSection />

    </div>
  );
}
