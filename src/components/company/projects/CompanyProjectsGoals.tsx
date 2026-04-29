
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { CreateGoalDialog } from "./CreateGoalDialog";
import { EditGoalDialog } from "./EditGoalDialog";
import { ViewGoalDetailsDialog } from "./ViewGoalDetailsDialog";
import { toast } from "sonner";

export function CompanyProjectsGoals() {
  const { t } = useTranslation();
  
  // Mock data for projects goals
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Carbon Footprint Reduction",
      description: "Reduce company carbon emissions by 30% through office initiatives and supply chain improvements",
      progress: 65,
      target: "30% reduction",
      endDate: "2025-12-31",
      category: "Environmental"
    },
    {
      id: 2,
      title: "Community Engagement",
      description: "Achieve 5,000 employee volunteer hours in community service initiatives",
      progress: 40,
      target: "5,000 hours",
      endDate: "2025-12-31",
      category: "Social"
    },
    {
      id: 3,
      title: "Diversity & Inclusion",
      description: "Increase diversity in leadership positions and implement inclusive workplace practices",
      progress: 75,
      target: "50% diverse leadership",
      endDate: "2026-03-31",
      category: "Governance"
    },
    {
      id: 4,
      title: "Sustainable Sourcing",
      description: "Transition 80% of suppliers to those meeting our sustainability standards",
      progress: 35,
      target: "80% of suppliers",
      endDate: "2026-06-30",
      category: "Environmental"
    },
  ]);

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);

  const handleCreateGoal = (newGoal: any) => {
    setGoals(prev => [newGoal, ...prev]);
    toast.success(t('Goal created successfully!'));
  };

  const handleEditGoal = (updatedGoal: any) => {
    setGoals(prev => prev.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
    toast.success(t('Goal updated successfully!'));
  };

  const handleViewGoal = (goal: any) => {
    setSelectedGoal(goal);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (goal: any) => {
    setSelectedGoal(goal);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="w-full max-w-full">
      <div className="glass-card p-4 md:p-6 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">{t('Project Goals')}</h2>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 w-full sm:w-auto"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            {t('Create New Goal')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
          {goals.map((goal) => (
            <Card key={goal.id} className="p-4 w-full">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{goal.title}</h3>
                  <Badge variant="outline" className="shrink-0">{goal.category}</Badge>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleViewGoal(goal)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleEditClick(goal)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 break-words">{goal.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('Progress')}</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground gap-2">
                <div className="break-words">
                  {t('Target')}: <span className="font-medium text-foreground">{goal.target}</span>
                </div>
                <div className="break-words">
                  {t('Due')}: <span className="font-medium text-foreground">{goal.endDate}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <CreateGoalDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateGoal={handleCreateGoal}
      />

      <EditGoalDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEditGoal={handleEditGoal}
        goal={selectedGoal}
      />

      <ViewGoalDetailsDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        goal={selectedGoal}
      />
    </div>
  );
}
