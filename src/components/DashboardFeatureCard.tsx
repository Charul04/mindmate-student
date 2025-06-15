
import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ChevronRight } from "lucide-react";

type DashboardFeature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip?: string;
  children?: React.ReactNode; // for Dialog button wraps
};

/**
 * Visually distinct, attractive card UI for dashboard features.
 * - Glowing gradient border, inner soft-shadow, rounded glass-effect background.
 * - Animates on hover, focus, and scale.
 */
export default function DashboardFeatureCard({
  icon,
  title,
  description,
  tooltip,
  children,
}: DashboardFeature) {
  // Gradient-glow border + animated background
  const content = (
    <div
      className="relative group flex flex-col items-start justify-start w-full min-h-[120px] p-5 md:p-6
        bg-gradient-to-br from-white/85 via-sky-50/80 to-indigo-50/70 dark:from-gray-800/90 dark:to-sky-900/50
        rounded-2xl border-2 border-transparent
        shadow-lg
        before:absolute before:inset-0 before:rounded-2xl before:z-[-1]
        before:bg-gradient-to-br before:from-sky-200/50 before:via-indigo-300/20 before:to-white/5
        before:shadow-[0_4px_32px_0_rgba(56,189,248,0.09)]
        hover:before:shadow-[0_6px_36px_0_rgba(56,189,248,0.25)]
        focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-200/60
        transition-all duration-200
        outline-none
        "
      tabIndex={0}
    >
      <span className="flex items-center mb-2 drop-shadow-glow-sky animate-fade-in">
        {icon}
      </span>
      <span className="font-semibold text-indigo-900 text-[1.11rem] drop-shadow-sm animate-fade-in">
        {title}
      </span>
      <span className="text-indigo-900/70 text-[0.97rem] mt-1 animate-fade-in">
        {description}
      </span>
      {/* animated chevron for navigation indication */}
      <ChevronRight className="absolute right-3 top-3 text-indigo-200 group-hover:text-sky-500 transition hidden md:block animate-slide-in-right" size={20} />
      {/* SVG sparkle doodles for playful vibe */}
      <svg width="24" height="18" className="absolute -right-2 -top-2 animate-fade-in" fill="none"><path d="M10 15L12 9L14 15" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round"/><circle cx="20" cy="4" r="2.2" fill="#818cf8" opacity="0.11"/><circle cx="4" cy="4" r="1.1" fill="#fbbf24" opacity="0.15"/></svg>
      {/* New: card-glow animated border (playful highlight) */}
      <span className="pointer-events-none absolute -inset-1 rounded-2xl z-[-2] bg-gradient-to-br from-sky-400/30 via-indigo-400/20 to-transparent blur-sm opacity-80 group-hover:opacity-100 transition-all duration-300" />
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children ? children : <button tabIndex={0} className="outline-none">{content}</button>}
          </TooltipTrigger>
          <TooltipContent side="bottom">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return children ? children : <button tabIndex={0} className="outline-none">{content}</button>;
}

