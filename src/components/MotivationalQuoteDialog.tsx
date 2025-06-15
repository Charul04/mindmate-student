
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

// A collection of short, original, non-cliché motivational quotes for students
const quotes = [
  {
    quote: "Even on slow days, learning a little is still moving forward.",
    comment: "Tiny steps = real progress. Every study session helps."
  },
  {
    quote: "You don't have to have all the answers—being curious beats being perfect.",
    comment: "Student life is about questions, not perfection."
  },
  {
    quote: "Burnout isn’t proof you’re weak; it’s a sign you care.",
    comment: "Take a breath—your effort is what matters most."
  },
  {
    quote: "Your best today might look different from yesterday, and that's okay.",
    comment: "Grades don’t measure your growth—your grit does."
  },
  {
    quote: "It’s normal to feel stuck sometimes. Sticking with it is where you get stronger.",
    comment: "Every challenge you face adds to your story."
  },
  {
    quote: "Getting tired doesn’t mean giving up. Rest, then try again.",
    comment: "Balance is key—take breaks without guilt."
  },
  {
    quote: "Focus on learning, not just the result—you'll be surprised what you achieve.",
    comment: "Growth comes from the journey, not just the finish line."
  },
  {
    quote: "No one gets it right every time. But showing up matters most.",
    comment: "Keep going—showing up is a win."
  },
  {
    quote: "Messy notes, late nights, doubts—they’re part of the process.",
    comment: "Every student has off days—including the top ones!"
  },
  {
    quote: "It’s brave to ask for help or take a break. You deserve both.",
    comment: "Supporting yourself is part of being a strong student."
  },
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function MotivationalQuoteDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(getRandomQuote());

  // Refresh the quote every time the dialog opens
  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (val) setCurrent(getRandomQuote());
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className={triggerClassName ||
            "group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"}
        >
          <span className="flex items-center mb-2">
            <MessageSquare className="text-rose-500" size={28} />
          </span>
          <span className="font-semibold text-indigo-900 text-[1.08rem]">Motivational Quote</span>
          <span className="text-indigo-900/70 text-sm mt-1">Instant boost with inspiration!</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2">
              <MessageSquare className="text-rose-500" size={26} />
              Motivational Quote
            </span>
          </DialogTitle>
          <DialogDescription>
            Take a moment for yourself. Here’s an uplifting thought just for students:
          </DialogDescription>
        </DialogHeader>
        <div className="py-5 flex flex-col gap-4 items-center">
          <blockquote className="text-xl text-sky-800 text-center font-medium italic px-2">
            “{current.quote}”
          </blockquote>
          <p className="text-indigo-600 text-sm font-semibold text-center">
            {current.comment}
          </p>
        </div>
        <DialogFooter className="flex items-center justify-between gap-3">
          <Button onClick={() => setCurrent(getRandomQuote())} variant="secondary">
            New Quote
          </Button>
          <Button onClick={() => setOpen(false)} variant="default">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
