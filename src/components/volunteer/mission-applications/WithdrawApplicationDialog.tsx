
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WithdrawApplicationDialogProps } from "./types";

export function WithdrawApplicationDialog({
  application,
  open,
  onOpenChange,
  withdrawalReason,
  setWithdrawalReason,
  onConfirm
}: WithdrawApplicationDialogProps) {
  const { t } = useTranslation();

  if (!application) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Withdraw Application')}</DialogTitle>
          <DialogDescription>
            {t('Are you sure you want to withdraw your application for')} {application.mission}?
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('Reason')} ({t('Optional')})</h4>
            <Textarea
              placeholder={t('Please let us know why you are withdrawing your application...')}
              value={withdrawalReason}
              onChange={(e) => setWithdrawalReason(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              {t('Your feedback helps organizations improve their volunteer recruitment process.')}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t('Confirm Withdrawal')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
