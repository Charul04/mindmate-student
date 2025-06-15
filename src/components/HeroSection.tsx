
import BookStandingIllustration from "@/components/BookStandingIllustration";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      className="
        flex flex-col-reverse md:flex-row md:items-center 
        gap-8 md:gap-16 
        px-4 sm:px-6 md:px-12
        pt-8 pb-3 sm:pt-14 sm:pb-5
        max-w-3xl sm:max-w-6xl mx-auto w-full
        flex-grow
        rounded-b-3xl shadow-lg bg-gradient-to-b from-sky-50/80 via-white to-white 
        relative z-10
      "
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.5rem)",
      }}
    >
      <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-indigo-900 mb-4">
          {t("appName")}
          <span className="text-sky-500">+</span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-indigo-700 font-medium mb-4 max-w-md tracking-normal drop-shadow-sm">
          {t("studySmarter")}
        </p>
      </div>
      <div className="flex-1 flex justify-center items-end min-h-[170px] sm:min-h-[220px]">
        <div className="bg-sky-100/70 shadow-lg rounded-2xl p-3 sm:p-6">
          <BookStandingIllustration />
        </div>
      </div>
    </section>
  );
}
