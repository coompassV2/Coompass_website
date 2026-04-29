
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WithdrawDialogProps } from "./types";
import { useState } from "react";

export function WithdrawDialog({ 
  application, 
  open, 
  onOpenChange, 
  onConfirm 
}: WithdrawDialogProps) {
  const { t } = useTranslation();
  const [reason, setReason] = useState<string>("");
  
  if (!application) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Withdraw Application')}</DialogTitle>
          <DialogDescription>
            {t('Are you sure you want to withdraw your application for')} {application.projectTitle}?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {t('This action cannot be undone. The organization will be notified that you have withdrawn your application.')}
          </p>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('Reason (Optional)')}</h4>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">{t('Select a reason')}</option>
              <option value="schedule">{t('Schedule conflict')}</option>
              <option value="capacity">{t('At capacity with other projects')}</option>
              <option value="match">{t('Not a good match for my skills')}</option>
              <option value="other">{t('Other')}</option>
            </select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button 
            variant="destructive"
            onClick={onConfirm}
          >
            {t('Withdraw Application')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
