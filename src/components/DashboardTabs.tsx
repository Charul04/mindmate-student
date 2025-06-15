import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import GuidedBreathingDialog from "@/components/GuidedBreathingDialog";
import MotivationalQuoteDialog from "@/components/MotivationalQuoteDialog";
import JournalingPromptDialog from "@/components/JournalingPromptDialog";
import StudyPlannerDialog from "@/components/StudyPlannerDialog";
import PomodoroTimerDialog from "@/components/PomodoroTimerDialog";
import GoalsTrackerDialog from "@/components/GoalsTrackerDialog";
import BreakWithMeDialog from "@/components/BreakWithMeDialog";
import FocusMusicDialog from "@/components/FocusMusicDialog";
import StudyTipsDialog from "@/components/StudyTipsDialog";
import FlashcardsDialog from "@/components/FlashcardsDialog";
import ScreenTimeTrackerDialog from "@/components/ScreenTimeTrackerDialog";
import { Smile, Wind, Quote, PenLine, CalendarDays, Clock, Book, ChartLine, Music, Lightbulb, ChevronRight } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import React from "react";
import DashboardBgDoodle from "./DashboardBgDoodle";
import DashboardDoodle from "./DashboardDoodle";
import DashboardDividerDoodle from "./DashboardDividerDoodle";
import DashboardFeatureCard from "./DashboardFeatureCard";

type DashboardFeature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip?: string;
};

const mentalHealthFeatures: DashboardFeature[] = [
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
    icon: <ChartLine className="text-green-600" size={28} />,
    title: "Goals Tracker",
    description: "Track goals for day, week, month, year. Remove & view progress.",
    tooltip: "Set and manage your study goals."
  }
];

const bonusFeatures: DashboardFeature[] = [
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
    icon: <ChartLine className="text-green-600" size={28} />,
    title: "Goals Tracker",
    description: "Track your study goals.",
    tooltip: "Track progress and set new goals."
  },
];

function DashboardCard({ icon, title, description, tooltip }: DashboardFeature) {
  if (title === "Guided Breathing") {
    return <GuidedBreathingDialog triggerClassName="w-full h-full" />;
  }
  if (title === "Motivational Quote") {
    return <MotivationalQuoteDialog triggerClassName="w-full h-full" />;
  }
  if (title === "Journaling Prompt") {
    return <JournalingPromptDialog triggerClassName="w-full h-full" />;
  }
  if (title === "Focus Music Links") {
    return <FocusMusicDialog triggerClassName="w-full h-full" />;
  }
  if (title === "Study Technique Tips") {
    return <StudyTipsDialog triggerClassName="w-full h-full" />;
  }
  if (title === "Goals Tracker") {
    return <GoalsTrackerDialog triggerClassName="w-full h-full" />;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-full h-full outline-none">
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
    <section id="dashboard" className="relative w-full min-h-[576px] border-t border-indigo-100 py-12 px-3 sm:px-8 overflow-hidden bg-white">
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-900 mb-4 tracking-tight">
          Your MindMate<span className="text-sky-500 duration-150">+</span> Dashboard
        </h2>
      </div>
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-0 mb-6 border border-indigo-100/80">
        <Tabs defaultValue="mental" className="w-full">
          <TabsList className="w-full flex justify-between items-center rounded-t-2xl border-b border-indigo-100 bg-white px-3 py-1 relative">
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
          <TabsContent value="mental" className="px-6 py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <DashboardFeatureCard
                icon={<span className="text-indigo-600"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#E0ECFB"/><path d="M19 14c0 2.21-1.79 4-4 4s-4-1.79-4-4" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 12c.64-1.14 1.91-2 4-2s3.36.86 4 2" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                title="Guided Breathing"
                description="3–5 min calming breathing session."
                tooltip="Follow a script for relaxation."
              >
                <div className="w-full h-full"><GuidedBreathingDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
              <DashboardFeatureCard
                icon={<span className="text-yellow-500"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#FFFDE7"/><path d="M10 12v3h8v-3" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 17v-2" stroke="#EAB308" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                title="Motivational Quote"
                description="Instant boost with inspiration!"
                tooltip="AI finds a motivational quote for you."
              >
                <div className="w-full h-full"><MotivationalQuoteDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
              <DashboardFeatureCard
                icon={<span className="text-indigo-400"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#EEF4FE"/><path d="M9 14.25h10" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round"/><path d="M13 19v-6a2 2 0 1 1 4 0v6" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round"/></svg></span>}
                title="Journaling Prompt"
                description="Reflect with a daily writing activity."
                tooltip="Get thoughtful prompts to guide your journaling."
              >
                <div className="w-full h-full"><JournalingPromptDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
            </div>
          </TabsContent>
          {/* STUDY SUPPORT TAB */}
          <TabsContent value="study" className="px-6 py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <DashboardFeatureCard
                icon={<span className="text-teal-600"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#E6FCF6"/><path d="M11 17.5h6" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round"/><path d="M11 10.5h6" stroke="#14B8A6" strokeWidth="1.8" strokeLinecap="round"/></svg></span>}
                title="Daily Study Planner"
                description="To-do & calendar, with AI suggestions."
                tooltip="Organize your study tasks and schedule."
              >
                <div className="w-full h-full"><StudyPlannerDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
              <DashboardFeatureCard
                icon={<span className="text-sky-600"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#E0F2FE"/><path d="M11 17v-2a2 2 0 1 1 4 0v2" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round"/><path d="M17 14h-6" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round"/></svg></span>}
                title="Pomodoro Suggestion"
                description="AI recommends focus & break cycles."
                tooltip="Boost focus with timers and sessions."
              >
                <div className="w-full h-full"><PomodoroTimerDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
              <DashboardFeatureCard
                icon={<span className="text-green-600"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#F4FDF7"/><path d="M9 19v-5a5 5 0 1 1 10 0v5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round"/></svg></span>}
                title="Goals Tracker"
                description="Track goals for day, week, month, year."
                tooltip="Set and manage your study goals."
              >
                <div className="w-full h-full"><GoalsTrackerDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
            </div>
          </TabsContent>
          {/* BONUS FEATURES TAB */}
          <TabsContent value="bonus" className="px-6 py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <DashboardFeatureCard
                icon={<span className="text-purple-600"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#F3E8FF"/><path d="M10 11v6m8-6v6" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round"/><circle cx="14" cy="14" r="7" stroke="#9333EA" strokeWidth="1.5" fill="none"/></svg></span>}
                title="Screen Time Tracker"
                description="See how long you’ve spent on MindMate+ today."
                tooltip="Mindful usage = better focus!"
              >
                <div className="w-full h-full"><ScreenTimeTrackerDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
              <DashboardFeatureCard
                icon={<span className="text-pink-500"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#FFF1F2"/><path d="M9 18Q14 10 19 18" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round"/><ellipse cx="14" cy="15" rx="4" ry="2" fill="#F472B6" opacity={.14}/></svg></span>}
                title="Break with Me"
                description="Fun facts, jokes, mindful breaks."
                tooltip="Recharge for better focus!"
              >
                <div className="w-full h-full"><BreakWithMeDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
              <DashboardFeatureCard
                icon={<span className="text-blue-600"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#E0F2FE"/><path d="M10 11v6m8-6v6" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round"/><circle cx="14" cy="14" r="7" stroke="#2563EB" strokeWidth="1.5" fill="none"/></svg></span>}
                title="Focus Music Links"
                description="Curated YouTube/Spotify playlists."
                tooltip="Pick curated playlists for any mood."
              >
                <div className="w-full h-full"><FocusMusicDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
              <DashboardFeatureCard
                icon={<span className="text-amber-500"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#FEF3C7"/><path d="M14 17v-6a2 2 0 1 1 4 0v6" stroke="#F59E42" strokeWidth="1.8" strokeLinecap="round"/><ellipse cx="14" cy="19" rx="5" ry="2" fill="#FBBF24" opacity={.13}/></svg></span>}
                title="Study Technique Tips"
                description="Feynman, flashcards, and other strategies."
                tooltip="Get smarter with proven techniques."
              >
                <div className="w-full h-full"><StudyTipsDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
              <DashboardFeatureCard
                icon={<span className="text-indigo-700"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#EEF4FE"/><rect x="9" y="10" width="10" height="8" rx="2" fill="#818CF8" opacity={.08}/><rect x="13" y="12" width="4" height="4" rx="1" fill="#6366F1" opacity={.13}/></svg></span>}
                title="AI Flashcards"
                description="AI generates subject flashcards. Save or remove as you like!"
                tooltip="Create and manage topic flashcards."
              >
                <div className="w-full h-full"><FlashcardsDialog triggerClassName="w-full h-full" /></div>
              </DashboardFeatureCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
