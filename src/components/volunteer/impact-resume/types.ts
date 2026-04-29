export interface VolunteerProfile {
  name: string;
  company: string;
  level: number;
  avatar: string;
}

export interface VolunteerStats {
  missionsCompleted: number;
  volunteerHours: number;
  associationsHelped: number;
}

/** SDG from completed missions (distinct), ordered by goal id. */
export interface ImpactResumeSdgItem {
  id: number;
  name: string;
  key: string;
  image_url: string | null;
}

export interface ImpactResumeData {
  profile: VolunteerProfile;
  stats: VolunteerStats;
  /** Distinct SDGs from missions the volunteer completed. */
  sdgsImpacted?: ImpactResumeSdgItem[];
  causesSupported: string[];
  topSkills: string[];
  organizations: string[];
  regionalImpact: string[];
}

// Component Props Interfaces
export interface ImpactResumeProfileSummaryProps {
  profile: VolunteerProfile;
  stats?: VolunteerStats;
}

export interface ImpactResumeStatsGridProps {
  stats: VolunteerStats;
}

export interface ImpactResumeSdgsSectionProps {
  sdgs: ImpactResumeSdgItem[];
}

export interface ImpactResumeCausesSectionProps {
  causes: string[];
}

export interface ImpactResumeSkillsSectionProps {
  skills: string[];
}

export interface ImpactResumeOrganizationsSectionProps {
  organizations: string[];
}

export interface ImpactResumeRegionalSectionProps {
  regions: string[];
}

export interface ImpactResumeFooterProps {
  showFooter: boolean;
  onClose: () => void;
}

export interface ImpactResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  isDemo?: boolean;
}
