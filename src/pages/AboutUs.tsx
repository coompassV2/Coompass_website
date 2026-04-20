import { useTranslation } from "react-i18next";
import { PageLayout } from "@/components/for-pages/PageLayout";
import { ContentSection } from "@/components/for-pages/ContentSection";
import { MissionSection } from "@/components/about/MissionSection";
import { TeamSection } from "@/components/about/TeamSection";
import { CoreValuesSection } from "@/components/about/CoreValuesSection";
import { VisionSection } from "@/components/about/VisionSection";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";
import AboutUsHero from "@/components/about/AboutUsHero";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function AboutUs() {
  const { t } = useTranslation();
  const pageData = {
    name: t("About Coompass"),
    description: t("Learn about Coompass's mission to connect companies, nonprofits, and volunteers for maximum social impact and ESG initiatives."),
    url: "https://coompass.org/about-us",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://coompass.org/about-us"
    },
    datePublished: "2025-05-16",
    dateModified: "2025-05-16"
  };

  // BreadcrumbList schema for navigation structure
  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("Home"),
        "item": "https://coompass.org/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("About Us"),
        "item": "https://coompass.org/about-us"
      }
    ]
  };

  return (
    <>
      <SEOManager 
        title={t("About Us")}
        description={t("Learn about Coompass's mission, team, values and vision. Discover how we're connecting companies, nonprofits, and volunteers for maximum social impact.")}
        canonicalUrl="/about-us"
        keywords="about Coompass, ESG mission, social impact team, corporate volunteering values, sustainability vision, CSR platform"
      />
      
      <StructuredData type="WebPage" data={pageData} />
      <StructuredData type="BreadcrumbList" data={breadcrumbData} />

      {/* New Hero Section */}
      <AboutUsHero />

      <PageLayout
        title={t("About Us")}
        subtitle={t("Our mission is to connect companies, nonprofits, and volunteers for maximum social impact")}
      >
        <div className="relative w-full">
          <AnimatedGridPattern className="absolute inset-0 w-full h-full z-0" />
          <div className="relative z-10 py-16">
            <ContentSection>
              <MissionSection />
              <TeamSection />
              <CoreValuesSection />
              <VisionSection />
            </ContentSection>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
