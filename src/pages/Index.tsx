import AppLogo from "@/components/AppLogo";
import HeroIllustration from "@/components/HeroIllustration";
import FeatureCard from "@/components/FeatureCard";
import QuoteCard from "@/components/QuoteCard";
import { Book, Brain, Star, HeartPulse, Smile, Wind, Quote, PenLine, Sun, Target, Clock, Music, MessageSquare, ChevronRight, Lightbulb, ChartLine, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import React from "react";
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
import StudyPlanner from "@/components/StudyPlanner";
import PomodoroTimer from "@/components/PomodoroTimer";
import Flashcards from "@/components/Flashcards";
import GoalsTracker from "@/components/GoalsTracker";
import StudyPlannerDialog from "@/components/StudyPlannerDialog";
import PomodoroTimerDialog from "@/components/PomodoroTimerDialog";
import FlashcardsDialog from "@/components/FlashcardsDialog";
import GoalsTrackerDialog from "@/components/GoalsTrackerDialog";
import AIChatbotDialog from "@/components/AIChatbotDialog";
import { useNavigate } from "react-router-dom";

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
    icon: <Sun className="text-orange-500" size={28} />,
    title: "Customizable Dashboard",
    description: "Mix wellness & academic widgets."
  },
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
    icon: <Star className="text-indigo-600" size={28} />,
    title: "AI Check-in Reminder",
    description: "Gentle check-ins: 'How are you doing?'"
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
  // Guided Breathing card triggers that dialog
  if (title === "Guided Breathing") {
    return (
      <GuidedBreathingDialog
        triggerClassName="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
      />
    );
  }
  // Motivational Quote card triggers our custom dialog
  if (title === "Motivational Quote") {
    return (
      <MotivationalQuoteDialog
        triggerClassName="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
      />
    );
  }
  // Journaling Prompt triggers its dialog as a card
  if (title === "Journaling Prompt") {
    return (
      <JournalingPromptDialog
        triggerClassName="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
      />
    );
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left">
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

const features = [
  {
    icon: Book,
    title: "AI Study Assistant",
    description: "Get personalized support, notes, and answers—instantly, 24/7.",
  },
  {
    icon: Brain,
    title: "Focus & Motivation",
    description: "Pomodoro timers, habit streaks, and daily focus boosts designed for students.",
  },
  {
    icon: HeartPulse,
    title: "Self-Care Check-Ins",
    description: "Built-in wellness prompts and mood tracking for mind and body.",
  },
  {
    icon: Star,
    title: "Progress Insights",
    description: "Visualize learning goals, track time spent, and celebrate wins.",
  },
];

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-indigo-100 bg-white/90 shadow-sm">
        <div>
          <AppLogo />
        </div>
        <nav className="flex gap-7 items-center">
          <span className="text-xs font-semibold text-sky-600 bg-sky-100 py-1 px-2 rounded-lg">Free App</span>
          <a href="#dashboard" className="text-indigo-700 font-medium hover:text-indigo-900 transition story-link">Dashboard</a>
          <a href="#features" className="text-indigo-700 font-medium hover:text-indigo-900 transition story-link">Features</a>
          <a href="#testimonial" className="text-indigo-700 font-medium hover:text-indigo-900 transition story-link">Testimonials</a>
          <a href="#" className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow hover-scale transition">Get Started</a>
        </nav>
      </header>
      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row md:items-center gap-10 px-8 pt-10 pb-6 max-w-6xl mx-auto w-full flex-grow">
        <div className="flex-1 flex flex-col items-start justify-center animate-fade-in">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-indigo-900 mb-4">
            MindMate<span className="text-sky-500">+</span>
          </h1>
          <p className="text-2xl text-indigo-700 font-medium mb-3 max-w-lg tracking-normal">
            Study smarter. Feel better. The AI companion made for students.
          </p>
          <p className="font-semibold text-sky-500 mb-6 text-lg">100% Free & made for students!</p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <HeroIllustration />
        </div>
      </section>
      {/* DASHBOARD */}
      <section id="dashboard" className="w-full bg-white border-t border-indigo-100 py-12 px-3 sm:px-8">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-7 animate-fade-in">
          Your MindMate+ Dashboard
        </h2>
        <div className="max-w-4xl mx-auto bg-sky-50/60 rounded-2xl shadow-md p-0 mb-6 animate-fade-in">
          <Tabs defaultValue="mental" className="w-full">
            <TabsList className="w-full flex justify-between items-center rounded-t-2xl border-b border-indigo-100 bg-gradient-to-r from-sky-100 via-indigo-50 to-white px-3 py-1">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {mentalHealthFeatures.map((f) =>
                  f.title === "Mood Check-In" ? (
                    <MoodCheckinDialog
                      key={f.title}
                      triggerClassName="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
                    />
                  ) : (
                    <DashboardCard key={f.title} {...f} />
                  )
                )}
              </div>
            </TabsContent>
            {/* STUDY SUPPORT TAB */}
            <TabsContent value="study" className="px-6 py-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <StudyPlannerDialog />
                <PomodoroTimerDialog />
                <AIChatbotDialog />
                <GoalsTrackerDialog />
              </div>
            </TabsContent>
            {/* BONUS FEATURES TAB */}
            <TabsContent value="bonus" className="px-6 py-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {bonusFeatures.map((f) =>
                  f.title === "AI Flashcards" ? (
                    <FlashcardsDialog
                      key={f.title}
                      triggerClassName="group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"
                    />
                  ) : (
                    <DashboardCard key={f.title} {...f} />
                  )
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* FEATURES */}
      <section id="features" className="w-full bg-white border-t border-b border-indigo-100 py-14 px-8">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8 animate-fade-in">
          How MindMate+ helps you thrive
        </h2>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map(({ icon, title, description }) => (
            <FeatureCard key={title} icon={icon} title={title} description={description}/>
          ))}
        </div>
      </section>
      {/* TESTIMONIAL */}
      <section id="testimonial" className="py-12 px-6 flex justify-center bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-xl w-full">
          <QuoteCard />
        </div>
      </section>
      {/* FOOTER */}
      <footer className="mt-auto px-8 py-8 bg-white/90 border-t border-indigo-100 flex flex-col md:flex-row justify-between items-center text-indigo-700 text-sm">
        <div className="mb-3 md:mb-0">
          <AppLogo size={26} />
        </div>
        <div className="flex gap-5">
          <a href="#" className="hover:underline">Support</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        <span className="mt-2 md:mt-0 text-indigo-300">&copy; {new Date().getFullYear()} MindMate+</span>
      </footer>
    </div>
  );
}
