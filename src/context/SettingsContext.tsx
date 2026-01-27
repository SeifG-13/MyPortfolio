import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { fr, arTN, enUS, type Locale } from "date-fns/locale";

// --- 1. Type Definitions ---
interface NavTranslations {
  home: string;
  about: string;
  projects: string;
  contact: string;
  settings: string;
}

interface HomeTranslations {
  status: string;
  available: string;
  location: string;
  role: string;
  expertise: string;
  cloud: string;
  techStack: string;
  finalProject: string;
  education: string;
  viewGithub: string;
  country: string;
  degree: string;
  specialization: string;
}

interface SettingsTranslations {
  title: string;
  language: string;
  theme: string;
  dark: string;
  light: string;
  system: string;
}

interface TranslationSet {
  nav: NavTranslations;
  home: HomeTranslations;
  settings: SettingsTranslations;
  pageTitle: string;
}

type Language = "en" | "fr" | "ar";
type Theme = "light" | "dark";

// --- 2. Translations Dictionary ---
export const translations: Record<Language, TranslationSet> = {
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
      viewGithub: "Click to view on GitHub →",
      country: "Tunisia 🇹🇳",
      degree: "Engineering Degree - ENSI",
      specialization: "Embedded Systems & IoT • 2022-2025"
    },
    settings: {
      title: "Settings",
      language: "Language",
      theme: "Appearance",
      dark: "Dark Mode",
      light: "Light Mode",
      system: "System"
    },
    pageTitle: "Seif Ben Ali | Software & DevOps Engineer"
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
      viewGithub: "Voir sur GitHub →",
      country: "Tunisie 🇹🇳",
      degree: "Diplôme d'Ingénieur - ENSI",
      specialization: "Systèmes Embarqués & IoT • 2022-2025"
    },
    settings: {
      title: "Paramètres",
      language: "Langue",
      theme: "Apparence",
      dark: "Mode Sombre",
      light: "Mode Clair",
      system: "Système"
    },
    pageTitle: "Seif Ben Ali | Ingénieur Logiciel & DevOps"
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
      viewGithub: "اضغط للعرض على GitHub ←",
      country: "تونس 🇹🇳",
      degree: "شهادة مهندس - المدرسة الوطنيّة لعلوم الإعلامية",
      specialization: "الأنظمة المدمجة و إنترنت الأشياء • 2022-2025"
    },
    settings: {
      title: "الإعدادات",
      language: "اللغة",
      theme: "المظهر",
      dark: "داكن",
      light: "فاتح",
      system: "النظام"
    },
    pageTitle: "سيف بن علي | مهندس برمجيات و DevOps"
  }
};

// --- 3. Context Type ---
interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  t: TranslationSet;
  dateLocale: Locale;
  isRTL: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Helper to get initial values from localStorage (only runs once)
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem("language") as Language) || "en";
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem("theme") as Theme) || "dark";
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Memoized setters to prevent unnecessary re-renders
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Apply Theme Side Effects - optimized with requestAnimationFrame
  useEffect(() => {
    requestAnimationFrame(() => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", theme === "dark" ? "#0f172a" : "#007AFF");
      }
    });
  }, [theme]);

  // Apply Language Side Effects - optimized
  useEffect(() => {
    requestAnimationFrame(() => {
      const root = window.document.documentElement;
      const isArabic = language === "ar";
      root.dir = isArabic ? "rtl" : "ltr";
      root.lang = language;
      localStorage.setItem("language", language);
      
      // Update browser tab title
      document.title = translations[language].pageTitle;
      
      // Batch DOM updates for meta tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      
      if (ogTitle) ogTitle.setAttribute("content", translations[language].pageTitle);
      if (twitterTitle) twitterTitle.setAttribute("content", translations[language].pageTitle);
    });
  }, [language]);

  // Memoize derived values
  const isRTL = useMemo(() => language === "ar", [language]);
  
  const dateLocale = useMemo((): Locale => {
    switch (language) {
      case "fr": return fr;
      case "ar": return arTN;
      default: return enUS;
    }
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  // Memoize the entire context value to prevent unnecessary re-renders
  const contextValue = useMemo<SettingsContextType>(() => ({
    language,
    setLanguage,
    theme,
    toggleTheme,
    setTheme,
    t,
    dateLocale,
    isRTL
  }), [language, setLanguage, theme, toggleTheme, setTheme, t, dateLocale, isRTL]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};