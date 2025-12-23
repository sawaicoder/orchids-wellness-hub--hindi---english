"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
    en: {
      // Nav
      home: "Home",
      yoga: "Yoga",
      diseases: "Diseases",
      diet: "Diet",
      checkup: "Health Checkup",
      calculators: "Health Tools",
      admin: "Admin",
      // Home
      welcome: "Your Journey to Holistic Wellness",
      intro: "Empowering you to live a healthier, balanced life through Yoga, Nutrition, and Awareness.",
      benefits_yoga_title: "Benefits of Yoga",
      benefits_yoga_desc: "Yoga improves strength, balance, and flexibility. It helps with back pain relief, heart health, and stress management.",
      daily_tips: "Daily Health Tips",
      tip1: "Drink at least 8 glasses of water daily.",
      tip2: "Practice 15 minutes of meditation for mental clarity.",
      tip3: "Include green leafy vegetables in your lunch.",
      // Yoga
      morning_yoga: "Morning Yoga",
      weight_loss: "Weight Loss",
      diabetes_yoga: "Yoga for Diabetes",
      back_pain_yoga: "Yoga for Back Pain",
      stress_yoga: "Stress & Anxiety",
      benefits: "Benefits",
      // Diseases
      search_diseases: "Search diseases...",
      causes: "Causes",
      symptoms: "Symptoms",
      remedies: "Home Remedies",
      dos: "Do's",
      donts: "Don'ts",
      consult_doctor: "When to consult a doctor",
      // Diet
      healthy_foods: "What to eat (Healthy)",
      avoid_foods: "What to avoid",
      morning_diet: "Morning",
      afternoon_diet: "Afternoon",
      evening_diet: "Evening",
      night_diet: "Night",
      veg: "Vegetarian",
      non_veg: "Non-Vegetarian",
      // Form
      full_name: "Full Name",
      age: "Age",
      gender: "Gender",
      height: "Height (cm)",
      weight: "Weight (kg)",
      contact: "Contact Number",
      email: "Email",
      existing_disease: "Existing Disease",
      lifestyle: "Lifestyle",
      submit: "Submit",
      active: "Active",
      sedentary: "Sedentary",
      // Suggestions
      suggestions_title: "Your Personalized Health Suggestions",
      disclaimer: "Disclaimer: This is not a medical diagnosis. Please consult a professional.",
      // Calculators
      calc_title: "Health & Fitness Calculators",
      bmi_desc: "Check if you are in the healthy weight range.",
      bmr_title: "BMR Calculator",
      bmr_desc: "Calculate your Basal Metabolic Rate (calories burned at rest).",
      water_title: "Water Intake Goal",
      water_desc: "Calculate how much water you should drink daily.",
      calculate: "Calculate",
      result: "Your Result",
    },
    hi: {
      // Nav
      home: "होम",
      yoga: "योग",
      diseases: "बीमारियां",
      diet: "आहार",
      checkup: "स्वास्थ्य जांच",
      calculators: "स्वास्थ्य उपकरण",
      admin: "एडमिन",
      // Home
      welcome: "समग्र कल्याण के लिए आपकी यात्रा",
      intro: "योग, पोषण और जागरूकता के माध्यम से आपको एक स्वस्थ, संतुलित जीवन जीने के लिए सशक्त बनाना।",
      benefits_yoga_title: "योग के लाभ",
      benefits_yoga_desc: "योग शक्ति, संतुलन और लचीलेपन में सुधार करता है। यह पीठ दर्द से राहत, हृदय स्वास्थ्य और तनाव प्रबंधन में मदद करता है।",
      daily_tips: "दैनिक स्वास्थ्य सुझाव",
      tip1: "प्रतिदिन कम से कम 8 गिलास पानी पिएं।",
      tip2: "मानसिक स्पष्टता के लिए 15 मिनट ध्यान का अभ्यास करें।",
      tip3: "अपने दोपहर के भोजन में हरी पत्तेदार सब्जियां शामिल करें।",
      // Yoga
      morning_yoga: "सुबह का योग",
      weight_loss: "वजन घटाने के लिए",
      diabetes_yoga: "मधुमेह के लिए योग",
      back_pain_yoga: "पीठ दर्द के लिए योग",
      stress_yoga: "तनाव और चिंता",
      benefits: "लाभ",
      // Diseases
      search_diseases: "बीमारियों की खोज करें...",
      causes: "कारण",
      symptoms: "लक्षण",
      remedies: "घरेलू उपचार",
      dos: "क्या करें",
      donts: "क्या न करें",
      consult_doctor: "डॉक्टर से कब सलाह लें",
      // Diet
      healthy_foods: "क्या खाएं (स्वस्थ)",
      avoid_foods: "क्या न खाएं",
      morning_diet: "सुबह",
      afternoon_diet: "दोपहर",
      evening_diet: "शाम",
      night_diet: "रात",
      veg: "शाकाहारी",
      non_veg: "मांसाहारी",
      // Form
      full_name: "पूरा नाम",
      age: "आयु",
      gender: "लिंग",
      height: "ऊंचाई (सेमी)",
      weight: "वजन (किलो)",
      contact: "संपर्क नंबर",
      email: "ईमेल",
      existing_disease: "मौजूदा बीमारी",
      lifestyle: "जीवनशैली",
      submit: "जमा करें",
      active: "सक्रिय",
      sedentary: "सुस्त",
      // Suggestions
      suggestions_title: "आपके व्यक्तिगत स्वास्थ्य सुझाव",
      disclaimer: "अस्वीकरण: यह चिकित्सा निदान नहीं है। कृपया किसी पेशेवर से सलाह लें।",
      // Calculators
      calc_title: "स्वास्थ्य और फिटनेस कैलकुलेटर",
      bmi_desc: "जांचें कि क्या आप स्वस्थ वजन सीमा में हैं।",
      bmr_title: "बीएमआर कैलकुलेटर",
      bmr_desc: "अपनी बेसल मेटाबोलिक दर (आराम करते समय जलाई गई कैलोरी) की गणना करें।",
      water_title: "पानी पीने का लक्ष्य",
      water_desc: "गणना करें कि आपको प्रतिदिन कितना पानी पीना चाहिए।",
      calculate: "गणना करें",
      result: "आपका परिणाम",
    },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
