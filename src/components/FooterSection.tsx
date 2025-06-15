
import AppLogo from "@/components/AppLogo";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function FooterSection() {
  const { t } = useTranslation();
  return (
    <footer className="mt-auto px-8 py-8 bg-white/90 dark:bg-slate-900/85 border-t border-indigo-100 flex flex-col md:flex-row justify-between items-center text-indigo-700 text-sm">
      <div className="mb-3 md:mb-0">
        <AppLogo size={26} />
      </div>
      <div className="flex gap-5">
        <a href="#" className="hover:underline">{t('support')}</a>
        <a href="#" className="hover:underline">{t('contact')}</a>
      </div>
      <span className="mt-2 md:mt-0 text-indigo-300">&copy; {new Date().getFullYear()} MindMate+</span>
    </footer>
  );
}
