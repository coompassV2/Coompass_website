import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import {
  acceptInvite,
  acceptNonprofitInvite,
  changePassword,
  getNonprofitInviteDetails,
  getStoredToken,
  resetPasswordWithToken,
} from "@/services/authApi";
import { useAuth } from "@/contexts/AuthContext";

type PasswordMode = "invite" | "nonprofit-invite" | "recover" | "first-login";

export default function AuthPasswordSetup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { refreshSession, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nonprofitOrganizationName, setNonprofitOrganizationName] = useState<string>("");
  const [inviteDetailsLoading, setInviteDetailsLoading] = useState(false);
  const [inviteDetailsError, setInviteDetailsError] = useState<string | null>(null);

  const mode = useMemo<PasswordMode>(() => {
    const raw = searchParams.get("mode");
    if (raw === "recover" || raw === "first-login" || raw === "nonprofit-invite") return raw;
    return "invite";
  }, [searchParams]);
  const token = searchParams.get("token") ?? "";
  const needsToken = mode === "invite" || mode === "recover" || mode === "nonprofit-invite";

  const title = mode === "recover"
    ? t("Reset Password")
    : mode === "first-login"
      ? t("Set Your Password")
      : mode === "nonprofit-invite"
        ? t("Accept Organization Invitation")
      : t("Accept Invitation");

  const submitLabel = mode === "recover"
    ? t("Reset password")
    : mode === "first-login"
      ? t("Save password")
      : mode === "nonprofit-invite"
        ? t("Create nonprofit account")
      : t("Create account");

  useEffect(() => {
    if (mode !== "nonprofit-invite" || !token) {
      setNonprofitOrganizationName("");
      setInviteDetailsError(null);
      setInviteDetailsLoading(false);
      return;
    }

    let active = true;
    setInviteDetailsLoading(true);
    setInviteDetailsError(null);
    void getNonprofitInviteDetails(token).then((result) => {
      if (!active) return;
      setInviteDetailsLoading(false);
      if (result.error) {
        setInviteDetailsError(result.error);
        setNonprofitOrganizationName("");
        return;
      }
      setNonprofitOrganizationName(result.organization_name ?? "");
    });

    return () => {
      active = false;
    };
  }, [mode, token]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.auth_provider === "okta") {
      toast({
        variant: "destructive",
        title: t("Unavailable"),
        description: t("This account is managed by Okta. Password setup is not available."),
      });
      return;
    }
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: t("Invalid password"),
        description: t("Password must be at least 8 characters."),
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: t("Passwords do not match"),
        description: t("Please confirm the same password."),
      });
      return;
    }
    if (needsToken && !token) {
      toast({
        variant: "destructive",
        title: t("Invalid link"),
        description: t("Token is missing from this link."),
      });
      return;
    }
    if (mode === "nonprofit-invite" && inviteDetailsError) {
      toast({ variant: "destructive", title: t("Invalid invitation"), description: inviteDetailsError });
      return;
    }

    setLoading(true);
    if (mode === "invite") {
      const result = await acceptInvite(token, password);
      setLoading(false);
      if (result.error) {
        toast({ variant: "destructive", title: t("Could not accept invitation"), description: result.error });
        return;
      }
      toast({
        title: t("Account created"),
        description: t("Your invitation was accepted. You can now sign in."),
      });
      navigate("/login", { replace: true });
      return;
    }

    if (mode === "nonprofit-invite") {
      const result = await acceptNonprofitInvite(token, password);
      setLoading(false);
      if (result.error) {
        toast({ variant: "destructive", title: t("Could not accept invitation"), description: result.error });
        return;
      }
      toast({
        title: t("Nonprofit account created"),
        description: t("Your invitation was accepted. You can now sign in and complete your nonprofit profile."),
      });
      navigate("/login", { replace: true });
      return;
    }

    if (mode === "recover") {
      const result = await resetPasswordWithToken(token, password);
      setLoading(false);
      if (result.error) {
        toast({ variant: "destructive", title: t("Could not reset password"), description: result.error });
        return;
      }
      toast({
        title: t("Password updated"),
        description: result.message ?? t("You can now sign in with your new password."),
      });
      navigate("/login", { replace: true });
      return;
    }

    const accessToken = getStoredToken();
    const result = await changePassword(currentPassword, password, accessToken);
    setLoading(false);
    if (result.error) {
      toast({ variant: "destructive", title: t("Could not update password"), description: result.error });
      return;
    }
    await refreshSession();
    toast({
      title: t("Password updated"),
      description: t("Your password was updated successfully."),
    });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">
          {mode === "first-login"
            ? t("To continue, choose a new password for your account.")
            : t("Set a password with at least 8 characters.")}
        </p>
        {mode === "nonprofit-invite" && (
          <p className="text-base font-medium text-foreground">
            {inviteDetailsLoading
              ? t("Checking invitation details...")
              : nonprofitOrganizationName
                ? t("Organization: {{name}}", { name: nonprofitOrganizationName })
                : inviteDetailsError
                  ? inviteDetailsError
                  : t("Invitation details unavailable.")}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "first-login" && (
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder={t("Current password")}
              autoComplete="current-password"
              required
            />
          )}
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("New password")}
            autoComplete="new-password"
            required
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t("Confirm new password")}
            autoComplete="new-password"
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loading || (mode === "nonprofit-invite" && inviteDetailsLoading)}
          >
            {loading ? t("Saving...") : submitLabel}
          </Button>
        </form>

        <div className="text-sm">
          <Link to="/login" className="underline underline-offset-2">
            {t("Back to login")}
          </Link>
        </div>
      </div>
    </div>
  );
}
