
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTeamDialog({ isOpen, onClose, onConfirm }: DeleteTeamDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Delete Team')}</DialogTitle>
          <DialogDescription>
            {t('Are you sure you want to delete this team? This action cannot be undone.')}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="destructive" onClick={onConfirm}>{t('Delete Team')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
