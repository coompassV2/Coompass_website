
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Heart, Clock, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function NonprofitOverview() {
  const { t } = useTranslation();
  
  // Mock data
  const impactMetrics = {
    peopleHelped: 1245,
    volunteerHours: 3680,
    projectsCompleted: 28,
    donationsReceived: 54200,
    monthlyGoal: 75000,
    goalProgress: 72
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('Organization Impact')}</h2>
        <span className="text-sm text-muted-foreground">{t('Last 12 months')}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#10B981]/10 border-transparent">
          <CardContent className="flex flex-col items-center pt-6">
            <Users className="h-8 w-8 mb-2 text-[#10B981]" />
            <p className="text-2xl font-bold">{impactMetrics.peopleHelped}</p>
            <p className="text-xs text-muted-foreground text-center">{t('People Helped')}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#3B82F6]/10 border-transparent">
          <CardContent className="flex flex-col items-center pt-6">
            <Clock className="h-8 w-8 mb-2 text-[#3B82F6]" />
            <p className="text-2xl font-bold">{impactMetrics.volunteerHours}</p>
            <p className="text-xs text-muted-foreground text-center">{t('Volunteer Hours')}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#8B5CF6]/10 border-transparent">
          <CardContent className="flex flex-col items-center pt-6">
            <BadgeCheck className="h-8 w-8 mb-2 text-[#8B5CF6]" />
            <p className="text-2xl font-bold">{impactMetrics.projectsCompleted}</p>
            <p className="text-xs text-muted-foreground text-center">{t('Projects Completed')}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#EC4899]/10 border-transparent">
          <CardContent className="flex flex-col items-center pt-6">
            <Heart className="h-8 w-8 mb-2 text-[#EC4899]" />
            <p className="text-2xl font-bold">${impactMetrics.donationsReceived}</p>
            <p className="text-xs text-muted-foreground text-center">{t('Donations Received')}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">{t('Monthly Donation Goal')}</p>
          <p className="text-sm">${impactMetrics.donationsReceived} / ${impactMetrics.monthlyGoal}</p>
        </div>
        <Progress value={impactMetrics.goalProgress} className="h-2" />
      </div>
    </div>
  );
}
