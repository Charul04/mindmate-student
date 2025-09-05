import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, X } from "lucide-react";

interface JournalEntryViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  date?: string;
}

export default function JournalEntryViewerDialog({ 
  isOpen, 
  onClose, 
  content, 
  date 
}: JournalEntryViewerDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            Journal Entry
            {date && <span className="text-sm font-normal text-muted-foreground">- {date}</span>}
          </DialogTitle>
          <DialogDescription>
            Your complete journal entry
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6 py-4 max-h-[60vh]">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
              {content}
            </p>
          </div>
        </ScrollArea>
        
        <div className="px-6 py-4 border-t flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}