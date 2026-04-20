/**
 * API client for company users (admin panel).
 */
import { apiGet, apiPost, apiPatch, apiDelete, getStoredToken } from "./authApi";

export type CompanyUserStatus = "invited" | "pending" | "active" | "disabled";
export type CompanyUserRole = "admin" | "volunteer";
export type AuthProvider = "password" | "okta";

export interface CompanyUser {
  id: string;
  email: string;
  full_name: string | null;
  department?: string | null;
  role: CompanyUserRole;
  status: CompanyUserStatus;
  invited_at?: string;
  invite_token?: string;
  source: "member" | "volunteer" | "invite";
  created_at?: string | null;
  company_id?: string;
  last_login_at?: string | null;
}

export interface CompanyUsersResponse {
  users: CompanyUser[];
  total: number;
  page: number;
  limit: number;
}

export interface InviteResponse {
  invite: {
    id: string;
    email: string;
    role: string;
    auth_provider: AuthProvider;
    invite_token: string;
    created_at: string;
    expires_at: string;
  };
  invite_link: string;
  email_delivery?: {
    provider: "resend";
    status: "sent" | "skipped" | "failed";
    message_id?: string | null;
    reason?: string;
  };
}

export async function fetchCompanyUsers(params: {
  search?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}): Promise<{ data?: CompanyUsersResponse; error?: string }> {
  const token = getStoredToken();
  const q = new URLSearchParams();
  if (params.search) q.set("search", params.search);
  if (params.status) q.set("status", params.status);
  if (params.role) q.set("role", params.role);
  if (params.page) q.set("page", String(params.page));
  if (params.limit) q.set("limit", String(params.limit));
  const query = q.toString();
  return apiGet<CompanyUsersResponse>(
    `/api/company/users${query ? `?${query}` : ""}`,
    token
  );
}

export async function inviteCompanyUser(
  email: string,
  role: CompanyUserRole,
  authProvider: AuthProvider
): Promise<{ data?: InviteResponse; error?: string }> {
  const token = getStoredToken();
  return apiPost<InviteResponse>("/api/company/users/invite", { email, role, auth_provider: authProvider }, token);
}

export async function resendCompanyInvite(
  inviteId: string
): Promise<{ data?: InviteResponse; error?: string }> {
  const token = getStoredToken();
  return apiPost<InviteResponse>("/api/company/users/invite/resend", { invite_id: inviteId }, token);
}

export async function updateCompanyUserRole(
  userId: string,
  role: CompanyUserRole
): Promise<{ data?: { success: boolean; role: string }; error?: string }> {
  const token = getStoredToken();
  return apiPatch<{ success: boolean; role: string }>(
    `/api/company/users/${userId}/role`,
    { role },
    token
  );
}

export async function deleteCompanyUser(
  userId: string
): Promise<{ data?: { success: boolean }; error?: string }> {
  const token = getStoredToken();
  return apiDelete<{ success: boolean }>(`/api/company/users/${userId}`, token);
}
