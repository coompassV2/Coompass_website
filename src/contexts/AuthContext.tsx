import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import {
  AUTH_EXPIRED_EVENT,
  type AuthUser,
  getStoredToken,
  setStoredToken,
  clearStoredToken,
  setStoredOktaIdToken,
  clearStoredOktaIdToken,
  loginWithPassword,
  loginWithOktaCode,
  logoutApi,
  getSessionFromApi,
} from "@/services/authApi";

export type UserRole = "volunteer" | "company_admin" | "nonprofit";

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  loginWithOkta: (code: string, codeVerifier: string, redirectUri: string) => Promise<AuthUser>;
  refreshSession: () => Promise<AuthUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setLoading(false);
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
  }, []);

  const normalizeUser = useCallback((authUser: AuthUser): AuthUser => {
    return {
      ...authUser,
      auth_provider: authUser.auth_provider === "okta" ? "okta" : "password",
      must_change_password: authUser.must_change_password === true,
      onboarding: authUser.onboarding === true,
      company_onboarding_completed: authUser.company_onboarding_completed === true,
      nonprofit_onboarding_completed: authUser.nonprofit_onboarding_completed === true,
    };
  }, []);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      return;
    }
    getSessionFromApi(token)
      .then((result) => {
        if ("error" in result || !result.user) {
          clearStoredToken();
          setUser(null);
        } else {
          setUser(normalizeUser(result.user));
        }
      })
      .catch(() => {
        clearStoredToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [normalizeUser]);

  const login = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    const result = await loginWithPassword(email, password);
    if ("error" in result) {
      throw new Error(result.error);
    }
    const normalizedUser = normalizeUser(result.user);
    setStoredToken(result.access_token);
    setUser(normalizedUser);
    return normalizedUser;
  }, [normalizeUser]);

  const loginWithOkta = useCallback(
    async (code: string, codeVerifier: string, redirectUri: string): Promise<AuthUser> => {
      const result = await loginWithOktaCode(code, codeVerifier, redirectUri);
      if ("error" in result) {
        throw new Error(result.error);
      }
      const normalizedUser = normalizeUser(result.user);
      setStoredToken(result.access_token);
      if (result.okta_id_token) {
        setStoredOktaIdToken(result.okta_id_token);
      } else {
        clearStoredOktaIdToken();
      }
      setUser(normalizedUser);
      return normalizedUser;
    },
    [normalizeUser]
  );

  const refreshSession = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      return null;
    }
    const result = await getSessionFromApi(token);
    if ("error" in result || !result.user) {
      clearStoredToken();
      setUser(null);
      return null;
    }
    const normalizedUser = normalizeUser(result.user);
    setUser(normalizedUser);
    return normalizedUser;
  }, [normalizeUser]);

  const logout = useCallback(async () => {
    const token = getStoredToken();
    await logoutApi(token);
    clearStoredToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithOkta, refreshSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export function dashboardForRole(role?: string): string {
  switch (role) {
    case "company_admin":
      return "/company/dashboard";
    case "nonprofit":
      return "/nonprofit/dashboard";
    case "volunteer":
    default:
      return "/volunteer/dashboard";
  }
}

export function settingsForRole(role?: string): string {
  switch (role) {
    case "company_admin":
      return "/company/settings";
    case "nonprofit":
      return "/nonprofit/settings";
    case "volunteer":
    default:
      return "/volunteer/settings";
  }
}

export function profilePathForUser(role?: string): string {
  if (role === "volunteer") {
    return "/volunteer/settings";
  }
  return "/profile";
}

export function onboardingPathForUser(user?: AuthUser | null): string | null {
  if (!user) return null;

  if (user.role === "company_admin" && user.company_onboarding_completed !== true) {
    return "/company/settings";
  }

  if (user.role === "nonprofit" && user.nonprofit_onboarding_completed !== true) {
    return "/nonprofit/settings";
  }

  if (user.role === "volunteer" && user.onboarding === false) {
    return "/volunteer/settings";
  }

  if (user.onboarding === false) {
    return profilePathForUser(user.role);
  }

  return null;
}

export function homeForUser(user?: AuthUser | null): string {
  if (!user) return "/";
  if (user.auth_provider !== "okta" && user.must_change_password === true) {
    return "/auth/password/setup?mode=first-login";
  }
  const onboardingPath = onboardingPathForUser(user);
  if (onboardingPath) {
    return onboardingPath;
  }
  return dashboardForRole(user.role);
}
