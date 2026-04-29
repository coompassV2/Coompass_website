
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EditVisionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentVision: string;
  onSave: (newVision: string) => void;
}

export function EditVisionDialog({ 
  isOpen, 
  onClose, 
  currentVision,
  onSave 
}: EditVisionDialogProps) {
  const { t } = useTranslation();
  const [vision, setVision] = useState(currentVision);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(vision);
      toast.success(t("Company vision updated successfully"));
      onClose();
    } catch (error) {
      toast.error(t("Failed to update company vision"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setVision(currentVision);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('Edit Company Vision')}</DialogTitle>
          <DialogDescription>
            {t('Update your company vision statement')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="vision">{t('Vision Statement')}</Label>
            <Textarea
              id="vision"
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder={t('Enter your company vision...')}
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
