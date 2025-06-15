
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onSave: (content: string) => void;
};

export default function JournalEditor({ onSave }: Props) {
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (content.trim().length > 0) {
      onSave(content);
      setContent("");
    }
  };

  return (
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
          onClick={handleSave}
          disabled={content.trim().length === 0}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
