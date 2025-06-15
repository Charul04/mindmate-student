
import AppLogo from "@/components/AppLogo";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function FooterSection() {
  const { t } = useTranslation();
  return (
    <footer className="mt-auto px-8 py-8 bg-white/90 dark:bg-slate-900/85 border-t border-indigo-100 flex flex-col md:flex-row justify-between items-center text-indigo-700 text-sm relative overflow-hidden">
      {/* Soft purple background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-1/2 top-1/2 w-[80vw] h-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/30 blur-2xl opacity-55" />
      </div>
      <div className="mb-3 md:mb-0 relative z-10">
        {/* Purple text glow for MindMate++ */}
        <span className="inline-flex items-center gap-3 drop-shadow-[0_2px_22px_rgba(168,85,247,0.23)]">
          <AppLogo size={26} />
        </span>
      </div>
      <div className="flex gap-5 relative z-10">
        <a
          href="#"
          className="hover:underline text-purple-600 drop-shadow-[0_2px_10px_rgba(168,85,247,0.13)] transition-colors"
          style={{
            textShadow: "0 0 10px #c4b5fd44"
          }}
        >
          {t("support")}
        </a>
        <a
          href="#"
          className="hover:underline text-purple-600 drop-shadow-[0_2px_10px_rgba(168,85,247,0.13)] transition-colors"
          style={{
            textShadow: "0 0 10px #c4b5fd44"
          }}
        >
          {t("contact")}
        </a>
      </div>
      <span className="mt-2 md:mt-0 text-indigo-300 relative z-10" style={{ textShadow: "0 0 10px #c4b5fd33" }}>
        {/* Slight purple glow for copyright */}
        <span className="text-purple-400 font-semibold">{`© ${new Date().getFullYear()} MindMate`}</span>
        <span className="text-sky-500 font-bold pl-1">+</span>
      </span>
    </footer>
  );
}

