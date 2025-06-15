
import React, { useState } from "react";
import { Book, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Flashcard = { id: number; term: string; definition: string };

export default function Flashcards() {
  const [subject, setSubject] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  function addCard() {
    if (term.trim() && definition.trim()) {
      setCards([{ id: Date.now(), term, definition }, ...cards]);
      setTerm("");
      setDefinition("");
    }
  }

  function removeCard(id: number) {
    setCards(cards.filter(c => c.id !== id));
  }

  return (
    <div className="flex flex-col bg-white/70 rounded-xl border border-indigo-100 p-5 min-h-[250px] shadow-sm w-full">
      <div className="flex gap-2 items-center mb-3">
        <Book className="text-indigo-700" size={22} />
        <span className="font-semibold text-indigo-900 text-base">AI Flashcards</span>
      </div>
      <input
        className="border rounded px-2 py-1 mb-2 text-sm"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder="Subject / Topic"
      />
      <div className="flex gap-2 mb-2">
        <input
          className="border rounded px-2 py-1 flex-1 text-sm"
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Term"
        />
        <input
          className="border rounded px-2 py-1 flex-1 text-sm"
          value={definition}
          onChange={e => setDefinition(e.target.value)}
          placeholder="Definition"
        />
        <Button size="sm" onClick={addCard} title="Add Flashcard">
          <Plus size={16} />
        </Button>
      </div>
      <ul className="space-y-2 max-h-28 overflow-auto mb-2">
        {cards.length === 0 && (
          <li className="text-sm text-sky-700">No flashcards saved yet.</li>
        )}
        {cards.map(card => (
          <li key={card.id} className="flex items-center justify-between bg-sky-50 rounded px-2 py-1">
            <div>
              <span className="font-semibold mr-1">{card.term}:</span>
              <span>{card.definition}</span>
            </div>
            <Button variant="destructive" size="sm" onClick={() => removeCard(card.id)} title="Remove card">
              <Trash2 size={15} />
            </Button>
          </li>
        ))}
      </ul>
      <div className="text-xs text-indigo-700">Type subject and add your own flashcards!</div>
    </div>
  );
}
