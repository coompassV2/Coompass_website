import { Navigate, useLocation } from "react-router-dom";
import { onboardingPathForUser, useAuth } from "@/contexts/AuthContext";
import { AuthLoadingShell } from "@/components/auth/AuthLoadingShell";

/**
 * Wraps routes that require authentication.
 * - While loading the session: shows nothing (avoids flash).
 * - If not authenticated: redirects to /.
 * - If authenticated but onboarding incomplete: redirects to the required onboarding page.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AuthLoadingShell />;
  }

  if (!user) {
    // Preserve the attempted URL so we can redirect back after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const isPasswordUser = user.auth_provider !== "okta";
  const isPasswordSetupRoute = location.pathname.startsWith("/auth/password/setup");
  if (isPasswordUser && user.must_change_password === true && !isPasswordSetupRoute) {
    return <Navigate to="/auth/password/setup?mode=first-login" state={{ from: location }} replace />;
  }

  const requiredOnboardingPath = onboardingPathForUser(user);
  if (requiredOnboardingPath && !location.pathname.startsWith(requiredOnboardingPath)) {
    return <Navigate to={requiredOnboardingPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
