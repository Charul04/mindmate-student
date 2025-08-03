import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { Moon, Globe } from "lucide-react";
const LANGUAGES = [{
  code: "en",
  name: "English"
}, {
  code: "hi",
  name: "Hindi"
},
// Add all other required languages here...
{
  code: "es",
  name: "Spanish"
}, {
  code: "fr",
  name: "French"
}, {
  code: "zh",
  name: "Chinese"
}, {
  code: "ar",
  name: "Arabic"
}, {
  code: "ru",
  name: "Russian"
}, {
  code: "de",
  name: "German"
}, {
  code: "ja",
  name: "Japanese"
}, {
  code: "pt",
  name: "Portuguese"
}, {
  code: "it",
  name: "Italian"
}, {
  code: "bn",
  name: "Bengali"
}, {
  code: "te",
  name: "Telugu"
}, {
  code: "mr",
  name: "Marathi"
}, {
  code: "ta",
  name: "Tamil"
}, {
  code: "ur",
  name: "Urdu"
}, {
  code: "gu",
  name: "Gujarati"
}, {
  code: "kn",
  name: "Kannada"
}, {
  code: "ml",
  name: "Malayalam"
}, {
  code: "pa",
  name: "Punjabi"
}, {
  code: "or",
  name: "Odia"
}, {
  code: "as",
  name: "Assamese"
}
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
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark" || window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const {
    i18n
  } = useTranslation();
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  React.useEffect(() => {
    setDarkMode(isDark);
  }, [isDark]);
  React.useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language, i18n]);
  return <div className="flex gap-3">
      {/* Language Button */}
      
      {/* Dark Mode Switch */}
      
    </div>;
}