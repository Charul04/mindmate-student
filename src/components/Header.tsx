
import AppLogo from "@/components/AppLogo";
// import ThemeAndLanguageSwitcher from "@/components/ThemeAndLanguageSwitcher";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-6 border-b border-indigo-100 bg-white/90 shadow-sm">
      <div>
        <AppLogo />
      </div>
      {/* Removed ThemeAndLanguageSwitcher */}
      <div className="flex items-center gap-6">
        {/* Buttons removed as requested */}
      </div>
    </header>
  );
}
