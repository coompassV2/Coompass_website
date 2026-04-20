import { useState, useEffect } from "react";

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "theme";
const themeListeners = new Set<(theme: Theme) => void>();

function readStoredTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return "light";
}

function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

let currentTheme: Theme = readStoredTheme();
applyTheme(currentTheme);

function setGlobalTheme(theme: Theme) {
  if (currentTheme === theme) return;
  currentTheme = theme;
  applyTheme(theme);
  themeListeners.forEach(listener => listener(theme));
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    themeListeners.add(setTheme);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const nextTheme = event.newValue === "light" || event.newValue === "dark"
        ? event.newValue
        : "light";
      if (nextTheme !== currentTheme) {
        currentTheme = nextTheme;
        applyTheme(nextTheme);
        themeListeners.forEach(listener => listener(nextTheme));
      }
    };

    window.addEventListener("storage", onStorage);
    return () => {
      themeListeners.delete(setTheme);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggleTheme = () => {
    setGlobalTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
}