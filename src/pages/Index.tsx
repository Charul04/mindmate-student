
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardTabs from "@/components/DashboardTabs";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";
import React from "react";
import "@/i18n";

export default function Index() {
  // The outer div ensures full-screen height and correct stacking for mobile/web.
  return (
    <div
      className="min-h-screen flex flex-col w-full max-w-full bg-gradient-to-br from-indigo-50 via-sky-50 to-white dark:from-gray-900 dark:to-gray-800"
      style={{
        minHeight: "100dvh",
        // Extra padding to handle mobile-safe areas (notch, home bar)
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
    </div>
  );
}
