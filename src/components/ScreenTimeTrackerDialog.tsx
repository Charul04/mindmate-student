
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [
    h > 0 ? `${h}h` : null,
    m > 0 || h > 0 ? `${m}m` : null,
    `${s}s`
  ].filter(Boolean).join(" ");
}

export default function ScreenTimeTrackerDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [msElapsed, setMsElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountTime = useRef(Date.now());

  // Track elapsed time since Dashboard mount
  useEffect(() => {
    if (!open) return; // Only update timer when dialog is open
    const update = () => setMsElapsed(Date.now() - mountTime.current);
    update();
    intervalRef.current = setInterval(update, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  // Reset timer if dashboard reloads
  useEffect(() => {
    mountTime.current = Date.now();
    setMsElapsed(0);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={
            triggerClassName ??
            "group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
          }
        >
          <span className="flex items-center mb-2">
            <Clock className="text-purple-600" size={28} />
          </span>
          <span className="font-semibold text-indigo-900 text-[1.08rem]">Screen Time Tracker</span>
          <span className="text-indigo-900/70 text-sm mt-1">See how long you’ve spent on MindMate+ today.</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="text-purple-600" size={22} />
            Screen Time Tracker
          </DialogTitle>
          <DialogDescription>
            Tracking your time spent helps with mindful usage and stronger study habits.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 items-center justify-center pt-2 pb-3">
          <div className="text-4xl font-mono font-semibold text-sky-800">{formatTime(msElapsed)}</div>
          <div className="text-sm text-slate-500">Time spent in this session</div>
        </div>
        <Button variant="ghost" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
