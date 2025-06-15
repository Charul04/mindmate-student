
import { useState } from "react";

export type JournalEntry = {
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

export function useJournalStorage() {
  const [savedJournals, setSavedJournals] = useState<JournalEntry[]>(getSavedJournals());

  const addJournal = (content: string) => {
    if (content.trim().length === 0) return false;
    const newEntry: JournalEntry = {
      id: `${Date.now()}`,
      content,
      date: new Date().toLocaleString(),
    };
    const journals = [newEntry, ...savedJournals];
    saveJournals(journals);
    setSavedJournals(journals);
    return true;
  };

  const removeJournal = (id: string) => {
    const journals = savedJournals.filter(j => j.id !== id);
    saveJournals(journals);
    setSavedJournals(journals);
  };

  return { savedJournals, addJournal, removeJournal };
}
