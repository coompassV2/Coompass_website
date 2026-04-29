import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { CalendarView } from "@/components/calendar/CalendarView";
import { CalendarViewSelector } from "@/components/calendar/CalendarViewSelector";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for calendar events
const nonprofitEvents = [
  {
    id: "1",
    title: "Beach Cleanup",
    organization: "Environmental Alliance",
    description: "Join our monthly beach cleanup event",
    hours: 3,
    volunteers: 15,
    location: "Ocean Beach",
    postedDate: "2025-04-15",
    isActive: true,
    causes: ["Environment", "Community"],
    skills: ["Physical Labor"]
  },
  {
    id: "2",
    title: "Food Pantry Distribution",
    organization: "Food for All",
    description: "Help distribute food to families in need",
    hours: 4,
    volunteers: 10,
    location: "Community Center",
    postedDate: "2025-04-20",
    isActive: true,
    causes: ["Poverty & Basic Needs", "Community"],
    skills: ["Organization", "Communication"]
  },
  {
    id: "3",
    title: "Corporate Partner Meeting",
    organization: "Tech for Good",
    description: "Annual planning meeting with corporate partners",
    hours: 2,
    volunteers: 0,
    location: "Virtual",
    postedDate: "2025-05-05",
    isActive: true,
    causes: ["Civic Engagement"],
    skills: ["Presentation"]
  }
];

export default function NonprofitCalendar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [viewType, setViewType] = useState<'month' | 'week'>('month');

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Calendar & Events')}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div className="mt-6">
          <Card>
            <CardContent className="py-8">
              <p className="text-sm text-muted-foreground">
                {t("Under construction")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* <div className="mb-6">
          <CalendarViewSelector 
            viewType={viewType} 
            onViewChange={setViewType} 
          />
        </div>
        
        <div className="space-y-6">
          <CalendarView 
            missions={nonprofitEvents} 
            viewType={viewType} 
          />
        </div> */}
      </main>
    </div>
  );
}
