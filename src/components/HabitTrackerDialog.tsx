import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import HabitTracker from "./HabitTracker";
import { Target } from "lucide-react";

export default function HabitTrackerDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`
            group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm
            hover:shadow-lg transition-shadow focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left
            ${triggerClassName ?? ""}
          `}
        >
          <span className="flex items-center mb-2">
            <Target className="text-emerald-600" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">Habit Tracker</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Build consistent habits with visual progress tracking and streaks.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Habit Tracker</DialogTitle>
          <DialogDescription>
            Track your daily habits and build consistent routines with visual progress indicators.
          </DialogDescription>
        </DialogHeader>
        <HabitTracker />
      </DialogContent>
    </Dialog>
  );
}