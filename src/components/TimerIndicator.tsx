import React from 'react';
import { useBackgroundTimer } from '@/hooks/useBackgroundTimer';
import { cn } from '@/lib/utils';
import { Clock, Play, Pause } from 'lucide-react';

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface Props {
  className?: string;
}

export default function TimerIndicator({ className }: Props) {
  const { isRunning, timer, mode } = useBackgroundTimer();

  if (!isRunning && timer === (mode === 'work' ? 25 * 60 : 5 * 60)) {
    return null; // Don't show when timer is not started
  }

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-indigo-200 rounded-lg px-3 py-2 shadow-lg",
      "flex items-center gap-2 text-sm font-medium text-indigo-800",
      className
    )}>
      {isRunning ? (
        <Pause className="w-4 h-4 text-indigo-600" />
      ) : (
        <Play className="w-4 h-4 text-indigo-600" />
      )}
      <span className="font-mono">{formatTime(timer)}</span>
      <span className="text-xs text-indigo-600 capitalize">
        {mode}
      </span>
      {isRunning && (
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}