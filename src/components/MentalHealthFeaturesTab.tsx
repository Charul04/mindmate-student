
import React from "react";
import MoodCheckinDialog from "@/components/MoodCheckinDialog";
import GuidedBreathingDialog from "@/components/GuidedBreathingDialog";
import MotivationalQuoteDialog from "@/components/MotivationalQuoteDialog";
import JournalingPromptDialog from "@/components/JournalingPromptDialog";
import { Smile, Wind, Quote, PenLine } from "lucide-react";
import DashboardCard from "./DashboardCard";

const mentalHealthFeatures = [
  {
    icon: <Smile className="text-sky-600" size={28} />,
    title: "Mood Check-In",
    description: "Select your mood to get tailored advice.",
    tooltip: "Track your mood & get helpful support.",
  },
  {
    icon: <Wind className="text-indigo-600" size={28} />,
    title: "Guided Breathing",
    description: "3–5 min calming breathing session.",
    tooltip: "Follow a script for relaxation.",
  },
  {
    icon: <Quote className="text-yellow-500" size={28} />,
    title: "Motivational Quote",
    description: "Instant boost with inspiration!",
    tooltip: "AI finds a motivational quote for you.",
  },
  {
    icon: <PenLine className="text-indigo-400" size={28} />,
    title: "Journaling Prompt",
    description: "Reflect with a daily writing activity.",
    tooltip: "Get thoughtful prompts to guide your journaling.",
  },
];

export default function MentalHealthFeaturesTab() {
  return (
    <div className="relative overflow-visible">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        <MoodCheckinDialog
          triggerClassName="group relative flex flex-col items-start bg-transparent rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-none hover:bg-indigo-50/40 focus:ring-2 focus:ring-indigo-100 w-full min-h-[120px] text-left transition-all"
        />
        <DashboardCard {...mentalHealthFeatures[1]} />
        <DashboardCard {...mentalHealthFeatures[2]} />
        <DashboardCard {...mentalHealthFeatures[3]} />
      </div>
    </div>
  );
}
