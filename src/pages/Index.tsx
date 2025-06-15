
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardTabs from "@/components/DashboardTabs";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";
import React from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";

/**
 * This effect ensures that dark mode and language changes will always
 * cause a re-render if necessary. This makes sure the whole app responds.
 */
function useThemeAndLanguageSync() {
  const { i18n } = useTranslation();
  const [, setDummy] = React.useState(0);

  React.useEffect(() => {
    // Listen for language changes and force a re-render
    const onLanguageChanged = () => setDummy((d) => d + 1);
    i18n.on("languageChanged", onLanguageChanged);

    // Listen for possible localStorage changes (multi-tab sync)
    const onStorage = (event: StorageEvent) => {
      if (event.key === "theme") setDummy((d) => d + 1);
      if (event.key === "language") onLanguageChanged();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      i18n.off("languageChanged", onLanguageChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, [i18n]);
}

export default function Index() {
  useThemeAndLanguageSync();

  React.useEffect(() => {
    // Ensure the .dark class is always applied according to the theme setting.
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header />
      <HeroSection />
      <DashboardTabs />
      <FeaturesSection />
      <TestimonialSection />
      <FooterSection />
    </div>
  );
}
