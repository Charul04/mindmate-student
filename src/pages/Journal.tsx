
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Save, Sticker } from "lucide-react";
import JournalingPromptDialog from "@/components/JournalingPromptDialog";

const COLORS = [
  "#ffffff", "#fef6e4", "#e8eaf6", "#fce4ec", "#e0f7fa", "#f3e5f5",
  "#fff3e0", "#f1f8e9", "#ede7f6", "#ffebee", "#f9fbe7"
];
const FONT_SIZES = ["16px", "18px", "20px", "22px", "24px"];
const FONT_COLORS = ["#222", "#ff3366", "#1e88e5", "#43a047", "#e65100", "#6a1b9a"];
const STICKERS = ["🌟", "🎉", "😊", "🌸", "👍", "🦄", "💡", "🌿", "📚", "❤️"];

type JournalEntry = {
  id: string;
  content: string;
  pageColor: string;
  fontSize: string;
  fontColor: string;
  stickers: string[];
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
  const [pageColor, setPageColor] = useState(COLORS[0]);
  const [fontSize, setFontSize] = useState(FONT_SIZES[0]);
  const [fontColor, setFontColor] = useState(FONT_COLORS[0]);
  const [stickers, setStickers] = useState<string[]>([]);
  const [savedJournals, setSavedJournals] = useState<JournalEntry[]>(getSavedJournals());
  const [showStickerOptions, setShowStickerOptions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleAddSticker(s: string) {
    setStickers((prev) => prev.length < 5 ? [...prev, s] : prev); // max 5
    setShowStickerOptions(false);
    // focus textarea after adding
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  }
  function handleRemoveSticker(index: number) {
    setStickers((prev) => prev.filter((_, i) => i !== index));
  }
  function handleSaveJournal() {
    if (content.trim().length === 0) return;
    const newEntry: JournalEntry = {
      id: `${Date.now()}`,
      content,
      pageColor,
      fontSize,
      fontColor,
      stickers,
      date: new Date().toLocaleString()
    };
    const journals = [newEntry, ...savedJournals];
    saveJournals(journals);
    setSavedJournals(journals);
    setContent("");
    setStickers([]);
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
        {/* Customization Controls */}
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          {/* Page Color */}
          <div className="flex items-center gap-1">
            <span className="mr-1">🎨</span>
            <span className="text-xs">Page:</span>
            <div className="flex gap-1">
              {COLORS.map((col, i) => (
                <button
                  key={col}
                  className={`w-6 h-6 rounded-full border-2 border-indigo-300 hover:scale-110 transition ${pageColor===col ? "ring-2 ring-sky-400":""}`}
                  style={{ background: col }}
                  onClick={() => setPageColor(col)}
                  aria-label={`Set page color to ${col}`}
                />
              ))}
            </div>
          </div>
          {/* Font Size */}
          <div className="flex items-center gap-1 ml-3">
            <span className="mr-1">🅰️</span>
            <span className="text-xs">Size:</span>
            <select
              className="bg-transparent p-1 border rounded"
              value={fontSize}
              onChange={e => setFontSize(e.target.value)}
            >
              {FONT_SIZES.map(size => (
                <option key={size} value={size}>{size.replace("px", "")}pt</option>
              ))}
            </select>
          </div>
          {/* Font Color */}
          <div className="flex items-center gap-1 ml-3">
            <span className="mr-1">🎨</span>
            <span className="text-xs">Font:</span>
            <div className="flex gap-1">
              {FONT_COLORS.map(col => (
                <button
                  key={col}
                  className={`w-6 h-6 rounded-full border-2 border-indigo-300 hover:scale-110 transition ${fontColor===col ? "ring-2 ring-sky-400":""}`}
                  style={{ background: col }}
                  onClick={() => setFontColor(col)}
                  aria-label={`Set font color to ${col}`}
                />
              ))}
            </div>
          </div>
          {/* Stickers */}
          <div className="flex items-center gap-1 ml-3">
            <button
              className="rounded bg-indigo-50 hover:bg-sky-100 px-2 py-1 flex items-center gap-1 border border-indigo-100"
              onClick={() => setShowStickerOptions(s=>!s)}
              type="button"
            >
              <Sticker size={17} />
              <span className="text-xs">Stickers</span>
              {stickers.length > 0 && <span className="text-xs text-indigo-400 font-bold ml-0.5">({stickers.length})</span>}
            </button>
            {showStickerOptions && (
              <div className="absolute z-40 mt-12 bg-white border shadow-lg rounded-xl p-2 flex gap-1 flex-wrap w-60">
                {STICKERS.map((emoji, i) => (
                  <button
                    key={emoji}
                    className="text-2xl p-1 hover:bg-sky-100 rounded transition"
                    onClick={() => handleAddSticker(emoji)}
                    aria-label={`Add ${emoji}`}
                  >{emoji}</button>
                ))}
              </div>
            )}
            <div className="flex gap-1 ml-2">
              {stickers.map((s, i) => (
                <span
                  key={i}
                  className="text-xl cursor-pointer hover:scale-125 transition"
                  title="Remove sticker"
                  onClick={() => handleRemoveSticker(i)}
                >{s}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Journal Writing Area */}
        <div
          className="rounded-lg border border-indigo-100 shadow-inner p-4 mb-5 transition"
          style={{
            background: pageColor,
            minHeight: 160,
            fontSize,
            color: fontColor
          }}
        >
          <textarea
            ref={textareaRef}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Take a moment to reflect and write your thoughts..."
            rows={7}
            className="w-full bg-transparent outline-none resize-vertical"
            style={{
              fontSize,
              color: fontColor
            }}
          />
          {stickers.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {stickers.map((s, i) => (
                <span key={i} className="text-2xl">{s}</span>
              ))}
            </div>
          )}
        </div>
        {/* Controls */}
        <div className="flex gap-2 justify-end mb-4">
          <Button
            variant="secondary"
            onClick={handleSaveJournal}
            disabled={content.trim().length === 0}
          >
            <Save className="mr-2" size={19} /> Save Journal
          </Button>
        </div>
        {/* Saved Journals */}
        <h2 className="text-lg font-semibold text-indigo-800 mb-3 mt-8">Saved Journals</h2>
        {savedJournals.length === 0 && (
          <div className="text-sky-700 mb-4">No saved journals yet.</div>
        )}
        <div className="space-y-4">
          {savedJournals.map(entry => (
            <div
              key={entry.id}
              className="relative rounded-lg border border-indigo-100 shadow-sm p-4 transition-all group"
              style={{
                background: entry.pageColor
              }}
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
              <div
                className="whitespace-pre-wrap"
                style={{
                  fontSize: entry.fontSize,
                  color: entry.fontColor
                }}
              >
                {entry.content}
              </div>
              {entry.stickers && entry.stickers.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {entry.stickers.map((s, i) => (
                    <span key={i} className="text-2xl">{s}</span>
                  ))}
                </div>
              )}
              <div className="text-xs text-sky-700 mt-3">{entry.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

