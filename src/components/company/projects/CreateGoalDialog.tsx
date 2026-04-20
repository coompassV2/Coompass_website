
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Calendar, CalendarDays } from "lucide-react";

interface CreateGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (goal: any) => void;
}

export function CreateGoalDialog({ isOpen, onClose, onCreateGoal }: CreateGoalDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    endDate: "",
    category: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      ...formData,
      progress: 0
    };
    onCreateGoal(newGoal);
    setFormData({ title: "", description: "", target: "", endDate: "", category: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Create New Goal')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('Goal Title')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={t('Enter goal title')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('Description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t('Describe the goal')}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">{t('Category')}</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('Select category')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Environmental">{t('Environmental')}</SelectItem>
                <SelectItem value="Social">{t('Social')}</SelectItem>
                <SelectItem value="Governance">{t('Governance')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">{t('Target')}</Label>
            <Input
              id="target"
              value={formData.target}
              onChange={(e) => handleInputChange('target', e.target.value)}
              placeholder={t('Ex: 50% redução, 1000 horas')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">{t('End Date')}</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('Cancel')}
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              {t('Create Goal')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
