
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
 * Generic card UI for dashboard features; Dialogs can use as children (for trigger asChild).
 * Adds lively gradient, shadow, and animated hover/focus.
 */
export default function DashboardFeatureCard({
  icon,
  title,
  description,
  tooltip,
  children,
}: DashboardFeature) {
  const content = (
    <div className="group relative flex flex-col items-start isolate bg-gradient-to-tr from-indigo-50 via-sky-100 to-white/80 rounded-xl border border-indigo-100 shadow-sm hover:shadow-2xl hover:scale-[1.045] active:scale-[0.98] transition-all duration-200 w-full min-h-[112px] text-left
      before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-br before:from-sky-300/5 before:via-indigo-200/15 before:to-indigo-300/0
      after:content-[''] after:absolute after:inset-0 after:border after:border-sky-200/25 after:rounded-xl
      " tabIndex={0}
    >
      <span className="flex items-center mb-2 drop-shadow-glow-sky animate-fade-in">
        {icon}
      </span>
      <span className="font-semibold text-indigo-900 text-[1.11rem] animate-fade-in">{title}</span>
      <span className="text-indigo-900/70 text-[0.97rem] mt-1 animate-fade-in">{description}</span>
      <ChevronRight className="absolute right-3 top-3 text-indigo-200 group-hover:text-indigo-500 transition hidden md:block animate-slide-in-right" size={20} />
      {/* Sparkle doodles */}
      <svg width="24" height="18" className="absolute -right-2 -top-2 animate-fade-in" fill="none"><path d="M10 15L12 9L14 15" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round"/><circle cx="20" cy="4" r="2.2" fill="#818cf8" opacity="0.11"/><circle cx="4" cy="4" r="1.1" fill="#fbbf24" opacity="0.15"/></svg>
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

