
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

  return (
    <div className="flex flex-col bg-white/80 rounded-lg border border-indigo-100 p-4 shadow-sm w-full">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="text-teal-600" size={20} />
        <span className="font-semibold text-indigo-900 text-lg">Daily Study Planner</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1 text-sm"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Add a study task..."
          onKeyDown={e => e.key === "Enter" ? addTask() : undefined}
        />
        <Button onClick={addTask} className="w-full sm:w-auto" title="Add Task">
          <Plus size={16} className="mr-1" />
          Add Task
        </Button>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium text-indigo-900 mb-2">Your Tasks</h3>
        <ul className="space-y-2 max-h-32 overflow-auto">
          {todos.length === 0 && <li className="text-sm text-sky-700">No planned tasks yet.</li>}
          {todos.map(t => (
            <li key={t.id} className="flex justify-between items-center bg-sky-50 rounded px-3 py-2">
              <span className="text-sm flex-1">{t.task}</span>
              <Button variant="destructive" size="sm" onClick={() => removeTask(t.id)} className="ml-2">
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={calendarDate}
          onSelect={setCalendarDate}
          className="rounded-md border w-full max-w-sm"
        />
      </div>
      
      <div className="text-xs text-indigo-700 mt-4 text-center">
        Add tasks & optionally pick a study date.
      </div>
    </div>
  );
}
