
import React from "react";
import BreakWithMeDialog from "@/components/BreakWithMeDialog";
import FocusMusicDialog from "@/components/FocusMusicDialog";
import FlashcardsDialog from "@/components/FlashcardsDialog";
import ChatbaseChatbotDialog from "@/components/ChatbaseChatbotDialog";

export default function BonusFeaturesTab() {
  return (
    <div className="relative overflow-visible">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        <BreakWithMeDialog
          triggerClassName="group relative flex flex-col items-start bg-transparent rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-none hover:bg-indigo-50/40 focus:ring-2 focus:ring-indigo-100 w-full min-h-[120px] text-left transition-all"
        />
        <FocusMusicDialog
          triggerClassName="group relative flex flex-col items-start bg-transparent rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-none hover:bg-indigo-50/40 focus:ring-2 focus:ring-indigo-100 w-full min-h-[120px] text-left transition-all"
        />
        <FlashcardsDialog
          triggerClassName="group relative flex flex-col items-start bg-transparent rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-none hover:bg-indigo-50/40 focus:ring-2 focus:ring-indigo-100 w-full min-h-[120px] text-left transition-all"
        />
        <ChatbaseChatbotDialog
          triggerClassName="group relative flex flex-col items-start bg-transparent rounded-2xl border border-indigo-100 p-4 sm:p-6 shadow-none hover:bg-indigo-50/40 focus:ring-2 focus:ring-indigo-100 w-full min-h-[120px] text-left transition-all"
        />
      </div>
    </div>
  );
}
