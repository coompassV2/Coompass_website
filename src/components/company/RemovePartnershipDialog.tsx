
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RemovePartnershipDialogProps {
  partnership: {
    id: number;
    organization: {
      name: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function RemovePartnershipDialog({
  partnership,
  isOpen,
  onClose,
  onConfirm,
}: RemovePartnershipDialogProps) {
  const { t } = useTranslation();

  if (!partnership) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Remove Partnership")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("Are you sure you want to end the partnership with {{organizationName}}? This action cannot be undone and will remove all associated data.", {
              organizationName: partnership.organization.name
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            {t("Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t("Remove Partnership")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
