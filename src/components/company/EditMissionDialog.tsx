
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EditMissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentMission: string;
  onSave: (newMission: string) => void;
}

export function EditMissionDialog({ 
  isOpen, 
  onClose, 
  currentMission,
  onSave 
}: EditMissionDialogProps) {
  const { t } = useTranslation();
  const [mission, setMission] = useState(currentMission);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(mission);
      toast.success(t("Company mission updated successfully"));
      onClose();
    } catch (error) {
      toast.error(t("Failed to update company mission"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setMission(currentMission);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('Edit Company Mission')}</DialogTitle>
          <DialogDescription>
            {t('Update your company mission statement')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="mission">{t('Mission Statement')}</Label>
            <Textarea
              id="mission"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder={t('Enter your company mission...')}
              rows={4}
              className="resize-none"
            />
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
