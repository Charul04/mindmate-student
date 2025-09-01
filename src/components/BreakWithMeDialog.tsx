import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
const JOKES = ["Why did the math book look sad? It had too many problems!", "Parallel lines have so much in common. Too bad they’ll never meet!", "Why did the computer get cold? It left its Windows open!", "What do you call fake spaghetti? An Impasta!"];
const FUN_FACTS = ["Did you know? Honey never spoils. Archaeologists found 3,000-year-old honey and it was still edible!", "Bananas are berries, but strawberries aren’t.", "Your brain is sometimes more active when you’re asleep than when you’re awake.", "Ostriches can run faster than horses!"];
const MINDFULNESS = ["Close your eyes, take three deep breaths, and slowly scan your body from head to toe. Notice how you feel. You’re doing great! 💙", "Pause and think of 3 things you're grateful for right now. Smile at each one.", "Sit back, relax your shoulders, and roll your neck gently. Well done!", "Stretch your arms up, then out wide. Hold, then release — you got this!"];
const CHALLENGES = ["Brain teaser: What has keys but can’t open locks? (Answer: A piano.)", "Try counting backward from 50 to 1 in sevens! Tricky but fun!", "Quick challenge: Close your eyes and try to touch your nose with your index finger!", "Teaser: Name three things you can do with water besides drinking it."];
enum BreakType {
  Joke = "🤣 Quick joke",
  Fact = "🌍 Fun fact",
  Mindful = "🌿 Mini mindfulness moment",
  Challenge = "🎮 Brain teaser or challenge",
}
const OPTIONS = [BreakType.Joke, BreakType.Fact, BreakType.Mindful, BreakType.Challenge];
export default function BreakWithMeDialog({
  triggerClassName
}: {
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [breakType, setBreakType] = useState<BreakType | null>(null);
  const [content, setContent] = useState("");
  function handleSelect(type: BreakType) {
    setBreakType(type);
    setStep(1);
    // Pick a random item
    switch (type) {
      case BreakType.Joke:
        setContent(JOKES[Math.floor(Math.random() * JOKES.length)]);
        break;
      case BreakType.Fact:
        setContent(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
        break;
      case BreakType.Mindful:
        setContent(MINDFULNESS[Math.floor(Math.random() * MINDFULNESS.length)]);
        break;
      case BreakType.Challenge:
        setContent(CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]);
        break;
    }
  }
  function handleBackToOptions() {
    setStep(0);
    setBreakType(null);
    setContent("");
  }
  function handleClose(o: boolean) {
    setOpen(o);
    if (!o) {
      setStep(0);
      setBreakType(null);
      setContent("");
    }
  }
  return <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        
      </DialogTrigger>
      <DialogContent className="w-full max-w-xs p-0">
        <DialogHeader className="px-5 pt-4">
          <DialogTitle>
            <span className="flex items-center gap-2 text-pink-500"><Smile size={22} />Break with Me</span>
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4 min-h-[110px] flex flex-col gap-3 items-center text-center">
          {step === 0 ? <div className="w-full">
              <div className="text-indigo-700 font-medium mb-2">Hey friend! What kind of break do you want?</div>
              <div className="flex flex-col items-stretch gap-2">
                {OPTIONS.map(opt => <Button key={opt} variant="secondary" className="w-full" onClick={() => handleSelect(opt as BreakType)}>
                    {opt}
                  </Button>)}
              </div>
            </div> : <div className="flex flex-col gap-3 items-center">
              <div className="text-sky-700 font-semibold">{breakType}</div>
              <div className="text-[15px] font-medium py-2">{content}</div>
              <div className="text-xs text-indigo-400 mb-2">⚡Remember to stretch, hydrate, and breathe! ⚡</div>
              <Button variant="outline" className="text-xs mb-2" onClick={handleBackToOptions}>Try another break</Button>
              <Button size="sm" onClick={() => setOpen(false)}>Back to focus →</Button>
            </div>}
        </div>
      </DialogContent>
    </Dialog>;
}