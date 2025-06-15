
import React from "react";
import { ChevronRight } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type DashboardFeature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip?: string;
};

// Transparent, border-only button style
export default function DashboardCard({ icon, title, description, tooltip }: DashboardFeature) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="group flex flex-col items-start bg-transparent rounded-xl border border-indigo-100 p-5 md:p-6 shadow-none transition focus:ring-2 focus:ring-indigo-100 w-full min-h-[104px] text-left hover:bg-indigo-50/35 hover:shadow-md focus:bg-indigo-50/50"
          >
            <span className="flex items-center mb-2">{icon}</span>
            <span className="font-semibold text-indigo-900 text-[1.08rem]">{title}</span>
            <span className="text-indigo-900/70 text-sm mt-1">{description}</span>
            <ChevronRight className="absolute right-4 top-4 text-indigo-200 group-hover:text-indigo-500 transition hidden md:block" size={20} />
          </button>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent side="bottom">
            {tooltip}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
