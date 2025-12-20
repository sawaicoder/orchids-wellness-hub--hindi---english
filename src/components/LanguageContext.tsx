"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    yoga: "Yoga",
    diseases: "Diseases",
    diet: "Diet Guide",
    checkup: "Health Checkup",
    language: "Hindi",
    welcome: "Welcome to Your Wellness Journey",
    intro: "Empowering you to live a healthier, happier life through Yoga, Nutrition, and Awareness.",
    daily_tips: "Daily Health Tips",
    yoga_playlists: "Yoga Playlists",
    morning_yoga: "Morning Yoga",
    weight_loss: "Yoga for Weight Loss",
    diabetes_yoga: "Yoga for Diabetes",
    back_pain: "Yoga for Back Pain",
    stress_relief: "Yoga for Stress & Anxiety",
    disease_info: "Diseases Information",
    search_diseases: "Search diseases...",
    diet_guide: "Daily Diet Guide",
    what_to_eat: "What to Eat",
    what_to_avoid: "What to Avoid",
    veg: "Veg",
    non_veg: "Non-Veg",
    health_checkup: "Health Checkup Form",
    submit: "Submit",
    suggestions: "Personalized Suggestions",
    admin: "Admin Panel",
    disclaimer: "Disclaimer: This is not a medical diagnosis.",
  },
  hi: {
    home: "होम",
    yoga: "योग",
    diseases: "रोग",
    diet: "आहार मार्गदर्शिका",
    checkup: "स्वास्थ्य जाँच",
    language: "English",
    welcome: "आपकी स्वास्थ्य यात्रा में आपका स्वागत है",
    intro: "योग, पोषण और जागरूकता के माध्यम से आपको स्वस्थ और खुशहाल जीवन जीने के लिए सशक्त बनाना।",
    daily_tips: "दैनिक स्वास्थ्य सुझाव",
    yoga_playlists: "योग प्लेलिस्ट",
    morning_yoga: "सुबह का योग",
    weight_loss: "वजन घटाने के लिए योग",
    diabetes_yoga: "मधुमेह के लिए योग",
    back_pain: "पीठ दर्द के लिए योग",
    stress_relief: "तनाव और चिंता के लिए योग",
    disease_info: "रोगों की जानकारी",
    search_diseases: "रोग खोजें...",
    diet_guide: "दैनिक आहार मार्गदर्शिका",
    what_to_eat: "क्या खाएं",
    what_to_avoid: "क्या न खाएं",
    veg: "शाकाहारी",
    non_veg: "मांसाहारी",
    health_checkup: "स्वास्थ्य जाँच फॉर्म",
    submit: "जमा करें",
    suggestions: "व्यक्तिगत सुझाव",
    admin: "एडमिन पैनल",
    disclaimer: "अस्वीकरण: यह चिकित्सा निदान नहीं है।",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
