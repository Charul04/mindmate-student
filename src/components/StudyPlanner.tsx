
import React, { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type Todo = { id: number; task: string; };

export default function StudyPlanner() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);

  function addTask() {
    if (task.trim() === "") return;
    setTodos([{ id: Date.now(), task: task.trim() }, ...todos]);
    setTask("");
  }

  function removeTask(id: number) {
    setTodos(todos.filter(t => t.id !== id));
  }

  // Calendar events are "events" set to the chosen date
  // You could expand this logic to save events per-date
  return (
    <div className="flex flex-col bg-white/70 rounded-xl border border-indigo-100 p-5 min-h-[250px] shadow-sm w-full">
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="text-teal-600" size={22} />
        <span className="font-semibold text-indigo-900 text-base">Daily Study Planner</span>
      </div>
      <div className="flex items-center mb-2 gap-2">
        <input
          className="border rounded px-2 py-1 flex-1 text-sm"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Add a study task..."
          onKeyDown={e => e.key === "Enter" ? addTask() : undefined}
        />
        <Button size="sm" onClick={addTask} title="Add Task">
          <Plus size={16} />
        </Button>
      </div>
      <ul className="space-y-1 mb-3 max-h-28 overflow-auto">
        {todos.length === 0 && <li className="text-sm text-sky-700">No planned tasks yet.</li>}
        {todos.map(t => (
          <li key={t.id} className="flex justify-between items-center bg-sky-50 rounded px-2 py-1">
            <span>{t.task}</span>
            <Button variant="destructive" size="sm" onClick={() => removeTask(t.id)}>Remove</Button>
          </li>
        ))}
      </ul>
      <Calendar
        mode="single"
        selected={calendarDate}
        onSelect={setCalendarDate}
        className="p-3 pointer-events-auto mb-2"
      />
      <div className="text-xs text-indigo-700">Add your tasks & optionally pick a study date.</div>
    </div>
  );
}
