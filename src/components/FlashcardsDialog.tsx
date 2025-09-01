import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Flashcards from "./Flashcards";
import { Book } from "lucide-react";
export default function FlashcardsDialog({
  triggerClassName
}: {
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        
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
    </Dialog>;
}