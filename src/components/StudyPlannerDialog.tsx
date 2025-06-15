import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import StudyPlanner from "./StudyPlanner";
import { CalendarDays } from "lucide-react";

export default function StudyPlannerDialog({ triggerClassName }: { triggerClassName?: string }) {
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
            <CalendarDays className="text-teal-600" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">Daily Study Planner</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Simple to-do & calendar to add events, AI suggestions.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Daily Study Planner</DialogTitle>
          <DialogDescription>
            Plan your day: add tasks, pick a date, and organize efficiently.
          </DialogDescription>
        </DialogHeader>
        <StudyPlanner />
      </DialogContent>
    </Dialog>
  );
}
