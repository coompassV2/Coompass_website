
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { PageHeader } from "@/components/PageHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { Employee } from "@/components/employees/types";
import { VolunteerDialog } from "@/components/employees/VolunteerDialog";
import { LeaderboardHeader } from "@/components/company/leaderboard/LeaderboardHeader";
import { LeaderboardTable } from "@/components/company/leaderboard/LeaderboardTable";
import { generateLeaderboardData } from "@/components/company/leaderboard/LeaderboardDataGenerator";
import { TimeframeType, LeaderboardEmployee } from "@/components/company/leaderboard/types";

export default function Leaderboard() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
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
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("Volunteer Leaderboard")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div className="space-y-6">
          <LeaderboardHeader 
            timeframe={timeframe} 
            onTimeframeChange={setTimeframe} 
          />

          <LeaderboardTable 
            data={leaderboardData} 
            onRowClick={handleRowClick} 
          />
        </div>

        {/* Volunteer Dialog - same as Directory tab */}
        <VolunteerDialog
          employee={selectedEmployee}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      </main>
    </div>
  );
}
