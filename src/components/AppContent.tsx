import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import JournalPage from "@/pages/Journal";
import Auth from "@/pages/Auth";
import AuthGuard from "@/components/AuthGuard";

export default function AppContent() {
  const { i18n } = useTranslation();

  // Update i18n language when needed
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
        <Route path="/journal" element={<AuthGuard><JournalPage /></AuthGuard>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}