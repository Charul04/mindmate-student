
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Save, Sticker } from "lucide-react";
import JournalingPromptDialog from "@/components/JournalingPromptDialog";

type JournalEntry = {
  id: string;
  content: string;
  date: string;
};

function getSavedJournals(): JournalEntry[] {
  try {
    const data = localStorage.getItem("journals");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
function saveJournals(journals: JournalEntry[]) {
  localStorage.setItem("journals", JSON.stringify(journals));
}

export default function JournalPage() {
  const [content, setContent] = useState("");
  const [savedJournals, setSavedJournals] = useState<JournalEntry[]>(getSavedJournals());

  function handleSaveJournal() {
    if (content.trim().length === 0) return;
    const newEntry: JournalEntry = {
      id: `${Date.now()}`,
      content,
      date: new Date().toLocaleString()
    };
    const journals = [newEntry, ...savedJournals];
    saveJournals(journals);
    setSavedJournals(journals);
    setContent("");
  }
  function handleRemoveJournal(id: string) {
    const journals = savedJournals.filter(j => j.id !== id);
    saveJournals(journals);
    setSavedJournals(journals);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white/90 shadow-md rounded-xl p-6">
        <div className="mb-6">
          <JournalingPromptDialog />
        </div>
        <h1 className="text-3xl font-bold text-indigo-800 mb-4 flex items-center gap-3">
          <Sticker className="text-sky-400" size={30} /> My Journal
        </h1>
        <div className="mb-5">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={7}
            className="w-full rounded-lg border border-indigo-100 p-3 shadow-inner mb-3 bg-white/90 resize-vertical text-base text-indigo-900"
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              onClick={handleSaveJournal}
              disabled={content.trim().length === 0}
            >
              <Save className="mr-2" size={19} /> Save
            </Button>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-indigo-800 mb-3 mt-8">Saved Journals</h2>
        {savedJournals.length === 0 && (
          <div className="text-sky-700 mb-4">No saved journals yet.</div>
        )}
        <div className="space-y-4">
          {savedJournals.map(entry => (
            <div
              key={entry.id}
              className="relative rounded-lg border border-indigo-100 shadow-sm p-4 transition-all group bg-white"
            >
              <div className="absolute top-2 right-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveJournal(entry.id)}
                  className="opacity-80 group-hover:opacity-100"
                  title="Remove journal"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="whitespace-pre-wrap text-base text-indigo-900">
                {entry.content}
              </div>
              <div className="text-xs text-sky-700 mt-3">{entry.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

