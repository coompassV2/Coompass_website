
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Card, CardContent } from "@/components/ui/card";
import { TermsHeader } from "@/components/terms/TermsHeader";
import { Introduction } from "@/components/terms/sections/Introduction";
import { Overview } from "@/components/terms/sections/Overview";
import { Acceptance } from "@/components/terms/sections/Acceptance";
import { PersonalInformation } from "@/components/terms/sections/PersonalInformation";
import { InformationUsage } from "@/components/terms/sections/InformationUsage";
import { BlockchainUsage } from "@/components/terms/sections/BlockchainUsage";
import { InformationSharing } from "@/components/terms/sections/InformationSharing";
import { UserResponsibilities } from "@/components/terms/sections/UserResponsibilities";
import { IntellectualProperty } from "@/components/terms/sections/IntellectualProperty";
import { ServiceRestrictions } from "@/components/terms/sections/ServiceRestrictions";
import { TermsChanges } from "@/components/terms/sections/TermsChanges";
import { Termination } from "@/components/terms/sections/Termination";
import { DisputeResolution } from "@/components/terms/sections/DisputeResolution";
import { GeneralProvisions } from "@/components/terms/sections/GeneralProvisions";
import { Contact } from "@/components/terms/sections/Contact";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";

export default function TermsConditions() {
  const pageData = {
    name: "Terms and Conditions",
    description: "Legal terms governing the use of Coompass's ESG and volunteering platform",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https:///terms-conditions"
    },
    datePublished: "2025-05-16",
    dateModified: "2025-05-16"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOManager 
        title="Terms and Conditions"
        description="Read Coompass's terms and conditions to understand your rights and responsibilities when using our platform for ESG initiatives and volunteering."
        canonicalUrl="/terms-conditions"
        keywords="terms and conditions, legal terms, Coompass platform, ESG initiatives, volunteering terms, user agreement, privacy terms"
      />
      
      <StructuredData type="WebPage" data={pageData} />
      
      <div className="bg-gray-900">
        <Header variant="light" />
      </div>
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <TermsHeader />
          
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <Introduction />
              <Overview />
              <Acceptance />
              <PersonalInformation />
              <InformationUsage />
              <BlockchainUsage />
              <InformationSharing />
              <UserResponsibilities />
              <IntellectualProperty />
              <ServiceRestrictions />
              <TermsChanges />
              <Termination />
              <DisputeResolution />
              <GeneralProvisions />
              <Contact />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
