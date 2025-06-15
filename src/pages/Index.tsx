
import AppLogo from "@/components/AppLogo";
import HeroIllustration from "@/components/HeroIllustration";
import FeatureCard from "@/components/FeatureCard";
import QuoteCard from "@/components/QuoteCard";
import { Book, Brain, Star, HeartPulse } from "lucide-react";

const features = [
  {
    icon: Book,
    title: "AI Study Assistant",
    description: "Get personalized support, notes, and answers—instantly, 24/7.",
  },
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

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-indigo-100 bg-white/90 shadow-sm">
        <div>
          <AppLogo />
        </div>
        <nav className="flex gap-7 items-center">
          <a href="#features" className="text-indigo-700 font-medium hover:text-indigo-900 transition story-link">Features</a>
          <a href="#testimonial" className="text-indigo-700 font-medium hover:text-indigo-900 transition story-link">Testimonials</a>
          <a href="#" className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow hover-scale transition">Get Started</a>
        </nav>
      </header>
      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row md:items-center gap-10 px-8 pt-10 pb-6 max-w-6xl mx-auto w-full flex-grow">
        <div className="flex-1 flex flex-col items-start justify-center animate-fade-in">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-indigo-900 mb-4">
            MindMate<span className="text-sky-500">+</span>
          </h1>
          <p className="text-2xl text-indigo-700 font-medium mb-7 max-w-lg tracking-normal">
            Study smarter. Feel better. The AI companion made for students.
          </p>
          <a href="#" className="inline-block px-8 py-3 bg-indigo-600 hover:bg-sky-600 text-white text-lg rounded-xl font-bold shadow hover-scale transition">
            Try MindMate+ Free
          </a>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <HeroIllustration />
        </div>
      </section>
      {/* FEATURES */}
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
      {/* TESTIMONIAL */}
      <section id="testimonial" className="py-12 px-6 flex justify-center bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-xl w-full">
          <QuoteCard />
        </div>
      </section>
      {/* FOOTER */}
      <footer className="mt-auto px-8 py-8 bg-white/90 border-t border-indigo-100 flex flex-col md:flex-row justify-between items-center text-indigo-700 text-sm">
        <div className="mb-3 md:mb-0">
          <AppLogo size={26} />
        </div>
        <div className="flex gap-5">
          <a href="#" className="hover:underline">Support</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        <span className="mt-2 md:mt-0 text-indigo-300">&copy; {new Date().getFullYear()} MindMate+</span>
      </footer>
    </div>
  );
}
