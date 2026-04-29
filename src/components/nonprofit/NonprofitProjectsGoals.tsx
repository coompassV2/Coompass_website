
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Check, Clock, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CreateGoalDialog } from "./CreateGoalDialog";
import { UpdateProgressDialog } from "./UpdateProgressDialog";
import { toast } from "sonner";

interface Goal {
  id: number;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  created: string;
}

export function NonprofitProjectsGoals() {
  const { t } = useTranslation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdateProgressDialogOpen, setIsUpdateProgressDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  
  // Mock data for goals
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Increase Community Engagement",
      description: "Boost volunteer participation by 20% through new outreach programs",
      target: 20,
      current: 15,
      unit: "%",
      deadline: "Dec 31, 2025",
      created: "Jan 5, 2025"
    },
    {
      id: 2,
      title: "Expand Educational Programs",
      description: "Launch 5 new educational initiatives targeting underserved communities",
      target: 5,
      current: 2,
      unit: "programs",
      deadline: "Aug 30, 2025",
      created: "Jan 10, 2025"
    },
    {
      id: 3,
      title: "Reduce Environmental Impact",
      description: "Convert 100% of organizational operations to sustainable practices",
      target: 100,
      current: 65,
      unit: "%",
      deadline: "Jun 15, 2025",
      created: "Jan 15, 2025"
    },
    {
      id: 4,
      title: "Increase Corporate Partnerships",
      description: "Establish 10 new corporate partnerships for sustainable funding",
      target: 10,
      current: 4,
      unit: "partnerships",
      deadline: "Nov 1, 2025",
      created: "Feb 1, 2025"
    }
  ]);

  const handleCreateGoal = (newGoal: Goal) => {
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const handleEditGoal = (goalId: number) => {
    const goalToEdit = goals.find(goal => goal.id === goalId) || null;
    setSelectedGoal(goalToEdit);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProgress = (goalId: number) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId) || null;
    setSelectedGoal(goalToUpdate);
    setIsUpdateProgressDialogOpen(true);
  };

  const saveUpdatedProgress = (goalId: number, newProgress: number) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === goalId ? { ...goal, current: newProgress } : goal
      )
    );
  };
  
  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">{t('Project Goals & Initiatives')}</h2>
        <Button size="sm" className="text-xs" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          {t('Create Goal')}
        </Button>
      </div>
      
      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = Math.round((goal.current / goal.target) * 100);
          
          return (
            <Card key={goal.id} className="p-3 hover:bg-accent/5 transition-colors">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">{goal.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleEditGoal(goal.id)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">{goal.description}</p>
                
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span>{t('Progress')}</span>
                    <span>
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
                
                <div className="flex flex-wrap justify-between items-center pt-1.5 text-xs gap-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3 shrink-0" />
                    {t('Created')}: {goal.created}
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3 shrink-0" />
                    {t('Deadline')}: {goal.deadline}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleUpdateProgress(goal.id)}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    {t('Update Progress')}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}

        {goals.length === 0 && (
          <div className="text-center py-5 text-muted-foreground text-sm">
            {t('No goals created yet. Click the "Create Goal" button to add your first goal.')}
          </div>
        )}
      </div>

      <CreateGoalDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateGoal={handleCreateGoal}
      />

      <UpdateProgressDialog
        open={isUpdateProgressDialogOpen}
        onOpenChange={setIsUpdateProgressDialogOpen}
        goal={selectedGoal}
        onUpdateProgress={saveUpdatedProgress}
      />
    </div>
  );
}
