import type { TFunction } from "i18next";

interface TaxonomyItemWithKey {
  name: string;
  key?: string;
  slug?: string;
}

function normalizeTaxonomyKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, "-")
    // Taxonomy keys use hyphen-joined words for ampersands (e.g. health-medicine).
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveTaxonomyKey(item: TaxonomyItemWithKey): string {
  // Prefer stable machine key when available; otherwise derive from name.
  // Some environments may contain malformed slugs, so slug is only a fallback.
  return normalizeTaxonomyKey(item.key ?? item.name ?? item.slug ?? "");
}

export function translateCauseName(item: TaxonomyItemWithKey, t: TFunction): string {
  const key = resolveTaxonomyKey(item);
  return t(`taxonomy.cause.${key}`, { defaultValue: item.name });
}

export function translateSkillName(item: TaxonomyItemWithKey, t: TFunction): string {
  const key = resolveTaxonomyKey(item);
  return t(`taxonomy.skill.${key}`, { defaultValue: item.name });
}

/** SDGs use stable DB keys (snake_case), e.g. `no_poverty` — do not derive from name. */
export function translateSdgName(
  item: { name: string; key?: string | null },
  t: TFunction
): string {
  const key = item.key && String(item.key).trim();
  if (key) {
    return t(`taxonomy.sdg.${key}`, { defaultValue: item.name });
  }
  return item.name;
}
