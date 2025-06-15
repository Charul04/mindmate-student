
import BookStandingIllustration from "@/components/BookStandingIllustration";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      className="
        flex flex-col-reverse md:flex-row md:items-center 
        gap-8 md:gap-10 
        px-4 sm:px-6 md:px-8 
        pt-8 sm:pt-10 pb-5 
        max-w-6xl mx-auto w-full 
        flex-grow
      "
      style={{
        // Squeeze in even better on small screens and avoid top notch
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.5rem)",
      }}
    >
      <div className="flex-1 flex flex-col items-start justify-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-indigo-900 mb-4">
          {t("appName")}
          <span className="text-sky-500">+</span>
        </h1>
        <p className="text-lg sm:text-2xl text-indigo-700 font-medium mb-3 max-w-lg tracking-normal">
          {t("studySmarter")}
        </p>
      </div>
      <div className="flex-1 flex justify-center items-end min-h-[200px] sm:min-h-[260px]">
        <BookStandingIllustration />
      </div>
    </section>
  );
}
