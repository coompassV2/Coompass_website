
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, Briefcase, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function NonprofitNeedsList() {
  const { t } = useTranslation();
  
  // Mock data for needs
  const needs = [
    {
      id: 1,
      title: "Web Development Expertise",
      type: "skills",
      category: "Technical",
      description: "Need assistance with updating our website and implementing new donation features",
      progress: 25,
      priority: "high",
      deadline: "Apr 30, 2025",
      quantity: "20 hours"
    },
    {
      id: 2,
      title: "Event Volunteers",
      type: "volunteer",
      category: "Events",
      description: "Seeking volunteers for our upcoming sustainability fair",
      progress: 60,
      priority: "medium",
      deadline: "May 15, 2025",
      quantity: "15 people"
    },
    {
      id: 3,
      title: "Office Supplies",
      type: "material",
      category: "Equipment",
      description: "Need various office supplies including paper, notebooks, and pens for administrative work",
      progress: 40,
      priority: "low",
      deadline: "Ongoing",
      quantity: "Various"
    },
    {
      id: 4,
      title: "Grant Writing Support",
      type: "skills",
      category: "Fundraising",
      description: "Seeking professional assistance with grant applications for upcoming projects",
      progress: 0,
      priority: "high",
      deadline: "Jun 1, 2025",
      quantity: "30 hours"
    }
  ];
  
  // Categories for filter buttons
  const categories = ["All", "Skills", "Volunteer", "Material", "Funding"];
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('Current Needs')}</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {t('Add Need')}
        </Button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map((category, index) => (
          <Button 
            key={category} 
            variant={index === 0 ? "default" : "outline"} 
            size="sm"
          >
            {index === 0 ? t('All Categories') : t(category)}
          </Button>
        ))}
      </div>
      
      <div className="space-y-4">
        {needs.map((need) => (
          <Card key={need.id} className="p-4 hover:bg-accent/5 transition-colors">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{need.title}</h3>
                    <Badge className={
                      need.priority === 'high' ? "bg-red-500/20 text-red-700" :
                      need.priority === 'medium' ? "bg-amber-500/20 text-amber-700" :
                      "bg-blue-500/20 text-blue-700"
                    }>
                      {need.priority === 'high' ? t('High Priority') : 
                       need.priority === 'medium' ? t('Medium Priority') : 
                       t('Low Priority')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{need.description}</p>
                </div>
                
                <Badge variant="outline" className="self-start md:self-center">
                  {need.type === 'skills' && <Briefcase className="h-3 w-3 mr-1" />}
                  {need.type === 'volunteer' && <Users className="h-3 w-3 mr-1" />}
                  {need.type === 'material' && <Briefcase className="h-3 w-3 mr-1" />}
                  {t(need.category)}
                </Badge>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t('Progress')} ({need.progress}%)</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {need.quantity}
                    </div>
                  </div>
                  <Progress value={need.progress} className="h-2" />
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {need.deadline}
                  </div>
                  
                  <Button variant="outline" size="sm">
                    {t('Fulfill Need')}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline">
          {t('View All Needs')}
        </Button>
      </div>
    </div>
  );
}
