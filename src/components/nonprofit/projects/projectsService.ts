
import { Project, ProjectFormData } from './types';

// Dummy data for projects
const projectsData: Project[] = [
  {
    id: 1,
    title: "Community Garden Restoration",
    description: "Revitalizing community gardens in urban neighborhoods to improve access to fresh produce.",
    startDate: "2025-03-15",
    endDate: "2025-09-15",
    progress: 65,
    volunteers: 24,
    category: "Environment",
    status: "active",
    goal: "Restore 5 community gardens and provide fresh produce access to 500 families",
    sdgs: [2, 11, 15],
    skills: ["Gardening", "Community Outreach", "Project Management"],
    causeAreas: ["environment", "poverty-basic-needs", "community"]
  },
  {
    id: 2,
    title: "Youth Coding Workshops",
    description: "Teaching coding and tech skills to underprivileged youth to increase career opportunities.",
    startDate: "2025-04-10",
    endDate: "2025-07-30",
    progress: 45,
    volunteers: 12,
    category: "Education",
    status: "active",
    goal: "Train 100 youth in basic programming skills and help 50 secure internships",
    sdgs: [4, 8, 10],
    skills: ["Programming", "Teaching", "Mentoring"],
    causeAreas: ["education", "children-youth", "employability"]
  },
  {
    id: 3,
    title: "Elderly Care Support",
    description: "Providing companionship and assistance to elderly residents in the community.",
    startDate: "2024-11-01",
    endDate: "2025-03-01",
    progress: 100,
    volunteers: 35,
    category: "Humanitarian",
    status: "completed",
    goal: "Provide weekly support to 80 elderly residents and reduce social isolation",
    sdgs: [3, 10],
    skills: ["Communication", "Empathy", "Healthcare"],
    causeAreas: ["elderly-support", "health-wellbeing", "community"]
  },
  {
    id: 4,
    title: "River Cleanup Initiative",
    description: "Organized efforts to remove trash and pollutants from local waterways.",
    startDate: "2024-08-15",
    endDate: "2024-12-15",
    progress: 100,
    volunteers: 48,
    category: "Environment",
    status: "completed",
    goal: "Clean 10 km of riverbank and remove 2 tons of waste",
    sdgs: [6, 14, 15],
    skills: ["Environmental Work", "Team Coordination", "Physical Labor"],
    causeAreas: ["environment", "community"]
  }
];

// Get all projects
export const getAllProjects = (): Project[] => {
  return projectsData;
};

// Filter projects based on status
export const filterProjects = (status: "active" | "completed"): Project[] => {
  return projectsData.filter(project => project.status === status);
};

// Add a new project
export const addNewProject = (formData: ProjectFormData): void => {
  const newProject: Project = {
    id: projectsData.length + 1,
    title: formData.title,
    description: formData.description,
    category: formData.category,
    startDate: formData.startDate ? formData.startDate.toISOString().split('T')[0] : "",
    endDate: formData.endDate ? formData.endDate.toISOString().split('T')[0] : "",
    progress: 0,
    volunteers: 0,
    status: "active",
    goal: formData.goal,
    sdgs: formData.sdgs,
    skills: formData.skills,
    causeAreas: formData.causeAreas
  };
  
  projectsData.push(newProject);
  console.log("New project created:", newProject);
};
