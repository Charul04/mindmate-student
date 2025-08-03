import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Plus, Trash2, TrendingUp } from "lucide-react";
import { useMoodEntries, type MoodEntry } from "@/hooks/useMoodEntries";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

const moodOptions = [
  { value: "very_sad", label: "😢", name: "Very Sad", color: "bg-red-500" },
  { value: "sad", label: "😔", name: "Sad", color: "bg-red-300" },
  { value: "neutral", label: "😐", name: "Neutral", color: "bg-gray-400" },
  { value: "happy", label: "😊", name: "Happy", color: "bg-green-300" },
  { value: "very_happy", label: "😄", name: "Very Happy", color: "bg-green-500" },
];

const triggerOptions = [
  { value: "social", label: "Social", color: "bg-blue-100 text-blue-800" },
  { value: "work", label: "Work", color: "bg-purple-100 text-purple-800" },
  { value: "personal", label: "Personal", color: "bg-pink-100 text-pink-800" },
  { value: "health", label: "Health", color: "bg-green-100 text-green-800" },
  { value: "family", label: "Family", color: "bg-orange-100 text-orange-800" },
  { value: "other", label: "Other", color: "bg-gray-100 text-gray-800" },
];

export default function MoodTracker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("entry");
  const { entries, loading, saveMoodEntry, deleteMoodEntry } = useMoodEntries();
  
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<{
    mood: string;
    description: string;
    trigger: string;
    energy_level: number;
  }>();

  const selectedMood = watch("mood");
  const selectedTrigger = watch("trigger");
  const selectedEnergyLevel = watch("energy_level", 3);

  const onSubmit = async (data: any) => {
    const success = await saveMoodEntry({
      entry_date: format(selectedDate, 'yyyy-MM-dd'),
      mood: data.mood,
      description: data.description,
      trigger: data.trigger,
      energy_level: data.energy_level,
    });

    if (success) {
      reset();
      setActiveTab("journal");
    }
  };

  const getEntriesForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return entries.filter(entry => entry.entry_date === dateStr);
  };

  const getMoodForDate = (date: Date) => {
    const dayEntries = getEntriesForDate(date);
    return dayEntries.length > 0 ? dayEntries[0] : null;
  };

  const renderCalendarDay = (date: Date) => {
    const moodEntry = getMoodForDate(date);
    if (!moodEntry) return null;

    const mood = moodOptions.find(m => m.value === moodEntry.mood);
    return (
      <div className="flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${mood?.color || 'bg-gray-300'}`} />
      </div>
    );
  };

  const getMoodStats = () => {
    const currentMonth = new Date();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    const monthEntries = entries.filter(entry => {
      const entryDate = parseISO(entry.entry_date);
      return entryDate >= monthStart && entryDate <= monthEnd;
    });

    const moodCounts = moodOptions.reduce((acc, mood) => {
      acc[mood.value] = monthEntries.filter(entry => entry.mood === mood.value).length;
      return acc;
    }, {} as Record<string, number>);

    return { monthEntries, moodCounts };
  };

  const { monthEntries, moodCounts } = getMoodStats();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="entry" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Entry
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Journal
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Calendar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <p className="text-sm text-muted-foreground">
                Selected date: {format(selectedDate, 'MMMM d, yyyy')}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Mood Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Feeling</Label>
                  <div className="flex gap-2 flex-wrap">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => setValue("mood", mood.value)}
                        className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          selectedMood === mood.value
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-2xl mb-1">{mood.label}</span>
                        <span className="text-xs text-center">{mood.name}</span>
                      </button>
                    ))}
                  </div>
                  {errors.mood && <p className="text-sm text-red-500">Please select a mood</p>}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">What happened? (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your day or what triggered this feeling..."
                    {...register("description")}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Trigger Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Trigger</Label>
                  <div className="flex gap-2 flex-wrap">
                    {triggerOptions.map((trigger) => (
                      <button
                        key={trigger.value}
                        type="button"
                        onClick={() => setValue("trigger", trigger.value)}
                        className={`px-3 py-2 rounded-lg border transition-all ${
                          selectedTrigger === trigger.value
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {trigger.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Energy Level */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Energy Level</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setValue("energy_level", level)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedEnergyLevel >= level
                            ? "bg-primary border-primary"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1" disabled={!selectedMood}>
                    Save Entry
                  </Button>
                  <Button type="button" variant="outline" onClick={() => reset()}>
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Journal</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your recent mood entries
              </p>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading your entries...</div>
              ) : entries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No mood entries yet. Start tracking your mood to see them here!
                </div>
              ) : (
                <div className="space-y-4">
                  {entries.slice(0, 10).map((entry) => {
                    const mood = moodOptions.find(m => m.value === entry.mood);
                    const trigger = triggerOptions.find(t => t.value === entry.trigger);
                    
                    return (
                      <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{mood?.label}</span>
                            <div>
                              <p className="font-medium">{format(parseISO(entry.entry_date), 'MMM d, yyyy')}</p>
                              <p className="text-sm text-muted-foreground">{mood?.name}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => entry.id && deleteMoodEntry(entry.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {entry.description && (
                          <p className="text-sm bg-gray-50 rounded p-3">{entry.description}</p>
                        )}
                        
                        <div className="flex gap-2 items-center">
                          {trigger && (
                            <Badge variant="secondary" className={trigger.color}>
                              {trigger.label}
                            </Badge>
                          )}
                          {entry.energy_level && (
                            <Badge variant="outline">
                              Energy: {entry.energy_level}/5
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood Calendar</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click on a date to view entries
                </p>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  components={{
                    DayContent: ({ date }) => (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {date.getDate()}
                        {renderCalendarDay(date)}
                      </div>
                    ),
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>This Month's Overview</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {monthEntries.length} mood entries recorded
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {moodOptions.map((mood) => {
                  const count = moodCounts[mood.value];
                  const percentage = monthEntries.length > 0 ? (count / monthEntries.length) * 100 : 0;
                  
                  return (
                    <div key={mood.value} className="flex items-center gap-3">
                      <span className="text-xl">{mood.label}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{mood.name}</span>
                          <span>{count} times</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${mood.color}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Selected Date Entries */}
          {getEntriesForDate(selectedDate).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Entries for {format(selectedDate, 'MMMM d, yyyy')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getEntriesForDate(selectedDate).map((entry) => {
                    const mood = moodOptions.find(m => m.value === entry.mood);
                    const trigger = triggerOptions.find(t => t.value === entry.trigger);
                    
                    return (
                      <div key={entry.id} className="border rounded-lg p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl">{mood?.label}</span>
                          <span className="font-medium">{mood?.name}</span>
                        </div>
                        {entry.description && (
                          <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
                        )}
                        <div className="flex gap-2">
                          {trigger && (
                            <Badge variant="secondary" className={trigger.color}>
                              {trigger.label}
                            </Badge>
                          )}
                          {entry.energy_level && (
                            <Badge variant="outline">
                              Energy: {entry.energy_level}/5
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}