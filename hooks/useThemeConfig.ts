"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { themes, type ThemeVariant } from "@/lib/themes";

const THEME_ID_KEY = "theme-id";

export function useThemeConfig() {
  const { theme: systemTheme, setTheme: setSystemTheme } = useTheme();
  const [themeId, setThemeId] = useState<string>("default");
  const [mounted, setMounted] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedThemeId = localStorage.getItem(THEME_ID_KEY);
    if (savedThemeId) {
      setThemeId(savedThemeId);
    }
  }, []);

  // Apply theme colors when theme or variant changes
  useEffect(() => {
    if (!mounted) return;

    const currentTheme = themes.find((t) => t.id === themeId);
    if (!currentTheme) return;

    const variant = (systemTheme === "dark" ? "dark" : "light") as ThemeVariant;
    const colors = currentTheme.colors[variant];

    // Apply CSS variables
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [themeId, systemTheme, mounted]);

  const changeTheme = (newThemeId: string) => {
    setThemeId(newThemeId);
    localStorage.setItem(THEME_ID_KEY, newThemeId);
  };

  const toggleVariant = () => {
    setSystemTheme(systemTheme === "dark" ? "light" : "dark");
  };

  return {
    themeId,
    variant: systemTheme as ThemeVariant,
    changeTheme,
    toggleVariant,
    themes,
    mounted,
  };
}
