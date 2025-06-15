
import HeroIllustration from "@/components/HeroIllustration";
import { useThemeLanguage } from "@/App";
import { useTranslation } from "react-i18next";
import React from "react";
import "@/i18n";

export default function HeroSection() {
  const { t } = useTranslation();
  const { theme } = useThemeLanguage();

  return (
    <section className="flex flex-col-reverse md:flex-row md:items-center gap-10 px-8 pt-10 pb-6 max-w-6xl mx-auto w-full flex-grow">
      <div className="flex-1 flex flex-col items-start justify-center animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-indigo-900 mb-4">
          {t('appName')}
          <span className="text-sky-500">+</span>
        </h1>
        <p className="text-2xl text-indigo-700 font-medium mb-3 max-w-lg tracking-normal">
          {t('studySmarter')}
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center relative">
        <HeroIllustration />
        {/* Cute waving book image like reference */}
        <img
          src="/lovable-uploads/d6acfb05-e27a-4131-b26c-7cde27fbf7d2.png"
          alt="Cute friendly waving book illustration"
          width={170}
          height={220}
          className={`
            absolute bottom-0 right-2 md:right-7 z-10 drop-shadow-xl rounded-xl
            ${theme === 'dark'
              ? 'filter sepia contrast-125 brightness-90'
              : 'filter sepia-0 contrast-100'}
            transition-all duration-300
          `}
          style={{
            background: theme === 'dark' ? 'rgba(35,36,52,0.90)' : 'rgba(255,255,245,0.92)',
            padding: '10px',
            maxWidth: '170px',
            maxHeight: '220px',
            boxShadow: '0 4px 32px 0 rgba(90, 70, 31, 0.10)',
          }}
        />
      </div>
    </section>
  );
}

