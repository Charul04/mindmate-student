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
            group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm
            hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-200 w-full min-h-[104px] text-left hover:scale-105
            ${triggerClassName ?? ""}
          `}
        >
          <span className="flex items-center mb-2">
            <Clock className="text-indigo-600" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">Focus Timer</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Plant trees while you study! Customizable focus sessions with progress tracking.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-indigo-800">Focus Timer 🌱</DialogTitle>
          <DialogDescription className="text-indigo-600">
            Customize your focus and break times. Complete study sessions to plant trees and grow your focus forest!
          </DialogDescription>
        </DialogHeader>
        <FocusTimer />
      </DialogContent>
    </Dialog>
  );
}