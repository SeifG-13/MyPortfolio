import { useState, lazy, Suspense } from "react";
import { NavBar } from "@/components/NavBar";
import { SectionModal } from "@/components/SectionModal";
import { Home } from "@/pages/Home";
import { SettingsProvider, useSettings } from "@/context/SettingsContext"; // Import
import bgImage from "@assets/images/premium_dark_iridescent_abstract_wallpaper.png";

const About = lazy(() => import("@/pages/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import("@/pages/Projects").then(m => ({ default: m.Projects })));
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })));
// NEW IMPORT
const Settings = lazy(() => import("@/pages/Settings").then(m => ({ default: m.Settings })));

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="h-8 w-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
  </div>
);

// Inner component to access Context
function AppContent() {
  const [activeTab, setActiveTab] = useState("home");
  const { t } = useSettings(); // Use translations for titles

  const handleClose = () => setActiveTab("home");

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black font-sans selection:bg-blue-500/30">
      
      {/* Background Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          filter: activeTab !== "home" ? "brightness(0.4) blur(20px) scale(1.05)" : "brightness(0.9) blur(0px) scale(1)"
        }}
      />
      <div className={`absolute inset-0 z-0 bg-black/10 transition-opacity duration-500 ${activeTab !== "home" ? "opacity-60" : "opacity-0"}`} />

      {/* Main Content */}
      <main 
        className={`relative z-10 h-full w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          activeTab !== "home" ? "scale-90 opacity-0 translate-y-4" : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        <Home />
      </main>

      {/* Modals */}
      <SectionModal isOpen={activeTab === "about"} onClose={handleClose} title={t.nav.about}>
        <Suspense fallback={<PageLoader />}> <About /> </Suspense>
      </SectionModal>

      <SectionModal isOpen={activeTab === "projects"} onClose={handleClose} title={t.nav.projects}>
        <Suspense fallback={<PageLoader />}> <Projects /> </Suspense>
      </SectionModal>

      <SectionModal isOpen={activeTab === "contact"} onClose={handleClose} title={t.nav.contact}>
        <Suspense fallback={<PageLoader />}> <Contact /> </Suspense>
      </SectionModal>

      {/* NEW SETTINGS MODAL */}
      <SectionModal isOpen={activeTab === "settings"} onClose={handleClose} title={t.settings.title}>
        <Suspense fallback={<PageLoader />}> <Settings /> </Suspense>
      </SectionModal>

      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
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