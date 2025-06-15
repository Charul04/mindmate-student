
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const METHODS = [
  {
    name: "Feynman Technique",
    example: "Pick a topic, pretend to explain it to a 5-year-old. If you struggle, revisit the material, then teach it again—this helps you truly understand!",
  },
  {
    name: "Spaced Repetition",
    example: "Review info over increasing time gaps (e.g., Day 1, 3, 7, 14). Use flashcards to help memorization stick!",
  },
  {
    name: "Mind Mapping",
    example: "Draw your topic in the center of a page and branch subtopics out. Makes connections and structure clear!",
  },
  {
    name: "Active Recall",
    example: "Instead of rereading notes, quiz yourself—cover answers, test your memory, and fill gaps.",
  },
];

export default function StudyTipsDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState("");
  const [recommend, setRecommend] = useState<{ name: string; example: string }[]>([]);

  function handleStart() {
    if (subject.trim() && style.trim()) {
      // Pick two random technique recommendations for demo purposes
      const idx = Math.floor(Math.random() * METHODS.length);
      const idx2 = (idx + 1) % METHODS.length;
      setRecommend([METHODS[idx], METHODS[idx2]]);
      setStage(2);
    }
  }
  function reset() {
    setStage(0);
    setSubject("");
    setStyle("");
    setRecommend([]);
  }
  function handleClose(o: boolean) {
    setOpen(o);
    if (!o) reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <button className={triggerClassName}>
          <span className="flex items-center mb-2"><Lightbulb className="text-amber-500" size={28} /></span>
          <span className="font-semibold text-indigo-900 text-[1.08rem]">Study Technique Tips</span>
          <span className="text-indigo-900/70 text-sm mt-1">Feynman, flashcards, and other strategies.</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xs p-0">
        <DialogHeader className="px-5 pt-4">
          <DialogTitle>
            <span className="flex items-center gap-2 text-amber-500"><Lightbulb size={22} />Study Technique Tips</span>
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4 flex flex-col items-center text-center min-h-[110px]">
          {stage === 0 && (
            <div className="flex flex-col gap-3 w-full" >
              <div className="text-indigo-700 font-medium mb-1">What are you studying?</div>
              <input value={subject} onChange={e => setSubject(e.target.value)} className="border rounded px-2 py-1 text-sm w-full" placeholder="e.g. Chemistry, US History" />
              <div className="text-indigo-700 font-medium mb-1 mt-4">How do you like to learn?</div>
              <input value={style} onChange={e => setStyle(e.target.value)} className="border rounded px-2 py-1 text-sm w-full" placeholder="e.g. visuals, explanations..." />
              <Button onClick={handleStart} className="mt-3" size="sm">Show Me Tips!</Button>
            </div>
          )}
          {stage === 2 && (
            <div className="flex flex-col gap-3 items-center">
              <div className="mb-2 text-sky-700 font-semibold">For {subject} learners who like {style}:</div>
              {recommend.map(m =>
                <div key={m.name} className="bg-yellow-50 border border-amber-100 rounded p-2 mb-2 w-full">
                  <div className="text-amber-700 font-semibold text-sm mb-1">{m.name}</div>
                  <div className="text-[14px] text-indigo-900">{m.example}</div>
                </div>
              )}
              <Button variant="outline" className="text-xs mb-2" onClick={reset}>Try with a different subject/style</Button>
              <Button size="sm" onClick={() => setOpen(false)}>Back to focus →</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
