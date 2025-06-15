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
import MentalHealthFeaturesTab from "@/components/MentalHealthFeaturesTab";
import StudySupportFeaturesTab from "@/components/StudySupportFeaturesTab";
import BonusFeaturesTab from "@/components/BonusFeaturesTab";

export default function DashboardTabs() {
  return (
    <section
      id="dashboard"
      className="relative w-full bg-gradient-to-b from-sky-50/70 via-white/90 to-white border-t border-indigo-100 pt-2 pb-8 sm:pt-7 sm:pb-12 px-0 overflow-x-hidden"
      style={{ minHeight: 340 }}
    >
      {/* Soft Purple Glow + Vibrant Glows, now with LIGHT PURPLE OVERLAY */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Main background glow (existing vibrant) */}
        <div className="absolute left-1/2 top-1/2 w-[120vw] h-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-to-tr from-purple-100/80 via-pink-100/40 to-sky-100 blur-[90px] opacity-70 animate-fade-in" />
        {/* Extra soft purple hue overlay */}
        <div className="absolute inset-0 w-full h-full bg-purple-100/30 blur-xl opacity-30 mix-blend-lighten" />
        {/* Other color spots for playfulness, as before */}
        <div className="absolute left-12 top-16 w-80 h-64 bg-gradient-to-br from-yellow-200/90 via-pink-100/80 to-fuchsia-100/80 blur-3xl opacity-40 rotate-12" />
        <div className="absolute right-10 bottom-16 w-72 h-60 bg-gradient-to-bl from-sky-200 via-blue-100 to-purple-100 blur-[54px] opacity-50 -rotate-12" />
      </div>

      <h2 className="relative z-10 text-2xl sm:text-3xl font-bold text-center text-indigo-900 mb-4 sm:mb-8 animate-fade-in drop-shadow-[0_2px_8px_rgba(109,40,217,0.14)]">
        Your MindMate
        <span className="text-sky-500 font-extrabold">+</span> Dashboard
      </h2>
      <div className="relative z-10 w-full max-w-xl sm:max-w-4xl mx-auto px-0 mb-3 sm:mb-6">
        {/* Frosted-glass, glowing card container with new soft purple border/blur */}
        <div className="absolute inset-0 -top-3 rounded-2xl bg-white/85 border border-indigo-100/70 shadow-[0_12px_34px_rgba(155,144,240,0.12)] backdrop-blur-[10px] backdrop-saturate-[1.18] ring-2 ring-purple-200/30 ring-inset" aria-hidden="true" />
        <Tabs defaultValue="mental" className="relative z-10 w-full">
          {/* VIBRANT TAB BUTTONS */}
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
          <TabsContent value="mental" className="relative z-10 px-1 sm:px-3 py-5 sm:py-7">
            <MentalHealthFeaturesTab />
          </TabsContent>
          <TabsContent value="study" className="relative z-10 px-1 sm:px-3 py-5 sm:py-7">
            <StudySupportFeaturesTab />
          </TabsContent>
          <TabsContent value="bonus" className="relative z-10 px-1 sm:px-3 py-5 sm:py-7">
            <BonusFeaturesTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
