import { useState, useEffect, memo, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { Battery, Wifi, Signal, MapPin, Code2, ArrowUpRight, Blocks, Cloud, GraduationCap } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

// Assets
import profileImage from "@assets/images/profile.webp";
import reactIcon from "@assets/icons/React.svg";
import goIcon from "@assets/icons/Go.svg";
import dockerIcon from "@assets/icons/Docker.svg";
import azureIcon from "@assets/icons/Azure.svg";
import dotnetIcon from "@assets/icons/NETcore.svg";
import kafkaIcon from "@assets/icons/ApacheKafka.svg";
import linuxIcon from "@assets/icons/Linux.svg";

// PERF: CSS animation helper - runs on compositor thread (60fps)
// Replaces framer-motion JS animations, eliminating ~10 motion instances from main thread
const fadeIn = (delayMs = 0) => ({
  animation: "fade-in-up 0.3s ease-out both",
  animationDelay: `${delayMs}ms`,
});

// Memoized status bar - never re-renders
const StatusBar = memo(function StatusBar({ time }: { time: Date }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-12 px-6 flex items-center justify-between text-xs font-medium z-20" dir="ltr">
      <span>{format(time, "h:mm")}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <Battery className="h-4 w-4" />
      </div>
    </div>
  );
});

// Memoized date header - CSS animation instead of framer-motion
const DateHeader = memo(function DateHeader({ time, dateLocale }: { time: Date; dateLocale: any }) {
  return (
    <div
      className="flex flex-col items-center justify-center pb-2"
      style={fadeIn(0)}
    >
      <p className="text-lg font-medium text-white/90 drop-shadow-md capitalize">
        {format(time, "EEEE, MMMM d", { locale: dateLocale })}
      </p>
      <h1 className="text-6xl font-thin tracking-tighter leading-none drop-shadow-lg font-[Inter]">
        {format(time, "h:mm")}
      </h1>
    </div>
  );
});

// Memoized tech stack - static content
const techStack = [
  { name: 'React', icon: reactIcon },
  { name: 'Go', icon: goIcon },
  { name: 'Docker', icon: dockerIcon },
  { name: 'Azure', icon: azureIcon },
  { name: '.NET', icon: dotnetIcon },
  { name: 'Kafka', icon: kafkaIcon },
  { name: 'Linux', icon: linuxIcon },
];

const TechStackWidget = memo(function TechStackWidget({ label }: { label: string }) {
  return (
    <div
      className="col-span-2 md:col-span-4 rounded-[28px] bg-white/15 border border-white/10 p-5 shadow-lg"
      style={fadeIn(150)}
    >
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="h-4 w-4 text-white/60" />
        <span className="text-xs font-medium text-white/60 uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex justify-between items-center gap-2 overflow-x-auto no-scrollbar" dir="ltr">
        {techStack.map((tech, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 min-w-[60px]">
            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors p-2">
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="text-[10px] font-medium text-white/50">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

// Memoized widget components - native CSS animations (compositor thread)
const StatusWidget = memo(function StatusWidget({ t }: { t: any }) {
  return (
    <div
      className="aspect-square md:aspect-auto md:h-32 rounded-[28px] bg-white/15 border border-white/10 p-5 flex flex-col justify-between shadow-lg relative overflow-hidden"
      style={fadeIn(50)}
    >
      <div className="absolute inset-0 bg-green-500/10" />
      <div className="relative z-10 flex justify-between items-start">
        <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-0.5">{t.home.status}</p>
        <p className="text-sm font-bold leading-tight">{t.home.available}</p>
      </div>
    </div>
  );
});

const LocationWidget = memo(function LocationWidget({ t }: { t: any }) {
  return (
    <div
      className="aspect-square md:aspect-auto md:h-32 rounded-[28px] bg-white/15 border border-white/10 p-5 flex flex-col justify-between shadow-lg relative overflow-hidden"
      style={fadeIn(80)}
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
      <div className="relative z-10">
        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
          <MapPin className="h-4 w-4" />
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-0.5">{t.home.location}</p>
        <p className="text-sm font-bold leading-tight">{t.home.country}</p>
      </div>
    </div>
  );
});

// Main Home component
export function Home() {
  const [time, setTime] = useState(new Date());
  const { t, dateLocale, language, isRTL } = useSettings();

  // PERFORMANCE FIX: Update only every minute instead of every second
  useEffect(() => {
    const updateTime = () => setTime(new Date());

    // Calculate ms until next minute
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Set initial timeout to sync with minute boundary
    const timeout = setTimeout(() => {
      updateTime();
      // Then update every minute
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  // Memoize bio text to prevent recalculation
  const bioText = useMemo(() => {
    if (language === 'ar') {
      return "خريج ENSI متخصص في إنترنت الأشياء، الواجهة الخلفية، والبلوكشين. شغوف ببناء أنظمة موزعة قابلة للتطوير باستخدام ممارسات DevOps الحديثة.";
    } else if (language === 'fr') {
      return "Diplômé de l'ENSI spécialisé en IoT, Backend et Blockchain. Passionné par la création de systèmes distribués évolutifs avec des pratiques DevOps modernes.";
    }
    return "ENSI Graduate specializing in IoT, Backend, Blockchain & Cloud Infrastructure. Passionate about building scalable distributed systems with modern DevOps practices.";
  }, [language]);

  const handleProjectClick = useCallback(() => {
    window.open("https://github.com/SeifG-13/AgriTrace", '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden pt-12 px-6 text-white no-scrollbar overflow-y-auto">

      <StatusBar time={time} />

      <div className="flex flex-col min-h-full justify-start pt-4 space-y-6 max-w-4xl mx-auto pb-32">

        <DateHeader time={time} dateLocale={dateLocale} />

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" dir={isRTL ? "rtl" : "ltr"}>

          {/* Intro Card - CSS fade in */}
          <div
            className="col-span-2 md:col-span-4 rounded-[28px] bg-white/15 border border-white/10 p-6 shadow-lg relative overflow-hidden group"
            style={fadeIn(0)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0">
                  <img
                    src={profileImage}
                    alt="Seif BEN ALI"
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight">
                    {language === 'ar' ? "سيف بن علي" : "Seif Ben Ali"}
                  </h2>
                  <p className="text-sm text-white/60">{t.home.role}</p>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{bioText}</p>
            </div>
          </div>

          {/* Memoized Widgets */}
          <StatusWidget t={t} />
          <LocationWidget t={t} />

          {/* Desktop-only widgets */}
          <div
            className="hidden md:flex aspect-auto h-32 rounded-[28px] bg-white/15 border border-white/10 p-5 flex-col justify-between shadow-lg relative overflow-hidden"
            style={fadeIn(100)}
          >
            <div className="absolute inset-0 bg-purple-500/10" />
            <div className="relative z-10">
              <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Blocks className="h-4 w-4" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-0.5">{t.home.expertise}</p>
              <p className="text-sm font-bold leading-tight">Backend & IoT</p>
            </div>
          </div>

          <div
            className="hidden md:flex aspect-auto h-32 rounded-[28px] bg-white/15 border border-white/10 p-5 flex-col justify-between shadow-lg relative overflow-hidden"
            style={fadeIn(120)}
          >
            <div className="absolute inset-0 bg-cyan-500/10" />
            <div className="relative z-10">
              <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Cloud className="h-4 w-4" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-0.5">{t.home.cloud}</p>
              <p className="text-sm font-bold leading-tight">Azure & AWS</p>
            </div>
          </div>

          {/* Tech Stack */}
          <TechStackWidget label={t.home.techStack} />

          {/* Latest Project */}
          <div
            onClick={handleProjectClick}
            className="col-span-2 md:col-span-2 rounded-[28px] bg-white/15 border border-white/10 p-1 shadow-lg relative overflow-hidden group h-32 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
            style={fadeIn(180)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 to-blue-600/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wide">{t.home.finalProject}</span>
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">AgriTrace - Blockchain</h3>
              <p className="text-xs text-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{t.home.viewGithub}</p>
            </div>
          </div>

          {/* Education Widget */}
          <div
            className="col-span-2 md:col-span-2 rounded-[28px] bg-white/15 border border-white/10 p-4 flex items-center gap-4 shadow-lg h-32"
            style={fadeIn(200)}
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-white/10 flex-shrink-0">
                <GraduationCap className="h-7 w-7 text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-1">{t.home.education}</p>
                <h4 className="text-sm font-bold">{t.home.degree}</h4>
                <p className="text-xs text-white/50">{t.home.specialization}</p>
              </div>
            </div>
          </div>

          {/* Mobile-only widgets */}
          <div
            className="md:hidden rounded-[28px] bg-white/15 border border-white/10 p-5 shadow-lg relative overflow-hidden"
            style={fadeIn(100)}
          >
            <div className="absolute inset-0 bg-purple-500/10" />
            <div className="relative z-10">
              <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                <Blocks className="h-4 w-4" />
              </div>
              <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-0.5">{t.home.expertise}</p>
              <p className="text-sm font-bold leading-tight">Backend & IoT</p>
            </div>
          </div>

          <div
            className="md:hidden rounded-[28px] bg-white/15 border border-white/10 p-5 shadow-lg relative overflow-hidden"
            style={fadeIn(120)}
          >
            <div className="absolute inset-0 bg-cyan-500/10" />
            <div className="relative z-10">
              <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                <Cloud className="h-4 w-4" />
              </div>
              <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-0.5">{t.home.cloud}</p>
              <p className="text-sm font-bold leading-tight">Azure & AWS</p>
            </div>
          </div>

          <div className="h-40 w-full block md:hidden" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
