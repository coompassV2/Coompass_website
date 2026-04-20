
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { AuroraText } from "@/components/ui/aurora-text";
import { SEOManager } from "@/components/shared/SEOManager";
import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  textColor?: string;
  hideCallToAction?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export function PageLayout({ 
  title, 
  subtitle, 
  children, 
  textColor = "green-500",
  hideCallToAction = false,
  seoTitle,
  seoDescription,
  seoKeywords
}: PageLayoutProps) {
  // Generate SEO-optimized content based on the page type
  const defaultSeoTitle = `Coompass for ${title}`;
  const defaultSeoDescription = `${subtitle} Join Coompass to connect with partners and create meaningful social impact.`;
  const defaultSeoKeywords = `coompass ${title.toLowerCase()}, ESG platform for ${title.toLowerCase()}, ${title.toLowerCase()} volunteering, corporate social responsibility ${title.toLowerCase()}`;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOManager 
        title={seoTitle || defaultSeoTitle}
        description={seoDescription || defaultSeoDescription}
        canonicalUrl={`/for-${title.toLowerCase()}`}
        keywords={seoKeywords || defaultSeoKeywords}
      />
      
      {/* Use the default Header (no variant prop, no bg wrapper) */}
      <Header />
      
      <div className="relative flex-1">
        {/* Main content positioned in front of the background */}
        <main className="relative z-10 flex-1">
          {/* Removed duplicated title and subtitle overlay */}
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
