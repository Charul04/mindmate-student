
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useJournals } from "@/hooks/useJournals";
import { Badge } from "@/components/ui/badge";
import { Save, Calendar, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type Props = {
  selectedDate?: Date;
};

export default function JournalEditor({ selectedDate = new Date() }: Props) {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { saveJournal } = useJournals();
  const { toast } = useToast();

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  const handleSave = async () => {
    if (content.trim().length === 0) return;
    
    setSaving(true);
    try {
      await saveJournal(
        content.trim(),
        format(selectedDate, "yyyy-MM-dd")
      );
      
      setContent("");
      toast({
        title: "Journal saved!",
        description: "Your thoughts have been captured successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving journal",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const prompts = [
    "What am I grateful for today?",
    "What challenged me today and how did I handle it?",
    "What did I learn about myself today?",
    "What would I like to improve tomorrow?",
    "What made me smile today?",
    "How am I feeling right now and why?",
    "What was the highlight of my day?",
    "What would I tell my past self?",
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Write Your Journal
        </h2>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(selectedDate, "MMMM d, yyyy")}
          </Badge>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg p-4 border border-primary/10">
        <p className="text-sm text-muted-foreground mb-2">💭 Writing prompt:</p>
        <p className="text-primary font-medium italic">"{randomPrompt}"</p>
      </div>

      <div className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your thoughts... Let your mind flow freely."
          className="min-h-[300px] text-base leading-relaxed resize-vertical"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
          
          <Button
            onClick={handleSave}
            disabled={content.trim().length === 0 || saving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Journal"}
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Your journal entries are private and secure. Write freely and authentically.</p>
      </div>
    </div>
  );
}
