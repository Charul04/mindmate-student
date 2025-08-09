import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FocusTimer from "./FocusTimer";
import { Clock } from "lucide-react";

export default function FocusTimerDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`
            group flex flex-col items-start bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-5 md:p-6 shadow-sm
            hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-emerald-200 w-full min-h-[104px] text-left hover:scale-105
            ${triggerClassName ?? ""}
          `}
        >
          <span className="flex items-center mb-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
              <Clock className="text-emerald-600" size={16} />
            </div>
            <span className="font-semibold text-emerald-800 text-[1.08rem]">Focus Timer</span>
          </span>
          <span className="text-emerald-700/80 text-sm mt-1">
            Plant trees while you study! Track focus sessions with Pomodoro technique.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">Focus Timer 🌱</DialogTitle>
          <DialogDescription className="text-emerald-600">
            Use the Pomodoro technique to grow your focus forest. Complete study sessions to plant trees!
          </DialogDescription>
        </DialogHeader>
        <FocusTimer />
      </DialogContent>
    </Dialog>
  );
}