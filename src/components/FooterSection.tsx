
import AppLogo from "@/components/AppLogo";

export default function FooterSection() {
  return (
    <footer className="mt-auto px-8 py-8 bg-white/90 border-t border-indigo-100 flex flex-col md:flex-row justify-between items-center text-indigo-700 text-sm">
      <div className="mb-3 md:mb-0">
        <AppLogo size={26} />
      </div>
      <div className="flex gap-5">
        <a href="#" className="hover:underline">Support</a>
        <a href="#" className="hover:underline">Contact</a>
      </div>
      <span className="mt-2 md:mt-0 text-indigo-300">&copy; {new Date().getFullYear()} MindMate+</span>
    </footer>
  );
}
