
import { Badge, LeaderboardEntry } from "@/types/organization";
import { employeesData } from "./employees";
import { getAvatarUrl } from "@/utils/avatarUtils";

export const badges: Badge[] = [
  {
    id: "first-mission",
    name: "First Mission",
    description: "Completed your first volunteer mission",
    color: "#FF4136",
    howToEarn: "Complete your first volunteer mission"
  },
  {
    id: "team-player",
    name: "Team Player",
    description: "Volunteered with 5 or more colleagues",
    color: "#0074D9",
    howToEarn: "Volunteer with 5 or more colleagues on the same mission"
  },
  {
    id: "environmental",
    name: "Environmental Hero",
    description: "Completed 3 environmental missions",
    color: "#2ECC40",
    howToEarn: "Complete 3 missions related to environmental causes"
  },
  {
    id: "super-volunteer",
    name: "Super Volunteer",
    description: "Contributed more than 50 volunteer hours",
    color: "#B10DC9",
    howToEarn: "Contribute more than 50 volunteer hours"
  },
  {
    id: "mentor",
    name: "Volunteer Mentor",
    description: "Helped guide other volunteers in their journey",
    color: "#3D9970",
    howToEarn: "Help onboard 3 new volunteers to their first mission"
  },
  {
    id: "global-impact",
    name: "Global Impact",
    description: "Participated in international volunteering efforts",
    color: "#001f3f",
    howToEarn: "Participate in a mission with international scope"
  },
  {
    id: "fundraiser",
    name: "Master Fundraiser",
    description: "Helped raise significant funds for causes",
    color: "#FFDC00",
    howToEarn: "Help raise over $1000 for nonprofit organizations"
  },
  {
    id: "consistency",
    name: "Consistency Champion",
    description: "Volunteered consistently for 6 months",
    color: "#FF851B",
    howToEarn: "Volunteer at least once per month for 6 consecutive months"
  }
];

// Create additional dummy names to supplement the employees data
const additionalNames = [
  "Elena Martinez", "Ahmed Khan", "Michael Chen", "Sarah Johnson",
  "Carlos Gutierrez", "Priya Patel", "Olga Petrov", "James Wilson", "Fatima Al-Farsi",
  "Hiroshi Tanaka", "Maria Silva", "Thomas Schmidt", "Aisha Mbeki", "Wei Liu",
  "Isabella Rossi", "John Smith", "Amara Okafor", "Pierre Dubois", "Siti Rahman",
  "David Kim", "Nadia Hassan", "Lars Anderson", "Sofia Garcia", "Raj Sharma",
  "Emma Williams", "Yusuf Ibrahim", "Ana Lopez", "Viktor Novak", "Chen Wei",
  "Kwame Mensah", "Ingrid Johansson", "Omar Youssef", "Gabriela Mendoza", "Akira Sato"
];

// Combine real employees with additional names
const allEmployeeNames = [
  ...employeesData.map(emp => emp.name),
  ...additionalNames.slice(0, Math.max(0, 35 - employeesData.length))
];

export const leaderboardData: LeaderboardEntry[] = allEmployeeNames.map((name, i) => {
  // Use actual employee data if available, otherwise generate random data
  const actualEmployee = employeesData.find(emp => emp.name === name);
  
  const volunteerHours = actualEmployee?.volunteerHours || Math.floor(Math.random() * 120) + 5;
  const engagedCauseAreas = Math.floor(Math.random() * 10) + 1;
  const engagedNGOs = Math.floor(Math.random() * 15) + 1;
  const completedMissions = actualEmployee?.completeMissions || Math.floor(Math.random() * 20) + 1;
  
  const randomBadges = badges
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 1)
    .map(badge => badge.id);
  
  return {
    id: `${i + 1}`,
    employeeId: 240000 + i,
    employeeName: name,
    employeeAvatar: getAvatarUrl(name),
    volunteerHours,
    engagedCauseAreas,
    engagedNGOs,
    completedMissions,
    passEarned: volunteerHours * 10,
    badges: randomBadges,
    rank: i + 1
  };
}).sort((a, b) => b.volunteerHours - a.volunteerHours)
  .map((entry, index) => ({ ...entry, rank: index + 1 }));

export const causeAreas: string[] = [];
export const skills: string[] = [];
export const goals: string[] = [];
