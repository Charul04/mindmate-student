import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import MoodCheckinDialog from "@/components/MoodCheckinDialog";
import GuidedBreathingDialog from "@/components/GuidedBreathingDialog";
import MotivationalQuoteDialog from "@/components/MotivationalQuoteDialog";
import JournalingPromptDialog from "@/components/JournalingPromptDialog";
import StudyPlannerDialog from "@/components/StudyPlannerDialog";
import PomodoroTimerDialog from "@/components/PomodoroTimerDialog";
import FlashcardsDialog from "@/components/FlashcardsDialog";
import GoalsTrackerDialog from "@/components/GoalsTrackerDialog";
import BreakWithMeDialog from "@/components/BreakWithMeDialog";
import FocusMusicDialog from "@/components/FocusMusicDialog";
import StudyTipsDialog from "@/components/StudyTipsDialog";
import VoiceAiCompanionDialog from "@/components/VoiceAiCompanionDialog";
import ScreenTimeTrackerDialog from "@/components/ScreenTimeTrackerDialog";
import { Smile, Wind, Quote, PenLine, CalendarDays, Clock, Book, ChartLine, Music, Lightbulb, ChevronRight } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import React from "react";

type DashboardFeature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip?: string;
};

const mentalHealthFeatures: DashboardFeature[] = [
  {
    icon: <Smile className="text-sky-600" size={32} />,
    title: "Mood Check-In",
    description: "Select your mood to get tailored advice.",
    tooltip: "Track your mood & get helpful support."
  },
  {
    icon: <Wind className="text-indigo-600" size={32} />,
    title: "Guided Breathing",
    description: "3–5 min calming breathing session.",
    tooltip: "Follow a script for relaxation."
  },
  {
    icon: <Quote className="text-yellow-500" size={32} />,
    title: "Motivational Quote",
    description: "Instant boost with inspiration!",
    tooltip: "AI finds a motivational quote for you."
  },
  {
    icon: <PenLine className="text-indigo-400" size={32} />,
    title: "Journaling Prompt",
    description: "Reflect with a daily writing activity.",
    tooltip: "Get thoughtful prompts to guide your journaling."
  },
];

const studySupportFeatures: DashboardFeature[] = [
  {
    icon: <CalendarDays className="text-teal-600" size={32} />,
    title: "Daily Study Planner",
    description: "Simple to-do & calendar to add events, AI suggestions.",
    tooltip: "Organize your study tasks and schedule."
  },
  {
    icon: <Clock className="text-sky-600" size={32} />,
    title: "Pomodoro Suggestion",
    description: "AI recommends focus & break cycles. Stopwatch & clock added.",
    tooltip: "Boost focus with timers and sessions."
  },
  {
    icon: <Book className="text-indigo-700" size={32} />,
    title: "AI Study Assistant",
    description: "Get personalized support, notes, and answers—instantly, 24/7.",
    tooltip: "Type your study question for instant help."
  },
  {
    icon: <ChartLine className="text-green-600" size={32} />,
    title: "Goals Tracker",
    description: "Track goals for day, week, month, year. Remove & view progress.",
    tooltip: "Set and manage your study goals."
  }
];

const bonusFeatures: DashboardFeature[] = [
  {
    icon: <Smile className="text-pink-500" size={32} />,
    title: "Break with Me",
    description: "Fun facts, jokes, and mindful breaks."
  },
  {
    icon: <Music className="text-blue-600" size={32} />,
    title: "Focus Music Links",
    description: "Curated YouTube/Spotify playlists."
  },
  {
    icon: <Lightbulb className="text-amber-500" size={32} />,
    title: "Study Technique Tips",
    description: "Feynman, flashcards, and other strategies.",
    tooltip: "Get smarter with proven techniques."
  },
  {
    icon: <Book className="text-indigo-700" size={32} />,
    title: "AI Flashcards",
    description: "AI generates flashcards per your subject with save/remove.",
    tooltip: "Type your subject/topic for instant cards."
  }
];

// Improved: glassmorphism, colorful icon bg, hover effect
function DashboardFeatureButton({ icon, title, description, tooltip, onClick }: DashboardFeature & { onClick?: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`
              flex flex-col items-center justify-center w-full
              rounded-2xl
              bg-white/50
              backdrop-blur-sm
              border border-indigo-100
              shadow-md
              p-3 sm:p-4
              min-h-[124px]
              transition
              hover:scale-[1.04] hover:shadow-xl
              active:scale-[0.98]
              focus-visible:ring-2 focus-visible:ring-sky-200
              outline-none
              group
            `}
            type="button"
            onClick={onClick}
            tabIndex={0}
          >
            <span
              className={`
                flex items-center justify-center mb-2
                w-12 h-12 rounded-full
                bg-gradient-to-br ${
                  title === "Mood Check-In" ? "from-sky-200 to-sky-400" :
                  title === "Guided Breathing" ? "from-indigo-200 to-indigo-400" :
                  title === "Motivational Quote" ? "from-yellow-100 to-yellow-300" :
                  title === "Journaling Prompt" ? "from-indigo-100 to-indigo-300" :
                  title === "Break with Me" ? "from-pink-100 to-pink-300" :
                  title === "Focus Music Links" ? "from-blue-100 to-blue-300" :
                  title === "Study Technique Tips" ? "from-amber-100 to-amber-300" :
                  title === "AI Flashcards" ? "from-indigo-100 to-indigo-300" :
                  title === "Daily Study Planner" ? "from-teal-100 to-teal-300" :
                  title === "Pomodoro Suggestion" ? "from-sky-100 to-sky-300" :
                  title === "AI Study Assistant" ? "from-indigo-100 to-indigo-400" :
                  title === "Goals Tracker" ? "from-green-100 to-green-300" :
                  "from-sky-100 to-indigo-100"
                }
                shadow-inner
                group-hover:shadow-lg
                transition
              `}
            >
              {/* Render passed icon, which is colored already */}
              <span className="">{icon}</span>
            </span>
            <span className="block font-bold text-base sm:text-lg text-indigo-900 text-center leading-tight">
              {title}
            </span>
            <span className="block text-indigo-800/80 text-[15px] sm:text-base font-normal text-center mt-1">
              {description}
            </span>
          </button>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent side="bottom" className="max-w-xs text-sm">
            {tooltip}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

// Render correct dialog for special feature types; else, flat feature button
function FeatureDialogOrButton(props: DashboardFeature) {
  switch (props.title) {
    case "Mood Check-In":
      return (
        <MoodCheckinDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Guided Breathing":
      return (
        <GuidedBreathingDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Motivational Quote":
      return (
        <MotivationalQuoteDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Journaling Prompt":
      return (
        <JournalingPromptDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Break with Me":
      return (
        <BreakWithMeDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Focus Music Links":
      return (
        <FocusMusicDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Study Technique Tips":
      return (
        <StudyTipsDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "AI Flashcards":
      return (
        <FlashcardsDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Daily Study Planner":
      return (
        <StudyPlannerDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Pomodoro Suggestion":
      return (
        <PomodoroTimerDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "Goals Tracker":
      return (
        <GoalsTrackerDialog
          triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
        />
      );
    case "AI Study Assistant":
      // Placeholder: If dialog for AI Study Assistant is added, update here.
      return <DashboardFeatureButton {...props} />;
    default:
      return <DashboardFeatureButton {...props} />;
  }
}

export default function DashboardTabs() {
  return (
    <section id="dashboard" className="w-full bg-white border-t border-indigo-100 py-12 px-1 sm:px-4">
      <h2 className="text-3xl font-extrabold text-center text-indigo-900 mb-7 animate-fade-in">
        Your MindMate<span className="text-sky-600">+</span> Dashboard
      </h2>
      <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-sm p-0 mb-6 animate-fade-in">
        <Tabs defaultValue="mental" className="w-full">
          <TabsList className="w-full flex justify-between items-center rounded-t-2xl border-b border-indigo-100 bg-gradient-to-r from-sky-100 via-indigo-50 to-white px-1 py-1">
            <TabsTrigger value="mental" className="flex-1 text-lg data-[state=active]:bg-white data-[state=active]:text-sky-700">
              🧠 Mental Health
            </TabsTrigger>
            <TabsTrigger value="study" className="flex-1 text-lg data-[state=active]:bg-white data-[state=active]:text-sky-700">
              📚 Study Support
            </TabsTrigger>
            <TabsTrigger value="bonus" className="flex-1 text-lg data-[state=active]:bg-white data-[state=active]:text-sky-700">
              🌟 Bonus Features
            </TabsTrigger>
          </TabsList>
          {/* MENTAL HEALTH TAB */}
          <TabsContent value="mental" className="px-1 sm:px-4 py-7">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-3 sm:gap-x-5">
              {mentalHealthFeatures.map((f) => (
                <FeatureDialogOrButton key={f.title} {...f} />
              ))}
            </div>
          </TabsContent>
          {/* STUDY SUPPORT TAB */}
          <TabsContent value="study" className="px-1 sm:px-4 py-7">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-3 sm:gap-x-5">
              {studySupportFeatures.map((f) => (
                <FeatureDialogOrButton key={f.title} {...f} />
              ))}
            </div>
          </TabsContent>
          {/* BONUS FEATURES TAB */}
          <TabsContent value="bonus" className="px-1 sm:px-4 py-7">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-3 sm:gap-x-5">
              {bonusFeatures.map((f) => (
                <FeatureDialogOrButton key={f.title} {...f} />
              ))}
              <ScreenTimeTrackerDialog
                triggerClassName="flex flex-col items-center justify-center w-full bg-transparent border-0 shadow-none p-2 sm:p-3 md:p-4 transition focus-visible:ring-2 focus-visible:ring-sky-200 hover:bg-sky-50/40 active:bg-sky-100 rounded-xl min-h-[104px]"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
