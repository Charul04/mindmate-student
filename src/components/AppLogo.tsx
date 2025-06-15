
import { GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function AppLogo({ size = 48 }: { size?: number }) {
  // Increased default size to 48
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-3">
      <GraduationCap size={size} className="text-indigo-600" />
      <span className="font-extrabold text-3xl tracking-tight text-indigo-700">
        {t('appName')}
        <span className="text-sky-500">+</span>
      </span>
    </span>
  );
}
