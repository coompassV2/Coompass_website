import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { PersonaType } from "@/utils/personaLabels";

function roleToPersona(role?: string | null): PersonaType | null {
  if (role === "company_admin") return "company";
  if (role === "nonprofit") return "organization";
  if (role === "volunteer") return "volunteer";
  return null;
}

export function useSessionMode() {
  const { user, loading } = useAuth();

  return useMemo(() => {
    const demoPersona =
      typeof window !== "undefined"
        ? (localStorage.getItem("demo-persona") as PersonaType | null)
        : null;

    const isDemo = Boolean(demoPersona && !user);
    const userId = user?.id;
    const persona: PersonaType | null = isDemo
      ? demoPersona && ["company", "organization", "volunteer", "stakeholder"].includes(demoPersona)
        ? demoPersona
        : "volunteer"
      : roleToPersona(user?.role);

    return { isDemo, userId, persona, loading };
  }, [user, loading]);
}
