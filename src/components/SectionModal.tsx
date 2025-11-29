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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          {/* Modal Window */}
          <motion.div
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1,
              transition: { 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                mass: 0.8 
              } 
            }}
            exit={{ 
              y: "100%", 
              opacity: 0, 
              scale: 0.95,
              transition: { duration: 0.2 } 
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150) {
                onClose();
              }
            }}
            className="fixed bottom-0 left-0 right-0 top-12 z-50 mx-auto max-w-2xl overflow-hidden rounded-t-[32px] bg-white shadow-2xl flex flex-col md:top-20 md:bottom-24 md:rounded-[32px] md:h-[80vh] md:w-[90vw]"
          >
            {/* Drag Handle */}
            <div className="flex w-full justify-center pt-3 pb-1 touch-none cursor-grab active:cursor-grabbing" onClick={onClose}>
              <div className="h-1.5 w-12 rounded-full bg-gray-300/80" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose} 
                className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 no-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
