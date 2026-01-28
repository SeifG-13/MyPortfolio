import { Home, User, Briefcase, Mail, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext"; // Import hook

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function NavBar({ activeTab, setActiveTab }: NavBarProps) {
  const { t } = useSettings(); // Use translations

  const navItems = [
    { id: "home", label: t.nav.home, icon: Home },
    { id: "about", label: t.nav.about, icon: User },
    { id: "projects", label: t.nav.projects, icon: Briefcase },
    { id: "contact", label: t.nav.contact, icon: Mail },
    { id: "settings", label: t.nav.settings, icon: Settings }, // Added Settings
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        className="pointer-events-auto relative flex items-center gap-1 sm:gap-2 rounded-[32px] px-2 py-2 shadow-2xl overflow-hidden"
        style={{
            background: "rgba(255, 255, 255, 0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
            borderTop: "1px solid rgba(255, 255, 255, 0.4)",
            transform: "translateZ(0)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        <ul className="relative z-10 flex items-center justify-between gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className="relative flex flex-col items-center justify-center h-14 w-14 sm:w-16 cursor-pointer outline-none select-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="liquid-bubble"
                      className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white to-white/90 shadow-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-0.5">
                    <motion.div
                        animate={{ y: isActive ? -2 : 0, scale: isActive ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                        <Icon 
                        className={cn("h-5 w-5 transition-colors duration-200", isActive ? "text-black fill-black/10" : "text-white/80")}
                        strokeWidth={isActive ? 2.5 : 2}
                        />
                    </motion.div>
                    <motion.span
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5, y: isActive ? 0 : 8 }}
                        transition={{ duration: 0.15 }}
                        className="text-[9px] font-bold text-black"
                    >
                        {item.label}
                    </motion.span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}