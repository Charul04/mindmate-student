
import BookStandingIllustration from "@/components/BookStandingIllustration";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      className="
        flex flex-col-reverse md:flex-row md:items-center 
        gap-6 md:gap-10
        px-2 sm:px-4 md:px-8
        pt-7 sm:pt-10 pb-2 sm:pb-5
        max-w-2xl sm:max-w-5xl mx-auto w-full
        flex-grow
        rounded-b-2xl md:rounded-b-3xl bg-gradient-to-b from-sky-50/80 to-blue-50/30
        shadow-md
        relative
        animate-fade-in
      "
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.15rem)",
      }}
    >
      <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-indigo-900 mb-2 drop-shadow-sm">
          {t("appName")}
          <span className="text-sky-500">+</span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-indigo-700 font-medium mb-1 max-w-lg tracking-normal">
          {t("studySmarter")}
        </p>
      </div>
      <div className="flex-1 flex justify-center items-end min-h-[170px] sm:min-h-[210px]">
        <BookStandingIllustration />
      </div>
    </section>
  );
}
