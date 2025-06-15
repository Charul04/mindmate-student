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
      className="relative w-full bg-gradient-to-b from-sky-50/70 via-white/90 to-white border-t border-indigo-100 pt-2 pb-8 sm:pt-7 sm:pb-12 px-0 overflow-x-hidden"
      style={{ minHeight: 340 }}
    >
      {/* Animated vibrant blurred gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-1/2 top-1/2 w-[100vw] h-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-to-tr from-pink-200 via-indigo-100 to-sky-200 blur-3xl opacity-60 animate-fade-in" />
        <div className="absolute left-10 top-24 w-72 h-52 bg-gradient-to-br from-yellow-200 via-pink-100 to-fuchsia-100 blur-3xl opacity-40 rotate-12" />
        <div className="absolute right-10 bottom-14 w-60 h-56 bg-gradient-to-bl from-sky-200 via-blue-100 to-purple-100 blur-2xl opacity-40 -rotate-12" />
      </div>

      <h2 className="relative z-10 text-2xl sm:text-3xl font-bold text-center text-indigo-900 mb-4 sm:mb-8 animate-fade-in drop-shadow-[0_2px_8px_rgba(109,40,217,0.14)]">
        Your MindMate
        <span className="text-sky-500 font-extrabold">+</span> Dashboard
      </h2>
      <div className="relative z-10 w-full max-w-xl sm:max-w-4xl mx-auto px-0 mb-3 sm:mb-6">
        {/* Glassy card behind the content */}
        <div className="absolute inset-0 -top-3 rounded-2xl bg-white/70 backdrop-blur-[4px] border border-indigo-100/60 shadow-[0_8px_32px_0_rgba(63,81,181,0.10)]" aria-hidden="true" />
        <Tabs defaultValue="mental" className="relative z-10 w-full">
          <TabsList
            className="
              flex w-full overflow-x-auto
              scrollbar-thin scrollbar-thumb-indigo-200/60 scrollbar-track-transparent
              bg-gradient-to-r from-indigo-100/70 via-sky-50 to-white
              border-b border-indigo-100
              rounded-none sm:rounded-t-2xl pr-1 pl-1
              min-h-[52px] sticky top-0 z-20 shadow-sm
              gap-[0.45rem]
            "
            style={{
              WebkitOverflowScrolling: "touch"
            }}
          >
            {/* VIBRANT TAB BUTTONS */}
            <TabsTrigger
              value="mental"
              className={`
                flex-1 min-w-[115px] max-w-[200px] px-3 py-2 sm:py-2.5 rounded-xl font-semibold text-base
                bg-white/60
                transition-all duration-200
                border-none
                text-indigo-700
                shadow-none
                hover:scale-105 
                hover:shadow-md
                hover:z-10
                hover:bg-gradient-to-br hover:from-pink-100 hover:via-purple-100 hover:to-yellow-50
                focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2

                data-[state=active]:
                  bg-gradient-to-br
                  data-[state=active]:from-pink-400
                  data-[state=active]:via-indigo-400
                  data-[state=active]:to-yellow-300
                  data-[state=active]:text-white
                  data-[state=active]:shadow-xl
                  data-[state=active]:shadow-pink-400/40
                  data-[state=active]:scale-105
                  data-[state=active]:ring-2
                  data-[state=active]:ring-pink-200
                  data-[state=active]:z-10
              `}
              style={{ transitionProperty: "all" }}
            >
              🧠 Mental Health
            </TabsTrigger>
            <TabsTrigger
              value="study"
              className={`
                flex-1 min-w-[115px] max-w-[200px] px-3 py-2 sm:py-2.5 rounded-xl font-semibold text-base
                bg-white/60
                transition-all duration-200
                border-none
                text-indigo-700
                shadow-none
                hover:scale-105 
                hover:shadow-md
                hover:z-10
                hover:bg-gradient-to-tr hover:from-sky-100 hover:via-blue-100 hover:to-fuchsia-100
                focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2

                data-[state=active]:
                  bg-gradient-to-tr
                  data-[state=active]:from-sky-400
                  data-[state=active]:via-blue-400
                  data-[state=active]:to-fuchsia-400
                  data-[state=active]:text-white
                  data-[state=active]:shadow-xl
                  data-[state=active]:shadow-blue-300/40
                  data-[state=active]:scale-105
                  data-[state=active]:ring-2
                  data-[state=active]:ring-blue-200
                  data-[state=active]:z-10
              `}
              style={{ transitionProperty: "all" }}
            >
              📚 Study Support
            </TabsTrigger>
            <TabsTrigger
              value="bonus"
              className={`
                flex-1 min-w-[120px] max-w-[210px] px-3 py-2 sm:py-2.5 rounded-xl font-semibold text-base
                bg-white/60
                transition-all duration-200
                border-none
                text-indigo-700
                shadow-none
                hover:scale-105 
                hover:shadow-md
                hover:z-10
                hover:bg-gradient-to-tr hover:from-yellow-100 hover:via-fuchsia-100 hover:to-indigo-100
                focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2

                data-[state=active]:
                  bg-gradient-to-r
                  data-[state=active]:from-yellow-400
                  data-[state=active]:via-fuchsia-400
                  data-[state=active]:to-indigo-400
                  data-[state=active]:text-white
                  data-[state=active]:shadow-xl
                  data-[state=active]:shadow-yellow-400/30
                  data-[state=active]:scale-105
                  data-[state=active]:ring-2
                  data-[state=active]:ring-yellow-200
                  data-[state=active]:z-10
              `}
              style={{ transitionProperty: "all" }}
            >
              🌟 Bonus Features
            </TabsTrigger>
          </TabsList>
          {/* MENTAL HEALTH TAB */}
          <TabsContent value="mental" className="relative z-10 px-1 sm:px-3 py-5 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              {mentalHealthFeatures.map((f) =>
                f.title === "Mood Check-In" ? (
                  <MoodCheckinDialog
                    key={f.title}
                    triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-pink-200/30 before:to-sky-100/20 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
                  />
                ) : (
                  <DashboardCard
                    key={f.title}
                    {...f}
                    // Extra pop effect and inner glow
                  />
                )
              )}
            </div>
          </TabsContent>
          {/* STUDY SUPPORT TAB */}
          <TabsContent value="study" className="relative z-10 px-1 sm:px-3 py-5 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              <StudyPlannerDialog 
                triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-tr before:from-blue-200/30 before:to-fuchsia-100/20 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
              />
              <PomodoroTimerDialog 
                triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-tl before:from-teal-200/30 before:to-indigo-100/20 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
              />
              <GoalsTrackerDialog
                triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-green-200/25 before:to-yellow-100/20 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
              />
            </div>
          </TabsContent>
          {/* BONUS FEATURES TAB */}
          <TabsContent value="bonus" className="relative z-10 px-1 sm:px-3 py-5 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              <BreakWithMeDialog
                triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-fuchsia-100/30 before:to-indigo-100/15 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
              />
              <FocusMusicDialog
                triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-r before:from-blue-200/25 before:to-pink-100/15 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
              />
              <StudyTipsDialog
                triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-r before:from-yellow-200/30 before:to-sky-100/15 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
              />
              <FlashcardsDialog
                triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-tl before:from-pink-100/30 before:to-indigo-100/15 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
              />
              <ScreenTimeTrackerDialog
                triggerClassName="group relative flex flex-col items-start bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-xl hover:shadow-2xl focus:ring-2 focus:ring-sky-200 w-full min-h-[120px] text-left transition-all before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-fuchsia-200/25 before:to-yellow-100/15 before:opacity-0 group-hover:before:opacity-100 group-hover:before:blur-sm"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
