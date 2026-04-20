
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CreateTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
  teamDescription: string;
  onTeamNameChange: (value: string) => void;
  onTeamDescriptionChange: (value: string) => void;
}

export function CreateTeamDialog({
  isOpen,
  onClose,
  onConfirm,
  teamName,
  teamDescription,
  onTeamNameChange,
  onTeamDescriptionChange
}: CreateTeamDialogProps) {
  const { t } = useTranslation();

  const handleClose = () => {
    onTeamNameChange("");
    onTeamDescriptionChange("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Create New Team')}</DialogTitle>
          <DialogDescription>
            {t('Create a new volunteer team to organize employees for missions.')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="teamName">{t('Team Name')}</Label>
            <Input 
              id="teamName" 
              placeholder={t('Enter a name for your team')} 
              value={teamName}
              onChange={(e) => onTeamNameChange(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="teamDescription">{t('Description')}</Label>
            <Input 
              id="teamDescription" 
              placeholder={t('Describe the team\'s focus')} 
              value={teamDescription}
              onChange={(e) => onTeamDescriptionChange(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>{t('Cancel')}</Button>
          <Button onClick={onConfirm}>{t('Create Team')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
