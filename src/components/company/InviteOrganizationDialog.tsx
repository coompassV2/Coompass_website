import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Building2, Copy, Check } from "lucide-react";
import { inviteOrganization } from "@/services/companyOrganizationsApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InviteOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function InviteOrganizationDialog({ isOpen, onClose, onSuccess }: InviteOrganizationDialogProps) {
  const { t } = useTranslation();
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    setOrganizationName("");
    setEmail("");
    setInviteLink(null);
    setCopied(false);
    setErrorMessage(null);
    onClose();
  };

  const handleCopyLink = async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success(t("Link copied to clipboard"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("Failed to copy link"));
    }
  };

  const handleSendInvite = async () => {
    const normalizedName = organizationName.trim();
    const normalizedEmail = email.trim().toLowerCase();
    setErrorMessage(null);

    if (normalizedName.length < 2) {
      setErrorMessage(t("Organization name is required"));
      return;
    }
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setErrorMessage(t("Invalid email format"));
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await inviteOrganization({
        organizationName: normalizedName,
        email: normalizedEmail,
      });
      if (error) {
        setErrorMessage(error);
        toast.error(error);
        return;
      }
      if (data?.invite_link) {
        setInviteLink(data.invite_link);
        toast.success(t("Organization invitation created successfully"));
        onSuccess?.();
      }
    } catch {
      const msg = t("Failed to create organization invitation");
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {t("Invite organization")}
          </DialogTitle>
          <DialogDescription>
            {t("Create a nonprofit invitation with organization name and owner email.")}
          </DialogDescription>
        </DialogHeader>

        {inviteLink ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("Invitation created. Share this link with the nonprofit owner:")}
            </p>
            <div className="flex gap-2">
              <Input
                readOnly
                value={inviteLink}
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                title={t("Copy link")}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>{t("Done")}</Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">{t("Organization Name")} *</Label>
                <Input
                  id="organizationName"
                  placeholder={t("Organization name")}
                  value={organizationName}
                  onChange={(e) => {
                    setOrganizationName(e.target.value);
                    setErrorMessage(null);
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationEmail">{t("Owner Email")} *</Label>
                <Input
                  id="organizationEmail"
                  type="email"
                  placeholder={t("owner@nonprofit.org")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-destructive">{errorMessage}</p>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                {t("Cancel")}
              </Button>
              <Button onClick={handleSendInvite} disabled={isLoading}>
                {isLoading ? t("Creating...") : t("Create organization invitation")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
