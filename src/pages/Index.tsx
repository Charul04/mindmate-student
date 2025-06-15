import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DashboardTabs from "@/components/DashboardTabs";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";
import React from "react";
import "@/i18n";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header />
      <HeroSection />
      <DashboardTabs />
      <FeaturesSection />
      <TestimonialSection />
      <FooterSection />
    </div>
  );
}
