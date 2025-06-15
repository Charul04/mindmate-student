
import React from "react";
import JournalEditor from "@/components/JournalEditor";
import SavedJournalsList from "@/components/SavedJournalsList";
import { useJournalStorage } from "@/hooks/useJournalStorage";

export default function JournalPage() {
  const { savedJournals, addJournal, removeJournal } = useJournalStorage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white/90 shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4">My Journal</h1>
        <JournalEditor onSave={addJournal} />
        <h2 className="text-lg font-semibold text-indigo-800 mb-3 mt-8">Saved Journals</h2>
        <SavedJournalsList journals={savedJournals} onRemove={removeJournal} />
      </div>
    </div>
  );
}
