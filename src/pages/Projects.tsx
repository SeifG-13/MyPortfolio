import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Blocks, Home, ShoppingCart, Brain, Database, GitBranch, Server, MapPin, Calendar, X, Info, Activity, BookOpen, ShieldCheck,Shield, MessageSquare, Gamepad2, ClipboardCheck } from "lucide-react";
import { useSettings } from "@/context/SettingsContext"; // Import Context

// Helper component for Unavailable Popups
function UnavailablePopup({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: "code" | "demo" }) {
  const { language } = useSettings();
  
  const content = {
    en: {
      codeTitle: "Source Code Unavailable",
      demoTitle: "Demo Unavailable",
      codeMsg: "The source code for this project is not publicly available. This may be due to company confidentiality or the project being in development.",
      demoMsg: "A live demo for this project is not currently available. The project may have been completed for a client or is hosted on a private server.",
      btn: "Got it"
    },
    fr: {
      codeTitle: "Code Source Indisponible",
      demoTitle: "Démo Indisponible",
      codeMsg: "Le code source de ce projet n'est pas public. Cela peut être dû à la confidentialité de l'entreprise ou au fait que le projet est en cours de développement.",
      demoMsg: "Une démo en direct n'est pas disponible actuellement. Le projet a peut-être été réalisé pour un client ou est hébergé sur un serveur privé.",
      btn: "Compris"
    },
    ar: {
      codeTitle: "الكود المصدري غير متاح",
      demoTitle: "العرض التوضيحي غير متاح",
      codeMsg: "الكود المصدري لهذا المشروع غير متاح للعامة. قد يكون ذلك بسبب سرية الشركة أو أن المشروع قيد التطوير.",
      demoMsg: "العرض التوضيحي المباشر غير متاح حالياً. قد يكون المشروع قد اكتمل لعميل أو مستضاف على خادم خاص.",
      btn: "حسناً"
    }
  }[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Info className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <button
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {type === "code" ? content.codeTitle : content.demoTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {type === "code" ? content.codeMsg : content.demoMsg}
              </p>
              <button
                onClick={onClose}
                className="mt-6 w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {content.btn}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const [popup, setPopup] = useState<{ isOpen: boolean; type: "code" | "demo" }>({ isOpen: false, type: "code" });
  const { language, isRTL } = useSettings();

  const handleCodeClick = (github: string) => {
    if (github) window.open(github, '_blank', 'noopener,noreferrer');
    else setPopup({ isOpen: true, type: "code" });
  };

  const handleDemoClick = (demo: string) => {
    if (demo) window.open(demo, '_blank', 'noopener,noreferrer');
    else setPopup({ isOpen: true, type: "demo" });
  };

  // --- LOCALIZED HEADER ---
  const headerContent = {
    en: {
      desc: "A collection of my projects spanning blockchain, IoT, full-stack development, and DevOps automation.",
      count: "Projects",
      tags: ["Blockchain", "IoT", "Full-Stack", "DevOps"],
      btnCode: "Code",
      btnDemo: "Demo"
    },
    fr: {
      desc: "Une collection de mes projets couvrant la blockchain, l'IoT, le développement full-stack et l'automatisation DevOps.",
      count: "Projets",
      tags: ["Blockchain", "IoT", "Full-Stack", "DevOps"],
      btnCode: "Code",
      btnDemo: "Démo"
    },
    ar: {
      desc: "مجموعة من مشاريعي التي تغطي البلوكشين، إنترنت الأشياء، التطوير الشامل، وأتمتة DevOps.",
      count: "مشاريع",
      tags: ["بلوكشين", "إنترنت الأشياء", "تطوير شامل", "ديف أوبس"],
      btnCode: "الكود",
      btnDemo: "تجربة"
    }
  }[language];

  // --- PROJECTS DATA ---
const projectsData = [
  // 🥇 FLAGSHIP - Blockchain + Distributed Systems
  {
    title: "AgriTrace",
    subtitle: language === 'ar' ? "تتبع الأغذية عبر البلوكشين" : "Blockchain Food Traceability",
    category: language === 'fr' ? "Projet PFE" : language === 'ar' ? "مشروع التخرج" : "Final Year Project",
    description: language === 'fr' 
      ? "Plateforme complète de traçabilité alimentaire utilisant Hyperledger Fabric. Architecture 3-tiers, archivage intelligent et notifications WebSocket."
      : language === 'ar'
      ? "منصة شاملة لتتبع الأغذية باستخدام Hyperledger Fabric. تتميز بهندسة ثلاثية الطبقات، أرشفة ذكية، وإشعارات فورية."
      : "Comprehensive food traceability platform using Hyperledger Fabric. Features 3-tier architecture, smart archiving, and real-time WebSocket notifications.",
    technologies: ["Hyperledger Fabric", "Go", "React", "TypeScript", "Docker"],
    icon: Blocks,
    bgAccent: "bg-emerald-500",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    badgeBorder: "border-emerald-200 dark:border-emerald-800",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    badgeBg: "bg-emerald-50 dark:bg-emerald-900/30",
    period: "Feb - Jun 2025",
    location: "NOVEL-TI, Sfax",
    github: "https://github.com/SeifG-13/AgriTrace",
    demo: "https://www.linkedin.com/posts/seif-ben-ali_blockchain-hyperledger-reactjs-activity-7355254805830758400-njPh"
  },
  
  // 🥈 BIG DATA - Real-time Streaming Pipeline
  {
    title: "Crypto Data Pipeline",
    subtitle: language === 'ar' ? "تحليل البيانات الضخمة في الوقت الفعلي" : "Real-Time Big Data Analytics",
    category: language === 'fr' ? "Projet Big Data" : language === 'ar' ? "مشروع البيانات الضخمة" : "Big Data Project",
    description: language === 'fr'
      ? "Pipeline d'ingénierie de données de bout en bout pour le suivi crypto. Orchestration ETL avec Airflow, streaming via Kafka, traitement Spark."
      : language === 'ar'
      ? "خط أنابيب هندسة البيانات الشامل لتتبع العملات المشفرة. تنسيق ETL مع Airflow، البث عبر Kafka، والمعالجة باستخدام Spark."
      : "End-to-end data engineering pipeline for real-time crypto tracking. Orchestrates ETL with Airflow, streams via Kafka, processes with Spark.",
    technologies: ["Apache Kafka", "Spark Streaming", "Airflow", "Cassandra", "Docker"],
    icon: Activity,
    bgAccent: "bg-indigo-500",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
    badgeBorder: "border-indigo-200 dark:border-indigo-800",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    badgeBg: "bg-indigo-50 dark:bg-indigo-900/30",
    period: "Nov 2025", 
    location: "Personal",
    github: "https://github.com/SeifG-13/crypto-pipeline",
    demo: ""
  },

  // 🥉 PRODUCTION - Live E-commerce Platform
  {
    title: "paradelile",
    subtitle: language === 'ar' ? "منصة JS كاملة آمنة" : "Secure Full-Stack JS Platform",
    category: language === 'fr' ? "Freelance / Personnel" : language === 'ar' ? "عمل حر / شخصي" : "Freelance / Personal",
    description: language === 'fr'
      ? "Plateforme e-commerce multi-vendeurs. Sécurité RBAC avancée, suivi des commandes en temps réel et tableau de bord complet."
      : language === 'ar'
      ? "منصة تجارة إلكترونية متعددة البائعين. أمان RBAC متقدم، تتبع الطلبات في الوقت الفعلي، ولوحة تحكم شاملة للمالك."
      : "Multi-vendor e-commerce platform. Features advanced role-based security (RBAC), real-time order tracking, and comprehensive dashboard.",
    technologies: ["React", "Node.js", "Socket.io", "JWT", "MongoDB"],
    icon: ShieldCheck,
    bgAccent: "bg-teal-600",
    iconColor: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-50 dark:bg-teal-900/20",
    badgeBorder: "border-teal-200 dark:border-teal-800",
    badgeText: "text-teal-700 dark:text-teal-300",
    badgeBg: "bg-teal-50 dark:bg-teal-900/30",
    period: "Aug - Oct 2025",
    location: "Tunis",
    github: "", 
    demo: "https://paradelile.store/"
  },

  // 🤖 AI/ML - Computer Vision Innovation
  {
    title: "Wireframe Intelligence",
    subtitle: language === 'ar' ? "الذكاء الاصطناعي والرؤية الحاسوبية" : "AI & Computer Vision",
    category: language === 'fr' ? "Projet Académique" : language === 'ar' ? "مشروع أكاديمي" : "Academic Project",
    description: language === 'fr'
      ? "Solution IA innovante pour la génération automatique de wireframes web à partir de photos en utilisant la vision par ordinateur et la reconnaissance de formes."
      : language === 'ar'
      ? "حل ذكاء اصطناعي مبتكر للتوليد التلقائي للإطارات الشبكية للويب من الصور باستخدام الرؤية الحاسوبية والتعرف على الأنماط."
      : "Innovative AI solution for automatic generation of web wireframes from photos using computer vision and pattern recognition.",
    technologies: ["Python", "TensorFlow", "OpenCV", "React"],
    icon: Brain,
    bgAccent: "bg-orange-500",
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-50 dark:bg-orange-900/20",
    badgeBorder: "border-orange-200 dark:border-orange-800",
    badgeText: "text-orange-700 dark:text-orange-300",
    badgeBg: "bg-orange-50 dark:bg-orange-900/30",
    period: "Mar - May 2024",
    location: "ENSI",
    github: "https://github.com/khaledmraad/PCD_Drawini",
    demo: "https://www.linkedin.com/posts/khaled-mrad_noabrcode-cnn-computerabrvision-activity-7200779549314289664-clcM"
  },

  // 🔐 IoT + SECURITY - Hardware meets Encryption
  {
    title: "Secure IoT Dashboard",
    subtitle: language === 'ar' ? "تصور بيانات المستشعرات المشفرة" : "Encrypted Sensor Visualization",
    category: language === 'fr' ? "Projet IoT / Sécurité" : language === 'ar' ? "مشروع إنترنت الأشياء" : "IoT / Security Project",
    description: language === 'fr'
      ? "Tableau de bord temps réel pour données IoT chiffrées. ESP32 avec chiffrement AES-128, backend Node.js pour déchiffrement, et visualisation React avec Recharts."
      : language === 'ar'
      ? "لوحة تحكم في الوقت الفعلي لبيانات إنترنت الأشياء المشفرة. ESP32 مع تشفير AES-128، خادم Node.js لفك التشفير، وتصور React."
      : "Real-time dashboard for encrypted IoT sensor data. ESP32 with AES-128 encryption, Node.js backend for decryption, and React visualization with Recharts.",
    technologies: ["ESP32", "Arduino", "Firebase", "React", "Node.js", "AES Encryption"],
    icon: Shield,
    bgAccent: "bg-amber-500",
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
    badgeBorder: "border-amber-200 dark:border-amber-800",
    badgeText: "text-amber-700 dark:text-amber-300",
    badgeBg: "bg-amber-50 dark:bg-amber-900/30",
    period: "Dec 2024",
    location: "Personal / Academic",
    github: "https://github.com/SeifG-13/Secure-Sensor-Data-Visualization",
    demo: "https://secure-sensor-data-visualization-3vjb.vercel.app"
  },

  // 📊 DISTRIBUTED SYSTEMS - Smart City
  {
    title: "Smart City Big Data",
    subtitle: language === 'ar' ? "خط أنابيب الوقت الفعلي" : "Real-time Pipeline",
    category: language === 'fr' ? "Projet Académique" : language === 'ar' ? "مشروع أكاديمي" : "Academic Project",
    description: language === 'fr'
      ? "Pipeline de données distribué pour le suivi des véhicules IoT. Configuration de Kafka pour l'ingestion multi-capteurs et Spark Streaming."
      : language === 'ar'
      ? "خط أنابيب بيانات موزع لتتبع مركبات إنترنت الأشياء. تكوين Kafka لاستيعاب أجهزة الاستشعار المتعددة و Spark Streaming للمعالجة."
      : "Distributed data pipeline for IoT vehicle tracking. Configured Kafka for multi-sensor ingestion and Spark Streaming for processing.",
    technologies: ["Kafka", "Spark", "Cassandra", "Docker"],
    icon: Database,
    bgAccent: "bg-cyan-500",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-50 dark:bg-cyan-900/20",
    badgeBorder: "border-cyan-200 dark:border-cyan-800",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    badgeBg: "bg-cyan-50 dark:bg-cyan-900/30",
    period: "Nov 2024",
    location: "ENSI",
    github: "https://github.com/SeifG-13/smart-city",
    demo: ""
  },

  // 📚 OPEN SOURCE - .NET Reference Guide
  {
    title: "ASP.NET Core API Guide",
    subtitle: language === 'ar' ? "مرجع .NET 9.0" : ".NET 9.0 Reference",
    category: language === 'fr' ? "Ressource Open Source" : language === 'ar' ? "مصدر مفتوح" : "Open Source Resource",
    description: language === 'fr'
      ? "Un guide complet et un kit de démarrage pour les API Web .NET modernes. Couvre l'authentification JWT, Refresh Tokens et Clean Architecture."
      : language === 'ar'
      ? "دليل شامل ومجموعة أدوات بداية لواجهات برمجة التطبيقات .NET الحديثة. يغطي مصادقة JWT، والرموز المميزة للتحديث، والبنية النظيفة."
      : "A comprehensive production-ready guide and starter kit for modern .NET Web APIs. Covers JWT Auth, Refresh Tokens, and Clean Architecture.",
    technologies: [".NET 9.0", "EF Core", "SQL Server", "JWT", "Scalar"],
    icon: BookOpen,
    bgAccent: "bg-violet-600",
    iconColor: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-50 dark:bg-violet-900/20",
    badgeBorder: "border-violet-200 dark:border-violet-800",
    badgeText: "text-violet-700 dark:text-violet-300",
    badgeBg: "bg-violet-50 dark:bg-violet-900/30",
    period: "Updated Oct 2025",
    location: "Open Source",
    github: "https://github.com/SeifG-13/dotnet-api-guide",
    demo: "https://seifbenali.notion.site/dotnet-api-guide"
  },

  // 📚 EDUCATION - Big Data Interview Guide
  {
    title: "Big Data Interview Prep",
    subtitle: language === 'ar' ? "دليل المقابلات الشامل" : "Comprehensive Interview Guide",
    category: language === 'fr' ? "Ressource Éducative" : language === 'ar' ? "مصدر تعليمي" : "Educational Resource",
    description: language === 'fr'
      ? "Guide complet pour les entretiens d'ingénieur Big Data. Documentation détaillée, checklists et environnements Docker pour Airflow, Kafka, Spark et Hadoop."
      : language === 'ar'
      ? "دليل شامل لمقابلات مهندس البيانات الضخمة. وثائق مفصلة وقوائم مراجعة وبيئات Docker لـ Airflow و Kafka و Spark و Hadoop."
      : "Complete guide for Big Data Engineer interviews. Detailed documentation, checklists, and Docker environments for Airflow, Kafka, Spark, and Hadoop.",
    technologies: ["Apache Airflow", "Kafka", "Spark", "Hadoop", "Docker"],
    icon: ClipboardCheck,
    bgAccent: "bg-sky-500",
    iconColor: "text-sky-600 dark:text-sky-400",
    iconBg: "bg-sky-50 dark:bg-sky-900/20",
    badgeBorder: "border-sky-200 dark:border-sky-800",
    badgeText: "text-sky-700 dark:text-sky-300",
    badgeBg: "bg-sky-50 dark:bg-sky-900/30",
    period: "Nov 2025",
    location: "Open Source",
    github: "https://github.com/SeifG-13/bigdata-stack-essentials",
    demo: ""
  },
  // 🎮 BACKEND - .NET 9 API
  {
    title: "Video Game API",
    subtitle: language === 'ar' ? "واجهة برمجة REST كاملة" : "Full REST API",
    category: language === 'fr' ? "Projet Personnel" : language === 'ar' ? "مشروع شخصي" : "Personal Project",
    description: language === 'fr'
      ? "API REST complète pour la gestion de jeux vidéo. Relations EF Core (one-to-one, one-to-many, many-to-many), CRUD complet et documentation Scalar."
      : language === 'ar'
      ? "واجهة برمجة REST كاملة لإدارة ألعاب الفيديو. علاقات EF Core المتعددة، عمليات CRUD كاملة وتوثيق Scalar."
      : "Complete REST API for video game management. EF Core relationships (one-to-one, one-to-many, many-to-many), full CRUD operations, and Scalar documentation.",
    technologies: [".NET 9.0", "EF Core", "SQL Server", "Scalar", "REST API"],
    icon: Gamepad2,
    bgAccent: "bg-rose-500",
    iconColor: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-50 dark:bg-rose-900/20",
    badgeBorder: "border-rose-200 dark:border-rose-800",
    badgeText: "text-rose-700 dark:text-rose-300",
    badgeBg: "bg-rose-50 dark:bg-rose-900/30",
    period: "Oct 2025",
    location: "Personal",
    github: "https://github.com/SeifG-13/VideoGameApi",
    demo: ""
  },

  // 🏠 IoT - Smart Home (Internship)
  {
    title: "Smart Home IoT",
    subtitle: language === 'ar' ? "تطبيق أتمتة المنزل" : "Home Automation App",
    category: language === 'fr' ? "Stage Dév" : language === 'ar' ? "تدريب تطوير" : "Dev Internship",
    description: language === 'fr'
      ? "Application mobile Android native pour la gestion intelligente de la maison. Intégration de capteurs IoT, caméras de sécurité et contrôle vocal."
      : language === 'ar'
      ? "تطبيق جوال Android أصلي لإدارة المنزل الذكي. تكامل مستشعرات إنترنت الأشياء، وكاميرات الأمان، والتحكم الصوتي."
      : "Native Android mobile app for intelligent connected home management. Integration of IoT sensors, security cameras, and voice control automation.",
    technologies: ["Flutter", "Dart", "Arduino", "Firebase"],
    icon: Home,
    bgAccent: "bg-blue-500",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
    badgeBorder: "border-blue-200 dark:border-blue-800",
    badgeText: "text-blue-700 dark:text-blue-300",
    badgeBg: "bg-blue-50 dark:bg-blue-900/30",
    period: "Jun - Aug 2024",
    location: "Get Wireless, Tunis",
    github: "https://github.com/SeifG-13/Smart_home",
    demo: ""
  },

  // ⚙️ DEVOPS - Azure Pipeline
  {
    title: "Azure DevOps Pipeline",
    subtitle: language === 'ar' ? "خط أنابيب CI/CD شامل" : "End-to-End CI/CD",
    category: language === 'fr' ? "Projet Personnel" : language === 'ar' ? "مشروع شخصي" : "Personal Project",
    description: language === 'fr'
      ? "Implémentation complète du pipeline CI/CD Azure DevOps. Pipeline multi-étapes, conteneurisation Docker et déploiement automatisé."
      : language === 'ar'
      ? "تنفيذ كامل لخط أنابيب CI/CD في Azure DevOps. خط أنابيب متعدد المراحل، وحاويات Docker، والنشر الآلي."
      : "Full implementation of Azure DevOps CI/CD pipeline. Multi-stage pipeline, Docker containerization, and automated deployment.",
    technologies: ["Azure DevOps", "Docker", "YAML"],
    icon: GitBranch,
    bgAccent: "bg-blue-700",
    iconColor: "text-blue-700 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
    badgeBorder: "border-blue-200 dark:border-blue-800",
    badgeText: "text-blue-800 dark:text-blue-300",
    badgeBg: "bg-blue-50 dark:bg-blue-900/30",
    period: "Jan - Feb 2025",
    location: "Personal",
    github: "",
    demo: ""
  },

  // ⚙️ DEVOPS - GitLab CI/CD
  {
    title: "GitLab CI/CD",
    subtitle: language === 'ar' ? "سير عمل دمج الطلبات" : "Merge Request Workflow",
    category: language === 'fr' ? "Projet Personnel" : language === 'ar' ? "مشروع شخصي" : "Personal Project",
    description: language === 'fr'
      ? "Pipeline CI/CD GitLab complet avec gestion des branches. Jobs différenciés, déploiement conditionnel et contrôles de sécurité."
      : language === 'ar'
      ? "خط أنابيب GitLab CI/CD كامل مع إدارة الفروع. وظائف متمايزة، نشر مشروط، وفحوصات أمنية."
      : "Complete GitLab CI/CD pipeline with branch management. Differentiated jobs, conditional deployment, and security checks.",
    technologies: ["GitLab CI", "Shell", "Docker"],
    icon: Server,
    bgAccent: "bg-red-700",
    iconColor: "text-red-700 dark:text-red-400",
    iconBg: "bg-red-50 dark:bg-red-900/20",
    badgeBorder: "border-red-200 dark:border-red-800",
    badgeText: "text-red-800 dark:text-red-300",
    badgeBg: "bg-red-50 dark:bg-red-900/30",
    period: "Dec 24 - Jan 25",
    location: "Personal",
    github: "https://gitlab.com/seifg-13-group/learn-gitlab-app",
    demo: ""
  },

  // 🤖 BOT - Discord Automation
  {
    title: "Discord Attendance Bot",
    subtitle: language === 'ar' ? "تتبع الحضور الآلي" : "Automated Time Tracking",
    category: language === 'fr' ? "Projet Personnel" : language === 'ar' ? "مشروع شخصي" : "Personal Project",
    description: language === 'fr'
      ? "Bot Discord pour la gestion de présence avec boutons interactifs. Suivi du temps avec MongoDB, calcul automatique des heures et journalisation."
      : language === 'ar'
      ? "بوت Discord لإدارة الحضور مع أزرار تفاعلية. تتبع الوقت مع MongoDB، حساب تلقائي للساعات وتسجيل السجلات."
      : "Discord bot for attendance management with interactive buttons. Time tracking with MongoDB, automatic hour calculation, and activity logging.",
    technologies: ["Discord.js", "Node.js", "MongoDB", "Mongoose"],
    icon: MessageSquare,
    bgAccent: "bg-indigo-600",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
    badgeBorder: "border-indigo-200 dark:border-indigo-800",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    badgeBg: "bg-indigo-50 dark:bg-indigo-900/30",
    period: "Updated Apr 2024",
    location: "Personal",
    github: "https://github.com/SeifG-13/policediscordbot",
    demo: ""
  },

  // 🛒 INTERNSHIP - E-Commerce
  {
    title: "E-Commerce Platform",
    subtitle: language === 'ar' ? "تطبيق ويب شامل" : "Full-Stack Web App",
    category: language === 'fr' ? "Stage Web" : language === 'ar' ? "تدريب ويب" : "Web Internship",
    description: language === 'fr'
      ? "Plateforme e-commerce full-stack avec tableau de bord de gestion. Fonctionnalités API REST, modèles de données SQL et suivi des commandes."
      : language === 'ar'
      ? "منصة تجارة إلكترونية كاملة مع لوحة تحكم إدارية. تتميز بواجهات REST API، ونماذج بيانات SQL، وتتبع الطلبات."
      : "Full-stack e-commerce platform with management dashboard. Features REST APIs, SQL-based data models, and order tracking.",
    technologies: ["Node.js", "React", "PostgreSQL", "Express"],
    icon: ShoppingCart,
    bgAccent: "bg-purple-500",
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-50 dark:bg-purple-900/20",
    badgeBorder: "border-purple-200 dark:border-purple-800",
    badgeText: "text-purple-700 dark:text-purple-300",
    badgeBg: "bg-purple-50 dark:bg-purple-900/30",
    period: "Jul - Aug 2023",
    location: "AURES, Kebili",
    github: "https://github.com/SeifG-13/stage-aures",
    demo: ""
  }
];

  return (
    <div className="space-y-8 pb-20" dir={isRTL ? "rtl" : "ltr"}>
      
      <UnavailablePopup 
        isOpen={popup.isOpen} 
        onClose={() => setPopup({ ...popup, isOpen: false })} 
        type={popup.type} 
      />

      {/* Header */}
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {headerContent.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium text-gray-600 dark:text-gray-300">
            {projectsData.length} {headerContent.count}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            {headerContent.tags[0]}
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs font-medium text-blue-700 dark:text-blue-300">
            {headerContent.tags[1]}
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-xs font-medium text-purple-700 dark:text-purple-300">
            {headerContent.tags[2]}
          </span>
          <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-xs font-medium text-orange-700 dark:text-orange-300">
            {headerContent.tags[3]}
          </span>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-6">
        {projectsData.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative w-full bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${project.bgAccent}`} />

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  <div className="flex-shrink-0">
                    <div className={`h-16 w-16 rounded-2xl ${project.iconBg} ${project.iconColor} flex items-center justify-center`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{project.subtitle}</p>
                      </div>
                      <span className={`self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${project.badgeBg} ${project.badgeBorder} ${project.badgeText}`}>
                        {project.category}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>

                    <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-50 dark:border-white/5 mt-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{project.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-md bg-gray-50 dark:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2 md:pt-0">
                    <button 
                      onClick={() => handleCodeClick(project.github)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        project.github 
                          ? "bg-white dark:bg-transparent border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10" 
                          : "bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-400 dark:text-gray-600"
                      }`}
                    >
                      <Github className="h-4 w-4" />
                      {headerContent.btnCode}
                      {!project.github && <Info className="h-3 w-3 ml-1 opacity-50" />}
                    </button>
                    <button 
                      onClick={() => handleDemoClick(project.demo)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md ${
                        project.demo 
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200" 
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-400 dark:hover:bg-gray-600"
                      }`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {headerContent.btnDemo}
                      {!project.demo && <Info className="h-3 w-3 ml-1 opacity-50" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}