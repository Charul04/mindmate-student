
import React, { useState } from "react";
import { ChartLine, Plus } from "lucide-react";
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
    <div className="flex flex-col lg:flex-row bg-white/70 rounded-xl border border-indigo-100 p-4 shadow-sm w-full gap-6">
      {/* Goals form and list */}
      <div className="flex-1 min-w-0">
        <div className="flex gap-2 items-center mb-4">
          <ChartLine className="text-green-600 flex-shrink-0" size={22} />
          <span className="font-semibold text-indigo-900 text-lg">Goals Tracker</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            className="border rounded px-3 py-2 flex-1 text-sm min-w-0"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="Describe your goal"
          />
          <select
            className="border rounded px-3 py-2 text-sm"
            value={period}
            onChange={e => setPeriod(e.target.value as Goal["period"])}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <Button onClick={addGoal} className="w-full sm:w-auto" title="Add Goal">
            <Plus size={16} className="mr-1" />
            Add
          </Button>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium text-indigo-900 mb-2">Your Goals</h3>
          <ul className="space-y-2 max-h-48 overflow-auto">
            {goals.length === 0 && <li className="text-sm text-sky-700">No goals yet.</li>}
            {goals.map(g => (
              <li key={g.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-sky-50 rounded px-3 py-2 gap-2">
                <span
                  onClick={() => toggleCompleted(g.id)}
                  className={`cursor-pointer text-sm flex-1 ${g.completed ? "line-through text-slate-500" : ""}`}
                  title="Toggle complete"
                >
                  <span className="font-medium">[{g.period}]</span> {g.text}
                </span>
                <Button variant="destructive" size="sm" onClick={() => removeGoal(g.id)} className="text-xs">
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-xs text-indigo-700">
          Set and track your goals for today, this week, month, or year!
        </div>
      </div>
      
      {/* Progress chart */}
      <div className="flex-1 min-w-0 min-h-[300px] lg:min-h-[400px]">
        <div className="w-full h-full bg-white rounded-lg border border-indigo-100 shadow-sm p-4">
          <h3 className="font-medium text-indigo-900 mb-4 text-center">Progress Overview</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={progress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis allowDecimals={false} />
              <RTooltip />
              <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
