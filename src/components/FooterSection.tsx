
import AppLogo from "@/components/AppLogo";
import { useTranslation } from "react-i18next";
import "@/i18n";

// Extend the Window interface to include chatbase
declare global {
  interface Window {
    chatbase?: (action: string) => void;
  }
}

export default function FooterSection() {
  const { t } = useTranslation();
  return (
    <footer className="mt-auto px-8 py-8 bg-white/90 border-t border-indigo-100 flex flex-col md:flex-row justify-between items-center text-indigo-700 text-sm relative overflow-hidden">
      {/* Subtle soft purple background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-1/2 top-1/2 w-[80vw] h-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/20 blur-2xl opacity-40" />
      </div>
      <div className="mb-3 md:mb-0 relative z-10">
        <span className="inline-flex items-center gap-3">
          <AppLogo size={26} />
        </span>
      </div>
      <div className="flex gap-5 relative z-10">
        <button
          onClick={() => {
            if (window.chatbase) {
              window.chatbase('open');
            }
          }}
          className="hover:underline text-indigo-700 transition-colors bg-transparent border-none cursor-pointer"
        >
          {t("support")}
        </button>
        <a
          href="https://mail.google.com/mail/?view=cm&to=c8556403@gmail.com&su=MindMate Contact"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-indigo-700 transition-colors"
        >
          {t("contact")}
        </a>
      </div>
      <span className="mt-2 md:mt-0 text-indigo-300 relative z-10">
        <span className="text-indigo-400 font-semibold">{`© ${new Date().getFullYear()} MindMate`}</span>
      </span>
    </footer>
  );
}
