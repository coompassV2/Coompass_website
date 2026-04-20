import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/for-pages/PageLayout";
import { HelpSidebar } from "@/components/help-center/HelpSidebar";
import { HelpContent } from "@/components/help-center/HelpContent";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";
import { PersonaType } from "@/utils/personaLabels";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

// Define the necessary types
export type CategoryType = "getting-started" | "features" | "troubleshooting" | "faq" | "bookmarked" | "guides" | "faqs";

export interface HelpContentProps {
  category: string;
  persona: PersonaType | null;
  searchQuery: string;
}

export interface HelpSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activePersona: PersonaType | null;
  setActivePersona: (persona: PersonaType) => void;
}

function HelpCenterHero() {
  const { t } = useTranslation();
  return (
    <div
      className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/help-center-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {t("Help Center")}
        </h1>
        <p className="text-lg md:text-2xl font-light drop-shadow">
          {t("Find answers and learn how to make the most of Coompass")}
        </p>
      </div>
    </div>
  );
}

export default function HelpCenter() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>("getting-started");
  const [activePersona, setActivePersona] = useState<PersonaType>("company");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const pageData = {
    name: "Coompass Help Center",
    description: "Get help and learn how to use Coompass platform features for companies, nonprofits, volunteers, and service providers.",
    url: "https://coompass.org/help-center"
  };

  // Type-safe handlers
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handlePersonaChange = (persona: PersonaType) => {
    setActivePersona(persona);
  };

  return (
    <>
      <SEOManager 
        title={t("Help Center")}
        description={t("Access guides, tutorials, and FAQs to help you get the most out of the Coompass platform. Find answers to your questions about companies, nonprofits, volunteers, and service providers features.")}
        canonicalUrl="/help-center"
      />
      
      <StructuredData type="WebPage" data={pageData} />

      <HelpCenterHero />
      <PageLayout
        title={t("Help Center")}
        subtitle={t("Find answers and learn how to make the most of Coompass")}
        hideCallToAction={true}
      >
        <div className="relative w-full">
          <AnimatedGridPattern className="absolute inset-0 w-full h-full z-0" />
          <div className="relative z-10 py-16">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                  <HelpSidebar 
                    activeCategory={activeCategory} 
                    setActiveCategory={handleCategoryChange}
                    activePersona={activePersona}
                    setActivePersona={handlePersonaChange}
                  />
                </div>
                <div className="w-full md:w-3/4 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <HelpContent 
                    category={activeCategory}
                    persona={activePersona}
                    searchQuery={searchQuery}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
