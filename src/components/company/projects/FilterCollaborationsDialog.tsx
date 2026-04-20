
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";

interface FilterCollaborationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: CollaborationFilters) => void;
  currentFilters: CollaborationFilters;
}

export interface CollaborationFilters {
  status: string[];
  projectType: string[];
  sdgs: string[];
}

export function FilterCollaborationsDialog({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: FilterCollaborationsDialogProps) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<CollaborationFilters>(currentFilters);

  const statusOptions = [
    { value: "pending", label: t('Pending') },
    { value: "accepted", label: t('Accepted') },
    { value: "declined", label: t('Declined') }
  ];

  const projectTypeOptions = [
    { value: "Education", label: t('Education') },
    { value: "Environmental", label: t('Environmental') },
    { value: "Social", label: t('Social') },
    { value: "Healthcare", label: t('Healthcare') }
  ];

  const sdgOptions = [
    "Quality Education",
    "Reduced Inequalities", 
    "Life Below Water",
    "Climate Action",
    "Decent Work",
    "No Poverty"
  ];

  const handleStatusChange = (value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      status: checked 
        ? [...prev.status, value]
        : prev.status.filter(s => s !== value)
    }));
  };

  const handleProjectTypeChange = (value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      projectType: checked 
        ? [...prev.projectType, value]
        : prev.projectType.filter(t => t !== value)
    }));
  };

  const handleSDGChange = (value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      sdgs: checked 
        ? [...prev.sdgs, value]
        : prev.sdgs.filter(s => s !== value)
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const emptyFilters = { status: [], projectType: [], sdgs: [] };
    setFilters(emptyFilters);
    onApplyFilters(emptyFilters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('Filter Collaborations')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium">{t('Status')}</Label>
            <div className="mt-2 space-y-2">
              {statusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${option.value}`}
                    checked={filters.status.includes(option.value)}
                    onCheckedChange={(checked) => 
                      handleStatusChange(option.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`status-${option.value}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-medium">{t('Project Type')}</Label>
            <div className="mt-2 space-y-2">
              {projectTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${option.value}`}
                    checked={filters.projectType.includes(option.value)}
                    onCheckedChange={(checked) => 
                      handleProjectTypeChange(option.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`type-${option.value}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-medium">{t('SDG Goals')}</Label>
            <div className="mt-2 space-y-2">
              {sdgOptions.map((sdg) => (
                <div key={sdg} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sdg-${sdg}`}
                    checked={filters.sdgs.includes(sdg)}
                    onCheckedChange={(checked) => 
                      handleSDGChange(sdg, checked as boolean)
                    }
                  />
                  <Label htmlFor={`sdg-${sdg}`} className="text-sm">
                    {sdg}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClear}>
            {t('Clear All')}
          </Button>
          <Button onClick={handleApply}>
            {t('Apply Filters')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
