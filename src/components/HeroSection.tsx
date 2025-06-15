
import BookStandingIllustration from "@/components/BookStandingIllustration";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      className="
        flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-10
        px-2 xs:px-4 sm:px-6 md:px-8 pt-6 md:pt-10 pb-2 md:pb-6
        max-w-full w-full mx-auto flex-grow
        overflow-x-hidden
      "
    >
      <div className="md:flex-1 flex flex-col items-start justify-center animate-fade-in min-w-0 w-full max-w-full">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-indigo-900 mb-3 sm:mb-4">
          {t("appName")}
          <span className="text-sky-500">+</span>
        </h1>
        <p className="text-base xs:text-lg sm:text-2xl text-indigo-700 font-medium mb-2 sm:mb-3 max-w-lg tracking-normal">
          {t("studySmarter")}
        </p>
      </div>
      <div className="md:flex-1 flex justify-center items-end min-w-0 w-full max-w-full">
        {/* Responsive max width for image container */}
        <div className="w-full max-w-[170px] xs:max-w-xs sm:max-w-md md:max-w-none">
          <BookStandingIllustration />
        </div>
      </div>
    </section>
  );
}
