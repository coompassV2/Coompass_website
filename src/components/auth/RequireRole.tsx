import { Navigate } from "react-router-dom";
import { useAuth, dashboardForRole, type UserRole } from "@/contexts/AuthContext";

interface RequireRoleProps {
  /** Which roles are allowed to view this route */
  allowed: UserRole[];
  children: React.ReactNode;
}

/**
 * Wraps routes that are restricted to specific roles.
 * Must be used inside <RequireAuth> (assumes user is already authenticated).
 * - If the user's role is in `allowed`: renders children.
 * - Otherwise: redirects to the user's correct dashboard.
 */
export function RequireRole({ allowed, children }: RequireRoleProps) {
  const { user } = useAuth();

  if (!user?.role || !allowed.includes(user.role as UserRole)) {
    // Send them to the dashboard their role actually maps to
    return <Navigate to={dashboardForRole(user?.role)} replace />;
  }

  return <>{children}</>;
}
