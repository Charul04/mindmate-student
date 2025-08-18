
import React from "react";
import MoodCheckinDialog from "@/components/MoodCheckinDialog";
import GuidedBreathingDialog from "@/components/GuidedBreathingDialog";
import MotivationalQuoteDialog from "@/components/MotivationalQuoteDialog";

export default function MentalHealthFeaturesTab() {
  return (
    <div className="relative overflow-visible">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        <MoodCheckinDialog
          triggerClassName="group relative flex flex-col items-start bg-transparent rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-none hover:bg-indigo-50/40 focus:ring-2 focus:ring-indigo-100 w-full min-h-[120px] text-left transition-all"
        />
        <GuidedBreathingDialog
          triggerClassName="group relative flex flex-col items-start bg-transparent rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-none hover:bg-indigo-50/40 focus:ring-2 focus:ring-indigo-100 w-full min-h-[120px] text-left transition-all"
        />
        <AdvancedJournalDialog
          triggerClassName="group relative flex flex-col items-start bg-transparent rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-none hover:bg-indigo-50/40 focus:ring-2 focus:ring-indigo-100 w-full min-h-[120px] text-left transition-all"
        />
      </div>
    </div>
  );
}
