import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { isOktaConfigured, getOktaAuthorizeUrl, clearOktaPkceStorage } from "@/utils/oktaAuth";

interface SocialAuthButtonsProps {
  disabled?: boolean;
}

/** Social/OAuth: Okta SSO only (invite flow). */
export function SocialAuthButtons({ disabled }: SocialAuthButtonsProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [oktaLoading, setOktaLoading] = useState(false);
  const ssoButtonClassName =
    "w-full flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-gray-50 border-slate-300 dark:bg-slate-900 dark:text-white dark:border-white/20 dark:hover:bg-slate-800";

  const handleOktaLogin = async () => {
    if (!isOktaConfigured()) {
      toast({ description: t("Okta SSO is not configured.") });
      return;
    }
    setOktaLoading(true);
    try {
      const origin = window.location.origin;
      const redirectUri = `${origin}/auth/callback`;
      const url = await getOktaAuthorizeUrl(redirectUri);
      if (url) {
        window.location.href = url;
        return;
      }
      toast({ variant: "destructive", description: t("Could not start Okta sign-in.") });
    } catch {
      clearOktaPkceStorage();
      toast({ variant: "destructive", description: t("Okta sign-in failed.") });
    } finally {
      setOktaLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {isOktaConfigured() && (
        <Button
          size="sm"
          variant="outline"
          className={ssoButtonClassName}
          disabled={disabled || oktaLoading}
          onClick={handleOktaLogin}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <circle cx="12" cy="16" r="1" />
            <rect x="3" y="10" width="18" height="12" rx="2" />
            <path d="M7 10V7a5 5 0 0 1 10 0v3" />
          </svg>
          {oktaLoading ? t("Redirecting…") : t("Sign in with Okta")}
        </Button>
      )}
      {!isOktaConfigured() && (
        <Button
          size="sm"
          variant="outline"
          className={ssoButtonClassName}
          disabled={disabled}
          onClick={() => toast({ description: t("Okta SSO is not configured.") })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <circle cx="12" cy="16" r="1" />
            <rect x="3" y="10" width="18" height="12" rx="2" />
            <path d="M7 10V7a5 5 0 0 1 10 0v3" />
          </svg>
          {t("Sign in with Okta")}
        </Button>
      )}
    </div>
  );
}
