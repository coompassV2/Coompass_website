
import { GettingStartedGuide } from "./content/GettingStartedGuide";
import { FAQSection } from "./content/FAQSection";
import { FeaturesGuide } from "./content/FeaturesGuide";
import { Troubleshooting } from "./content/Troubleshooting";
import { UserGuides } from "./content/UserGuides";
import { BookmarkedGuides } from "./content/BookmarkedGuides";
import { PersonaType } from "@/utils/personaLabels";

interface HelpContentProps {
  category: string;
  persona: PersonaType | null;
  searchQuery: string;
}

export function HelpContent({ category, persona, searchQuery }: HelpContentProps) {
  if (!persona) return null;

  // Return the appropriate content based on the selected category
  switch (category) {
    case "getting-started":
      return <GettingStartedGuide persona={persona} />;
    case "faqs":
      return <FAQSection persona={persona} searchQuery={searchQuery} />;
    case "features":
      return <FeaturesGuide persona={persona} />;
    case "troubleshooting":
      return <Troubleshooting persona={persona} searchQuery={searchQuery} />;
    case "guides":
      return <UserGuides persona={persona} searchQuery={searchQuery} />;
    case "bookmarks":
      return <BookmarkedGuides />;
    default:
      return <GettingStartedGuide persona={persona} />;
  }
}
