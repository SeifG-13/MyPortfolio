import { motion } from "framer-motion";
import { Moon, Sun, Monitor, Languages, Check } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";

export function Settings() {
  const { language, setLanguage, theme, toggleTheme, t, isRTL } = useSettings();

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇹🇳" },
  ];

  return (
    <div className="space-y-8 pb-20">
      
      {/* Theme Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Monitor className="h-5 w-5 text-primary" />
          {t.settings.theme}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={toggleTheme}
            className={cn(
              "relative overflow-hidden rounded-2xl border p-4 transition-all duration-300",
              theme === "light" 
                ? "bg-blue-50 border-blue-200 shadow-md scale-[1.02]" 
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-50"
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <Sun className={cn("h-8 w-8", theme === "light" ? "text-orange-500" : "text-gray-400")} />
              <span className={cn("text-sm font-medium", theme === "light" ? "text-blue-700" : "text-gray-600 dark:text-gray-300")}>
                {t.settings.light}
              </span>
            </div>
          </button>

          <button
            onClick={toggleTheme}
            className={cn(
              "relative overflow-hidden rounded-2xl border p-4 transition-all duration-300",
              theme === "dark" 
                ? "bg-slate-900 border-slate-700 shadow-md scale-[1.02]" 
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-50"
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <Moon className={cn("h-8 w-8", theme === "dark" ? "text-purple-400" : "text-gray-400")} />
              <span className={cn("text-sm font-medium", theme === "dark" ? "text-white" : "text-gray-600 dark:text-gray-300")}>
                {t.settings.dark}
              </span>
            </div>
            {theme === "dark" && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
            )}
          </button>
        </div>
      </div>

      {/* Language Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          {t.settings.language}
        </h3>

        <div className="space-y-3">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLanguage(lang.code as any)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border p-4 transition-all",
                language === lang.code
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm"
                  : "border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{lang.flag}</span>
                <span className={cn(
                  "font-medium",
                  language === lang.code ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"
                )}>
                  {lang.label}
                </span>
              </div>
              {language === lang.code && (
                <div className="rounded-full bg-blue-500 p-1 text-white">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
      
    </div>
  );
}