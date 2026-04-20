
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface ProjectFormFooterProps {
  onCancel: () => void;
}

export function ProjectFormFooter({ onCancel }: ProjectFormFooterProps) {
  const { t } = useTranslation();
  
  return (
    <DialogFooter className="mt-6">
      <Button type="button" variant="outline" onClick={onCancel}>
        {t('Cancel')}
      </Button>
      <Button type="submit">
        {t('Create Project')}
      </Button>
    </DialogFooter>
  );
}
