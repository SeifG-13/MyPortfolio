import { motion } from "framer-motion";
import { Moon, Sun, Languages, Check, Palette } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";

export function Settings() {
  const { language, setLanguage, theme, setTheme, t, isRTL } = useSettings();

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇹🇳" },
  ];

  const themes = [
    { 
      code: "light", 
      label: t.settings.light, 
      icon: Sun, 
      colors: {
        active: "bg-amber-50 border-amber-300 dark:bg-amber-900/30 dark:border-amber-600",
        icon: "text-amber-500",
        text: "text-amber-700 dark:text-amber-300"
      },
      preview: "bg-gradient-to-br from-white to-slate-100"
    },
    { 
      code: "dark", 
      label: t.settings.dark, 
      icon: Moon, 
      colors: {
        active: "bg-indigo-50 border-indigo-300 dark:bg-indigo-900/30 dark:border-indigo-500",
        icon: "text-indigo-500 dark:text-indigo-400",
        text: "text-indigo-700 dark:text-indigo-300"
      },
      preview: "bg-gradient-to-br from-slate-800 to-slate-900"
    },
  ];

  return (
    <div className="space-y-8 pb-20" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Theme Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          {t.settings.theme}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isActive = theme === themeOption.code;
            
            return (
              <motion.button
                key={themeOption.code}
                whileTap={{ scale: 0.97 }}
                onClick={() => setTheme(themeOption.code as "light" | "dark")}
                className={cn(
                  "relative overflow-hidden rounded-2xl border-2 p-5 transition-all duration-300",
                  isActive 
                    ? themeOption.colors.active + " shadow-lg scale-[1.02]"
                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
                )}
              >
                {/* Preview window */}
                <div className={cn(
                  "h-16 w-full rounded-xl mb-4 border transition-all overflow-hidden",
                  isActive ? "border-current/20" : "border-gray-200 dark:border-white/10"
                )}>
                  <div className={cn("h-full w-full", themeOption.preview)}>
                    {/* Mini UI preview */}
                    <div className="p-2 h-full flex flex-col gap-1">
                      <div className={cn(
                        "h-2 w-8 rounded-full",
                        themeOption.code === "dark" ? "bg-white/20" : "bg-gray-300"
                      )} />
                      <div className={cn(
                        "h-1.5 w-12 rounded-full",
                        themeOption.code === "dark" ? "bg-white/10" : "bg-gray-200"
                      )} />
                      <div className="flex-1" />
                      <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i}
                            className={cn(
                              "h-3 w-3 rounded",
                              themeOption.code === "dark" ? "bg-white/15" : "bg-gray-200"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      "h-6 w-6 transition-colors",
                      isActive ? themeOption.colors.icon : "text-gray-400 dark:text-gray-500"
                    )} />
                    <span className={cn(
                      "font-semibold transition-colors",
                      isActive ? themeOption.colors.text : "text-gray-600 dark:text-gray-300"
                    )}>
                      {themeOption.label}
                    </span>
                  </div>
                  
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={cn(
                        "rounded-full p-1",
                        themeOption.code === "dark" ? "bg-indigo-500" : "bg-amber-500"
                      )}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
        
        {/* Theme info text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {language === "ar" 
            ? "يتم حفظ اختيارك تلقائياً"
            : language === "fr"
            ? "Votre choix est sauvegardé automatiquement"
            : "Your preference is saved automatically"
          }
        </p>
      </div>

      {/* Language Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          {t.settings.language}
        </h3>

        <div className="space-y-3">
          {languages.map((lang) => {
            const isActive = language === lang.code;
            
            return (
              <motion.button
                key={lang.code}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLanguage(lang.code as any)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all duration-300",
                  isActive
                    ? "border-blue-400 bg-blue-50/80 dark:bg-blue-900/30 dark:border-blue-500 shadow-md"
                    : "border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-200 dark:hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="text-start">
                    <span className={cn(
                      "font-semibold block",
                      isActive ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"
                    )}>
                      {lang.label}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {lang.code === "en" ? "English" : lang.code === "fr" ? "French" : "Arabic"}
                    </span>
                  </div>
                </div>
                
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="rounded-full bg-blue-500 p-1.5 text-white shadow-lg"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Version Info */}
      <div className="pt-4 border-t border-gray-100 dark:border-white/10">
        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          Portfolio v1.0.0 • Made with ❤️ by Seif Ben Ali
        </p>
      </div>
      
    </div>
  );
}