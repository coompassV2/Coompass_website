
import { useState } from "react";
import { Employee } from "@/components/employees/types";
import { VolunteerDialog } from "@/components/employees/VolunteerDialog";
import { LeaderboardHeader } from "./leaderboard/LeaderboardHeader";
import { LeaderboardTable } from "./leaderboard/LeaderboardTable";
import { generateLeaderboardData } from "./leaderboard/LeaderboardDataGenerator";
import { TimeframeType, LeaderboardEmployee } from "./leaderboard/types";

export function CompanyEmployeeLeaderboard() {
  const [timeframe, setTimeframe] = useState<TimeframeType>('month');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const leaderboardData = generateLeaderboardData(timeframe);

  // Handle row click to open employee dialog
  const handleRowClick = (employee: LeaderboardEmployee) => {
    // Convert leaderboard employee data to Employee type format
    const employeeData: Employee = {
      id: employee.id,
      name: employee.name,
      joinDate: "2023-01-01", // Using default date for demo
      lastLogin: "2024-01-15", // Using default date for demo
      activeMissions: Math.floor(Math.random() * 3),
      completeMissions: employee.missions,
      volunteerHours: employee.hours,
      photoUrl: employee.avatar,
    };
    
    setSelectedEmployee(employeeData);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6">
      <LeaderboardHeader 
        timeframe={timeframe} 
        onTimeframeChange={setTimeframe} 
      />

      <LeaderboardTable 
        data={leaderboardData} 
        onRowClick={handleRowClick} 
      />

      {/* Volunteer Dialog - same as Directory tab */}
      <VolunteerDialog
        employee={selectedEmployee}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
