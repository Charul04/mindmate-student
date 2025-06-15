
import FeatureCard from "@/components/FeatureCard";
import { Book, Brain, Star, HeartPulse } from "lucide-react";

const features = [
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

export default function FeaturesSection() {
  return (
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
  );
}
