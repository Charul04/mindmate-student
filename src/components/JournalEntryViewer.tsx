import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { BookOpen, Calendar as CalendarIcon } from "lucide-react";

interface JournalEntry {
  id: string;
  content: string;
  entry_date: string;
  created_at: string;
}

interface Props {
  entry: JournalEntry | null;
  open: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export default function JournalEntryViewer({ entry, open, onClose, onDelete }: Props) {
  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            Journal Entry
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {format(new Date(entry.entry_date), 'MMMM d, yyyy')}
              </span>
              <span className="text-xs text-muted-foreground">
                at {format(new Date(entry.created_at), 'h:mm a')}
              </span>
            </div>
            {onDelete && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => {
                  onDelete(entry.id);
                  onClose();
                }}
              >
                Delete
              </Button>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border min-h-[300px]">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {entry.content}
            </p>
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>
              {entry.content.trim().split(/\s+/).filter(word => word.length > 0).length} words • {entry.content.length} characters
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}