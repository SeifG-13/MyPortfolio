import { Home, User, Briefcase, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function NavBar({ activeTab, setActiveTab }: NavBarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-md">
      <nav className="glass rounded-[28px] px-2 py-2 shadow-xl bg-white/90 backdrop-blur-2xl border border-white/40 supports-[backdrop-filter]:bg-white/60">
        <ul className="flex items-center justify-between px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            
            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-1 rounded-2xl py-3 transition-all duration-300",
                    isActive 
                      ? "text-primary" 
                      : "text-gray-400 hover:text-gray-600 hover:bg-black/5"
                  )}
                >
                  <div className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                    isActive && "bg-blue-50 shadow-sm"
                  )}>
                    <Icon 
                      className={cn(
                        "h-6 w-6 transition-all duration-300",
                        isActive ? "stroke-[2.5px]" : "stroke-[2px]"
                      )} 
                    />
                    {isActive && (
                      <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium tracking-wide transition-all duration-300",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 hidden"
                  )}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
