/**
 * Okta OIDC authorize URL with PKCE (S256). Used by "Sign in with Okta" on the login page.
 * Requires VITE_OKTA_DOMAIN and VITE_OKTA_CLIENT_ID.
 * Optional: VITE_OKTA_ISSUER (defaults to {domain} for Org Authorization Server).
 * Redirect URI must be the app's /auth/callback.
 */
import {
  OKTA_CODE_VERIFIER_KEY,
  OKTA_STATE_KEY,
  getStoredOktaIdToken,
} from "@/services/authApi";

const OKTA_DOMAIN = (import.meta.env.VITE_OKTA_DOMAIN ?? "").replace(/\/$/, "");
const OKTA_CLIENT_ID = import.meta.env.VITE_OKTA_CLIENT_ID ?? "";
const OKTA_ISSUER = (import.meta.env.VITE_OKTA_ISSUER ?? OKTA_DOMAIN).replace(/\/$/, "");

export function isOktaConfigured(): boolean {
  return Boolean(OKTA_DOMAIN && OKTA_CLIENT_ID && OKTA_ISSUER);
}

function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i]! % chars.length];
  }
  return result;
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Generate PKCE code_verifier and code_challenge (S256).
 */
async function generatePKCE(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  const codeVerifier = generateRandomString(64);
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const codeChallenge = base64UrlEncode(digest);
  return { codeVerifier, codeChallenge };
}

/**
 * Build Okta authorize URL with PKCE and state, and store code_verifier and state in sessionStorage.
 * Returns the URL to redirect the user to, or null if Okta is not configured.
 */
export async function getOktaAuthorizeUrl(redirectUri: string): Promise<string | null> {
  if (!isOktaConfigured()) return null;

  const state = generateRandomString(32);
  const { codeVerifier, codeChallenge } = await generatePKCE();

  sessionStorage.setItem(OKTA_STATE_KEY, state);
  sessionStorage.setItem(OKTA_CODE_VERIFIER_KEY, codeVerifier);

  const params = new URLSearchParams({
    client_id: OKTA_CLIENT_ID,
    response_type: "code",
    scope: "openid email profile",
    redirect_uri: redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const url = `${OKTA_ISSUER}/oauth2/v1/authorize?${params.toString()}`;
  return url;
}

export function getStoredOktaState(): string | null {
  return sessionStorage.getItem(OKTA_STATE_KEY);
}

export function getStoredOktaCodeVerifier(): string | null {
  return sessionStorage.getItem(OKTA_CODE_VERIFIER_KEY);
}

/**
 * Clear PKCE data from sessionStorage after successful or failed callback.
 */
export function clearOktaPkceStorage(): void {
  sessionStorage.removeItem(OKTA_STATE_KEY);
  sessionStorage.removeItem(OKTA_CODE_VERIFIER_KEY);
}

/**
 * Build Okta RP-initiated logout URL (ends Okta browser session) and return user to app login.
 * Requires an ID token from a prior Okta login.
 */
export function getOktaLogoutUrl(postLogoutRedirectUri?: string): string | null {
  if (!isOktaConfigured()) return null;
  const idToken = getStoredOktaIdToken();
  if (!idToken) return null;

  const target =
    postLogoutRedirectUri ?? `${window.location.origin}/`;

  const params = new URLSearchParams({
    id_token_hint: idToken,
    post_logout_redirect_uri: target,
  });

  return `${OKTA_ISSUER}/oauth2/v1/logout?${params.toString()}`;
}
