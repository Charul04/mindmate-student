
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Languages, ToggleLeft, ToggleRight } from "lucide-react";

const LANGUAGES = [
  // International
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  // Indian languages
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
  { code: "ta", name: "Tamil" },
  { code: "ur", name: "Urdu" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "pa", name: "Punjabi" },
  { code: "or", name: "Odia" },
  { code: "as", name: "Assamese" },
  { code: "ma", name: "Maithili" },
  { code: "sa", name: "Sanskrit" },
  { code: "sd", name: "Sindhi" },
  { code: "ne", name: "Nepali" },
  { code: "ko", name: "Konkani" },
  { code: "sa", name: "Santali" },
  { code: "do", name: "Dogri" },
  { code: "ka", name: "Kashmiri" },
  // more can be added as needed
];

export default function ThemeAndLanguageSwitcher() {
  // detect light/dark from localStorage or OS
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") === "dark" ||
          (window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches))
      : false
  );
  const [language, setLanguage] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "en"
      : "en"
  );

  // Apply class to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("language", language);
    // no-op: in a real app you'd reload language resources here
  }, [language]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Dark</span>
        <Switch
          checked={isDark}
          onCheckedChange={setIsDark}
          aria-label="Toggle theme"
        />
        <span className="text-xs text-muted-foreground">Light</span>
        {isDark ? (
          <ToggleRight className="text-indigo-500 ml-1" size={18} />
        ) : (
          <ToggleLeft className="text-yellow-400 ml-1" size={18} />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Languages className="text-indigo-800" size={18} />
        <Select
          value={language}
          onValueChange={setLanguage}
        >
          <SelectTrigger className="w-[112px] h-8 text-xs px-2 font-medium rounded bg-white border-indigo-200">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
