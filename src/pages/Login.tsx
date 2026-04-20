import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Link } from "react-router-dom";
import { SEOManager } from "@/components/shared/SEOManager";
import { useAuth, homeForUser } from "@/contexts/AuthContext";
import { getStoredToken } from "@/services/authApi";
import { useTheme } from "@/hooks/useTheme";

const themes = {
  default: {
    background: '/kamran-abdullayev-9V1cYW4JIfQ-unsplash.jpg',
    logo: '/brisa-logo-branco.png'
  },
  caribbean: {
    background: '/lovable-uploads/2d5d215e-2b1c-40ee-b17f-bea9199f7d84.png',
    logo: '/lovable-uploads/70245805-0d4d-40c4-a0fd-3bb7a89fe469.png'
  }
};

export default function Login() {
  useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, loading, login } = useAuth();
  const theme = 'default';
  const forceOktaOnly = new URLSearchParams(location.search).get("provider") === "okta";

  // If already authenticated, redirect to the correct dashboard
  useEffect(() => {
    if (!loading && user && getStoredToken()) {
      navigate(homeForUser(user), { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <AuthLayout
        backgroundImage={themes[theme].background}
        logoImage={themes[theme].logo}
      >
        <div className="w-full max-w-md px-8">
          <div className="mb-8 flex flex-col items-center text-white">
            <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin" />
            <p className="mt-4 text-sm text-white/90">Checking session...</p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  const handleSignIn = async (email: string, password: string) => {
    try {
      const loggedInUser = await login(email, password);
      toast({
        title: t("Welcome back!"),
        description: t("You have successfully signed in."),
      });

      // Navigate to the dashboard matching the user's DB role
      navigate(homeForUser(loggedInUser), { replace: true });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Authentication Error"),
        description: error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  return (
    <>
      <SEOManager 
        title={t("Login to Coompass")}
        noIndex={true}
      />
      <AuthLayout 
        backgroundImage={themes[theme].background}
        logoImage={themes[theme].logo}
      >
      <div className="w-full max-w-md px-8">
        <div className="mb-8 flex flex-col items-center">
          <LoginForm onSubmit={handleSignIn} allowPassword={!forceOktaOnly} showSocialAuth={forceOktaOnly} />
          {forceOktaOnly && (
            <p className="mt-3 text-center text-xs text-white/80">
              This invitation requires Okta sign-in. Password login is disabled.
            </p>
          )}

        </div>
      </div>
    </AuthLayout>
    </>
  );
}
