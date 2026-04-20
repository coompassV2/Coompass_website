
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface VolunteerContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  volunteer: { id: number; name: string } | null;
  onSendMessage: () => void;
}

export function VolunteerContactDialog({
  open,
  onOpenChange,
  volunteer,
  onSendMessage,
}: VolunteerContactDialogProps) {
  const { t } = useTranslation();
  const [contactMessage, setContactMessage] = useState("");
  
  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      toast.error(t("Please enter a message"));
      return;
    }
    
    onSendMessage();
    setContactMessage("");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {t('Contact')} {volunteer?.name}
          </DialogTitle>
          <DialogDescription>
            {t('Send a message to this volunteer')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            className="min-h-32"
            placeholder={t('Type your message...')}
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSendMessage}>
            {t('Send Message')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
