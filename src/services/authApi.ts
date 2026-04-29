/**
 * Auth goes through our backend (/api/auth/*), not Supabase Auth.
 * Backend = same host as the app (e.g. coompass.vercel.app/api/auth/login). No separate backend URL.
 * When VITE_API_URL is unset (e.g. on Vercel), API_BASE is "" so requests use same origin.
 * Set VITE_API_URL only for local dev when the API runs on another port (e.g. http://localhost:3001).
 */
const API_BASE = import.meta.env.VITE_API_URL ?? "";
const AUTH_TOKEN_KEY = "coompass.auth.token";
const OKTA_ID_TOKEN_KEY = "coompass.okta.id_token";
export const AUTH_EXPIRED_EVENT = "coompass:auth-expired";
export const ONBOARDING_REQUIRED_EVENT = "coompass:onboarding-required";

/** SessionStorage keys for Okta PKCE flow */
export const OKTA_CODE_VERIFIER_KEY = "coompass.okta.code_verifier";
export const OKTA_STATE_KEY = "coompass.okta.state";

export type AuthUser = {
  id: string;
  email?: string;
  role?: string;
  auth_provider?: "password" | "okta";
  must_change_password?: boolean;
  onboarding?: boolean;
  company_onboarding_completed?: boolean;
  nonprofit_onboarding_completed?: boolean;
  user_metadata?: Record<string, unknown>;
};

export type LoginResponse =
  | { access_token: string; expires_at?: number | null; user: AuthUser; okta_id_token?: string }
  | { error: string };

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getStoredOktaIdToken(): string | null {
  return sessionStorage.getItem(OKTA_ID_TOKEN_KEY);
}

export function setStoredOktaIdToken(idToken: string): void {
  sessionStorage.setItem(OKTA_ID_TOKEN_KEY, idToken);
}

export function clearStoredOktaIdToken(): void {
  sessionStorage.removeItem(OKTA_ID_TOKEN_KEY);
}

export type SessionResponse =
  | { user: AuthUser | null }
  | { error: string };

export async function acceptInvite(
  token: string,
  password: string
): Promise<{ message?: string; user?: AuthUser; error?: string }> {
  const res = await fetch(`${API_BASE}/api/auth/invite/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: (data?.error as string) ?? "Could not accept invitation." };
  return data as { message?: string; user?: AuthUser };
}

export async function acceptNonprofitInvite(
  token: string,
  password: string
): Promise<{ message?: string; user?: AuthUser; nonprofit_id?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/api/auth/nonprofit-invite/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: (data?.error as string) ?? "Could not accept nonprofit invitation." };
  return data as { message?: string; user?: AuthUser; nonprofit_id?: string };
}

export async function getNonprofitInviteDetails(
  token: string
): Promise<{ organization_name?: string; expires_at?: string; error?: string }> {
  const params = new URLSearchParams({ token });
  const res = await fetch(`${API_BASE}/api/auth/nonprofit-invite/details?${params.toString()}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: (data?.error as string) ?? "Could not validate nonprofit invitation." };
  }
  return data as { organization_name?: string; expires_at?: string };
}

export async function requestPasswordRecovery(
  email: string,
  locale?: string
): Promise<{ message?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/api/auth/password/forgot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, locale }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: (data?.error as string) ?? "Could not start password recovery." };
  return data as { message?: string };
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string
): Promise<{ message?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/api/auth/password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, new_password: newPassword }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: (data?.error as string) ?? "Could not reset password." };
  return data as { message?: string };
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  accessToken: string | null
): Promise<{ message?: string; error?: string }> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const res = await fetch(`${API_BASE}/api/auth/password/change`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });
  if (res.status === 401) {
    notifyAuthExpired();
    return { error: "Session expired. Please sign in again." };
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: (data?.error as string) ?? "Could not change password." };
  return data as { message?: string };
}

function notifyAuthExpired(): void {
  cleanupAuthState();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
  }
}

function parseOnboardingRequired(payload: unknown): { error: string; settings_path?: string } | null {
  const source = (payload ?? {}) as Record<string, unknown>;
  if (source.code !== "onboarding_required") return null;
  return {
    error:
      typeof source.error === "string" && source.error.length > 0
        ? source.error
        : "Complete your onboarding to continue.",
    settings_path: typeof source.settings_path === "string" ? source.settings_path : undefined,
  };
}

function notifyOnboardingRequired(payload: { error: string; settings_path?: string }): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ONBOARDING_REQUIRED_EVENT, { detail: payload }));
  if (payload.settings_path && !window.location.pathname.startsWith(payload.settings_path)) {
    window.location.assign(payload.settings_path);
  }
}

export async function loginWithPassword(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { error: data?.error ?? "Login failed." };
  }
  return data as LoginResponse;
}

/**
 * Exchange Okta authorization code (from redirect) for our app JWT.
 * Same response shape as loginWithPassword. Used after Okta redirects to /auth/callback?code=...
 */
export async function loginWithOktaCode(
  code: string,
  codeVerifier: string,
  redirectUri: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/auth/okta/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { error: (data?.error as string) ?? "Okta sign-in failed." };
  }
  return data as LoginResponse;
}

export async function logoutApi(accessToken: string | null): Promise<void> {
  if (!accessToken) return;
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export async function getSessionFromApi(
  accessToken: string | null
): Promise<SessionResponse> {
  if (!accessToken) return { user: null };
  const res = await fetch(`${API_BASE}/api/auth/session`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 401) {
    notifyAuthExpired();
    return { error: "Session expired. Please sign in again." };
  }
  const data = await res.json();
  if (!res.ok) return { error: data?.error ?? "Session check failed." };
  const session = data as SessionResponse;
  if (!("error" in session) && !session.user) {
    notifyAuthExpired();
    return { error: "Session expired. Please sign in again." };
  }
  return session;
}

/** Fetch JSON from a backend API route with optional Bearer token. */
export async function apiGet<T>(
  path: string,
  accessToken: string | null
): Promise<{ data?: T; error?: string }> {
  const headers: HeadersInit = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const res = await fetch(`${API_BASE}${path}`, { headers });
  if (res.status === 401) {
    notifyAuthExpired();
    return { error: "Session expired. Please sign in again." };
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) {
    const onboardingRequired = parseOnboardingRequired(data);
    if (onboardingRequired) {
      notifyOnboardingRequired(onboardingRequired);
      return { error: onboardingRequired.error };
    }
  }
  if (!res.ok) return { error: (data?.error as string) ?? "Request failed." };
  return { data: data as T };
}

/**
 * Raw API fetch with optional Bearer token.
 * Use this for non-JSON responses (e.g. file downloads) while keeping auth-expiry handling centralized.
 */
export async function apiFetch(
  path: string,
  init: RequestInit = {},
  accessToken: string | null = null
): Promise<Response> {
  const headers = new Headers(init.headers ?? {});
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (res.status === 401) {
    notifyAuthExpired();
  }
  return res;
}

export type ProfileImageKind =
  | "nonprofit_logo"
  | "company_logo"
  | "user_avatar";

export type BannerImageKind = "nonprofit_banner" | "company_banner";

async function uploadMultipartImage(
  path: string,
  kind: string,
  file: File,
  accessToken: string | null
): Promise<{ url?: string; error?: string }> {
  const formData = new FormData();
  formData.append("kind", kind);
  formData.append("file", file);

  const res = await apiFetch(
    path,
    {
      method: "POST",
      body: formData,
    },
    accessToken
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: (data?.error as string) ?? "Upload failed." };
  }
  return { url: data?.url as string };
}

export async function uploadProfileImage(
  kind: ProfileImageKind,
  file: File,
  accessToken: string | null
): Promise<{ url?: string; error?: string }> {
  return uploadMultipartImage("/api/uploads/profile-image", kind, file, accessToken);
}

export async function uploadBannerImage(
  kind: BannerImageKind,
  file: File,
  accessToken: string | null
): Promise<{ url?: string; error?: string }> {
  return uploadMultipartImage("/api/uploads/banner-image", kind, file, accessToken);
}

export async function uploadMissionImage(
  file: File,
  accessToken: string | null
): Promise<{ url?: string; error?: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiFetch(
    "/api/uploads/mission-image",
    {
      method: "POST",
      body: formData,
    },
    accessToken
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: (data?.error as string) ?? "Upload failed." };
  }
  return { url: data?.url as string };
}

export type MissionAttachmentCategory =
  | "documents"
  | "final_documents"
  | "photos";

export type MissionAttachmentItem = {
  id: string;
  mission_id: string;
  category: MissionAttachmentCategory;
  storage_path: string;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
  signed_url: string | null;
};

export async function uploadMissionAttachment(
  missionId: string,
  category: MissionAttachmentCategory,
  file: File,
  accessToken: string | null
): Promise<{ file?: MissionAttachmentItem; error?: string }> {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("file", file);
  const res = await apiFetch(
    `/api/missions/${missionId}/files`,
    {
      method: "POST",
      body: formData,
    },
    accessToken
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: (data?.error as string) ?? "Upload failed." };
  }
  return { file: data?.file as MissionAttachmentItem };
}

export async function listMissionAttachments(
  missionId: string,
  accessToken: string | null
): Promise<{ files?: MissionAttachmentItem[]; error?: string }> {
  const { data, error } = await apiGet<{ files: MissionAttachmentItem[] }>(
    `/api/missions/${missionId}/files`,
    accessToken
  );
  if (error) return { error };
  return { files: data?.files ?? [] };
}

export async function deleteMissionAttachment(
  missionId: string,
  fileId: string,
  accessToken: string | null
): Promise<{ error?: string }> {
  const { error } = await apiDelete(
    `/api/missions/${missionId}/files/${fileId}`,
    accessToken
  );
  if (error) return { error };
  return {};
}

/** POST JSON to a backend API route with optional Bearer token. */
export async function apiPost<T>(
  path: string,
  body: unknown,
  accessToken: string | null
): Promise<{ data?: T; error?: string }> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    notifyAuthExpired();
    return { error: "Session expired. Please sign in again." };
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) {
    const onboardingRequired = parseOnboardingRequired(data);
    if (onboardingRequired) {
      notifyOnboardingRequired(onboardingRequired);
      return { error: onboardingRequired.error };
    }
  }
  if (!res.ok) return { error: (data?.error as string) ?? "Request failed." };
  return { data: data as T };
}

/** PATCH JSON to a backend API route with optional Bearer token. */
export async function apiPatch<T>(
  path: string,
  body: unknown,
  accessToken: string | null
): Promise<{ data?: T; error?: string }> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    notifyAuthExpired();
    return { error: "Session expired. Please sign in again." };
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) {
    const onboardingRequired = parseOnboardingRequired(data);
    if (onboardingRequired) {
      notifyOnboardingRequired(onboardingRequired);
      return { error: onboardingRequired.error };
    }
  }
  if (!res.ok) {
    const msg = (data?.error as string) ?? "Request failed.";
    const details = data?.details as string[] | undefined;
    const err = Array.isArray(details) && details.length > 0 ? `${msg}: ${details.join("; ")}` : msg;
    return { error: err };
  }
  return { data: data as T };
}

/** DELETE to a backend API route with optional Bearer token. */
export async function apiDelete<T>(
  path: string,
  accessToken: string | null
): Promise<{ data?: T; error?: string }> {
  const headers: HeadersInit = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers,
  });
  if (res.status === 401) {
    notifyAuthExpired();
    return { error: "Session expired. Please sign in again." };
  }
  if (res.status === 403) {
    const data = await res.json().catch(() => ({}));
    const onboardingRequired = parseOnboardingRequired(data);
    if (onboardingRequired) {
      notifyOnboardingRequired(onboardingRequired);
      return { error: onboardingRequired.error };
    }
  }
  if (res.status === 204) return {};
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: (data?.error as string) ?? "Request failed." };
  return { data: data as T };
}

/** PUT JSON to a backend API route with optional Bearer token. */
export async function apiPut<T>(
  path: string,
  body: unknown,
  accessToken: string | null
): Promise<{ data?: T; error?: string }> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    notifyAuthExpired();
    return { error: "Session expired. Please sign in again." };
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) {
    const onboardingRequired = parseOnboardingRequired(data);
    if (onboardingRequired) {
      notifyOnboardingRequired(onboardingRequired);
      return { error: onboardingRequired.error };
    }
  }
  if (!res.ok) return { error: (data?.error as string) ?? "Request failed." };
  return { data: data as T };
}

/** Current user from backend JWT (no Supabase in frontend). */
export async function getCurrentUser(): Promise<{
  id: string;
  email?: string;
  role?: string;
  auth_provider?: "password" | "okta";
  must_change_password?: boolean;
  onboarding?: boolean;
  company_onboarding_completed?: boolean;
  nonprofit_onboarding_completed?: boolean;
  user_metadata?: Record<string, unknown>;
} | null> {
  try {
    const token = getStoredToken();
    if (!token) return null;
    const result = await getSessionFromApi(token);
    if ("error" in result || !result.user) return null;
    return {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
      auth_provider: result.user.auth_provider,
      must_change_password: result.user.must_change_password,
      onboarding: result.user.onboarding ?? false,
      company_onboarding_completed: result.user.company_onboarding_completed ?? false,
      nonprofit_onboarding_completed: result.user.nonprofit_onboarding_completed ?? false,
      user_metadata: result.user.user_metadata ?? {},
    };
  } catch {
    return null;
  }
}

/** Clear stored JWT and any legacy auth keys. */
export function cleanupAuthState(): void {
  clearStoredToken();
  clearStoredOktaIdToken();
  localStorage.removeItem("demo-persona");
  localStorage.removeItem("selected-brisa-company");
  localStorage.removeItem("selected-access-type");
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("supabase.auth.") || key.includes("sb-")) localStorage.removeItem(key);
  });
  Object.keys(sessionStorage ?? {}).forEach((key) => {
    if (key.startsWith("supabase.auth.") || key.includes("sb-")) sessionStorage.removeItem(key);
  });
}

/** Sign out: clear token and call backend logout. */
export async function signOut(): Promise<void> {
  const token = getStoredToken();
  cleanupAuthState();
  if (typeof window !== "undefined") {
    // Keep AuthContext in sync with explicit logout actions.
    window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
  }
  await logoutApi(token);
}


