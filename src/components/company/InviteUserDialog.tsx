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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UserPlus, Copy, Check } from "lucide-react";
import { inviteCompanyUser, type AuthProvider, type CompanyUserRole } from "@/services/companyUsersApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InviteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function InviteUserDialog({ isOpen, onClose, onSuccess }: InviteUserDialogProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CompanyUserRole>("volunteer");
  const [authProvider, setAuthProvider] = useState<AuthProvider>("password");
  const [isLoading, setIsLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleClose = () => {
    setEmail("");
    setRole("volunteer");
    setAuthProvider("password");
    setInviteLink(null);
    setCopied(false);
    setEmailError(null);
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
    const trimmed = email.trim().toLowerCase();
    setEmailError(null);
    if (!trimmed) {
      setEmailError(t("Email is required"));
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError(t("Invalid email format"));
      return;
    }

    setIsLoading(true);
    setEmailError(null);
    try {
      const { data, error } = await inviteCompanyUser(trimmed, role, authProvider);
      if (error) {
        setEmailError(error);
        toast.error(error);
        return;
      }
      if (data?.invite_link) {
        setInviteLink(data.invite_link);
        toast.success(t("Invitation created successfully"));
        onSuccess?.();
      }
    } catch {
      const msg = t("Failed to send invitation");
      setEmailError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            {t("Invite User")}
          </DialogTitle>
          <DialogDescription>
            {t("Invite a user by email. Email must use a company domain.")}
          </DialogDescription>
        </DialogHeader>

        {inviteLink ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("Invitation created. Share this link with the user:")}
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
              <Button onClick={handleFinish}>{t("Done")}</Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteEmail">{t("Email Address")} *</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder={t("user@company.com")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                  className={emailError ? "border-destructive focus-visible:ring-destructive" : ""}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "inviteEmail-error" : undefined}
                />
                {emailError && (
                  <p id="inviteEmail-error" className="text-sm text-destructive">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteRole">{t("Role")} *</Label>
                <Select value={role} onValueChange={(v) => setRole(v as CompanyUserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select a role")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">{t("Administrator")}</SelectItem>
                    <SelectItem value="volunteer">{t("Volunteer")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteAuthProvider">{t("Sign-in Method")} *</Label>
                <Select value={authProvider} onValueChange={(v) => setAuthProvider(v as AuthProvider)}>
                  <SelectTrigger id="inviteAuthProvider">
                    <SelectValue placeholder={t("Select sign-in method")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="password">{t("Password")}</SelectItem>
                    <SelectItem value="okta">{t("Okta SSO")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                {t("Cancel")}
              </Button>
              <Button onClick={handleSendInvite} disabled={isLoading}>
                {isLoading ? t("Creating...") : t("Create Invitation")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
