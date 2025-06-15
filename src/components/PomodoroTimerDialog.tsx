
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PomodoroTimer from "./PomodoroTimer";
import { Clock } from "lucide-react";

export default function PomodoroTimerDialog({ triggerClassName }: { triggerClassName?: string }) {
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
            <Clock className="text-sky-600" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">Pomodoro Suggestion</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            AI recommends focus & break cycles. Stopwatch & clock added.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Pomodoro Suggestion</DialogTitle>
          <DialogDescription>
            Set custom work and break timers to boost focus with stopwatch and clock functionality.
          </DialogDescription>
        </DialogHeader>
        <PomodoroTimer />
      </DialogContent>
    </Dialog>
  );
}
