
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wind } from "lucide-react";

type BreathingStep = {
  label: string;
  seconds: number;
  colorClass: string;
};

const breathingSteps: BreathingStep[] = [
  { label: "Inhale deeply", seconds: 4, colorClass: "text-sky-700" },
  { label: "Hold your breath", seconds: 7, colorClass: "text-indigo-700" },
  { label: "Exhale slowly", seconds: 8, colorClass: "text-cyan-700" },
];

const DEFAULT_CYCLES = 4; // ~3–5 min if you want longer, adjust

export default function GuidedBreathingDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(breathingSteps[0].seconds);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Start/restart breathing
  const startBreathing = () => {
    setStarted(true);
    setCompleted(false);
    setStepIdx(0);
    setCycle(0);
    setTimeLeft(breathingSteps[0].seconds);
  };

  // Cleanup timer
  useEffect(() => {
    if (!started || completed) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (timeLeft > 0) {
      timerRef.current = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      if (stepIdx < breathingSteps.length - 1) {
        setStepIdx(stepIdx + 1);
        setTimeLeft(breathingSteps[stepIdx + 1].seconds);
      } else if (cycle < DEFAULT_CYCLES - 1) {
        setStepIdx(0);
        setCycle(cycle + 1);
        setTimeLeft(breathingSteps[0].seconds);
      } else {
        setCompleted(true);
        setStarted(false);
      }
    }
    // Cleanup on unmount/close
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [started, timeLeft, stepIdx, cycle, completed]);

  // Reset when dialog closes
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStarted(false);
      setCompleted(false);
      setCycle(0);
      setStepIdx(0);
      setTimeLeft(breathingSteps[0].seconds);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`
            group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm
            hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left outline-none
            ${triggerClassName ?? ""}
          `}
          tabIndex={0}
          aria-label="Start Guided Breathing Exercise"
        >
          <span className="flex items-center mb-2">
            <Wind className="text-indigo-600 mr-2" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem]">Guided Breathing</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            3–5 min calming breathing session.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {completed
              ? "Great job!"
              : started
                ? `Cycle ${cycle + 1} of ${DEFAULT_CYCLES}`
                : "Guided Breathing Exercise"}
          </DialogTitle>
          <DialogDescription>
            {completed
              ? "You're safe. You’re doing your best, and that’s enough for now."
              : started
                ? "Follow my cues and focus gently on your breath."
                : (
                  <>
                    Let's take a few quiet moments together. This is a safe space to pause, breathe, and let go of tension.<br />
                    <span className="block mt-2 text-indigo-800 font-medium">We’ll use the 4-7-8 breathing method: <br />Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.<br />Ready?</span>
                  </>
                )
            }
          </DialogDescription>
        </DialogHeader>
        <div className="my-7 flex flex-col items-center min-h-[120px]">
          {started && !completed ? (
            <div className="flex flex-col items-center w-full">
              <div className="animate-fade-in">
                <span className={`block text-lg md:text-xl font-semibold mb-2 ${breathingSteps[stepIdx].colorClass}`}>
                  {breathingSteps[stepIdx].label}
                </span>
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-sky-200 flex items-center justify-center bg-white/80 shadow-inner">
                    <span className="text-[2.5rem] font-mono font-bold text-sky-800 animate-fade-in">{timeLeft}</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-indigo-500 text-base text-center">
                {stepIdx === 0 && "Breathe in deeply through your nose."}
                {stepIdx === 1 && "Gently hold your breath. You're doing well."}
                {stepIdx === 2 && "Exhale slowly through your mouth. Let tension drift away."}
              </div>
              <div className="mt-4 text-xs text-indigo-400 italic">Try to notice your body softening and your mind quieting.</div>
            </div>
          ) : completed ? (
            <div className="flex flex-col items-center animate-fade-in">
              <span className="text-3xl mb-2">🌬️</span>
              <span className="text-lg text-indigo-700 font-semibold mb-2">Well done. Your mind and body thank you.</span>
              <span className="text-indigo-600">
                You're safe. You’re doing your best, and that’s enough for now.
              </span>
              <div className="mt-3 text-sky-500">You can try this exercise again anytime you need a calm moment.</div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <span className="text-sky-700 text-lg mb-3 font-medium animate-fade-in">
                Find a comfortable seat. You can close your eyes if you like.<br />When you're ready, click below to begin.
              </span>
              <Button onClick={startBreathing} size="lg" className="px-6 mt-4" autoFocus>
                Start Breathing Exercise
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {completed ? "Close" : "Cancel"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
