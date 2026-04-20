import { apiDelete, apiGet, apiPost, getStoredToken } from "./authApi";

export interface InviteOrganizationResponse {
  invite: {
    id: string;
    nonprofit_id: string;
    organization_name: string;
    email: string;
    invite_token: string;
    created_at: string;
    expires_at: string;
  };
  invite_link: string;
}

export type CompanyNonprofitInviteStatus = "invited" | "accepted" | "expired";

export interface CompanyNonprofitInvite {
  id: string;
  nonprofit_id: string;
  organization_name: string;
  email: string;
  status: CompanyNonprofitInviteStatus;
  invite_token: string;
  created_at: string;
  expires_at: string;
  accepted_at: string | null;
  invite_link: string | null;
  is_pending_expired: boolean;
}

export interface CompanyNonprofitInvitesResponse {
  invites: CompanyNonprofitInvite[];
  total: number;
  page: number;
  limit: number;
}

export interface ResendOrganizationInviteResponse {
  invite: {
    id: string;
    organization_name: string;
    email: string;
    invite_token: string;
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

export interface DeleteCompanyNonprofitInviteResponse {
  success: boolean;
  deleted_nonprofit_placeholder: boolean;
}

export async function inviteOrganization(params: {
  organizationName: string;
  email: string;
}): Promise<{ data?: InviteOrganizationResponse; error?: string }> {
  const token = getStoredToken();
  return apiPost<InviteOrganizationResponse>(
    "/api/company/nonprofits/invite",
    {
      organization_name: params.organizationName,
      email: params.email,
    },
    token
  );
}

export async function fetchCompanyNonprofitInvites(params?: {
  search?: string;
  status?: CompanyNonprofitInviteStatus | "";
  page?: number;
  limit?: number;
}): Promise<{ data?: CompanyNonprofitInvitesResponse; error?: string }> {
  const token = getStoredToken();
  const query = new URLSearchParams();
  if (params?.search?.trim()) query.set("search", params.search.trim());
  if (params?.status) query.set("status", params.status);
  if (typeof params?.page === "number") query.set("page", String(params.page));
  if (typeof params?.limit === "number") query.set("limit", String(params.limit));
  const suffix = query.toString().length > 0 ? `?${query.toString()}` : "";
  return apiGet<CompanyNonprofitInvitesResponse>(`/api/company/nonprofits/invites${suffix}`, token);
}

export async function resendCompanyNonprofitInvite(params: {
  inviteId: string;
}): Promise<{ data?: ResendOrganizationInviteResponse; error?: string }> {
  const token = getStoredToken();
  return apiPost<ResendOrganizationInviteResponse>(
    "/api/company/nonprofits/invite/resend",
    { invite_id: params.inviteId },
    token
  );
}

export async function deleteCompanyNonprofitInvite(params: {
  inviteId: string;
}): Promise<{ data?: DeleteCompanyNonprofitInviteResponse; error?: string }> {
  const token = getStoredToken();
  return apiDelete<DeleteCompanyNonprofitInviteResponse>(
    `/api/company/nonprofits/invite/${params.inviteId}`,
    token
  );
}
