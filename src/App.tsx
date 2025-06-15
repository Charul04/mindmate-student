
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import JournalPage from "./pages/Journal";
import { useTranslation } from "react-i18next";
import "@/i18n";

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
  const { i18n } = useTranslation();
  // Theme and language state in context
  const [theme, setThemeState] = useState<"dark" | "light">(
    (localStorage.getItem("theme") as "dark" | "light") || "light"
  );
  const [language, setLanguageState] = useState<string>(
    localStorage.getItem("language") || i18n.language || "en"
  );

  // Listen to theme changes and update tailwind class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen to language changes and update i18n
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    localStorage.setItem("language", language);
  }, [language, i18n]);

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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeLanguageContext.Provider value={contextValue}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeLanguageContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

