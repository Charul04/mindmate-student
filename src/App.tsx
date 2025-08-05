
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "@/components/AppContent";

// --- UPDATE: Provide theme & language in context ---
type ThemeLanguageContextType = {
  theme: "dark" | "light";
  language: string;
  setTheme: (newTheme: "light" | "dark") => void;
  setLanguage: (lng: string) => void;
};
const ThemeLanguageContext = createContext<ThemeLanguageContextType>({
  theme: "light",
  language: "en",
  setTheme: () => {},
  setLanguage: () => {},
});

export function useThemeLanguage() {
  return useContext(ThemeLanguageContext);
}

const queryClient = new QueryClient();

const App = () => {
  // Theme and language state in context
  const [theme, setThemeState] = useState<"dark" | "light">(
    (localStorage.getItem("theme") as "dark" | "light") || "light"
  );
  const [language, setLanguageState] = useState<string>(
    localStorage.getItem("language") || "en"
  );
  const [i18nReady, setI18nReady] = useState(false);

  // Initialize i18n and wait for it to be ready
  useEffect(() => {
    const initI18n = async () => {
      try {
        await import("@/i18n");
        setI18nReady(true);
      } catch (error) {
        console.error("Failed to initialize i18n:", error);
        setI18nReady(true); // Still proceed to avoid getting stuck
      }
    };
    initI18n();
  }, []);

  // Listen to theme changes and update tailwind class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen to language changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Sync theme/lang from storage (if externally changed)
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === "theme" && event.newValue) {
        setThemeState(event.newValue as "dark" | "light");
      }
      if (event.key === "language" && event.newValue) {
        setLanguageState(event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const contextValue: ThemeLanguageContextType = {
    theme,
    language,
    setTheme: (newTheme) => setThemeState(newTheme),
    setLanguage: (lng) => setLanguageState(lng),
  };

  // Show loading while i18n is initializing
  if (!i18nReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-sky-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeLanguageContext.Provider value={contextValue}>
          <Toaster />
          <Sonner />
          {i18nReady ? <AppContent /> : null}
        </ThemeLanguageContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

