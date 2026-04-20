
// Helper functions for the guide components

/**
 * Returns a title for a guide based on its ID
 */
export function getGuideTitleFromId(guideId: string): string {
  const guideTitles: Record<string, string> = {
    // Company guides
    "company-profile": "Setting up your company profile",
    "employee-onboarding": "Employee onboarding",
    "dashboard-customization": "Dashboard customization",
    "partnerships": "Finding and establishing partnerships",
    "create-missions": "Creating volunteer opportunities",
    "team-volunteering": "Managing team volunteering",
    "impact-metrics": "Understanding your impact metrics",
    "esg-reports": "Generating ESG reports",
    "employee-engagement": "Tracking employee engagement",
    
    // Nonprofit guides
    "nonprofit-profile": "Setting up your nonprofit profile",
    "verification": "Verifying your organization",
    "team-management": "Team member management",
    "create-opportunities": "Creating volunteer opportunities",
    "volunteer-selection": "Volunteer screening and selection",
    "tracking-hours": "Tracking volunteer hours and impact",
    "corporate-partners": "Attracting corporate partners",
    "resource-management": "Resource requests and management",
    "pro-bono": "Finding pro bono services",
    
    // Volunteer guides
    "preferences": "Setting your volunteering preferences",
    "skills-inventory": "Building your skills inventory",
    "search-missions": "Searching for missions",
    "applications": "Applying for volunteering positions",
    "virtual-volunteering": "Virtual volunteering options",
    "track-impact": "Tracking your volunteering impact",
    "certificates": "Getting certificates and recognition",
    "volunteering-portfolio": "Building a volunteering portfolio",
    
    // Service provider guides
    "provider-profile": "Creating your service provider profile",
    "service-listing": "Listing your services",
    "portfolio": "Building your portfolio",
    "find-projects": "Finding project opportunities",
    "proposals": "Creating compelling proposals",
    "negotiation": "Negotiating pro bono and paid work",
    "client-management": "Managing client relationships",
    "document-impact": "Documenting project impact",
    "reputation": "Building your reputation"
  };
  
  return guideTitles[guideId] || "Guide Not Found";
}

/**
 * Saves a guide to the user's bookmarks in local storage
 */
export function bookmarkGuide(guideId: string): { success: boolean; alreadyBookmarked: boolean } {
  try {
    // Get current bookmarks from localStorage
    const bookmarksJson = localStorage.getItem('coompass-guide-bookmarks');
    let bookmarks: string[] = [];
    
    if (bookmarksJson) {
      bookmarks = JSON.parse(bookmarksJson);
    }
    
    // Check if already bookmarked
    if (bookmarks.includes(guideId)) {
      return { success: true, alreadyBookmarked: true };
    }
    
    // Add to bookmarks
    bookmarks.push(guideId);
    localStorage.setItem('coompass-guide-bookmarks', JSON.stringify(bookmarks));
    
    return { success: true, alreadyBookmarked: false };
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return { success: false, alreadyBookmarked: false };
  }
}

/**
 * Gets all bookmarked guides
 */
export function getBookmarkedGuides(): string[] {
  try {
    const bookmarksJson = localStorage.getItem('coompass-guide-bookmarks');
    if (bookmarksJson) {
      return JSON.parse(bookmarksJson);
    }
    return [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
}

/**
 * Removes a guide from bookmarks
 */
export function removeBookmark(guideId: string): boolean {
  try {
    const bookmarksJson = localStorage.getItem('coompass-guide-bookmarks');
    if (!bookmarksJson) return false;
    
    let bookmarks: string[] = JSON.parse(bookmarksJson);
    bookmarks = bookmarks.filter(id => id !== guideId);
    
    localStorage.setItem('coompass-guide-bookmarks', JSON.stringify(bookmarks));
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
}

/**
 * Shares the current guide by copying the URL to clipboard
 */
export function shareGuide(): boolean {
  try {
    navigator.clipboard.writeText(window.location.href);
    return true;
  } catch (error) {
    console.error('Error sharing guide:', error);
    return false;
  }
}
