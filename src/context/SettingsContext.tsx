import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fr, arTN, enUS } from "date-fns/locale";

// --- 1. Translations Dictionary ---
export const translations = {
  en: {
    nav: { home: "Home", about: "About", projects: "Projects", contact: "Contact", settings: "Settings" },
    home: { 
      status: "Status", 
      available: "Available Now", 
      location: "Location", 
      role: "Software & DevOps Engineer",
      expertise: "Expertise",
      cloud: "Cloud",
      techStack: "Tech Stack",
      finalProject: "Final Year Project",
      education: "Education",
      viewGithub: "Click to view on GitHub →"
    },
    settings: {
      title: "Settings",
      language: "Language",
      theme: "Appearance",
      dark: "Dark Mode",
      light: "Light Mode",
      system: "System"
    }
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", projects: "Projets", contact: "Contact", settings: "Paramètres" },
    home: { 
      status: "Statut", 
      available: "Disponible", 
      location: "Localisation", 
      role: "Ingénieur Logiciel & DevOps",
      expertise: "Expertise",
      cloud: "Cloud",
      techStack: "Stack Technique",
      finalProject: "Projet de Fin d'Études",
      education: "Éducation",
      viewGithub: "Voir sur GitHub →"
    },
    settings: {
      title: "Paramètres",
      language: "Langue",
      theme: "Apparence",
      dark: "Mode Sombre",
      light: "Mode Clair",
      system: "Système"
    }
  },
  ar: {
    nav: { home: "الرئيسية", about: "حول", projects: "مشاريع", contact: "تواصل", settings: "الإعدادات" },
    home: { 
      status: "الحالة", 
      available: "متاح للعمل", 
      location: "الموقع", 
      role: "مهندس برمجيات و DevOps",
      expertise: "الخبرة",
      cloud: "السحابة",
      techStack: "التقنيات",
      finalProject: "مشروع التخرج",
      education: "التعليم",
      viewGithub: "اضغط للعرض على GitHub ←"
    },
    settings: {
      title: "الإعدادات",
      language: "اللغة",
      theme: "المظهر",
      dark: "داكن",
      light: "فاتح",
      system: "النظام"
    }
  }
};

type Language = "en" | "fr" | "ar";
type Theme = "light" | "dark";

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: typeof translations["en"];
  dateLocale: any;
  isRTL: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or default
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem("language") as Language) || "en"
  );
  
  const [theme, setTheme] = useState<Theme>(() => 
    (localStorage.getItem("theme") as Theme) || "dark"
  );

  // Apply Theme Side Effects
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply Language Side Effects (RTL & Persistence)
  useEffect(() => {
    const root = window.document.documentElement;
    const isArabic = language === "ar";
    root.dir = isArabic ? "rtl" : "ltr";
    root.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isRTL = language === "ar";
  
  // Date Locale Helper
  const dateLocale = language === "fr" ? fr : language === "ar" ? arTN : enUS;

  return (
    <SettingsContext.Provider value={{ 
      language, 
      setLanguage, 
      theme, 
      toggleTheme, 
      t: translations[language],
      dateLocale,
      isRTL
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};