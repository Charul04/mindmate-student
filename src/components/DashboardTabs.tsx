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
    icon: <Smile className="text-sky-600" size={28} />,
    title: "Mood Check-In",
    description: "Select your mood to get tailored advice.",
    tooltip: "Track your mood & get helpful support."
  },
  {
    icon: <Wind className="text-indigo-600" size={28} />,
    title: "Guided Breathing",
    description: "3–5 min calming breathing session.",
    tooltip: "Follow a script for relaxation."
  },
  {
    icon: <Quote className="text-yellow-500" size={28} />,
    title: "Motivational Quote",
    description: "Instant boost with inspiration!",
    tooltip: "AI finds a motivational quote for you."
  },
  {
    icon: <PenLine className="text-indigo-400" size={28} />,
    title: "Journaling Prompt",
    description: "Reflect with a daily writing activity.",
    tooltip: "Get thoughtful prompts to guide your journaling."
  },
];

const studySupportFeatures: DashboardFeature[] = [
  {
    icon: <CalendarDays className="text-teal-600" size={28} />,
    title: "Daily Study Planner",
    description: "Simple to-do & calendar to add events, AI suggestions.",
    tooltip: "Organize your study tasks and schedule."
  },
  {
    icon: <Clock className="text-sky-600" size={28} />,
    title: "Pomodoro Suggestion",
    description: "AI recommends focus & break cycles. Stopwatch & clock added.",
    tooltip: "Boost focus with timers and sessions."
  },
  {
    icon: <Book className="text-indigo-700" size={28} />,
    title: "AI Study Assistant",
    description: "Get personalized support, notes, and answers—instantly, 24/7.",
    tooltip: "Type your study question for instant help."
  },
  {
    icon: <ChartLine className="text-green-600" size={28} />,
    title: "Goals Tracker",
    description: "Track goals for day, week, month, year. Remove & view progress.",
    tooltip: "Set and manage your study goals."
  }
];

const bonusFeatures: DashboardFeature[] = [
  {
    icon: <Smile className="text-pink-500" size={28} />,
    title: "Break with Me",
    description: "Fun facts, jokes, and mindful breaks."
  },
  {
    icon: <Music className="text-blue-600" size={28} />,
    title: "Focus Music Links",
    description: "Curated YouTube/Spotify playlists."
  },
  {
    icon: <Lightbulb className="text-amber-500" size={28} />,
    title: "Study Technique Tips",
    description: "Feynman, flashcards, and other strategies.",
    tooltip: "Get smarter with proven techniques."
  },
  {
    icon: <Book className="text-indigo-700" size={28} />,
    title: "AI Flashcards",
    description: "AI generates flashcards per your subject with save/remove.",
    tooltip: "Type your subject/topic for instant cards."
  }
];

function DashboardCard({ icon, title, description, tooltip }: DashboardFeature) {
  // Keep dialog triggers for specific features
  if (title === "Guided Breathing") {
    return (
      <GuidedBreathingDialog
        triggerClassName="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
      />
    );
  }
  if (title === "Motivational Quote") {
    return (
      <MotivationalQuoteDialog
        triggerClassName="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
      />
    );
  }
  if (title === "Journaling Prompt") {
    return (
      <JournalingPromptDialog
        triggerClassName="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
      />
    );
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left">
            <span className="flex items-center mb-2">{icon}</span>
            <span className="font-semibold text-indigo-900 text-[1.08rem]">{title}</span>
            <span className="text-indigo-900/70 text-sm mt-1">{description}</span>
            <ChevronRight className="absolute right-4 top-4 text-indigo-200 group-hover:text-indigo-500 transition hidden md:block" size={20} />
          </button>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent side="bottom">
            {tooltip}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default function DashboardTabs() {
  return (
    <section
      id="dashboard"
      className="w-full bg-white border-t border-indigo-100 py-7 sm:py-12 px-0"
      style={{ minHeight: 350 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-900 mb-5 sm:mb-7 animate-fade-in">
        Your MindMate
        <span className="text-sky-500 font-extrabold">+</span> Dashboard
      </h2>
      <div className="w-full max-w-xl sm:max-w-4xl mx-auto bg-sky-50/60 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md px-0 mb-5 sm:mb-6 animate-fade-in">
        <Tabs defaultValue="mental" className="w-full">
          <TabsList
            className="
              flex w-full overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-300/40 scrollbar-track-transparent bg-gradient-to-r from-sky-100 via-indigo-50 to-white border-b border-indigo-100
              rounded-t-xl sm:rounded-t-2xl pr-2 pl-2
              min-h-[46px]
              "
            style={{
              WebkitOverflowScrolling: "touch",
              gap: "0.5rem",
            }}
          >
            <TabsTrigger value="mental" className="flex-1 min-w-[120px] max-w-[210px] px-3 py-2 sm:py-2.5 rounded-lg font-semibold text-base data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow transition-all">
              🧠 Mental Health
            </TabsTrigger>
            <TabsTrigger value="study" className="flex-1 min-w-[120px] max-w-[210px] px-3 py-2 sm:py-2.5 rounded-lg font-semibold text-base data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow transition-all">
              📚 Study Support
            </TabsTrigger>
            <TabsTrigger value="bonus" className="flex-1 min-w-[130px] max-w-[225px] px-3 py-2 sm:py-2.5 rounded-lg font-semibold text-base data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow transition-all">
              🌟 Bonus Features
            </TabsTrigger>
          </TabsList>

          {/* MENTAL HEALTH TAB */}
          <TabsContent value="mental" className="px-1 sm:px-2 py-5 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {mentalHealthFeatures.map((f) =>
                f.title === "Mood Check-In" ? (
                  <MoodCheckinDialog
                    key={f.title}
                    triggerClassName="group flex flex-col items-start bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 p-4 sm:p-5 shadow hover:shadow-lg transition-shadow hover:scale-[1.025] focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
                  />
                ) : (
                  <DashboardCard key={f.title} {...f} />
                )
              )}
            </div>
          </TabsContent>
          {/* STUDY SUPPORT TAB */}
          <TabsContent value="study" className="px-1 sm:px-2 py-5 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              <StudyPlannerDialog />
              <PomodoroTimerDialog />
              <GoalsTrackerDialog />
            </div>
          </TabsContent>
          {/* BONUS FEATURES TAB */}
          <TabsContent value="bonus" className="px-1 sm:px-2 py-5 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              <BreakWithMeDialog
                triggerClassName="group flex flex-col items-start bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 p-4 sm:p-5 shadow hover:shadow-lg transition-shadow hover:scale-[1.025] focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
              />
              <FocusMusicDialog
                triggerClassName="group flex flex-col items-start bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 p-4 sm:p-5 shadow hover:shadow-lg transition-shadow hover:scale-[1.025] focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
              />
              <StudyTipsDialog
                triggerClassName="group flex flex-col items-start bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 p-4 sm:p-5 shadow hover:shadow-lg transition-shadow hover:scale-[1.025] focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
              />
              <FlashcardsDialog
                triggerClassName="group flex flex-col items-start bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 p-4 sm:p-5 shadow hover:shadow-lg transition-shadow hover:scale-[1.025] focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
              />
              <ScreenTimeTrackerDialog
                triggerClassName="group flex flex-col items-start bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 p-4 sm:p-5 shadow hover:shadow-lg transition-shadow hover:scale-[1.025] focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
