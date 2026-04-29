
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface EditTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
  teamDescription: string;
  onTeamNameChange: (value: string) => void;
  onTeamDescriptionChange: (value: string) => void;
}

export function EditTeamDialog({
  isOpen,
  onClose,
  onConfirm,
  teamName,
  teamDescription,
  onTeamNameChange,
  onTeamDescriptionChange
}: EditTeamDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Edit Team')}</DialogTitle>
          <DialogDescription>
            {t('Update the team information.')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="editTeamName">{t('Team Name')}</Label>
            <Input 
              id="editTeamName" 
              value={teamName}
              onChange={(e) => onTeamNameChange(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="editTeamDescription">{t('Description')}</Label>
            <Input 
              id="editTeamDescription" 
              value={teamDescription}
              onChange={(e) => onTeamDescriptionChange(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t('Cancel')}</Button>
          <Button onClick={onConfirm}>{t('Save Changes')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
