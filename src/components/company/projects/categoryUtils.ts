import type { TFunction } from "i18next";

/** Valid categories for company projects. */
export const VALID_CATEGORIES = [
  "Voluntariado",
  "Workshop",
  "Team building",
  "Doações e filantropia",
  "Parceria estratégica",
  "Inclusão e diversidade",
  "Emergência e Resposta Rápida",
] as const;

/** Map legacy English categories to the new Portuguese categories. */
const LEGACY_CATEGORY_MAP: Record<string, string> = {
  "Corporate Responsibility": "Parceria estratégica",
  "Environmental": "Voluntariado",
  "Education": "Workshop",
  "Workplace Culture": "Inclusão e diversidade",
  "Governance": "Parceria estratégica",
  "Community Development": "Parceria estratégica",
  "Digital Literacy": "Workshop",
  "Social Impact": "Voluntariado",
};

/** Resolve a category to a valid display value (handles legacy categories). */
export function resolveCategoryDisplay(category: string): string {
  if (VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    return category;
  }
  return LEGACY_CATEGORY_MAP[category] ?? category;
}

/** Maps canonical (Portuguese) category label → i18n key under `companyProject.category.*`. */
const CANONICAL_CATEGORY_I18N_KEY: Record<string, string> = {
  Voluntariado: "voluntariado",
  Workshop: "workshop",
  "Team building": "teamBuilding",
  "Doações e filantropia": "doacoesFilantropia",
  "Parceria estratégica": "parceriaEstrategica",
  "Inclusão e diversidade": "inclusaoDiversidade",
  "Emergência e Resposta Rápida": "emergenciaRespostaRapida",
};

/** Localized category label for UI (uses `companyProject.category.*` in locales). */
export function getCategoryLabel(category: string, t: TFunction): string {
  const canonical = resolveCategoryDisplay(category);
  const subKey = CANONICAL_CATEGORY_I18N_KEY[canonical];
  if (subKey) return t(`companyProject.category.${subKey}`);
  return canonical;
}

/** Category badge color classes (light/dark aware) for consistent UI tagging. */
const CATEGORY_BADGE_CLASS: Record<string, string> = {
  Voluntariado:
    "border-emerald-300 bg-emerald-500/15 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  Workshop:
    "border-blue-300 bg-blue-500/15 text-blue-700 dark:border-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  "Team building":
    "border-indigo-300 bg-indigo-500/15 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
  "Doações e filantropia":
    "border-fuchsia-300 bg-fuchsia-500/15 text-fuchsia-700 dark:border-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-300",
  "Parceria estratégica":
    "border-cyan-300 bg-cyan-500/15 text-cyan-700 dark:border-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
  "Inclusão e diversidade":
    "border-amber-300 bg-amber-500/15 text-amber-700 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  "Emergência e Resposta Rápida":
    "border-rose-300 bg-rose-500/15 text-rose-700 dark:border-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
};

export function getCategoryBadgeClass(category: string): string {
  const canonical = resolveCategoryDisplay(category);
  return CATEGORY_BADGE_CLASS[canonical] ?? "border-muted bg-muted/40 text-foreground";
}
