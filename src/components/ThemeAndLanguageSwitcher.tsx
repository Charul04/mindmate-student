
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { Moon, Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  // Add all other required languages here...
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "bn", name: "Bengali" }, { code: "te", name: "Telugu" }, { code: "mr", name: "Marathi" },
  { code: "ta", name: "Tamil" }, { code: "ur", name: "Urdu" }, { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" }, { code: "ml", name: "Malayalam" }, { code: "pa", name: "Punjabi" },
  { code: "or", name: "Odia" }, { code: "as", name: "Assamese" },
  // ...add more from your requirements
];

function setDarkMode(enable: boolean) {
  if (enable) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

export default function ThemeAndLanguageSwitcher() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark" ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches));
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");

  React.useEffect(() => {
    setDarkMode(isDark);
  }, [isDark]);

  React.useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language, i18n]);

  return (
    <div className="flex gap-3">
      {/* Language Button */}
      <div>
        <button
          className="flex items-center rounded-lg bg-slate-200/90 hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800 px-3 h-10 border border-slate-300 dark:border-slate-700 shadow transition min-w-[120px]"
          aria-label="Language"
        >
          <Globe className="mr-2 text-indigo-800 dark:text-slate-100" size={20} />
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="bg-transparent px-0 pr-5 cursor-pointer text-xs font-bold focus:outline-none dark:text-slate-100 text-indigo-900"
            aria-label="Choose Language"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.code.toUpperCase()} {lang.name}</option>
            ))}
          </select>
        </button>
      </div>
      {/* Dark Mode Switch */}
      <button
        onClick={() => setIsDark(d => !d)}
        className={`flex items-center rounded-lg px-3 h-10 border shadow transition 
          ${isDark ? "bg-slate-900/80 border-slate-700" : "bg-slate-200/90 border-slate-300 hover:bg-slate-100"}
        `}
        aria-label="Toggle dark mode"
      >
        <Moon size={20} className={`${isDark ? "text-yellow-200" : "text-indigo-700"}`} />
      </button>
    </div>
  );
}
