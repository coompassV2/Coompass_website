
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, DollarSign, CircleDot } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AdjustResourcesDialog } from "./AdjustResourcesDialog";
import { EditResourceDialog } from "./EditResourceDialog";

export function NonprofitResourceAllocation() {
  const { t } = useTranslation();
  const [resources, setResources] = useState([
    {
      id: 1,
      project: "Community Garden Renovation",
      budget: 15000,
      used: 9000,
      volunteers: 12,
      hoursAllocated: 240,
      hoursLogged: 144,
      priority: "high",
      allocation: [
        { type: "Financial", percentage: 50 },
        { type: "Volunteer", percentage: 30 },
        { type: "Material", percentage: 20 }
      ]
    },
    {
      id: 2,
      project: "Youth Coding Workshop Series",
      budget: 8000,
      used: 6000,
      volunteers: 8,
      hoursAllocated: 160,
      hoursLogged: 120,
      priority: "medium",
      allocation: [
        { type: "Financial", percentage: 40 },
        { type: "Volunteer", percentage: 50 },
        { type: "Material", percentage: 10 }
      ]
    },
    {
      id: 3,
      project: "Homeless Shelter Supply Drive",
      budget: 12000,
      used: 3600,
      volunteers: 20,
      hoursAllocated: 300,
      hoursLogged: 90,
      priority: "high",
      allocation: [
        { type: "Financial", percentage: 60 },
        { type: "Volunteer", percentage: 25 },
        { type: "Material", percentage: 15 }
      ]
    }
  ]);

  const [adjustResourcesOpen, setAdjustResourcesOpen] = useState(false);
  const [editResourceOpen, setEditResourceOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null);

  const handleOpenAdjustResources = (resource: typeof resources[0]) => {
    console.log("Opening Adjust Resources dialog for:", resource.project);
    setSelectedResource(resource);
    setAdjustResourcesOpen(true);
  };

  const handleOpenEditResource = (resource: typeof resources[0]) => {
    console.log("Opening Edit Resource dialog for:", resource.project);
    setSelectedResource(resource);
    setEditResourceOpen(true);
  };

  const handleSaveAdjustedResources = (updatedResource: typeof resources[0]) => {
    console.log("Saving adjusted resources:", updatedResource);
    setResources(resources.map(resource => 
      resource.id === updatedResource.id ? updatedResource : resource
    ));
    setAdjustResourcesOpen(false);
    setSelectedResource(null);
  };

  const handleSaveEditedResource = (updatedResource: typeof resources[0]) => {
    console.log("Saving edited resource:", updatedResource);
    setResources(resources.map(resource => 
      resource.id === updatedResource.id ? updatedResource : resource
    ));
    setEditResourceOpen(false);
    setSelectedResource(null);
  };

  const handleCloseAdjustResources = () => {
    console.log("Closing Adjust Resources dialog");
    setAdjustResourcesOpen(false);
    setSelectedResource(null);
  };

  const handleCloseEditResource = () => {
    console.log("Closing Edit Resource dialog");
    setEditResourceOpen(false);
    setSelectedResource(null);
  };
  
  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">{t('Resource Allocation')}</h2>
        <Button 
          size="sm" 
          className="text-xs bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => handleOpenAdjustResources(resources[0])}
        >
          {t('Adjust Resources')}
        </Button>
      </div>
      
      <div className="space-y-4">
        {resources.map((resource) => {
          const budgetProgress = Math.round((resource.used / resource.budget) * 100);
          const hoursProgress = Math.round((resource.hoursLogged / resource.hoursAllocated) * 100);
          
          return (
            <Card key={resource.id} className="p-3 hover:bg-accent/5 transition-colors">
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-semibold text-sm">{resource.project}</h3>
                      <Badge className={`text-[10px] ${resource.priority === 'high' ? "bg-red-500/20 text-red-700" : "bg-amber-500/20 text-amber-700"}`}>
                        {resource.priority === 'high' ? t('High Priority') : t('Medium Priority')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-1.5">
                    <Badge variant="outline" className="text-[10px]">{t('Active')}</Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs hover:bg-accent"
                      onClick={() => handleOpenEditResource(resource)}
                    >
                      {t('Edit')}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1 shrink-0" />
                        {t('Budget Utilization')}
                      </div>
                      <span>${resource.used.toLocaleString()} / ${resource.budget.toLocaleString()}</span>
                    </div>
                    <Progress value={budgetProgress} className="h-1.5 mb-2" />
                    
                    <div className="flex justify-between text-xs mb-0.5">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 shrink-0" />
                        {t('Hours Utilization')}
                      </div>
                      <span>{resource.hoursLogged} / {resource.hoursAllocated} {t('hrs')}</span>
                    </div>
                    <Progress value={hoursProgress} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-medium">{t('Resource Distribution')}</div>
                    {resource.allocation.map((alloc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CircleDot className={`shrink-0 ${
                          alloc.type === 'Financial' ? "h-3 w-3 text-blue-500" : 
                          alloc.type === 'Volunteer' ? "h-3 w-3 text-green-500" : 
                          "h-3 w-3 text-amber-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-[11px] mb-0.5">
                            <span>{t(alloc.type)}</span>
                            <span>{alloc.percentage}%</span>
                          </div>
                          <Progress value={alloc.percentage} className={
                            alloc.type === 'Financial' ? "h-1 bg-blue-100 dark:bg-blue-900" : 
                            alloc.type === 'Volunteer' ? "h-1 bg-green-100 dark:bg-green-900" : 
                            "h-1 bg-amber-100 dark:bg-amber-900"
                          } />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 shrink-0" />
                    {resource.volunteers} {t('volunteers assigned')}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <AdjustResourcesDialog 
        open={adjustResourcesOpen}
        onOpenChange={handleCloseAdjustResources}
        resource={selectedResource}
        onSave={handleSaveAdjustedResources}
      />
      
      <EditResourceDialog
        open={editResourceOpen}
        onOpenChange={handleCloseEditResource}
        resource={selectedResource}
        onSave={handleSaveEditedResource}
      />
    </div>
  );
}
