
import { Team, TeamMember } from "../types";

export const initialTeams: Team[] = [
  {
    id: 1,
    name: "Marketing Volunteers",
    description: "Team focused on marketing-related volunteering activities",
    members: [
      { id: 1, name: "Sofia Martinez", avatar: "SM" },
      { id: 2, name: "John Smith", avatar: "JS" },
      { id: 3, name: "Lisa Johnson", avatar: "LJ" }
    ],
    activeMissions: 2
  },
  {
    id: 2,
    name: "Technical Support",
    description: "IT professionals providing technical volunteering",
    members: [
      { id: 4, name: "Alex Chen", avatar: "AC" },
      { id: 5, name: "Maria Garcia", avatar: "MG" },
      { id: 6, name: "Robert Lee", avatar: "RL" },
      { id: 7, name: "Sarah Kim", avatar: "SK" }
    ],
    activeMissions: 1
  },
  {
    id: 3,
    name: "Environmental Action",
    description: "Focused on environmental sustainability projects",
    members: [
      { id: 8, name: "David Wilson", avatar: "DW" },
      { id: 9, name: "Emma Brown", avatar: "EB" }
    ],
    activeMissions: 1
  }
];

export const availableEmployees: TeamMember[] = [
  { id: 10, name: "Michael Johnson", avatar: "MJ" },
  { id: 11, name: "Jennifer Williams", avatar: "JW" },
  { id: 12, name: "Carlos Rodriguez", avatar: "CR" },
  { id: 13, name: "Ashley Taylor", avatar: "AT" },
  { id: 14, name: "Kevin Martin", avatar: "KM" },
];
