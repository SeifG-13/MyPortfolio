import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function SectionModal({ isOpen, onClose, title, children }: SectionModalProps) {
  const { theme } = useSettings();
  const isDark = theme === "dark";

  // Theme-aware styles for the liquid glass effect
  const modalStyles = isDark 
    ? {
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.92) 100%)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderTop: "1px solid rgba(148, 163, 184, 0.15)",
        borderLeft: "1px solid rgba(148, 163, 184, 0.08)",
        borderRight: "1px solid rgba(148, 163, 184, 0.08)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(148, 163, 184, 0.1), 0 0 80px rgba(59, 130, 246, 0.08)"
      }
    : {
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(248, 250, 252, 0.92) 100%)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.95)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.6)",
        borderRight: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.4)"
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - adapts to theme */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={onClose}
            className={`fixed inset-0 backdrop-blur-[10px] z-40 ${
              isDark ? "bg-black/70" : "bg-black/30"
            }`}
          />
          
          {/* Liquid Glass Modal */}
          <motion.div
            initial={{ y: "100%", scale: 0.95, opacity: 0 }}
            animate={{ 
              y: 0, 
              scale: 1, 
              opacity: 1,
              transition: { 
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 1.2
              }
            }}
            exit={{ 
              y: "100%", 
              scale: 0.95, 
              opacity: 0,
              transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } 
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 top-10 md:top-20 md:bottom-20 z-50 mx-auto max-w-3xl overflow-hidden rounded-t-[40px] md:rounded-[48px] shadow-2xl flex flex-col"
            style={modalStyles}
          >
            {/* Glossy sheen reflection at the top - adapts to theme */}
            <div className={`absolute inset-x-0 top-0 h-40 pointer-events-none ${
              isDark 
                ? "bg-gradient-to-b from-blue-500/5 via-slate-600/10 to-transparent" 
                : "bg-gradient-to-b from-white/60 to-transparent"
            }`} />

            {/* Subtle gradient overlay for dark mode */}
            {isDark && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />
            )}

            {/* Drag Handle */}
            <div 
              className="relative z-20 flex w-full justify-center pt-5 pb-2 touch-none cursor-grab active:cursor-grabbing" 
              onClick={onClose}
            >
              <div className={`h-1.5 w-16 rounded-full backdrop-blur-md transition-colors ${
                isDark ? "bg-slate-500/50 hover:bg-slate-400/50" : "bg-black/20 hover:bg-black/30"
              }`} />
            </div>

            {/* Header */}
            <div className="relative z-20 flex items-center justify-between px-8 py-4">
              <h2 className={`text-2xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}>{title}</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose} 
                className={`rounded-full h-10 w-10 backdrop-blur-md transition-all duration-300 shadow-sm ${
                  isDark 
                    ? "bg-slate-700/60 hover:bg-slate-600/70 text-slate-200 border border-slate-600/40 hover:border-slate-500/50" 
                    : "bg-white/50 hover:bg-white/70 text-gray-700 border border-white/60 hover:border-white/80"
                }`}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content Area - adapts to theme */}
            <div className={`relative z-20 flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 no-scrollbar ${
              isDark ? "bg-slate-900/20" : "bg-white/15"
            }`}>
              {children}
            </div>

            {/* Bottom fade gradient for better scroll experience */}
            <div className={`absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-30 ${
              isDark 
                ? "bg-gradient-to-t from-slate-900/50 to-transparent" 
                : "bg-gradient-to-t from-white/30 to-transparent"
            }`} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}