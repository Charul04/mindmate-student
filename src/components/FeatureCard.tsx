
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3 bg-white/70 rounded-xl border border-indigo-100 p-6 shadow-sm hover:shadow-lg transition-shadow animate-fade-in">
      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-sky-200 to-indigo-200 mb-1">
        <Icon size={26} className="text-indigo-600" />
      </span>
      <h3 className="font-semibold text-lg text-indigo-900">{title}</h3>
      <p className="text-indigo-800/80 text-base">{description}</p>
    </div>
  );
}
