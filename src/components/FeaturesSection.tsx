
import FeatureCard from "@/components/FeatureCard";
import { Book, Brain, Star, HeartPulse, PenLine } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Focus & Motivation",
    description: "Pomodoro timers, habit streaks, and daily focus boosts designed for students.",
  },
  {
    icon: Star,
    title: "Progress Insights",
    description: "Visualize learning goals, track time spent, and celebrate wins.",
  },
  {
    icon: PenLine,
    title: "Journaling Prompt",
    description: "Reflect daily with guided journaling to boost clarity and emotional awareness.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full bg-gradient-to-br from-purple-50 via-white to-white border-t border-b border-indigo-100 py-14 px-8 transition-colors duration-300"
      // Subtle light purple gradient background
      style={{ background: "linear-gradient(135deg, #f6f3fb 0%, #f8fafc 65%, #fff 100%)" }}
    >
      <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8 animate-fade-in">
        How MindMate helps you thrive
      </h2>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map(({ icon, title, description }) => (
          <FeatureCard key={title} icon={icon} title={title} description={description}/>
        ))}
      </div>
    </section>
  );
}
