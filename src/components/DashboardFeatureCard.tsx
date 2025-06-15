import React from "react";
import { ChevronRight } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type DashboardFeature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip?: string;
  children?: React.ReactNode;
};

// Visual card boundary—make this the ONLY wrapper style for all DashboardFeatureCard instances
export default function DashboardFeatureCard({
  icon,
  title,
  description,
  tooltip,
  children,
}: DashboardFeature) {
  const cardClass =
    "group flex flex-col items-start w-full min-h-[104px] p-5 md:p-6 bg-white/70 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 text-left relative outline-none";

  const content = (
    <div className={cardClass} tabIndex={0}>
      <span className="flex items-center mb-2">{icon}</span>
      <span className="font-semibold text-indigo-900 text-[1.08rem]">{title}</span>
      <span className="text-indigo-900/70 text-sm mt-1">{description}</span>
      <ChevronRight className="absolute right-4 top-4 text-indigo-200 group-hover:text-indigo-500 transition hidden md:block" size={20} />
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
