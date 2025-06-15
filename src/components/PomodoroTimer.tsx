
import React, { useRef, useState } from "react";
import { Clock, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const [timer, setTimer] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function start() {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          const nextMode = mode === "work" ? "break" : "work";
          setMode(nextMode);
          // After mode switch, set new timer value
          setTimer(nextMode === "work" ? 1500 : 300);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  }

  function stop() {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function reset() {
    stop();
    setTimer(mode === "work" ? 1500 : 300);
  }

  function switchMode(newMode: "work" | "break") {
    stop();
    setMode(newMode);
    setTimer(newMode === "work" ? 1500 : 300);
  }

  return (
    <div className="flex flex-col bg-white/70 rounded-xl border border-indigo-100 p-5 min-h-[250px] shadow-sm w-full">
      <div className="flex gap-2 items-center mb-3">
        <Clock className="text-sky-600" size={22} />
        <span className="font-semibold text-indigo-900 text-base">Pomodoro Suggestion</span>
      </div>
      <div className="flex gap-2 items-center mb-2">
        <Button
          variant={mode === "work" ? "default" : "outline"}
          onClick={() => switchMode("work")}
        >
          Work
        </Button>
        <Button
          variant={mode === "break" ? "default" : "outline"}
          onClick={() => switchMode("break")}
        >
          Break
        </Button>
      </div>
      <div className="text-5xl text-center font-mono py-4">{formatTime(timer)}</div>
      <div className="flex gap-2 justify-center mb-2">
        <Button onClick={start} disabled={isRunning}>Start</Button>
        <Button onClick={stop} disabled={!isRunning}>Stop</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
      <div className="flex gap-2 items-center text-indigo-800 text-sm justify-center mt-auto">
        <Timer size={16} />
        <span>
          {mode === "work"
            ? "25 min focus, then break!"
            : "5 min rest, then back to work!"}
        </span>
      </div>
    </div>
  );
}
