
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { formatDatePt } from "@/lib/dateFormat";

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGoal: (goal: any) => void;
}

export function CreateGoalDialog({
  open,
  onOpenChange,
  onCreateGoal
}: CreateGoalDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    unit: "%",
    deadline: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.target || !formData.deadline) {
      toast.error(t("Please fill all required fields"));
      return;
    }
    
    const newGoal = {
      ...formData,
      current: 0,
      id: Date.now(),
      target: Number(formData.target),
      created: formatDatePt(new Date())
    };
    
    onCreateGoal(newGoal);
    onOpenChange(false);
    toast.success(t("Goal created successfully"));
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      target: "",
      unit: "%",
      deadline: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t('Create New Goal')}</DialogTitle>
          <DialogDescription>
            {t('Set a new goal for your project or organization')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('Goal Title')}</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder={t('Enter goal title')} 
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">{t('Description')}</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder={t('Describe your goal')}
              value={formData.description} 
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target">{t('Target')}</Label>
              <Input 
                id="target" 
                name="target" 
                type="number" 
                placeholder={t('Target value')}
                value={formData.target}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">{t('Unit')}</Label>
              <select 
                id="unit" 
                name="unit" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="%">%</option>
                <option value="programs">Programs</option>
                <option value="partnerships">Partnerships</option>
                <option value="volunteers">Volunteers</option>
                <option value="events">Events</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">{t('Deadline')}</Label>
            <Input 
              id="deadline" 
              name="deadline" 
              type="date" 
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('Cancel')}
            </Button>
            <Button type="submit">
              {t('Create Goal')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
