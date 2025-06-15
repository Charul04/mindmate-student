
import React from "react";
import { Button } from "@/components/ui/button";
import type { JournalEntry } from "@/hooks/useJournalStorage";

type Props = {
  journals: JournalEntry[];
  onRemove: (id: string) => void;
};

export default function SavedJournalsList({ journals, onRemove }: Props) {
  if (journals.length === 0) {
    return <div className="text-sky-700 mb-4">No saved journals yet.</div>;
  }
  return (
    <div className="space-y-4">
      {journals.map(entry => (
        <div
          key={entry.id}
          className="relative rounded-lg border border-indigo-100 shadow-sm p-4 bg-white"
        >
          <div className="absolute top-2 right-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemove(entry.id)}
              className="opacity-80"
              title="Remove journal"
            >
              Remove
            </Button>
          </div>
          <div className="whitespace-pre-wrap text-base text-indigo-900">
            {entry.content}
          </div>
          <div className="text-xs text-sky-700 mt-3">{entry.date}</div>
        </div>
      ))}
    </div>
  );
}
