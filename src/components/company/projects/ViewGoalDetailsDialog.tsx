
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Calendar, Target, TrendingUp } from "lucide-react";

interface ViewGoalDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  goal: any | null;
}

export function ViewGoalDetailsDialog({ isOpen, onClose, goal }: ViewGoalDetailsDialogProps) {
  const { t } = useTranslation();

  if (!goal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {goal.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{goal.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {t('Due')}: {goal.endDate}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">{t('Description')}</h4>
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t('Progress')}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('Current Progress')}</span>
                <span>{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-3" />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">{t('Target')}</h4>
            <p className="text-sm font-medium text-foreground">{goal.target}</p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{t('Key Metrics')}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">{t('Status')}</span>
                <p className="font-medium">
                  {goal.progress >= 100 ? t('Completed') : 
                   goal.progress >= 75 ? t('On Track') : 
                   goal.progress >= 50 ? t('In Progress') : t('Behind Schedule')}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">{t('Category')}</span>
                <p className="font-medium">{goal.category}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
