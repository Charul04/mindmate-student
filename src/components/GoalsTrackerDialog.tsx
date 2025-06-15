
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import GoalsTracker from "./GoalsTracker";
import { ChartLine } from "lucide-react";

export default function GoalsTrackerDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`
            group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm
            hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left
            ${triggerClassName ?? ""}
          `}
        >
          <span className="flex items-center mb-2">
            <ChartLine className="text-green-600" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">Goals Tracker</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Set goals for day, week, month, year. Visualize progress with graphs!
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full"> {/* Increased max width */}
        <DialogHeader>
          <DialogTitle>Goals Tracker</DialogTitle>
          <DialogDescription>
            Set goals for today, this week, month, or year and track your progress with visual graphs.
          </DialogDescription>
        </DialogHeader>
        <GoalsTracker />
      </DialogContent>
    </Dialog>
  );
}
