
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardTabs from "@/components/DashboardTabs";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";
import ChatbaseChatbotDialog from "@/components/ChatbaseChatbotDialog";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import "@/i18n";

export default function Index() {
  const [showChatbot, setShowChatbot] = useState(false);
  const { user } = useAuth();

  // Load chatbot script only for authenticated users
  useEffect(() => {
    if (user && !window.chatbase) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="Sl0q4y9ILFqIdK8szW1Gv";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
      `;
      document.body.appendChild(script);
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
      <ChatbaseChatbotDialog 
        triggerClassName="hidden"
        autoOpen={showChatbot}
      />
    </div>
  );
}
