
import React, { createContext, useContext, useState, useEffect } from "react";
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

// Theme/Language context to trigger rerender on change
const ThemeLanguageContext = createContext({ refresh: () => {} });

export function useThemeLanguageRerender() {
  return useContext(ThemeLanguageContext);
}

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  const [, setRerender] = useState(0);

  // Set up listeners to re-render the app when language/theme changes
  useEffect(() => {
    const rerender = () => setRerender((i) => i + 1);

    // Listen for i18n language changed
    i18n.on("languageChanged", rerender);

    // Listen for dark mode changes and storage events
    const onStorage = (event: StorageEvent) => {
      if (event.key === "theme" || event.key === "language") rerender();
    };
    window.addEventListener("storage", onStorage);

    // Ensure correct dark mode on mount and whenever theme changes
    const syncDark = () => {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    syncDark();

    // Listen for changes to theme in any way in app
    const observer = new MutationObserver(syncDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Cleanup
    return () => {
      i18n.off("languageChanged", rerender);
      window.removeEventListener("storage", onStorage);
      observer.disconnect();
    };
  }, [i18n]);

  // Whenever language changes, store in localStorage also
  useEffect(() => {
    const onChange = (lng: string) => {
      localStorage.setItem("language", lng);
    };
    i18n.on("languageChanged", onChange);
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, [i18n]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeLanguageContext.Provider value={{ refresh: () => setRerender((r) => r + 1) }}>
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
