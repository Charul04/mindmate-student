
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smile, Calendar } from "lucide-react";
import MoodTracker from "./MoodTracker";

const moods = [
  { value: "happy", label: "😊 Happy" },
  { value: "sad", label: "😔 Sad" },
  { value: "stressed", label: "😤 Stressed" },
  { value: "tired", label: "😐 Tired" },
  { value: "anxious", label: "😟 Anxious" },
  { value: "motivated", label: "💪 Motivated" },
];

// Suggestions and affirmations for each mood
const suggestions: Record<string, { acknowledge: string; suggestion: string; encouragement: string }> = {
  happy: {
    acknowledge: "That's wonderful! It's great to see you're feeling happy.",
    suggestion: "Share your joy—maybe send someone a kind message or enjoy a favorite activity.",
    encouragement: "Keep shining—your positivity is contagious! 😊"
  },
  sad: {
    acknowledge: "It's okay to feel sad sometimes. Your feelings are valid.",
    suggestion: "Try a short journaling exercise or listen to your favorite comforting song.",
    encouragement: "Tomorrow is a new day. Be gentle with yourself. 💙"
  },
  stressed: {
    acknowledge: "Feeling stressed is tough—you’re not alone.",
    suggestion: "How about a 3-minute guided breathing exercise? Inhale deeply, exhale slowly.",
    encouragement: "You’re doing your best—remember to take breaks. 🌱"
  },
  tired: {
    acknowledge: "You’re feeling tired—that’s totally understandable.",
    suggestion: "A quick stretch or a glass of water might help! Or simply allow yourself to rest.",
    encouragement: "Rest is productive, too. Take care of you. 🌙"
  },
  anxious: {
    acknowledge: "Anxiety can be hard to manage—thank you for sharing.",
    suggestion: "Try grounding yourself by noticing 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
    encouragement: "You’ve overcome so much—believe in yourself! 🫂"
  },
  motivated: {
    acknowledge: "Amazing! Motivation is a great driver for growth.",
    suggestion: "Write down one goal you want to achieve today and take the first step now.",
    encouragement: "Keep the momentum going—you’re unstoppable! 🚀"
  },
};

export default function MoodCheckinDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showTracker, setShowTracker] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedMood(null);
        setShowTracker(false);
      }, 300); // Reset after closing (with animation)
    }
    setOpen(isOpen);
  };

  const handleOpenTracker = () => {
    setShowTracker(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`
            group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm
            hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left outline-none
            ${triggerClassName ?? ""}
          `}
          tabIndex={0}
          aria-label="Start Mood Check-In"
        >
          <span className="flex items-center mb-2">
            <Smile className="text-sky-600 mr-2" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem]">Mood Check-In</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Select your mood to get tailored advice.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        {showTracker ? (
          <>
            <DialogHeader>
              <DialogTitle>Mood Tracker</DialogTitle>
              <DialogDescription>
                Track your mood, add details, and view your mood history
              </DialogDescription>
            </DialogHeader>
            <MoodTracker />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowTracker(false)}>
                Back to Quick Check-in
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {selectedMood == null ? "How are you feeling right now?" : "Thanks for sharing!"}
              </DialogTitle>
              <DialogDescription>
                {selectedMood == null
                  ? "Choose the mood that best matches how you feel in this moment. No judgment—just support."
                  : suggestions[selectedMood].acknowledge}
              </DialogDescription>
            </DialogHeader>
            <div className="my-6">
              {selectedMood == null ? (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    {moods.map((m) => (
                      <Button
                        key={m.value}
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full text-xl flex justify-start gap-3"
                        onClick={() => handleMoodSelect(m.value)}
                      >
                        {m.label}
                      </Button>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      className="w-full flex items-center gap-2"
                      onClick={handleOpenTracker}
                    >
                      <Calendar className="w-5 h-5" />
                      Advanced Mood Tracking
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Track detailed mood entries with descriptions, triggers, and view your mood calendar
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <span className="block font-medium text-indigo-700 mb-1">Suggestion:</span>
                    <span className="block text-base">{suggestions[selectedMood].suggestion}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-sky-700">{suggestions[selectedMood].encouragement}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full flex items-center gap-2"
                      onClick={handleOpenTracker}
                    >
                      <Calendar className="w-5 h-5" />
                      Track This Mood in Detail
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  {selectedMood == null ? "Cancel" : "Close"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
