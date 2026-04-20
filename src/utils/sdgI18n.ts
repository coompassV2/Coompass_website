import type { TFunction } from "i18next";

export interface SdgWithKey {
  id: number;
  name: string;
  key?: string;
}

/** Returns the translated SDG name using taxonomy.sdg.{key} */
export function translateSdgName(sdg: SdgWithKey, t: TFunction): string {
  const key = sdg.key ?? sdg.name.toLowerCase().replace(/\s+/g, "_").replace(/,/g, "").replace(/-/g, "_");
  return t(`taxonomy.sdg.${key}`, { defaultValue: sdg.name });
}
