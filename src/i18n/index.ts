import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import ptPTTranslation from "./locales/pt-PT/translation.json";

function normalizeLanguageCode(lng: string | null): string {
  if (!lng) return "pt-PT";
  const normalized = lng.trim().replace(/_/g, "-").toLowerCase();
  // Some browsers/OS combinations may surface invalid hybrids like "en-PT".
  // Treat any locale targeting Portugal as Portuguese.
  if (normalized === "en-pt" || normalized.endsWith("-pt")) return "pt-PT";
  if (normalized === "en" || normalized.startsWith("en-")) return "en";
  if (normalized === "pt" || normalized.startsWith("pt-")) return "pt-PT";
  return "pt-PT";
}

const resources = {
  en: { translation: enTranslation as Record<string, string> },
  "pt-PT": { translation: ptPTTranslation as Record<string, string> },
  pt: { translation: ptPTTranslation as Record<string, string> },
  pt_PT: { translation: ptPTTranslation as Record<string, string> },
  "en-PT": { translation: ptPTTranslation as Record<string, string> },
  en_PT: { translation: ptPTTranslation as Record<string, string> },
};

function mapPersistedLng(lng: string | null): string {
  return normalizeLanguageCode(lng);
}

const stored = typeof window !== "undefined" ? localStorage.getItem("i18nextLng") : null;
const initialLng = mapPersistedLng(stored);

i18n.use(initReactI18next).init({
  resources,
  lng: initialLng,
  fallbackLng: "en",
  supportedLngs: ["en", "pt-PT", "pt", "pt_PT", "en-PT", "en_PT"],
  interpolation: {
    escapeValue: false,
  },
  ...(import.meta.env?.DEV && {
    saveMissing: false,
    missingKeyHandler: (_lngs: string[], _ns: string, key: string) => {
      console.warn(`[i18n] Missing key: "${key}"`);
    },
  }),
});

i18n.on("languageChanged", (lng: string) => {
  const toStore = normalizeLanguageCode(lng);
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", toStore);
  }
});

export function isPortuguese(lng: string): boolean {
  const normalized = (lng ?? "").replace(/_/g, "-").toLowerCase();
  return normalized === "pt" || normalized === "pt-pt" || normalized.startsWith("pt-") || normalized.endsWith("-pt");
}

export default i18n;
