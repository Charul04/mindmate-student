
import { GraduationCap } from "lucide-react";

export default function AppLogo({ size = 36 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <GraduationCap size={size} className="text-indigo-600" />
      <span className="font-extrabold text-lg tracking-tight text-indigo-700">
        MindMate<span className="text-sky-500">+</span>
      </span>
    </span>
  );
}
