
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Calendar, Users, Briefcase } from "lucide-react";

export function CorporateResources() {
  const { t } = useTranslation();
  
  // Mock data for corporate resources
  const corporateResources = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      resourceType: "Volunteer Hours",
      description: "20 employees for tech skill-sharing workshops",
      status: "confirmed",
      date: "Apr 15, 2025"
    },
    {
      id: 2,
      company: "Green Energy Co.",
      resourceType: "Pro Bono Consulting",
      description: "Strategic planning for sustainability initiatives",
      status: "confirmed",
      date: "Apr 20, 2025"
    },
    {
      id: 3,
      company: "Global Finance Group",
      resourceType: "Venue Sponsorship",
      description: "Use of conference center for fundraising event",
      status: "pending",
      date: "May 5, 2025"
    },
    {
      id: 4,
      company: "Community Bank",
      resourceType: "Marketing Support",
      description: "Design and printing of promotional materials",
      status: "pending",
      date: "May 12, 2025"
    }
  ];
  
  // Resource categories for quick filters
  const resourceCategories = [
    { name: "Volunteer Hours", icon: <Users className="h-4 w-4" /> },
    { name: "Pro Bono", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Venues", icon: <Calendar className="h-4 w-4" /> },
    { name: "All Resources", icon: <CheckCircle2 className="h-4 w-4" /> }
  ];
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('Corporate Resources')}</h2>
          <Button variant="outline" size="sm">{t('Request Resource')}</Button>
        </div>
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {resourceCategories.map((category, index) => (
            <Button 
              key={index}
              variant={index === 3 ? "default" : "outline"} 
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {category.icon}
              {t(category.name)}
            </Button>
          ))}
        </div>
        
        <div className="space-y-4">
          {corporateResources.map((resource) => (
            <Card key={resource.id} className="p-4 hover:bg-accent/5 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{resource.company}</h3>
                    <Badge variant="outline" className={
                      resource.status === 'confirmed' 
                        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" 
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                    }>
                      {resource.status === 'confirmed' ? t('Confirmed') : t('Pending')}
                    </Badge>
                  </div>
                  <p className="text-sm">{resource.description}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{resource.resourceType}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {resource.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">{t('View All Corporate Resources')}</Button>
        </div>
      </div>
    </div>
  );
}
