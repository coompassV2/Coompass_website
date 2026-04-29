export type VolunteerPreferences = {
  skills: string[];
  causeAreas: string[];
  sdgs: string[];
};

const STORAGE_KEY = "brisa-volunteer-preferences";

const isDevLikeEnvironment = () => {
  if (typeof window === "undefined") return false;

  return (
    import.meta.env.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.includes(".lovableproject.com")
  );
};

export function loadVolunteerPreferences(
  isDemo: boolean,
  defaults: VolunteerPreferences
): VolunteerPreferences {
  if (!isDemo || !isDevLikeEnvironment()) {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw) as Partial<VolunteerPreferences>;
    return {
      skills: parsed.skills ?? defaults.skills,
      causeAreas: parsed.causeAreas ?? defaults.causeAreas,
      sdgs: parsed.sdgs ?? defaults.sdgs,
    };
  } catch {
    return defaults;
  }
}

export function saveVolunteerPreferences(
  isDemo: boolean,
  preferences: VolunteerPreferences
): void {
  if (!isDemo || !isDevLikeEnvironment()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Fail silently in demo/local environments
  }
}

