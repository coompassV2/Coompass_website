import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * StructuredData component for adding JSON-LD structured data to pages.
 * Helps search engines understand page content better.
 * 
 * @param type - The Schema.org type (Organization, WebSite, WebPage, etc.)
 * @param data - The structured data object (will be merged with @context and @type)
 */
interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'FAQPage' | 'Service' | 'BreadcrumbList' | 'Product';
  data: Record<string, unknown>;
}

export const StructuredData: FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
