import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getStoredToken, getSessionFromApi } from "@/services/authApi";
import { homeForUser, useAuth } from "@/contexts/AuthContext";
import {
  getStoredOktaState,
  getStoredOktaCodeVerifier,
  clearOktaPkceStorage,
} from "@/utils/oktaAuth";
import { useToast } from "@/components/ui/use-toast";

type ExchangeResult = { user?: { role?: string; onboarding?: boolean }; error?: Error };
const inFlightCodeExchanges = new Map<string, Promise<ExchangeResult>>();

/**
 * Auth callback: after Okta redirect (code in URL) we exchange code for our JWT and redirect to dashboard.
 * With no code, we treat it as "check existing session" and redirect to dashboard or login.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { loginWithOkta, user, loading: authLoading } = useAuth();
  const [statusText, setStatusText] = useState("Completing sign-in...");

  useEffect(() => {
    let cancelled = false;
    const handleAuthCallback = async () => {
      const redirectWithExistingSession = async (): Promise<boolean> => {
        const token = getStoredToken();
        if (!token) return false;
        const session = await getSessionFromApi(token);
        if ("error" in session || !session.user) return false;
        if (cancelled) return true;
        navigate(homeForUser(session.user), { replace: true });
        return true;
      };

      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const storedState = getStoredOktaState();
      const codeVerifier = getStoredOktaCodeVerifier();
      const redirectUri = `${window.location.origin}${window.location.pathname}`;

      if (code) {
        const existingExchange = inFlightCodeExchanges.get(code);
        if (existingExchange) {
          setStatusText("Finalizing sign-in...");
          const result = await existingExchange;
          clearOktaPkceStorage();
          if (cancelled) return;
          if (result.user) {
            navigate(homeForUser(result.user), { replace: true });
            return;
          }
          if (await redirectWithExistingSession()) return;
          toast({
            variant: "destructive",
            description: result.error?.message ?? "Okta sign-in failed.",
          });
          navigate("/", { replace: true });
          return;
        }

        setStatusText("Validating callback state...");

        if (!codeVerifier) {
          // If user already has a valid app session, stale callback URL should not force login.
          if (await redirectWithExistingSession()) {
            clearOktaPkceStorage();
            return;
          }
          clearOktaPkceStorage();
          if (cancelled) return;
          toast({ variant: "destructive", description: "Session expired. Please try signing in again." });
          navigate("/", { replace: true });
          return;
        }

        if (state != null && storedState != null && state !== storedState) {
          clearOktaPkceStorage();
          if (cancelled) return;
          toast({ variant: "destructive", description: "Invalid state. Please try signing in again." });
          navigate("/", { replace: true });
          return;
        }

        setStatusText("Exchanging authorization code...");
        const exchangePromise: Promise<ExchangeResult> = (async () => {
          try {
            const user = await loginWithOkta(code, codeVerifier, redirectUri);
            return { user };
          } catch (err) {
            return {
              error: err instanceof Error ? err : new Error("Okta sign-in failed."),
            };
          } finally {
            inFlightCodeExchanges.delete(code);
          }
        })();
        inFlightCodeExchanges.set(code, exchangePromise);

        const result = await exchangePromise;
        clearOktaPkceStorage();
        if (cancelled) return;
        if (result.user) {
          navigate(homeForUser(result.user), { replace: true });
          return;
        }
        if (await redirectWithExistingSession()) return;
        toast({
          variant: "destructive",
          description: result.error?.message ?? "Okta sign-in failed.",
        });
        navigate("/", { replace: true });
        return;
      }

      setStatusText("Checking existing session...");
      if (authLoading) return;
      if (user) {
        if (cancelled) return;
        navigate(homeForUser(user), { replace: true });
        return;
      }
      if (cancelled) return;
      navigate("/", { replace: true });
    };
    handleAuthCallback();
    return () => {
      cancelled = true;
    };
  }, [navigate, searchParams, loginWithOkta, toast, authLoading, user]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-coompass-success border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">{statusText}</p>
      </div>
    </div>
  );
}
