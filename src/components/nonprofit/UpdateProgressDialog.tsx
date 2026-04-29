
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Goal {
  id: number;
  title: string;
  current: number;
  target: number;
  unit: string;
}

interface UpdateProgressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onUpdateProgress: (goalId: number, newProgress: number) => void;
}

export function UpdateProgressDialog({
  open,
  onOpenChange,
  goal,
  onUpdateProgress
}: UpdateProgressDialogProps) {
  const { t } = useTranslation();
  const [newProgress, setNewProgress] = useState<number>(goal?.current || 0);

  // Update state when goal changes
  useState(() => {
    if (goal) {
      setNewProgress(goal.current);
    }
  });

  const handleUpdateProgress = () => {
    if (!goal) return;
    
    if (newProgress > goal.target) {
      toast.error(t("Progress cannot exceed target value"));
      return;
    }
    
    onUpdateProgress(goal.id, newProgress);
    onOpenChange(false);
    toast.success(t("Progress updated successfully"));
  };

  if (!goal) return null;

  const progress = Math.round((goal.current / goal.target) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{t('Update Goal Progress')}</DialogTitle>
          <DialogDescription>
            {t('Update progress for')} {goal.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{t('Current Progress')}</span>
              <span>
                {goal.current} / {goal.target} {goal.unit}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newProgress">
              {t('New Progress Value')} ({goal.unit})
            </Label>
            <Input 
              id="newProgress" 
              type="number" 
              value={newProgress}
              min={0}
              max={goal.target}
              onChange={(e) => setNewProgress(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              {t('Enter a value between 0 and')} {goal.target}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleUpdateProgress}>
            {t('Update Progress')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
