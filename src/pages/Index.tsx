
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardTabs from "@/components/DashboardTabs";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";
import ChatbaseChatbotDialog from "@/components/ChatbaseChatbotDialog";
import React, { useEffect, useState } from "react";
import "@/i18n";

export default function Index() {
  const [showChatbot, setShowChatbot] = useState(false);

  // Removed auto-open chatbot logic

  // Add overflow-x-hidden to prevent unwanted horizontal scroll in mobile apps
  return (
    <div
      className="min-h-screen flex flex-col w-full max-w-full bg-gradient-to-br from-indigo-50 via-sky-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-x-hidden"
      style={{
        minHeight: "100dvh",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <Header />
      <main className="w-full flex-1 flex flex-col">
        <HeroSection />
        <DashboardTabs />
        <FeaturesSection />
        <TestimonialSection />
      </main>
      <FooterSection />
      <ChatbaseChatbotDialog 
        triggerClassName="hidden"
        autoOpen={showChatbot}
      />
    </div>
  );
}
