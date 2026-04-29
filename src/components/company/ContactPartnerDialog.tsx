
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContactPartnerDialogProps {
  partnership: {
    id: number;
    organization: {
      name: string;
    };
    contactPerson?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactPartnerDialog({ partnership, isOpen, onClose }: ContactPartnerDialogProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [contactMethod, setContactMethod] = useState("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: t("Message Sent"),
      description: t("Your message has been sent to {partner}.", { 
        partner: partnership?.organization.name || "the partner" 
      }),
    });
    
    onClose();
  };

  if (!partnership) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Contact")}: {partnership.organization.name}</DialogTitle>
          <DialogDescription>
            {partnership.contactPerson ? 
              t("Send a message to {person}.", { person: partnership.contactPerson }) : 
              t("Send a message to this partner organization.")}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactMethod">{t("Contact Method")}</Label>
            <Select value={contactMethod} onValueChange={setContactMethod}>
              <SelectTrigger id="contactMethod">
                <SelectValue placeholder={t("Select contact method")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">{t("Email")}</SelectItem>
                <SelectItem value="platform">{t("Platform Message")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t("Subject")}</Label>
            <Input 
              id="subject" 
              placeholder={t("Enter message subject")} 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("Message")}</Label>
            <Textarea 
              id="message" 
              placeholder={t("Enter your message...")} 
              rows={5} 
              className="resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              {t("Cancel")}
            </Button>
            <Button type="submit">
              {t("Send Message")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
