
// Menu definitions and helpers for AppSidebar

import { Home, Calendar, Building2, Target, Star, Users, Shield, FileText, Layers, FolderOpen, BarChart, HelpCircle, Settings, Heart } from "lucide-react";
import type { UserRole } from "@/contexts/AuthContext";
import { PersonaType } from "@/utils/personaLabels";

// Helper: read the demo persona from localStorage
export function getCurrentPersona(): PersonaType | null {
  const p = localStorage.getItem("demo-persona");
  if (p === "company" || p === "organization" || p === "volunteer" || p === "stakeholder") return p as PersonaType;
  return null;
}

export interface SidebarMenuItem {
  name?: string;
  icon?: any;
  path?: string;
  soon?: boolean;
  disabled?: boolean;
  divider?: boolean;
  roles?: UserRole[];
}

const allRoles: UserRole[] = ["company_admin", "nonprofit", "volunteer"];

// Single menu definition. Each item declares which roles can see it.
const sidebarMenu: SidebarMenuItem[] = [
  { name: "Dashboard", icon: Target, path: "/company/dashboard", roles: ["company_admin"] },
  { name: "Dashboard", icon: Target, path: "/nonprofit/dashboard", roles: ["nonprofit"] },
  { name: "Dashboard", icon: Target, path: "/volunteer/dashboard", roles: ["volunteer"] },
  { name: "Analytics", icon: BarChart, path: "/company/analytics", roles: ["company_admin"] },
  { name: "Our Missions", icon: Star, path: "/company/our-missions", roles: ["company_admin"] },
  { name: "Your Volunteers", icon: Users, path: "/company/employees", roles: ["company_admin"] },
  { name: "Projects", icon: FolderOpen, path: "/company/projects", roles: ["company_admin"] },
  { name: "Volunteers", icon: Users, path: "/nonprofit/volunteers", roles: ["nonprofit"] },
  { name: "Impact Reporting", icon: BarChart, path: "/nonprofit/impact", roles: ["nonprofit"] },
  { name: "My Missions", icon: Star, path: "/volunteer/missions", roles: ["volunteer"] },
  { divider: true, roles: allRoles },
  { name: "Opportunities", icon: Layers, path: "/company/missions", roles: ["company_admin"] },
  { name: "Missions", icon: Layers, path: "/missions", roles: ["nonprofit", "volunteer"] },
  { name: "Institutions", icon: Building2, path: "/company/organizations", roles: ["company_admin"] },
  { name: "Organizations", icon: Building2, path: "/organizations", roles: ["nonprofit", "volunteer"] },
  { divider: true, roles: allRoles },
  { name: "Settings", icon: Settings, path: "/nonprofit/settings", roles: ["nonprofit"] },
  { name: "Settings", icon: Settings, path: "/volunteer/settings", roles: ["volunteer"] },
  { name: "Projects", icon: FolderOpen, path: "/projects", roles: ["nonprofit", "volunteer"] },
  { name: "Calendar", icon: Calendar, path: "/nonprofit/calendar", soon: true, roles: ["nonprofit"] },
];

function normalizeDividers(items: SidebarMenuItem[]): SidebarMenuItem[] {
  const cleaned: SidebarMenuItem[] = [];
  let hasVisibleItem = false;

  for (const item of items) {
    if (item.divider) {
      if (hasVisibleItem && cleaned[cleaned.length - 1]?.divider !== true) {
        cleaned.push(item);
      }
      continue;
    }
    cleaned.push(item);
    hasVisibleItem = true;
  }

  while (cleaned[cleaned.length - 1]?.divider) {
    cleaned.pop();
  }

  return cleaned;
}

export const bottomNav = [
  { name: "Questions?", icon: HelpCircle, path: "mailto:solidariedade@brisa.pt" },
  { name: "Privacy Policy", icon: Shield, path: "/privacy-policy" },
  { name: "Terms & Conditions", icon: FileText, path: "/terms-conditions" },
];

/** Menu selection by route only. Used by layouts; no session/demo inference. */
export function getMenusForRole(role?: string): SidebarMenuItem[] {
  const fallbackRole: UserRole = "volunteer";
  const normalizedRole = (role === "company_admin" || role === "nonprofit" || role === "volunteer")
    ? role
    : fallbackRole;

  const filtered = sidebarMenu.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true;
    return item.roles.includes(normalizedRole);
  });

  return normalizeDividers(filtered);
}

/** @deprecated Backward-compat helper while old callers are migrated. */
export function getMenusForPersona(persona: PersonaType): SidebarMenuItem[] {
  if (persona === "company") return getMenusForRole("company_admin");
  if (persona === "organization") return getMenusForRole("nonprofit");
  if (persona === "volunteer") return getMenusForRole("volunteer");
  return [];
}

/** @deprecated Used only by non-layout pages; prefer passing persona from layout. */
export function getSidebarMenus(): SidebarMenuItem[] {
  return getMenusForRole("volunteer");
}
