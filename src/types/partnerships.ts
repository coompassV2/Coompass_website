
export interface Partnership {
  id: number; // Changed from string | number to number
  organization: {
    name: string;
    logo: string;
    description: string;
    type: string;
  };
  partnershipStatus: string;
  partnershipType: string;
  activeMissions: number;
  totalHours: number;
  impactScore: number;
  since?: string;
  contactPerson?: string;
  nextReview?: string;
}

// Adding the Partner type that was missing
export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  partneredSince: string;
  projectCount: number;
  contactPerson: string;
  nextMeeting?: string;
  status: string;
}
