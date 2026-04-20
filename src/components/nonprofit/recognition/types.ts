
export interface RecognitionProgram {
  id: string;
  title: string;
  description: string;
  frequency: string;
  criteria: string;
  createdAt: Date;
  totalNominations: number;
  activeNominations: number;
}

export interface Recognition {
  id: number;
  programId: string;
  awardName: string;
  volunteer: string;
  date: string;
  status: string;
}

export interface Volunteer {
  id: number;
  name: string;
  joinDate: string;
  lastSession: string;
  hours: number;
  skills: string[];
  status: string;
}
