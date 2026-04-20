import { getCurrentUser } from "@/services/authApi";
import type { PersonaType } from "@/utils/personaLabels";

export type { PersonaType };

/**
 * Determines if the current session is in demo mode or real user mode.
 * @deprecated Prefer useSessionMode() in React components. Triggers /api/auth/session.
 */
export const getSessionMode = async () => {
  try {
    const demoPersona = localStorage.getItem("demo-persona") as PersonaType | null;
    const currentUser = await getCurrentUser();

    if (demoPersona && !currentUser) {
      return { isDemo: true, persona: demoPersona };
    }
    if (currentUser) {
      return { isDemo: false, userId: currentUser.id, persona: null };
    }
    return { isDemo: false };
  } catch {
    const demoPersona = localStorage.getItem("demo-persona") as PersonaType | null;
    return { isDemo: true, persona: demoPersona || "volunteer" };
  }
};

/**
 * Gets the current persona from backend user role (no Supabase in frontend).
 * @deprecated Prefer useSessionMode() in React components. Triggers /api/auth/session.
 */
export const getCurrentPersona = async (): Promise<PersonaType | null> => {
  try {
    const { isDemo, persona } = await getSessionMode();
    if (isDemo && persona) return persona;

    const currentUser = await getCurrentUser();
    if (currentUser) {
      const role = currentUser.role;
      if (role === "company_admin") return "company";
      if (role === "nonprofit") return "organization";
      return "volunteer";
    }
    return null;
  } catch {
    return "volunteer";
  }
};
