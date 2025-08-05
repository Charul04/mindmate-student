import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJournals } from "@/hooks/useJournals";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { BookOpen, Calendar as CalendarIcon, Sparkles, TrendingUp, Heart, Brain } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Props {
  triggerClassName?: string;
}

const journalTemplates = [
  {
    id: "gratitude",
    title: "Gratitude Practice",
    icon: Heart,
    prompt: "What are three things you're grateful for today? How did they make you feel?",
    color: "bg-pink-50 border-pink-200"
  },
  {
    id: "reflection",
    title: "Daily Reflection",
    icon: Brain,
    prompt: "How did today go? What emotions did you experience? What would you like to do differently tomorrow?",
    color: "bg-purple-50 border-purple-200"
  },
  {
    id: "mindfulness",
    title: "Mindful Moments",
    icon: Sparkles,
    prompt: "Describe a moment today when you felt fully present. What did you notice about your surroundings, thoughts, or feelings?",
    color: "bg-blue-50 border-blue-200"
  },
  {
    id: "growth",
    title: "Personal Growth",
    icon: TrendingUp,
    prompt: "What did you learn about yourself today? What challenges did you face and how did you handle them?",
    color: "bg-green-50 border-green-200"
  }
];

export default function AdvancedJournalDialog({ triggerClassName }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [content, setContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { journals, saveJournal, getJournalsByDate } = useJournals();
  const { entries: moodEntries } = useMoodEntries();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!content.trim()) return;
    
    setSaving(true);
    try {
      const success = await saveJournal(content, format(selectedDate, 'yyyy-MM-dd'));
      if (success) {
        setContent("");
        setSelectedTemplate(null);
        toast({
          title: "Journal Saved",
          description: "Your journal entry has been saved successfully.",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const applyTemplate = (template: typeof journalTemplates[0]) => {
    setSelectedTemplate(template.id);
    setContent(template.prompt + "\n\n");
  };

  const selectedDateJournals = getJournalsByDate(format(selectedDate, 'yyyy-MM-dd'));
  const selectedDateMood = moodEntries.find(
    entry => entry.entry_date === format(selectedDate, 'yyyy-MM-dd')
  );

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={triggerClassName}>
          <div className="flex items-start gap-4 w-full">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Journaling Prompt
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Reflect daily with guided journaling to boost clarity and emotional awareness.
              </p>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            Journaling Prompt
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="write" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Journal Entry</h3>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </span>
              </div>
            </div>

            {selectedDateMood && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Today's mood:</strong> {selectedDateMood.mood} 
                  {selectedDateMood.energy_level && (
                    <span> • Energy: {selectedDateMood.energy_level}/10</span>
                  )}
                </p>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-3">Journal Templates</h4>
              <div className="grid grid-cols-2 gap-2">
                {journalTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Button
                      key={template.id}
                      variant="outline"
                      size="sm"
                      onClick={() => applyTemplate(template)}
                      className={`justify-start h-auto p-3 ${template.color} ${
                        selectedTemplate === template.id ? 'ring-2 ring-indigo-500' : ''
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{template.title}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts..."
                className="min-h-[200px] resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-muted-foreground">
                  {wordCount} words • {charCount} characters
                </div>
                <Button 
                  onClick={handleSave} 
                  disabled={!content.trim() || saving}
                  size="sm"
                >
                  {saving ? "Saving..." : "Save Entry"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  modifiers={{
                    hasEntry: journals.map(j => new Date(j.entry_date + 'T00:00:00'))
                  }}
                  modifiersStyles={{
                    hasEntry: { 
                      backgroundColor: 'hsl(var(--primary))', 
                      color: 'hsl(var(--primary-foreground))',
                      fontWeight: 'bold'
                    }
                  }}
                  className="rounded-md border"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-3">
                  Entries for {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                {selectedDateJournals.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateJournals.map((journal) => (
                      <div key={journal.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {journal.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {format(new Date(journal.created_at), 'h:mm a')}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No journal entries for this date.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Writing Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Total Entries</span>
                    <Badge variant="secondary">{journals.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">This Month</span>
                    <Badge variant="secondary">
                      {journals.filter(j => 
                        new Date(j.entry_date).getMonth() === new Date().getMonth()
                      ).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">Avg. Words</span>
                    <Badge variant="secondary">
                      {journals.length > 0 ? 
                        Math.round(journals.reduce((acc, j) => 
                          acc + j.content.split(/\s+/).length, 0
                        ) / journals.length) : 0
                      }
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  {journals.slice(0, 5).map((journal) => (
                    <div key={journal.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {format(new Date(journal.entry_date), 'MMM d')}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {journal.content.substring(0, 50)}...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}