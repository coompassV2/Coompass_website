
import { employeesData } from "@/data/employees";
import { LeaderboardEmployee, TimeframeType } from "./types";

export const generateLeaderboardData = (timeframe: TimeframeType): LeaderboardEmployee[] => {
  const realEmployees = employeesData.map((emp, index) => ({
    id: emp.id,
    name: emp.name,
    avatar: emp.photoUrl,
    department: ["Marketing", "Engineering", "Finance", "Operations", "Human Resources", "IT", "Customer Service", "Sales"][index % 8],
    hours: emp.volunteerHours + (timeframe === 'week' ? 0 : timeframe === 'month' ? 20 : timeframe === 'quarter' ? 50 : timeframe === 'year' ? 100 : timeframe === 'allTime' ? 200 : 0),
    missions: emp.completeMissions + (timeframe === 'week' ? 0 : timeframe === 'month' ? 1 : timeframe === 'quarter' ? 2 : timeframe === 'year' ? 5 : timeframe === 'allTime' ? 10 : 0),
    impact: (emp.volunteerHours + (timeframe === 'week' ? 0 : timeframe === 'month' ? 20 : timeframe === 'quarter' ? 50 : timeframe === 'year' ? 100 : timeframe === 'allTime' ? 200 : 0)) * 2,
    recognition: ["Team Player", "Mission Leader", "SDG Champion", "Tech Expert", "Community Builder"].slice(0, Math.floor(Math.random() * 3) + 1)
  }));

  // Add a couple more entries with real photos to make it 10 total
  const additionalEmployees: LeaderboardEmployee[] = [
    {
      id: 100,
      name: "Sofia Martinez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      department: "Marketing",
      hours: realEmployees[0].hours + 10,
      missions: realEmployees[0].missions + 1,
      impact: (realEmployees[0].hours + 10) * 2,
      recognition: ["Team Player", "Mission Leader"]
    },
    {
      id: 101,
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      department: "Engineering",
      hours: realEmployees[1].hours + 5,
      missions: realEmployees[1].missions,
      impact: (realEmployees[1].hours + 5) * 2,
      recognition: ["Tech Expert"]
    }
  ];

  return [...additionalEmployees, ...realEmployees]
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 10);
};
