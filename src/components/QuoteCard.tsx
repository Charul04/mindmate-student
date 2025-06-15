
import { Quote, Sparkles } from "lucide-react";

export default function QuoteCard() {
  return (
    <blockquote className="relative bg-gradient-to-br from-indigo-50 via-sky-50 to-white border-l-4 border-indigo-400 rounded-xl p-6 shadow animate-fade-in">
      <Quote size={36} className="absolute -left-5 top-7 text-indigo-100 -rotate-12"/>
      <p className="italic text-lg text-indigo-800 mb-3">
        “MindMate+ keeps me focused, organized, and less stressed. The AI feels like a real study buddy!”
      </p>
      <footer className="flex items-center gap-2 text-sm text-indigo-700 font-medium">
        <span className="flex items-center">
          <Sparkles size={16} className="text-sky-500 mr-1" /> Alex T.
        </span>
        <span className="ml-2 text-indigo-400 font-normal">Undergrad Student</span>
      </footer>
    </blockquote>
  );
}
