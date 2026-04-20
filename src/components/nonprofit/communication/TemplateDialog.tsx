
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface TemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: () => void;
}

export function TemplateDialog({ isOpen, onClose, onUseTemplate }: TemplateDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('Use Template')}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>{t('Are you sure you want to use this template?')}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {t('This will open the email form with the template content.')}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button onClick={onUseTemplate}>
            {t('Use Template')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
