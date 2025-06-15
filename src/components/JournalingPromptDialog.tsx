
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine } from "lucide-react";

// Example reflective questions for journaling
const PROMPTS = [
  "What made you smile this week?",
  "What's something you're proud of but never say out loud?",
  "What challenge did you overcome recently, and what did you learn from it?",
  "If you could give your past self one piece of advice, what would it be?",
  "Describe a moment when you felt truly at peace.",
  "How are you really feeling today—beneath the surface?",
  "What would you do tomorrow if you knew you couldn't fail?",
  "Who inspires you and why?",
  "What are you most grateful for at this moment?",
  "Describe a time you surprised yourself."
];
const SUPPORTIVE_MESSAGE = "There's power in knowing yourself. Keep going.";

export default function JournalingPromptDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<string>(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const [journal, setJournal] = useState<string>("");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Pick a new random prompt and reset text
      const newPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
      setPrompt(newPrompt);
      setJournal("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className={triggerClassName || "group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"}
        >
          <span className="flex items-center mb-2">
            <PenLine className="text-indigo-400" size={28} />
          </span>
          <span className="font-semibold text-indigo-900 text-[1.08rem]">Journaling Prompt</span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Reflect with a daily writing activity.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <PenLine className="text-indigo-400" size={22} />
            Reflective Writing
          </DialogTitle>
          <DialogDescription>
            Journaling can help you process thoughts, emotions, or goals. Give yourself a moment for honest reflection.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <div className="font-medium text-base text-indigo-900 mb-2">
            {prompt}
          </div>
          <Textarea
            value={journal}
            onChange={e => setJournal(e.target.value)}
            placeholder="Write freely here…"
            rows={6}
            className="resize-vertical"
          />
          <div className="mt-4 text-sky-600 font-semibold text-sm text-center">{SUPPORTIVE_MESSAGE}</div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
