import React, { useRef, useState, useEffect } from "react";
import { Clock, Play, Pause, RotateCcw, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePomodoroSessions } from "@/hooks/usePomodoroSessions";
import { useToast } from "@/hooks/use-toast";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const [timer, setTimer] = useState(1500); // 25 minutes
  const [initialTime, setInitialTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { saveSession } = usePomodoroSessions();
  const { toast } = useToast();

  // Calculate progress percentage
  const progressPercentage = ((initialTime - timer) / initialTime) * 100;

  function start() {
    if (isRunning) return;
    setIsRunning(true);
    setSessionStartTime(new Date());
    
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          completeSession();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  }

  async function pause() {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Save partial session if there was progress
    if (sessionStartTime && timer < initialTime) {
      const durationMinutes = Math.ceil((initialTime - timer) / 60);
      saveSession({
        session_type: mode,
        duration_minutes: durationMinutes,
        completed: false,
        session_date: new Date().toISOString().split('T')[0]
      });
    }
  }

  function reset() {
    pause();
    setTimer(mode === "work" ? 1500 : 300);
    setInitialTime(mode === "work" ? 1500 : 300);
    setSessionStartTime(null);
  }

  function switchMode(newMode: "work" | "break") {
    pause();
    setMode(newMode);
    const newTime = newMode === "work" ? 1500 : 300;
    setTimer(newTime);
    setInitialTime(newTime);
    setSessionStartTime(null);
  }

  async function completeSession() {
    if (sessionStartTime) {
      const durationMinutes = Math.ceil(initialTime / 60);
      await saveSession({
        session_type: mode,
        duration_minutes: durationMinutes,
        completed: true,
        session_date: new Date().toISOString().split('T')[0]
      });
      
      toast({
        title: "Session Complete! 🌱",
        description: `Great job! Your ${mode === "work" ? "focus" : "break"} session is finished.`,
      });
      
      // Auto-switch mode after completion
      const nextMode = mode === "work" ? "break" : "work";
      setMode(nextMode);
      const newTime = nextMode === "work" ? 1500 : 300;
      setTimer(newTime);
      setInitialTime(newTime);
      setSessionStartTime(null);
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 shadow-lg min-h-[500px] w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sprout className="text-emerald-600" size={24} />
        <h3 className="font-semibold text-emerald-800 text-lg">
          {mode === "work" ? "Start planting today!" : "Take a rest!"}
        </h3>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={mode === "work" ? "default" : "outline"}
          onClick={() => switchMode("work")}
          className={mode === "work" ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"}
          disabled={isRunning}
        >
          <Sprout className="w-4 h-4 mr-1" />
          Study
        </Button>
        <Button
          variant={mode === "break" ? "default" : "outline"}
          onClick={() => switchMode("break")}
          className={mode === "break" ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"}
          disabled={isRunning}
        >
          <Clock className="w-4 h-4 mr-1" />
          Break
        </Button>
      </div>

      {/* Tree Visualization */}
      <div className="relative mb-6">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-emerald-400 flex items-center justify-center shadow-lg">
          <div className="relative">
            {/* Soil */}
            <div className="w-24 h-12 bg-gradient-to-t from-amber-800 to-amber-600 rounded-b-full"></div>
            {/* Tree */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
              <div className="w-2 h-8 bg-amber-700"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-emerald-600"></div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-emerald-500 absolute top-3 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent">
          <div 
            className="absolute inset-0 rounded-full border-4 border-emerald-600 transition-all duration-300"
            style={{
              clipPath: `polygon(0 0, ${progressPercentage}% 0, ${progressPercentage}% 100%, 0 100%)`,
            }}
          ></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-4">
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-emerald-100" 
        />
      </div>

      {/* Timer Display */}
      <div className="text-6xl font-mono text-emerald-800 mb-6 tracking-wide">
        {formatTime(timer)}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3">
        {!isRunning ? (
          <Button 
            onClick={start} 
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Plant
          </Button>
        ) : (
          <Button 
            onClick={pause} 
            size="lg"
            variant="outline"
            className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-3 text-lg font-medium rounded-xl"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </Button>
        )}
        
        <Button 
          onClick={reset}
          size="lg"
          variant="outline"
          className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-xl"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Session Info */}
      <div className="mt-4 text-center text-emerald-700 text-sm">
        {mode === "work" 
          ? "25 min focus session - grow your knowledge tree!" 
          : "5 min break - let your mind rest and recharge!"
        }
      </div>
    </div>
  );
}