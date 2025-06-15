import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Save, Search, Image as ImageIcon } from "lucide-react";

// Add demo local images (public/ folder). You may replace these with your own images.
const images = [
  "/quote-bg1.jpg",
  "/quote-bg2.jpg",
  "/quote-bg3.jpg",
  "/quote-bg4.jpg",
];

// Original short motivational quotes for students
const quotes = [
  {
    quote: "Even on slow days, learning a little is still moving forward.",
    comment: "Tiny steps = real progress. Every study session helps.",
  },
  {
    quote: "You don't have to have all the answers—being curious beats being perfect.",
    comment: "Student life is about questions, not perfection.",
  },
  {
    quote: "Burnout isn’t proof you’re weak; it’s a sign you care.",
    comment: "Take a breath—your effort is what matters most.",
  },
  {
    quote: "Your best today might look different from yesterday, and that's okay.",
    comment: "Grades don’t measure your growth—your grit does.",
  },
  {
    quote: "It’s normal to feel stuck sometimes. Sticking with it is where you get stronger.",
    comment: "Every challenge you face adds to your story.",
  },
  {
    quote: "Getting tired doesn’t mean giving up. Rest, then try again.",
    comment: "Balance is key—take breaks without guilt.",
  },
  {
    quote: "Focus on learning, not just the result—you'll be surprised what you achieve.",
    comment: "Growth comes from the journey, not just the finish line.",
  },
  {
    quote: "No one gets it right every time. But showing up matters most.",
    comment: "Keep going—showing up is a win.",
  },
  {
    quote: "Messy notes, late nights, doubts—they’re part of the process.",
    comment: "Every student has off days—including the top ones!",
  },
  {
    quote: "It’s brave to ask for help or take a break. You deserve both.",
    comment: "Supporting yourself is part of being a strong student.",
  },
];

// Returns a random quote object
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Returns a random image path
function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

// Fake AI quote generator function
async function generateAIQuote(topic: string): Promise<{ quote: string; comment: string }> {
  // Replace this with a real API call if available.
  // For now, return a demo AI-generated quote.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        quote: `Even when studying about "${topic}", small steps lead to real growth.`,
        comment: "Stay steady – it's okay to move at your own pace.",
      });
    }, 1100);
  });
}

export default function MotivationalQuoteDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(() => ({ ...getRandomQuote(), image: getRandomImage(), isAI: false }));
  const [search, setSearch] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [saved, setSaved] = useState<{ quote: string, comment: string, image: string, isAI: boolean }[]>([]);

  // Show a new random quote+image on open
  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (val) {
      const q = getRandomQuote();
      setCurrent({ ...q, image: getRandomImage(), isAI: false });
      setSearch("");
    }
  }

  // Random quote button
  function handleNewQuote() {
    const q = getRandomQuote();
    setCurrent({ ...q, image: getRandomImage(), isAI: false });
    setSearch("");
  }

  // Generate AI quote
  async function handleAIGenerate() {
    if (!search.trim()) return;
    setAiLoading(true);
    const aiQ = await generateAIQuote(search.trim());
    setCurrent({ ...aiQ, image: getRandomImage(), isAI: true });
    setAiLoading(false);
  }

  // Save quote locally
  function handleSaveQuote() {
    setSaved(prev => [
      ...(prev.some(q => q.quote === current.quote && q.comment === current.comment) ? prev : [...prev, current])
    ]);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className={
            triggerClassName ||
            "group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
          }
        >
          <span className="flex items-center mb-2">
            <MessageSquare className="text-rose-500" size={28} />
          </span>
          <span className="font-semibold text-indigo-900 text-[1.08rem]">
            Motivational Quote Generator
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            AI-powered, uplifting, and student-focused quotes
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xs p-3 mx-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2">
              <MessageSquare className="text-rose-500" size={22} />
              Motivational Quote Generator
            </span>
          </DialogTitle>
          <DialogDescription>
            Pick a random quote or create a custom one!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center w-full">
          {/* Search & AI Generate */}
          <form
            className="flex gap-2 w-full items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleAIGenerate();
            }}
          >
            <Input
              className="rounded-lg bg-white border border-indigo-100 text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="enter topic (e.g. exams, burnout)..."
              disabled={aiLoading}
              autoFocus
            />
            <Button
              type="submit"
              variant="secondary"
              className="flex gap-2"
              disabled={aiLoading || !search.trim()}
            >
              <Search size={16} />
              AI
            </Button>
          </form>
          {/* Quote display */}
          <div className="relative rounded-xl bg-gradient-to-br from-sky-50 via-white to-indigo-50 shadow transition overflow-hidden w-full flex flex-col items-center px-2 py-3 min-h-[78px]">
            <blockquote className="text-base text-sky-800 text-center font-medium italic px-1 break-words">
              “{current.quote}”
            </blockquote>
            <p className="text-indigo-600 text-xs font-semibold text-center mt-1">
              {current.comment}
            </p>
            {current.isAI && (
              <span className="inline-block mt-1 text-rose-500 text-xs font-medium">
                AI generated
              </span>
            )}
            {/* Save button */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-2 shadow-md rounded-full text-indigo-500 hover:bg-indigo-100"
              title="Save this quote"
              onClick={handleSaveQuote}
              tabIndex={0}
            >
              <Save size={16} />
            </Button>
          </div>
          <div className="flex gap-2 w-full justify-between">
            <Button onClick={handleNewQuote} variant="secondary" className="flex-1 py-2 text-xs">
              New Random
            </Button>
            <Button onClick={() => setOpen(false)} variant="default" className="flex-1 py-2 text-xs">
              Close
            </Button>
          </div>
        </div>
        {/* Saved quotes */}
        {saved.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <h4 className="text-indigo-800 font-bold text-base mb-1 flex gap-2 items-center">
              <ImageIcon className="text-indigo-400" size={16} />
              My Saved Quotes
            </h4>
            <div className="grid gap-2 max-h-32 overflow-y-auto">
              {saved.map((q, i) => (
                <div
                  key={i}
                  className="flex bg-gradient-to-l from-sky-50/70 to-white border border-indigo-100 rounded-lg items-start gap-2 p-2 shadow"
                >
                  <div className="flex-1">
                    <blockquote className="text-sm text-indigo-900 font-medium break-words">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <div className="text-indigo-500 text-xs">{q.comment}</div>
                    {q.isAI && (
                      <span className="inline-block mt-1 text-xs text-rose-500">
                        AI
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
