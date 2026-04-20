
export interface Project {
  id: string;
  title: string;
  client: string;
  deadline: string;
  progress: number;
  location: string;
  hoursLogged: number;
  totalHours: number;
  isAtRisk: boolean;
  riskReason?: string;
  teamMembers?: string[];
  description?: string;
}

export interface AvailableProject {
  id: string;
  title: string;
  organization: string;
  location: string;
  deadline: string;
  budget: string;
  skills: string[];
  matchScore: number;
  description?: string;
}

export interface CompletedProject {
  id: string;
  title: string;
  client: string;
  completionDate: string;
  location: string;
  hoursContributed: number;
  impact: string;
  clientRating: number;
  clientFeedback: string;
  description?: string;
}
