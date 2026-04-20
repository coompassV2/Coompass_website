
import { PersonaType } from "@/utils/personaLabels";

export interface GuideProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  path: string;
}

export interface GuideItem {
  title: string;
  description: string;
  path: string;
  icon?: React.ReactNode;
}

export interface GuideCategory {
  [key: string]: GuideProps[];
}

export interface PersonaGuides {
  [persona: string]: {
    [category: string]: GuideProps[];
  };
}

export interface GuidesData {
  [persona: string]: {
    [category: string]: GuideProps[];
  };
}

export interface UserGuidesProps {
  persona: PersonaType;
  searchQuery: string;
}

export interface GettingStartedGuideProps {
  persona: PersonaType;
  searchQuery?: string;
}

export interface FeaturesGuideProps {
  persona: PersonaType;
  searchQuery?: string;
}

export interface TroubleshootingProps {
  persona: PersonaType;
  searchQuery: string;
}

export interface FAQSectionProps {
  persona: PersonaType;
  searchQuery: string;
}

export interface GuideHeaderProps {
  title: string;
  description: string;
  guideId: string;
  handleBookmark: () => void;
  handleShare: () => void;
  handleBackClick: () => void;
}
