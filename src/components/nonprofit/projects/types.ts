
export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  volunteers: number;
  category: string;
  status: "active" | "completed";
  goal?: string;
  sdgs?: number[];
  skills?: string[];
  causeAreas?: string[];
}

export interface ProjectsListProps {
  status: "active" | "completed";
  searchQuery: string;
  updateTrigger?: number;
}

export interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  goal: string;
  sdgs: number[];
  skills: string[];
  causeAreas: string[];
}

export const initialFormState: ProjectFormData = {
  title: "",
  description: "",
  category: "",
  startDate: undefined,
  endDate: undefined,
  goal: "",
  sdgs: [],
  skills: [],
  causeAreas: []
};
