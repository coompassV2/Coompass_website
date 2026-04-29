
import { useState, useEffect } from "react";
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
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface Resource {
  id: number;
  project: string;
  budget: number;
  used: number;
  volunteers: number;
  hoursAllocated: number;
  hoursLogged: number;
  priority: string;
  allocation: {
    type: string;
    percentage: number;
  }[];
}

interface AdjustResourcesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource: Resource | null;
  onSave: (resource: Resource) => void;
}

export function AdjustResourcesDialog({
  open,
  onOpenChange,
  resource,
  onSave
}: AdjustResourcesDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Resource | null>(null);

  // Update form data when resource changes
  useEffect(() => {
    if (resource) {
      console.log("Setting form data for adjust resources:", resource.project);
      setFormData({ ...resource });
    } else {
      setFormData(null);
    }
  }, [resource]);

  if (!resource || !formData) return null;

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const budget = Number(e.target.value);
    setFormData({ ...formData, budget });
  };

  const handleVolunteersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volunteers = Number(e.target.value);
    setFormData({ ...formData, volunteers });
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hoursAllocated = Number(e.target.value);
    setFormData({ ...formData, hoursAllocated });
  };

  const handleAllocationChange = (index: number, value: number) => {
    const newAllocation = [...formData.allocation];
    newAllocation[index] = { ...newAllocation[index], percentage: value };
    
    // Adjust other allocations to ensure they sum to 100%
    const otherIndices = [0, 1, 2].filter(i => i !== index);
    const sumOthers = otherIndices.reduce(
      (sum, i) => sum + newAllocation[i].percentage, 
      0
    );
    
    if (sumOthers + value !== 100) {
      const diff = 100 - value - sumOthers;
      // Distribute the difference proportionally to the other allocation types
      otherIndices.forEach(i => {
        if (sumOthers > 0) {
          const proportion = newAllocation[i].percentage / sumOthers;
          newAllocation[i].percentage += diff * proportion;
        } else {
          // If others are all 0, distribute evenly
          newAllocation[i].percentage += diff / otherIndices.length;
        }
        // Round to nearest integer
        newAllocation[i].percentage = Math.round(newAllocation[i].percentage);
      });
    }
    
    setFormData({ ...formData, allocation: newAllocation });
  };

  const handlePriorityChange = (priority: string) => {
    setFormData({ ...formData, priority });
  };

  const handleSubmit = () => {
    console.log("Submitting adjusted resources:", formData);
    onSave(formData);
    toast.success(t("Resources adjusted successfully"));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t('Adjust Resources')}</DialogTitle>
          <DialogDescription>
            {t('Adjust the resources allocated to')} {resource.project}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="budget">{t('Budget (USD)')}</Label>
            <Input 
              id="budget" 
              type="number" 
              value={formData.budget}
              onChange={handleBudgetChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="volunteers">{t('Number of Volunteers')}</Label>
            <Input 
              id="volunteers" 
              type="number" 
              value={formData.volunteers}
              onChange={handleVolunteersChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hours">{t('Hours Allocated')}</Label>
            <Input 
              id="hours" 
              type="number" 
              value={formData.hoursAllocated}
              onChange={handleHoursChange}
            />
          </div>
          
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-medium">{t('Priority')}</h3>
            <div className="flex space-x-3">
              <Button 
                variant={formData.priority === 'low' ? "default" : "outline"}
                size="sm" 
                onClick={() => handlePriorityChange('low')}
              >
                {t('Low')}
              </Button>
              <Button 
                variant={formData.priority === 'medium' ? "default" : "outline"}
                size="sm" 
                onClick={() => handlePriorityChange('medium')}
              >
                {t('Medium')}
              </Button>
              <Button 
                variant={formData.priority === 'high' ? "default" : "outline"}
                size="sm" 
                onClick={() => handlePriorityChange('high')}
              >
                {t('High')}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-medium">{t('Resource Distribution')}</h3>
            
            {formData.allocation.map((alloc, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <Label>{t(alloc.type)}</Label>
                  <span className="text-sm">{alloc.percentage}%</span>
                </div>
                <Slider 
                  value={[alloc.percentage]} 
                  min={0} 
                  max={100} 
                  step={1}
                  className={
                    alloc.type === 'Financial' ? "bg-blue-100 dark:bg-blue-900" : 
                    alloc.type === 'Volunteer' ? "bg-green-100 dark:bg-green-900" : 
                    "bg-amber-100 dark:bg-amber-900"
                  }
                  onValueChange={(value) => handleAllocationChange(idx, value[0])}
                />
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSubmit}>
            {t('Save Changes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
