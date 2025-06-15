
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

const LINKS = {
  "Deep focus": {
    message: "Try this lo-fi mix for deep focus 🎧 — You’ve got this!",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX3PFzdbtx1Us"
  },
  "Light revision": {
    message: "Classical and chill pop tracks to help you breeze through revision.",
    url: "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U"
  },
  "Chill journaling": {
    message: "Journaling feels best with these mellow vibes. ✍️",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX9uKNf5jGX6m"
  },
  "Morning start": {
    message: "Start your day strong with these upbeat tunes! ☀️",
    url: "https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy"
  }
};

type MoodType = keyof typeof LINKS;

export default function FocusMusicDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState<MoodType | null>(null);

  function handleSelect(m: MoodType) {
    setMood(m);
    setStep(1);
  }
  function handleBack() {
    setStep(0);
    setMood(null);
  }
  function handleClose(o: boolean) {
    setOpen(o);
    if (!o) { setStep(0); setMood(null); }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <button className={triggerClassName}>
          <span className="flex items-center mb-2"><Music className="text-blue-600" size={28} /></span>
          <span className="font-semibold text-indigo-900 text-[1.08rem]">Focus Music Links</span>
          <span className="text-indigo-900/70 text-sm mt-1">Curated YouTube/Spotify playlists.</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xs p-0">
        <DialogHeader className="px-5 pt-4">
          <DialogTitle>
            <span className="flex items-center gap-2 text-blue-600"><Music size={22} />Focus Music Links</span>
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4 min-h-[110px] flex flex-col gap-3 items-center text-center">
          {step === 0 ? (
            <div className="w-full">
              <div className="text-indigo-700 font-medium mb-2">What mood or task are you in?</div>
              <div className="flex flex-col items-stretch gap-2">
                {Object.keys(LINKS).map(m => (
                  <Button key={m} variant="secondary" className="w-full" onClick={() => handleSelect(m as MoodType)}>
                    {m}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <div className="text-sky-700 font-semibold">{mood}</div>
              <div className="font-medium text-[15px] py-1">{LINKS[mood!].message}</div>
              <a href={LINKS[mood!].url} target="_blank" rel="noopener" className="underline text-indigo-700 mb-2">
                Open playlist ↗
              </a>
              <Button variant="outline" className="text-xs mb-2" onClick={handleBack}>Pick another mood</Button>
              <Button size="sm" onClick={() => setOpen(false)}>Back to focus →</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
