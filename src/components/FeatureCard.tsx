
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// Card is now fully neutral (no colored backgrounds or glows, icon also default gray/indigo)
export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3 bg-white/95 rounded-xl border border-indigo-100 p-6 shadow transition-shadow">
      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-50 mb-1">
        <Icon size={26} className="text-indigo-400" /> {/* Soft neutral icon */}
      </span>
      <h3 className="font-semibold text-lg text-indigo-900">{title}</h3>
      <p className="text-indigo-800/80 text-base">{description}</p>
    </div>
  );
}
