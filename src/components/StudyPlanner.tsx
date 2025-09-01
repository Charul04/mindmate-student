
import React, { useState, useMemo } from "react";
import { CalendarDays, Plus, Clock, Star, CheckCircle2, Circle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { useDailyPlanner } from "@/hooks/useDailyPlanner";

export default function StudyPlanner() {
  const { tasks, loading, addTask, updateTask, deleteTask, getTasksByDate } = useDailyPlanner();
  const [taskInput, setTaskInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [timeInput, setTimeInput] = useState("");

  const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
  const todayTasks = getTasksByDate(selectedDateString);

  const priorityConfig = {
    high: { color: "bg-red-500", label: "High", icon: "🔥" },
    medium: { color: "bg-yellow-500", label: "Medium", icon: "⚡" },
    low: { color: "bg-green-500", label: "Low", icon: "🌱" }
  };

  const handleAddTask = async () => {
    if (taskInput.trim() === "") return;
    
    const taskText = timeInput ? `${timeInput} - ${taskInput.trim()}` : taskInput.trim();
    const success = await addTask(taskText, selectedDateString, priority);
    
    if (success) {
      setTaskInput("");
      setTimeInput("");
      setPriority('medium');
    }
  };

  const handleToggleComplete = async (task: any) => {
    await updateTask(task.id!, { completed: !task.completed });
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const completedTasks = todayTasks.filter(task => task.completed);
  const pendingTasks = todayTasks.filter(task => !task.completed);
  const highPriorityTasks = pendingTasks.filter(task => task.priority === 'high');
  const mediumPriorityTasks = pendingTasks.filter(task => task.priority === 'medium');
  const lowPriorityTasks = pendingTasks.filter(task => task.priority === 'low');

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white/80 rounded-lg border border-indigo-100 p-6 shadow-sm w-full">
      {/* Left Panel - Calendar & Add Task */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="text-teal-600" size={24} />
          <span className="font-semibold text-indigo-900 text-xl">Daily Planner</span>
        </div>

        {/* Add Task Form */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h3 className="font-medium text-gray-800">Add New Task</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              placeholder="Time (e.g., 9:00 AM)"
              className="text-sm"
            />
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">🔥 High Priority</SelectItem>
                <SelectItem value="medium">⚡ Medium Priority</SelectItem>
                <SelectItem value="low">🌱 Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="What do you need to do?"
              className="flex-1 text-sm"
              onKeyDown={(e) => e.key === "Enter" ? handleAddTask() : undefined}
            />
            <Button onClick={handleAddTask} disabled={!taskInput.trim()}>
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg border p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="w-full"
          />
        </div>
      </div>

      {/* Right Panel - Tasks for Selected Date */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">
              {format(selectedDate, 'EEEE, MMMM d')}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {todayTasks.length} tasks
            </Badge>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading tasks...</div>
          ) : todayTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CalendarDays className="mx-auto mb-2 text-gray-300" size={48} />
              <p>No tasks scheduled for this day</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* High Priority Tasks */}
              {highPriorityTasks.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center gap-1">
                    🔥 High Priority ({highPriorityTasks.length})
                  </h4>
                  <div className="space-y-2">
                    {highPriorityTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleComplete}
                        onDelete={handleDeleteTask}
                        priorityConfig={priorityConfig}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Medium Priority Tasks */}
              {mediumPriorityTasks.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-yellow-600 mb-2 flex items-center gap-1">
                    ⚡ Medium Priority ({mediumPriorityTasks.length})
                  </h4>
                  <div className="space-y-2">
                    {mediumPriorityTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleComplete}
                        onDelete={handleDeleteTask}
                        priorityConfig={priorityConfig}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Low Priority Tasks */}
              {lowPriorityTasks.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2 flex items-center gap-1">
                    🌱 Low Priority ({lowPriorityTasks.length})
                  </h4>
                  <div className="space-y-2">
                    {lowPriorityTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleComplete}
                        onDelete={handleDeleteTask}
                        priorityConfig={priorityConfig}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Tasks */}
              {completedTasks.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                    ✅ Completed ({completedTasks.length})
                  </h4>
                  <div className="space-y-2">
                    {completedTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleComplete}
                        onDelete={handleDeleteTask}
                        priorityConfig={priorityConfig}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-3">Today's Progress</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">{pendingTasks.length}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {todayTasks.length > 0 ? Math.round((completedTasks.length / todayTasks.length) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-600">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Task Item Component
interface TaskItemProps {
  task: any;
  onToggle: (task: any) => void;
  onDelete: (taskId: string) => void;
  priorityConfig: any;
}

function TaskItem({ task, onToggle, onDelete, priorityConfig }: TaskItemProps) {
  const config = priorityConfig[task.priority];
  
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm ${
      task.completed ? 'bg-gray-50 opacity-60' : 'bg-white'
    }`}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task)}
        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
      />
      
      <div className="flex-1 min-w-0">
        <div className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.task}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge 
            variant="secondary" 
            className={`text-xs px-2 py-0 ${config.color} text-white`}
          >
            {config.icon} {config.label}
          </Badge>
          {task.created_at && (
            <span className="text-xs text-gray-400">
              {format(new Date(task.created_at), 'h:mm a')}
            </span>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task.id!)}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
}
