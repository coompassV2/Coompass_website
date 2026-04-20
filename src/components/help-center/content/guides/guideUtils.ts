
import { GuideCategory, PersonaGuides } from "./types";

export function filterGuidesBySearchQuery(
  personaGuides: GuideCategory, 
  searchQuery: string
): GuideCategory {
  if (!searchQuery) return personaGuides;
  
  return Object.entries(personaGuides).reduce((acc, [category, categoryGuides]) => {
    const filtered = categoryGuides.filter(
      guide => 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    
    return acc;
  }, {} as Record<string, any>);
}

export function handleGuideNavigation(guidePath: string): void {
  // Extract the anchor without the # symbol
  const anchor = guidePath.replace('#', '');
  
  // Store the current guide in localStorage for the detailed view
  localStorage.setItem('currentGuide', anchor);
  
  // Navigate to the detailed guide page with the guide ID in the URL
  window.location.href = `/help-center/guide/${anchor}`;
}
