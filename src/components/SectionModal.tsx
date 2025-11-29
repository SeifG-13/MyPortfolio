import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function SectionModal({ isOpen, onClose, title, children }: SectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Darker, smoother backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[8px] z-40"
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
            // LIQUID GLASS STYLES
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.8)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
              borderRight: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.2)"
            }}
          >
            {/* Glossy sheen reflection at the top */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

            {/* Drag Handle */}
            <div 
              className="relative z-20 flex w-full justify-center pt-5 pb-2 touch-none cursor-grab active:cursor-grabbing" 
              onClick={onClose}
            >
              <div className="h-1.5 w-16 rounded-full bg-black/20 backdrop-blur-md" />
            </div>

            {/* Header */}
            <div className="relative z-20 flex items-center justify-between px-8 py-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900/90 mix-blend-color-burn">{title}</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose} 
                className="rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 text-gray-700 backdrop-blur-md border border-white/40 transition-all duration-300 shadow-sm"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content Area */}
            <div className="relative z-20 flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 no-scrollbar bg-white/20">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}