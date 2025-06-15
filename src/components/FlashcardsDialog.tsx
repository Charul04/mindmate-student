
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Flashcards from "./Flashcards";
import { Book } from "lucide-react";

export default function FlashcardsDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`
            group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm
            hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left
            ${triggerClassName ?? ""}
          `}
        >
          <span className="flex items-center mb-2">
            <Book className="text-indigo-700" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">AI Flashcards</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            AI generates flashcards per your subject. Save or remove as you like!
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>AI Flashcards</DialogTitle>
          <DialogDescription>
            Instantly create personalized flashcards for any subject, save and manage them efficiently.
          </DialogDescription>
        </DialogHeader>
        <Flashcards />
      </DialogContent>
    </Dialog>
  );
}
