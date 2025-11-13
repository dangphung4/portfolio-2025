"use client";

import { useState } from "react";
import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { cn } from "@/lib/utils";

export function ThemeSelector() {
  const { themeId, changeTheme, themes, mounted } = useThemeConfig();
  const [isOpen, setIsOpen] = useState(false);

  if (!mounted) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Palette className="h-5 w-5" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-12 z-50 w-64 rounded-lg border bg-popover p-2 shadow-lg">
            <div className="mb-2 px-2 py-1.5 text-sm font-semibold text-popover-foreground">
              Select Theme
            </div>
            <div className="space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    changeTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-2 py-2 text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    themeId === theme.id && "bg-accent/50"
                  )}
                >
                  <span>{theme.name}</span>
                  {themeId === theme.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
