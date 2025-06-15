
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appName: "MindMate+",
      studySmarter: "Study smarter. Feel better. The AI companion made for students.",
      // Add all needed keys here, e.g. the ones from every visible button/text
      weatherCropCare: "Weather & Crop Care",
      plantDiseaseAnalysis: "Plant Disease Analysis",
      revenueCalculator: "Revenue Calculator",
      support: "Support",
      contact: "Contact",
      // Add more keys as needed
    },
  },
  // Add more international and Indian languages with translations here.
  hi: {
    translation: {
      appName: "माइंडमेट+",
      studySmarter: "अधिक समझदारी से पढ़ें। बेहतर महसूस करें। छात्रों के लिए AI साथी।",
      weatherCropCare: "मौसम और फसल देखभाल",
      plantDiseaseAnalysis: "पौध रोग विश्लेषण",
      revenueCalculator: "राजस्व कैलकुलेटर",
      support: "सहायता",
      contact: "संपर्क करें",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
