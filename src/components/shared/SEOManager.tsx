import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEOManager component for managing SEO metadata on pages.
 * 
 * Handles:
 * - Page titles and meta descriptions
 * - Open Graph tags for social media sharing
 * - Twitter Card tags
 * - Canonical URLs
 * - Robots meta tags
 * - Structured data (JSON-LD)
 * 
 * @param title - Page title (will be prefixed with " | Coompass")
 * @param description - Meta description for search engines and social sharing
 * @param canonicalUrl - Canonical URL for the page (defaults to homepage)
 * @param ogType - Open Graph type (defaults to "website")
 * @param ogImage - Open Graph image URL
 * @param keywords - SEO keywords comma-separated string
 * @param noIndex - Whether to prevent search engine indexing
 * @param structuredData - JSON-LD structured data object
 * @param children - Additional Helmet children for custom meta tags
 */
interface SEOManagerProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
}

export const SEOManager: FC<SEOManagerProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://i.ibb.co/G43g8L2j/lovable-thumbnail-join-coompass.png',
  keywords = 'ESG platform, corporate volunteering, social impact, sustainability initiatives, nonprofit partnerships, CSR platform, employee engagement, volunteering',
  noIndex = false,
  structuredData,
  children
}) => {
  const siteTitle = title ? `${title} | Coompass` : 'Coompass - Connect for Impact | ESG & Volunteering Platform';
  const siteDescription = description || 'All-in-one platform connecting companies, nonprofits, and volunteers for ESG initiatives and social impact. Transform your corporate social responsibility with skill-based volunteering.';
  const siteUrl = 'https://coompass.org';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Title and basic meta */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={siteTitle} />
      <meta property="og:site_name" content="Coompass" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@coompassio" />
      <meta name="twitter:creator" content="@coompassio" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={siteTitle} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...structuredData
          })}
        </script>
      )}
      
      {/* Additional meta tags */}
      {children}
    </Helmet>
  );
};
