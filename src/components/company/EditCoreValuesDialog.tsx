
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";

interface EditCoreValuesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentValues: string[];
  onSave: (newValues: string[]) => void;
}

export function EditCoreValuesDialog({ 
  isOpen, 
  onClose, 
  currentValues,
  onSave 
}: EditCoreValuesDialogProps) {
  const { t } = useTranslation();
  const [values, setValues] = useState<string[]>(currentValues);
  const [newValue, setNewValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddValue = () => {
    if (newValue.trim() && !values.includes(newValue.trim())) {
      setValues([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const handleRemoveValue = (valueToRemove: string) => {
    setValues(values.filter(value => value !== valueToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddValue();
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(values);
      toast.success(t("Core values updated successfully"));
      onClose();
    } catch (error) {
      toast.error(t("Failed to update core values"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setValues(currentValues);
    setNewValue("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('Edit Core Values')}</DialogTitle>
          <DialogDescription>
            {t('Update your company core values')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{t('Current Values')}</Label>
            <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-lg">
              {values.map((value, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-blue-500/10 text-blue-600 border-blue-300 pr-1"
                >
                  {value}
                  <button
                    onClick={() => handleRemoveValue(value)}
                    className="ml-2 hover:bg-red-500/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {values.length === 0 && (
                <span className="text-muted-foreground text-sm">
                  {t('No values added yet')}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newValue">{t('Add New Value')}</Label>
            <div className="flex gap-2">
              <Input
                id="newValue"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('Enter a core value...')}
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAddValue}
                disabled={!newValue.trim() || values.includes(newValue.trim())}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? t('Saving...') : t('Save Changes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
