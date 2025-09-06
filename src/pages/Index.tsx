
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardTabs from "@/components/DashboardTabs";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";
import ChatbaseChatbotDialog from "@/components/ChatbaseChatbotDialog";
import React, { useEffect, useState } from "react";
import TimerIndicator from "@/components/TimerIndicator";
import { useAuth } from "@/hooks/useAuth";
import "@/i18n";

export default function Index() {
  const [showChatbot, setShowChatbot] = useState(false);
  const { user, loading } = useAuth();

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-sky-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-indigo-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Load chatbot script only for authenticated users and clean up when signed out
  useEffect(() => {
    if (user && !(window as any).chatbase) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="Sl0q4y9ILFqIdK8szW1Gv";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
      `;
      script.id = "chatbase-init";
      document.body.appendChild(script);
    } else if (!user) {
      // Aggressive cleanup when user signs out
      const cleanupChatbot = () => {
        const elementsToRemove = [
          '#chatbase-bubble-window',
          '#chatbase-message-bubbles', 
          '.chatbase-bubble-button',
          '#Sl0q4y9ILFqIdK8szW1Gv',
          '#chatbase-init',
          '[data-chatbase-embed]'
        ];
        
        elementsToRemove.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => element.remove());
        });
        
        if ((window as any).chatbase) {
          (window as any).chatbase = undefined;
        }
      };
      
      cleanupChatbot();
      // Continue cleanup to prevent re-initialization
      const interval = setInterval(cleanupChatbot, 500);
      
      // Clear interval after a few seconds to avoid infinite cleanup
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, [user]);

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
      <TimerIndicator />
      {user && (
        <ChatbaseChatbotDialog 
          triggerClassName="hidden"
          autoOpen={showChatbot}
        />
      )}
    </div>
  );
}
