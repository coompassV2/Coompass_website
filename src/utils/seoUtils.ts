
// SEO utility functions for Coompass

export const generatePageTitle = (title: string, includeCompany = true): string => {
  return includeCompany ? `${title} | Coompass` : title;
};

export const generateMetaDescription = (description: string, maxLength = 160): string => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://coompass.org';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const generateKeywords = (primaryKeywords: string[], secondaryKeywords: string[] = []): string => {
  const baseKeywords = ['coompass', 'ESG platform', 'corporate volunteering', 'social impact'];
  const allKeywords = [...baseKeywords, ...primaryKeywords, ...secondaryKeywords];
  return allKeywords.join(', ');
};

export const seoPages = {
  home: {
    title: 'Connect for Impact - ESG & Volunteering Platform',
    description: 'Transform your corporate social responsibility with Coompass. Connect companies, nonprofits, and volunteers for meaningful ESG initiatives and social impact.',
    keywords: ['ESG reporting', 'sustainable development goals', 'corporate social responsibility', 'skill-based volunteering']
  },
  companies: {
    title: 'ESG Platform for Companies - Corporate Volunteering & CSR',
    description: 'Engage employees in meaningful volunteering. Track ESG metrics, partner with nonprofits, and create lasting social impact with our corporate platform.',
    keywords: ['corporate volunteering platform', 'employee engagement', 'ESG reporting', 'CSR management']
  },
  nonprofits: {
    title: 'Nonprofit Platform - Connect with Corporate Volunteers',
    description: 'Access skilled corporate volunteers, manage partnerships, and amplify your social impact. Join nonprofits using Coompass for greater community reach.',
    keywords: ['nonprofit partnerships', 'corporate volunteers', 'nonprofit management', 'volunteer coordination']
  },
  volunteers: {
    title: 'Volunteer Platform - Find Meaningful ESG Opportunities',
    description: 'Discover skill-based volunteering opportunities that match your expertise. Create measurable social impact while developing professionally.',
    keywords: ['skill-based volunteering', 'volunteer opportunities', 'professional development', 'social impact careers']
  }
};
