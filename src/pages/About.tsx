import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, GraduationCap, Briefcase, Award, Code2, Server, Cloud, Database, Cpu, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@assets/images/profile.png";
import { useSettings } from "@/context/SettingsContext"; // Import Context

// Define skills globally (Icons don't need translation usually, but categories do)
const skillIcons = {
  Backend: Server,
  Frontend: Code2,
  Cloud: Cloud,
  Data: Database,
  IoT: Cpu
};

export function About() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { language, isRTL } = useSettings();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("seif.benali@ensi-uma.tn");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = "seif.benali@ensi-uma.tn";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // --- 1. LOCALIZED CONTENT DICTIONARY ---
  const content = {
    en: {
      name: "Seif Ben Ali",
      role: "Software & DevOps Engineer",
      location: "Kebili, Tunisia 🇹🇳",
      bio: (
        <>
          Computer Engineering graduate from <span className="font-semibold text-primary">ENSI</span>, specialized in distributed systems, blockchain technologies, and IoT. 
          Experienced in building scalable backend solutions, implementing CI/CD pipelines, and deploying containerized applications on cloud platforms.
        </>
      ),
      stats: { years: "Years Exp.", projects: "Projects", certs: "Certification" },
      titles: { skills: "Technical Skills", experience: "Experience", education: "Education", languages: "Languages" },
      langs: { ar: "Arabic", fr: "French", en: "English", native: "Native", conv: "Conversational" },
      certTitle: "Microsoft Certified",
      certName: "Azure Fundamentals (AZ-900)"
    },
    fr: {
      name: "Seif Ben Ali",
      role: "Ingénieur Logiciel & DevOps",
      location: "Kébili, Tunisie 🇹🇳",
      bio: (
        <>
          Diplômé en génie informatique de l' <span className="font-semibold text-primary">ENSI</span>, spécialisé dans les systèmes distribués, la blockchain et l'IoT.
          Expérimenté dans la création de solutions backend évolutives, la mise en œuvre de pipelines CI/CD et le déploiement d'applications conteneurisées sur le cloud.
        </>
      ),
      stats: { years: "Ans d'Exp.", projects: "Projets", certs: "Certifications" },
      titles: { skills: "Compétences Techniques", experience: "Expérience", education: "Éducation", languages: "Langues" },
      langs: { ar: "Arabe", fr: "Français", en: "Anglais", native: "Natale", conv: "Courant" },
      certTitle: "Certifié Microsoft",
      certName: "Azure Fundamentals (AZ-900)"
    },
    ar: {
      name: "سيف بن علي",
      role: "مهندس برمجيات و DevOps",
      location: "قبلي، تونس 🇹🇳",
      bio: (
        <>
          خريج هندسة الحاسوب من <span className="font-semibold text-primary">المدرسة الوطنية لعلوم الإعلامية (ENSI)</span>، متخصص في الأنظمة الموزعة، وتقنيات البلوكشين، وإنترنت الأشياء.
          ذو خبرة في بناء حلول خلفية قابلة للتطوير، وتنفيذ خطوط CI/CD، ونشر التطبيقات داخل الحاويات على المنصات السحابية.
        </>
      ),
      stats: { years: "سنوات خبرة", projects: "مشاريع", certs: "شهادات" },
      titles: { skills: "المهارات التقنية", experience: "الخبرة المهنية", education: "التعليم", languages: "اللغات" },
      langs: { ar: "العربية", fr: "الفرنسية", en: "الإنجليزية", native: "اللغة الأم", conv: "محادثة" },
      certTitle: "معتمد من مايكروسوفت",
      certName: "Azure Fundamentals (AZ-900)"
    }
  }[language];

  // --- 2. LOCALIZED DATA ARRAYS ---
  
  const skills = [
    { category: "Backend", items: ["ASP.NET Core", "Node.js", "Go (Gin)", "REST APIs"], icon: skillIcons.Backend, color: "blue" },
    { category: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS", "Flutter"], icon: skillIcons.Frontend, color: "purple" },
    { category: "Cloud & DevOps", items: ["Azure (AZ-900)", "Docker", "GitLab CI/CD", "Kubernetes", "Terraform"], icon: skillIcons.Cloud, color: "cyan" },
    { category: "Data & DB", items: ["PostgreSQL", "MongoDB", "Hadoop", "SQL Server", "Spark", "Kafka"], icon: skillIcons.Data, color: "green" },
    { category: "Blockchain & IoT", items: ["Hyperledger Fabric", "IPFS", "Arduino", "ESP32", "MQTT", "Node-RED"], icon: skillIcons.IoT, color: "orange" },
  ];

  const experience = [
    { 
      role: language === 'fr' ? "PFE - AgriTrace" : language === 'ar' ? "مشروع التخرج - AgriTrace" : "Final Year Project - AgriTrace", 
      company: "NOVEL-TI", 
      location: "Sfax, Tunisia",
      period: "Feb - Jun 2025",
      description: language === 'fr' 
        ? "Solution de traçabilité alimentaire basée sur la blockchain utilisant Hyperledger Fabric, des contrats intelligents Go, IPFS et React."
        : language === 'ar'
        ? "حل تتبع الأغذية القائم على البلوكشين باستخدام Hyperledger Fabric وعقود Go الذكية و IPFS و React."
        : "Blockchain-based food traceability solution using Hyperledger Fabric, Go smart contracts, IPFS, and React/TypeScript interface.",
      type: "internship"
    },
    { 
      role: language === 'fr' ? "Stage de Développement" : language === 'ar' ? "تدريب تطوير برمجيات" : "Development Internship", 
      company: "Get Wireless", 
      location: "Tunis, Tunisia",
      period: "Jun - Jul 2024",
      description: language === 'fr'
        ? "Application de gestion de maison intelligente avec intégration IoT en temps réel utilisant Flutter, Dart et Arduino."
        : language === 'ar'
        ? "تطبيق إدارة المنزل الذكي مع تكامل IoT في الوقت الفعلي باستخدام Flutter و Dart و Arduino."
        : "Smart home management app with real-time IoT integration using Flutter, Dart, Arduino, and Firebase.",
      type: "internship"
    },
    { 
      role: language === 'fr' ? "Stage Développement Web" : language === 'ar' ? "تدريب تطوير ويب" : "Web Development Internship", 
      company: "AURES", 
      location: "Kebili, Tunisia",
      period: "Jul - Aug 2023",
      description: language === 'fr'
        ? "Plateforme e-commerce full-stack avec la stack PERN (PostgreSQL, Express.js, React, Node.js)."
        : language === 'ar'
        ? "منصة تجارة إلكترونية كاملة باستخدام PERN Stack."
        : "Full-stack e-commerce platform with PERN Stack (PostgreSQL, Express.js, React, Node.js).",
      type: "internship"
    }
  ];

  const education = [
    {
      degree: language === 'fr' ? "Diplôme National d'Ingénieur" : language === 'ar' ? "الشهادة الوطنية للمهندس" : "Engineering Degree in Computer Science",
      school: language === 'ar' ? "ENSI - المدرسة الوطنية لعلوم الإعلامية" : "ENSI - National School of Computer Science",
      period: "2022 - 2025",
      specialization: language === 'fr' ? "Systèmes Embarqués et IoT" : language === 'ar' ? "الأنظمة المدمجة وإنترنت الأشياء" : "Embedded Systems and Connected Networks (IoT)",
      honors: "Honors"
    },
    {
      degree: language === 'fr' ? "Cycle Préparatoire" : language === 'ar' ? "المرحلة التحضيرية" : "Preparatory Classes",
      school: "IPEIM",
      period: "2020 - 2022",
      specialization: language === 'fr' ? "Mathématiques et Physique" : language === 'ar' ? "رياضيات وفيزياء" : "Mathematics and Physics",
      honors: "Honors"
    }
  ];

  return (
    <div className="space-y-8 pb-20" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Header Profile */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-xl border-4 border-white dark:border-white/20">
          <img 
            src={profileImage} 
            alt={content.name} 
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{content.name}</h3>
          <p className="text-base font-medium text-primary">{content.role}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{content.location}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 border border-blue-100 dark:border-white/10">
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {content.bio}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-4 text-center border border-blue-100 dark:border-blue-800/30">
          <h4 className="text-2xl font-bold text-primary">1+</h4>
          <p className="text-xs font-medium text-blue-600/80 dark:text-blue-400">{content.stats.years}</p>
        </div>
        <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-4 text-center border border-green-100 dark:border-green-800/30">
          <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">10+</h4>
          <p className="text-xs font-medium text-green-600/80 dark:text-green-400/80">{content.stats.projects}</p>
        </div>
        <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-4 text-center border border-purple-100 dark:border-purple-800/30">
          <h4 className="text-2xl font-bold text-purple-600 dark:text-purple-400">9+</h4>
          <p className="text-xs font-medium text-purple-600/80 dark:text-purple-400/80">{content.stats.certs}</p>
        </div>
      </div>

      {/* Azure Certification */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
            <Award className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white/80 uppercase tracking-wide">{content.certTitle}</p>
            <h4 className="text-lg font-bold">{content.certName}</h4>
          </div>
          <Cloud className="h-8 w-8 text-white/60" />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          {content.titles.skills}
        </h3>
        <div className="space-y-3">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.15) }}
              className="rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-8 w-8 rounded-lg bg-${skillGroup.color}-100 dark:bg-${skillGroup.color}-900/30 flex items-center justify-center`}>
                  <skillGroup.icon className={`h-4 w-4 text-${skillGroup.color}-600 dark:text-${skillGroup.color}-400`} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{skillGroup.category}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, j) => (
                  <span 
                    key={j} 
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          {content.titles.experience}
        </h3>
        <div className="space-y-4">
          {experience.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.06, 0.15) }}
              className="relative rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{job.role}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${
                      job.type === 'project' || job.type === 'internship' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary">{job.company}</p>
                  <p className="text-xs text-gray-400">{job.location}</p>
                </div>
                <span className="text-xs font-medium text-gray-400 whitespace-nowrap rtl:mr-2">{job.period}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          {content.titles.education}
        </h3>
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div key={i} className="rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-sm text-primary">{edu.school}</p>
                </div>
                <span className="text-xs font-medium text-gray-400">{edu.period}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{edu.specialization}</p>
              {edu.honors && (
                <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-medium">
                  <Award className="h-3 w-3" />
                  {edu.honors}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{content.titles.languages}</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center border border-gray-100 dark:border-white/10">
            <span className="text-2xl mb-2 block">🇹🇳</span>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{content.langs.ar}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{content.langs.native}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center border border-gray-100 dark:border-white/10">
            <span className="text-2xl mb-2 block">🇫🇷</span>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{content.langs.fr}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{content.langs.conv}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center border border-gray-100 dark:border-white/10">
            <span className="text-2xl mb-2 block">🇬🇧</span>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{content.langs.en}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{content.langs.conv}</p>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="flex justify-center gap-4 pt-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-gray-200 dark:border-gray-700 dark:bg-white/5 hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-white dark:hover:text-black transition-colors"
          onClick={() => window.open('https://github.com/SeifG-13', '_blank')}
        >
          <Github className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-gray-200 dark:border-gray-700 dark:bg-white/5 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
          onClick={() => window.open('https://linkedin.com/in/seif-ben-ali', '_blank')}
        >
          <Linkedin className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full h-12 w-12 border-gray-200 dark:border-gray-700 dark:bg-white/5 transition-colors ${
            copiedEmail 
              ? "bg-green-500 text-white border-green-500" 
              : "hover:bg-red-500 hover:text-white hover:border-red-500"
          }`}
          onClick={copyEmail}
        >
          {copiedEmail ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Copied tooltip */}
      {copiedEmail && (
        <p className="text-center text-sm text-green-600 font-medium animate-pulse">
          Email copied to clipboard!
        </p>
      )}
    </div>
  );
}