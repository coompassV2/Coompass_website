const API_BASE = import.meta.env.VITE_API_URL ?? "";

export interface RegistrationData {
  email: string;
  password: string;
  companyName: string;
  description?: string;
  avatar_url?: string | null;
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  industry?: string;
  employeesCount?: number;
  foundedYear?: number;
  sustainabilityGoals?: string[];
  esgPriorities?: string[];
  organizationType?: string;
  yearFounded?: number;
  socialMedia?: Record<string, string>;
  sdgs?: string[];
  skills?: string[];
}

export type PersonaType = "company" | "organization" | "volunteer" | "stakeholder";

export const registerUser = async (
  personaType: PersonaType,
  formData: RegistrationData
): Promise<{ user: { id: string; email: string; role: string } }> => {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personaType,
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      description: formData.description,
      avatar_url: formData.avatar_url,
      location: formData.location,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      website: formData.website,
      industry: formData.industry,
      employeesCount: formData.employeesCount,
      foundedYear: formData.foundedYear,
      sustainabilityGoals: formData.sustainabilityGoals,
      esgPriorities: formData.esgPriorities,
      organizationType: formData.organizationType,
      yearFounded: formData.yearFounded,
      socialMedia: formData.socialMedia,
      sdgs: formData.sdgs,
      skills: formData.skills,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data?.error as string) ?? "Registration failed.");
  }
  return data as { user: { id: string; email: string; role: string } };
};
