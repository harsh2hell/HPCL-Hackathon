"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, enDefault: string, hiText?: string) => string;
}

const DICTIONARY: Record<string, { en: string; hi: string }> = {
  appName: { en: "HP Mitra", hi: "एचपी मित्र" },
  tagline: {
    en: "Unified AI Copilot for HPCL Dealers, Staff, Customers & Regional Leadership",
    hi: "एचपीसीएल डीलरों, कर्मचारियों, ग्राहकों और क्षेत्रीय नेतृत्व के लिए एकीकृत एआई सहायक",
  },
  copilotNav: { en: "Ask HPCL Copilot", hi: "एचपीसीएल कोपायलट से पूछें" },
  complaintsNav: { en: "Smart Complaints", hi: "स्मार्ट शिकायत निवारण" },
  analyticsNav: { en: "Live Analytics", hi: "लाइव आउटलेट एनालिटिक्स" },
  kbNav: { en: "Knowledge Base", hi: "ज्ञान भंडार (Knowledge Base)" },
  adminNav: { en: "HQ Admin", hi: "मुख्यालय व्यवस्थापक" },
  demoBanner: {
    en: "Demo data for judging — not real HPCL data",
    hi: "निर्णायक मंडल के लिए डेमो डेटा — वास्तविक एचपीसीएल डेटा नहीं",
  },
  critical: { en: "CRITICAL", hi: "गंभीर (CRITICAL)" },
  high: { en: "HIGH", hi: "उच्च (HIGH)" },
  medium: { en: "MEDIUM", hi: "मध्यम (MEDIUM)" },
  low: { en: "LOW", hi: "सामान्य (LOW)" },
  open: { en: "OPEN", hi: "लंबित (OPEN)" },
  inProgress: { en: "IN PROGRESS", hi: "प्रक्रियाधीन (IN PROGRESS)" },
  resolved: { en: "RESOLVED", hi: "निस्तारित (RESOLVED)" },
  askPlaceholder: {
    en: "Ask in Hindi or English (e.g., LPG leak SOP, dealer margin, EV guidelines)...",
    hi: "हिंदी या अंग्रेजी में पूछें (जैसे एलपीजी रिसाव एसओपी, डीलर मार्जिन, ईवी दिशानिर्देश)...",
  },
  voiceComingSoon: {
    en: "Voice (coming soon) — Hindi / English",
    hi: "ध्वनि इनपुट (शीघ्र उपलब्ध) — हिंदी / अंग्रेजी",
  },
  liveTelemetry: {
    en: "Live database telemetry active. No synthetic metrics generated.",
    hi: "लाइव डेटाबेस टेलीमेट्री सक्रिय। कोई कृत्रिम मेट्रिक्स नहीं।",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (_key, enDefault) => enDefault,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("hp_lang") as Language;
    if (saved === "hi" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("hp_lang", lang);
  };

  const t = (key: string, enDefault: string, hiText?: string): string => {
    if (language === "hi") {
      if (hiText) return hiText;
      if (DICTIONARY[key]?.hi) return DICTIONARY[key].hi;
    }
    return enDefault || DICTIONARY[key]?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
