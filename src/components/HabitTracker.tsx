import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Calendar as CalendarIcon, TrendingUp, Minus } from "lucide-react";
import { useHabits } from "@/hooks/useHabits";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";

const HABIT_COLORS = [
  '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', 
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
];

export default function HabitTracker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDescription, setNewHabitDescription] = useState("");
  const [newHabitFrequency, setNewHabitFrequency] = useState(1);
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const { habits, habitEntries, addHabit, updateHabitEntry, getHabitEntry, deleteHabit } = useHabits();

  const handleAddHabit = async () => {
    if (newHabitName.trim()) {
      const success = await addHabit({
        name: newHabitName,
        description: newHabitDescription,
        target_frequency: newHabitFrequency,
        color: selectedColor,
      });
      
      if (success) {
        setNewHabitName("");
        setNewHabitDescription("");
        setNewHabitFrequency(1);
        setSelectedColor(HABIT_COLORS[0]);
        setShowAddDialog(false);
      }
    }
  };

  const handleHabitProgress = async (habitId: string, date: Date, increment: boolean) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const currentEntry = getHabitEntry(habitId, dateStr);
    const currentCount = currentEntry?.completed_count || 0;
    const habit = habits.find(h => h.id === habitId);
    
    if (!habit) return;
    
    let newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);
    // Don't exceed target frequency
    newCount = Math.min(newCount, habit.target_frequency);
    
    await updateHabitEntry(habitId, dateStr, newCount);
  };

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getHabitProgressForDate = (habitId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = getHabitEntry(habitId, dateStr);
    return entry?.completed_count || 0;
  };

  const getWeeklyProgress = (habitId: string) => {
    const weekDays = getWeekDays(selectedDate);
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return 0;
    
    const totalCompleted = weekDays.reduce((sum, day) => {
      return sum + getHabitProgressForDate(habitId, day);
    }, 0);
    
    const totalTarget = habit.target_frequency * 7;
    return totalTarget > 0 ? (totalCompleted / totalTarget) * 100 : 0;
  };

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const weekDays = getWeekDays(selectedDate);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-indigo-900">Today's Habits</h3>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus size={16} className="mr-2" />
                  Add Habit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Habit</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Habit name"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Description (optional)"
                    value={newHabitDescription}
                    onChange={(e) => setNewHabitDescription(e.target.value)}
                  />
                  <div>
                    <label className="text-sm font-medium">Target frequency per day</label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={newHabitFrequency}
                      onChange={(e) => setNewHabitFrequency(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Color</label>
                    <div className="flex gap-2 flex-wrap">
                      {HABIT_COLORS.map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor === color ? 'border-gray-400' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddHabit} className="w-full">
                    Add Habit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </div>

          {habits.length === 0 ? (
            <div className="text-center py-8">
              <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No habits yet. Add your first habit to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {habits.map(habit => {
                const todayProgress = getHabitProgressForDate(habit.id!, new Date());
                const progressPercentage = (todayProgress / habit.target_frequency) * 100;
                
                return (
                  <div key={habit.id} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: habit.color }}
                        />
                        <h4 className="font-medium text-gray-900">{habit.name}</h4>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteHabit(habit.id!)}
                      >
                        Delete
                      </Button>
                    </div>
                    
                    {habit.description && (
                      <p className="text-sm text-gray-600 mb-3">{habit.description}</p>
                    )}
                    
                     <div className="flex items-center justify-between mb-2">
                       <span className="text-sm text-gray-600">
                         {todayProgress} / {habit.target_frequency} completed today
                       </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={todayProgress >= habit.target_frequency}
                            onChange={async () => {
                              const newCount = todayProgress >= habit.target_frequency ? 0 : habit.target_frequency;
                              await updateHabitEntry(habit.id!, format(new Date(), 'yyyy-MM-dd'), newCount);
                            }}
                            className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            style={{ accentColor: habit.color }}
                          />
                        </div>
                     </div>
                    
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <h3 className="text-lg font-semibold text-indigo-900">Weekly Progress</h3>
          
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map(day => (
              <div key={day.toString()} className="text-center p-2">
                <div className="text-xs font-medium text-gray-600">
                  {format(day, 'EEE')}
                </div>
                <div className="text-sm text-gray-900">
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {habits.map(habit => (
            <div key={habit.id} className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: habit.color }}
                  />
                  <h4 className="font-medium text-gray-900">{habit.name}</h4>
                </div>
                <Badge variant="secondary">
                  {Math.round(getWeeklyProgress(habit.id!))}% this week
                </Badge>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map(day => {
                  const dayProgress = getHabitProgressForDate(habit.id!, day);
                  const dayPercentage = (dayProgress / habit.target_frequency) * 100;
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div 
                      key={day.toString()} 
                      className={`p-2 text-center rounded ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <div className="text-xs text-gray-600 mb-1">
                        {dayProgress}/{habit.target_frequency}
                      </div>
                      <div 
                        className="h-3 rounded-full bg-gray-200"
                        style={{
                          background: dayPercentage > 0 
                            ? `linear-gradient(to right, ${habit.color} ${dayPercentage}%, #e5e7eb ${dayPercentage}%)`
                            : '#e5e7eb'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border border-indigo-200 p-3 pointer-events-auto"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                Habits for {format(selectedDate, 'PPP')}
              </h3>
              {habits.length === 0 ? (
                <p className="text-gray-500">No habits to track yet.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {habits.map(habit => {
                    const dayProgress = getHabitProgressForDate(habit.id!, selectedDate);
                    const progressPercentage = (dayProgress / habit.target_frequency) * 100;
                    
                    return (
                      <div key={habit.id} className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: habit.color }}
                            />
                            <span className="font-medium text-sm">{habit.name}</span>
                          </div>
                           <div className="flex items-center gap-1">
                             <input
                               type="checkbox"
                               checked={dayProgress >= habit.target_frequency}
                               onChange={async () => {
                                 const newCount = dayProgress >= habit.target_frequency ? 0 : habit.target_frequency;
                                 await updateHabitEntry(habit.id!, format(selectedDate, 'yyyy-MM-dd'), newCount);
                               }}
                               className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                               style={{ accentColor: habit.color }}
                             />
                           </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {dayProgress} / {habit.target_frequency} completed
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}