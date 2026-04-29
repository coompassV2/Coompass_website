
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface RecognitionProgram {
  id: string;
  title: string;
  description: string;
  frequency: string;
  criteria: string;
  createdAt: Date;
  totalNominations: number;
  activeNominations: number;
}

interface DeleteRecognitionProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: RecognitionProgram | null;
  onConfirmDelete: () => void;
}

export function DeleteRecognitionProgramDialog({
  open,
  onOpenChange,
  program,
  onConfirmDelete,
}: DeleteRecognitionProgramDialogProps) {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirmDelete();
    onOpenChange(false);
  };

  if (!program) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <DialogTitle>{t('Delete Recognition Program')}</DialogTitle>
          </div>
          <DialogDescription>
            {t('Are you sure you want to delete this recognition program? This action cannot be undone.')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted/50 border border-muted rounded-lg p-4">
          <h4 className="font-semibold">{program.title}</h4>
          <p className="text-sm text-muted-foreground">{program.description}</p>
          <div className="mt-2 text-sm">
            <p>{t('Total nominations')}: {program.totalNominations}</p>
            <p>{t('Active nominations')}: {program.activeNominations}</p>
          </div>
        </div>
        
        {program.activeNominations > 0 && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <p className="text-sm text-destructive">
              <strong>{t('Warning')}:</strong> {t('This program has active nominations that will also be deleted.')}
            </p>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {t('Delete Program')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
