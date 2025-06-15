
import HeroIllustration from "@/components/HeroIllustration";

export default function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row md:items-center gap-10 px-8 pt-10 pb-6 max-w-6xl mx-auto w-full flex-grow">
      <div className="flex-1 flex flex-col items-start justify-center animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-indigo-900 mb-4">
          MindMate<span className="text-sky-500">+</span>
        </h1>
        <p className="text-2xl text-indigo-700 font-medium mb-3 max-w-lg tracking-normal">
          Study smarter. Feel better. The AI companion made for students.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <HeroIllustration />
      </div>
    </section>
  );
}
