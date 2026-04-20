
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, AlertCircle, CheckCircle, FileText, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function GrantOpportunities() {
  const { t } = useTranslation();
  
  // Mock data for grant opportunities
  const grants = [
    {
      id: 1,
      name: "Community Development Fund",
      organization: "Regional Foundation",
      amount: 25000,
      deadline: "April 30, 2025",
      progress: 90,
      status: "in-progress",
      focus: "Environmental"
    },
    {
      id: 2,
      name: "Youth Empowerment Initiative",
      organization: "National Youth Trust",
      amount: 15000,
      deadline: "May 15, 2025",
      progress: 60,
      status: "in-progress",
      focus: "Education"
    },
    {
      id: 3,
      name: "Technology Access Program",
      organization: "Tech For All Foundation",
      amount: 30000,
      deadline: "June 5, 2025",
      progress: 20,
      status: "not-started",
      focus: "Digital Inclusion"
    },
    {
      id: 4,
      name: "Sustainability Innovation Award",
      organization: "Green Future Fund",
      amount: 50000,
      deadline: "July 10, 2025",
      progress: 0,
      status: "new",
      focus: "Climate Action"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('Grant Opportunities')}</h2>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              {t('Set Alerts')}
            </Button>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              {t('Create Application')}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {grants.map((grant) => (
            <Card key={grant.id} className="p-4 hover:bg-accent/5 transition-colors">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{grant.name}</h3>
                      <Badge className={
                        grant.status === 'new' ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400" :
                        grant.status === 'not-started' ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400" :
                        "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      }>
                        {grant.status === 'new' ? t('New') : 
                         grant.status === 'not-started' ? t('Not Started') : 
                         t('In Progress')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{grant.organization}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-normal">
                      {grant.focus}
                    </Badge>
                    <div className="text-lg font-semibold">${grant.amount.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span>
                      {t('Deadline')}: <span className="font-medium">{grant.deadline}</span>
                    </span>
                  </div>
                  
                  <div className="flex-1 max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('Application Progress')}</span>
                      <span>{grant.progress}%</span>
                    </div>
                    <Progress value={grant.progress} className="h-2" />
                  </div>
                  
                  <Button variant="outline" size="sm">
                    {grant.status === 'new' ? t('Start Application') : 
                     grant.status === 'not-started' ? t('Start Application') : 
                     t('Continue')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 flex gap-4 justify-center">
          <Button variant="outline">
            {t('View All Grants')}
          </Button>
          <Button variant="outline">
            {t('View Past Applications')}
          </Button>
        </div>
      </div>
    </div>
  );
}
