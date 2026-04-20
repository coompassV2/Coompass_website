import { useState } from "react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { PricingSection } from "@/components/pricing/PricingSection";
import { TestimonialsSection } from "@/components/pricing/TestimonialsSection";
import { CompareFeatures } from "@/components/pricing/CompareFeatures";
import { CallToActionSection } from "@/components/about/CallToActionSection";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";

export default function Pricing() {
  const [selectedPersona, setSelectedPersona] = useState<'volunteer' | 'company' | 'nonprofit'>('volunteer');

  const pageData = {
    name: "Coompass Pricing",
    description: "Flexible pricing plans for companies, nonprofits, and volunteers to maximize social impact through Coompass.",
    url: "https://coompass.org/pricing",
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '0',
      highPrice: '999',
      offerCount: '3'
    }
  };

  return (
    <div className="min-h-screen relative bg-[#141A2B]">
      <SEOManager 
        title="Pricing"
        description="Explore Coompass pricing plans for companies, nonprofits, and volunteers. Find the perfect plan to maximize your social impact."
        canonicalUrl="/pricing"
      />
      
      <StructuredData type="WebPage" data={pageData} />
      
      <Header />

      <div className="relative z-10 flex flex-col min-h-[calc(100vh-80px)] pt-24">
        <PricingSection 
          selectedPersona={selectedPersona}
          onPersonaChange={setSelectedPersona}
        />
        <CompareFeatures selectedPersona={selectedPersona} />
        <TestimonialsSection />
        
        {/* Call to Action Section */}
        <div className="container mx-auto px-4 py-16">
          <CallToActionSection />
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
