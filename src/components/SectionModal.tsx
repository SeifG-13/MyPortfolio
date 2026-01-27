import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ReactNode, memo, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

// FIX: Properly typed animation variants
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      damping: 35,
      stiffness: 400,
      mass: 0.8
    }
  },
  exit: { 
    y: "100%", 
    opacity: 0,
    transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } 
  }
};

export const SectionModal = memo(function SectionModal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: SectionModalProps) {
  const { theme } = useSettings();
  const isDark = theme === "dark";

  // Memoized drag handler
  const handleDragEnd = useCallback((_: unknown, info: { offset: { y: number } }) => {
    if (info.offset.y > 150) onClose();
  }, [onClose]);

  // PERFORMANCE: Reduced backdrop-blur from 40px to 16px
  const modalStyles = isDark 
    ? {
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.97) 0%, rgba(30, 41, 59, 0.95) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(148, 163, 184, 0.15)",
        borderLeft: "1px solid rgba(148, 163, 184, 0.08)",
        borderRight: "1px solid rgba(148, 163, 184, 0.08)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)"
      }
    : {
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.97) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.95)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.6)",
        borderRight: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12)"
      };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop - reduced blur */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className={`fixed inset-0 backdrop-blur-[8px] z-40 ${
              isDark ? "bg-black/70" : "bg-black/30"
            }`}
            style={{ willChange: "opacity" }}
          />
          
          {/* Modal */}
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 top-10 md:top-20 md:bottom-20 z-50 mx-auto max-w-3xl overflow-hidden rounded-t-[40px] md:rounded-[48px] shadow-2xl flex flex-col"
            style={{ 
              ...modalStyles,
              willChange: "transform, opacity" 
            }}
          >
            {/* Simplified sheen */}
            <div className={`absolute inset-x-0 top-0 h-24 pointer-events-none ${
              isDark 
                ? "bg-gradient-to-b from-white/5 to-transparent" 
                : "bg-gradient-to-b from-white/40 to-transparent"
            }`} />

            {/* Drag Handle */}
            <div 
              className="relative z-20 flex w-full justify-center pt-5 pb-2 touch-none cursor-grab active:cursor-grabbing" 
              onClick={onClose}
            >
              <div className={`h-1.5 w-16 rounded-full transition-colors ${
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
                className={`rounded-full h-10 w-10 transition-all duration-200 shadow-sm ${
                  isDark 
                    ? "bg-slate-700/60 hover:bg-slate-600/70 text-slate-200 border border-slate-600/40" 
                    : "bg-white/50 hover:bg-white/70 text-gray-700 border border-white/60"
                }`}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content Area */}
            <div className={`relative z-20 flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 no-scrollbar ${
              isDark ? "bg-slate-900/20" : "bg-white/15"
            }`}>
              {children}
            </div>

            {/* Bottom fade */}
            <div className={`absolute bottom-0 left-0 right-0 h-6 pointer-events-none z-30 ${
              isDark 
                ? "bg-gradient-to-t from-slate-900/40 to-transparent" 
                : "bg-gradient-to-t from-white/20 to-transparent"
            }`} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});