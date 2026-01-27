import { useState, lazy, Suspense, memo, useCallback } from "react";
import { NavBar } from "@/components/NavBar";
import { SectionModal } from "@/components/SectionModal";
import { Home } from "@/pages/Home";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";
import bgImage from "@assets/images/premium_dark_iridescent_abstract_wallpaper.webp";

// Lazy load pages with explicit chunk names for better caching
const About = lazy(() => import(/* webpackChunkName: "about" */ "@/pages/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import(/* webpackChunkName: "projects" */ "@/pages/Projects").then(m => ({ default: m.Projects })));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ "@/pages/Contact").then(m => ({ default: m.Contact })));
const Settings = lazy(() => import(/* webpackChunkName: "settings" */ "@/pages/Settings").then(m => ({ default: m.Settings })));

// Optimized page loader - smaller and faster
const PageLoader = memo(function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="h-7 w-7 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
    </div>
  );
});

// Memoized background component - prevents re-renders
const Background = memo(function Background({ isBlurred }: { isBlurred: boolean }) {
  return (
    <>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-out"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          // PERFORMANCE: Simplified filter - removed scale transform
          filter: isBlurred ? "brightness(0.4) blur(16px)" : "brightness(0.9)",
          // PERFORMANCE: GPU acceleration
          transform: "translateZ(0)",
        }}
      />
      <div 
        className={`absolute inset-0 z-0 bg-black/10 transition-opacity duration-400 ${
          isBlurred ? "opacity-50" : "opacity-0"
        }`} 
      />
    </>
  );
});

// Inner component to access Context
function AppContent() {
  const [activeTab, setActiveTab] = useState("home");
  const { t } = useSettings();

  // Memoize handlers
  const handleClose = useCallback(() => setActiveTab("home"), []);
  const handleSetActiveTab = useCallback((tab: string) => setActiveTab(tab), []);

  const isModalOpen = activeTab !== "home";

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black font-sans selection:bg-blue-500/30">
      
      {/* Background Layer - Memoized */}
      <Background isBlurred={isModalOpen} />

      {/* Main Content - PERFORMANCE: Simplified animation */}
      <main 
        className={`relative z-10 h-full w-full transition-all duration-400 ease-out ${
          isModalOpen 
            ? "scale-95 opacity-0 pointer-events-none" 
            : "scale-100 opacity-100"
        }`}
        style={{ transform: isModalOpen ? "scale(0.95) translateY(8px)" : "scale(1) translateY(0)" }}
      >
        <Home />
      </main>

      {/* Modals - Only render Suspense when needed */}
      <SectionModal isOpen={activeTab === "about"} onClose={handleClose} title={t.nav.about}>
        <Suspense fallback={<PageLoader />}>
          <About />
        </Suspense>
      </SectionModal>

      <SectionModal isOpen={activeTab === "projects"} onClose={handleClose} title={t.nav.projects}>
        <Suspense fallback={<PageLoader />}>
          <Projects />
        </Suspense>
      </SectionModal>

      <SectionModal isOpen={activeTab === "contact"} onClose={handleClose} title={t.nav.contact}>
        <Suspense fallback={<PageLoader />}>
          <Contact />
        </Suspense>
      </SectionModal>

      <SectionModal isOpen={activeTab === "settings"} onClose={handleClose} title={t.settings.title}>
        <Suspense fallback={<PageLoader />}>
          <Settings />
        </Suspense>
      </SectionModal>

      <NavBar activeTab={activeTab} setActiveTab={handleSetActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}