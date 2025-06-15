
import React, { useState } from "react";
import { ChartLine, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer } from "recharts";

type Goal = {
  id: number;
  text: string;
  period: "day" | "week" | "month" | "year";
  completed?: boolean;
};

const periods = ["day", "week", "month", "year"] as const;

export default function GoalsTracker() {
  const [goal, setGoal] = useState("");
  const [period, setPeriod] = useState<Goal["period"]>("day");
  const [goals, setGoals] = useState<Goal[]>([]);
  // Sample progress data: count of completed per period
  const progress = periods.map(p => ({
    period: p,
    count: goals.filter(g => g.period === p && g.completed).length,
  }));

  function addGoal() {
    if (!goal.trim()) return;
    setGoals([{ id: Date.now(), text: goal, period, completed: false }, ...goals]);
    setGoal("");
  }

  function removeGoal(id: number) {
    setGoals(goals.filter(g => g.id !== id));
  }

  function toggleCompleted(id: number) {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  }

  return (
    <div className="flex flex-col md:flex-row bg-white/70 rounded-xl border border-indigo-100 p-4 min-h-[220px] shadow-sm w-full">
      {/* Left: goals form and list */}
      <div className="flex-1 flex flex-col md:mr-4 mb-4 md:mb-0">
        <div className="flex gap-2 items-center mb-2">
          <ChartLine className="text-green-600" size={20} />
          <span className="font-semibold text-indigo-900 text-[1rem]">Goals Tracker</span>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            className="border rounded px-2 py-1 flex-1 text-sm"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="Describe your goal"
          />
          <select
            className="border rounded px-2 py-1 text-sm"
            value={period}
            onChange={e => setPeriod(e.target.value as Goal["period"])}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <Button size="sm" onClick={addGoal} title="Add Goal">
            <Plus size={14} />
          </Button>
        </div>
        <ul className="space-y-1 mb-2 max-h-24 overflow-auto">
          {goals.length === 0 && <li className="text-sm text-sky-700">No goals yet.</li>}
          {goals.map(g => (
            <li key={g.id} className="flex justify-between items-center bg-sky-50 rounded px-2 py-1">
              <span
                onClick={() => toggleCompleted(g.id)}
                className={`cursor-pointer ${g.completed ? "line-through text-slate-500" : ""}`}
                title="Toggle complete"
              >
                [{g.period}] {g.text}
              </span>
              <Button variant="destructive" size="sm" onClick={() => removeGoal(g.id)}>Remove</Button>
            </li>
          ))}
        </ul>
        <div className="text-xs text-indigo-700">Set and track your goals for today, this week, month, or year!</div>
      </div>
      {/* Right: progress chart */}
      <div className="md:w-1/2 flex items-center justify-center min-w-[180px]">
        <div className="w-full h-32 md:h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis allowDecimals={false} />
              <RTooltip />
              <Line type="monotone" dataKey="count" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
