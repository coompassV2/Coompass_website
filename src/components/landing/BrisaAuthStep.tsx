import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Building2, Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { homeForUser, useAuth } from "@/contexts/AuthContext";
import { clearOktaPkceStorage, getOktaAuthorizeUrl, isOktaConfigured } from "@/utils/oktaAuth";

export interface BrisaAuthStepProps {
  onBack: () => void;
}

export function BrisaAuthStep({ onBack }: BrisaAuthStepProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const handlePlaceholder = () => {
    toast({
      title: t("landingBrisa.auth.comingSoon"),
      description: t("landingBrisa.auth.comingSoonDesc"),
    });
  };

  const handleOktaSignIn = async () => {
    if (!isOktaConfigured()) {
      handlePlaceholder();
      return;
    }
    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const url = await getOktaAuthorizeUrl(redirectUri);
      if (url) {
        window.location.href = url;
      }
    } catch {
      clearOktaPkceStorage();
      toast({
        title: t("landingBrisa.auth.comingSoon"),
        description: t("landingBrisa.auth.comingSoonDesc"),
      });
    }
  };

  const handleEmailSignIn = () => {
    setShowEmailForm(true);
  };

  const handleEmailPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("brisa-email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("brisa-password") as HTMLInputElement).value;
    if (!email || !password) return;

    setEmailLoading(true);
    try {
      const user = await login(email, password);
      toast({
        title: t("Welcome back!"),
        description: t("You have successfully signed in."),
      });
      const fromState = location.state as { from?: { pathname?: string; search?: string; hash?: string } } | null;
      const fromPath = fromState?.from?.pathname;
      const fromSearch = fromState?.from?.search ?? "";
      const fromHash = fromState?.from?.hash ?? "";
      const destination = fromPath ? `${fromPath}${fromSearch}${fromHash}` : homeForUser(user);
      navigate(destination, { replace: true });
      window.scrollTo(0, 0);
    } catch (err) {
      toast({
        variant: "destructive",
        title: t("Authentication Error"),
        description: err instanceof Error ? err.message : t("Invalid email or password."),
      });
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <button
        type="button"
        onClick={onBack}
        className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors self-start -mt-0.5"
        )}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        {t("Back")}
      </button>

      <p className="text-[11px] text-muted-foreground mb-1">
        {t("landingBrisa.auth.chooseAccount")}
      </p>

      {/* Okta SSO – employees & admins */}
      <div
        className={cn(
          "rounded-lg border-2 border-border bg-muted/30 p-3 transition-colors",
          "hover:border-emerald-300 dark:hover:border-emerald-700"
        )}
      >
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              {t("landingBrisa.auth.oktaTitle")}
            </h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {t("landingBrisa.auth.oktaDesc")}
            </p>
            <Button
              size="sm"
              className="mt-2 h-7 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white border-0 text-xs"
              onClick={handleOktaSignIn}
            >
              {t("landingBrisa.auth.signInWithOkta")}
            </Button>
          </div>
        </div>
      </div>

      {/* Work email / Gmail – nonprofits */}
      <div
        className={cn(
          "rounded-lg border-2 border-border bg-muted/30 p-3 transition-colors",
          "hover:border-emerald-300 dark:hover:border-emerald-700"
        )}
      >
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Mail className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              {t("landingBrisa.auth.emailTitle")}
            </h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {t("landingBrisa.auth.emailDesc")}
            </p>
            {showEmailForm ? (
              <form onSubmit={handleEmailPasswordSubmit} className="mt-2 space-y-2" autoComplete="on">
                <Input
                  name="brisa-email"
                  type="email"
                  placeholder={t("Email placeholder")}
                  className="h-8 rounded-md text-xs border-border"
                  autoComplete="email"
                  required
                  disabled={emailLoading}
                />
                <Input
                  name="brisa-password"
                  type="password"
                  placeholder={t("Password")}
                  className="h-8 rounded-md text-xs border-border"
                  autoComplete="current-password"
                  required
                  disabled={emailLoading}
                />
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="text-[11px] text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 underline"
                  >
                    {t("Back")}
                  </button>
                  <Link
                    to="/auth/password/recover"
                    className="text-[11px] text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 underline"
                  >
                    {t("Forgot password?")}
                  </Link>
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="h-7 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white border-0 text-xs w-full"
                  disabled={emailLoading}
                >
                  {emailLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    t("landingBrisa.auth.signInWithEmail")
                  )}
                </Button>
              </form>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="mt-2 h-7 rounded-md text-xs hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400 dark:hover:border-emerald-700"
                onClick={handleEmailSignIn}
              >
                {t("landingBrisa.auth.signInWithEmail")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
