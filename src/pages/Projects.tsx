import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Blocks, Home, ShoppingCart, Brain, Database, GitBranch, Server, MapPin, Calendar, X, Info } from "lucide-react";

const projects = [
  {
    title: "AgriTrace",
    subtitle: "Blockchain Food Traceability",
    category: "Final Year Project",
    description: "Comprehensive food traceability platform using Hyperledger Fabric. Features 3-tier architecture, smart archiving, and real-time WebSocket notifications.",
    technologies: ["Hyperledger Fabric", "Go", "React", "TypeScript", "Docker"],
    icon: Blocks,
    bgAccent: "bg-emerald-500",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    badgeBorder: "border-emerald-200",
    badgeText: "text-emerald-700",
    period: "Feb - Jun 2025",
    location: "NOVEL-TI, Sfax",
    github: "https://github.com/SeifG-13/AgriTrace",
    demo: ""
  },
  {
    title: "Smart Home IoT",
    subtitle: "Home Automation App",
    category: "Dev Internship",
    description: "Native Android mobile app for intelligent connected home management. Integration of IoT sensors, security cameras, and voice control automation.",
    technologies: ["Flutter", "Dart", "Arduino", "Firebase"],
    icon: Home,
    bgAccent: "bg-blue-500",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    badgeBorder: "border-blue-200",
    badgeText: "text-blue-700",
    period: "Jun - Jul 2024",
    location: "Get Wireless, Tunis",
    github: "",
    demo: ""
  },
  {
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Web App",
    category: "Web Internship",
    description: "Full-stack e-commerce platform with management dashboard. Features REST APIs, SQL-based data models, and order tracking.",
    technologies: ["Node.js", "React", "PostgreSQL", "Express"],
    icon: ShoppingCart,
    bgAccent: "bg-purple-500",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    badgeBorder: "border-purple-200",
    badgeText: "text-purple-700",
    period: "Jul - Aug 2023",
    location: "AURES, Kebili",
    github: "",
    demo: ""
  },
  {
    title: "Wireframe Intelligence",
    subtitle: "AI & Computer Vision",
    category: "Academic Project",
    description: "Innovative AI solution for automatic generation of web wireframes from photos using computer vision and pattern recognition.",
    technologies: ["Python", "TensorFlow", "OpenCV", "React"],
    icon: Brain,
    bgAccent: "bg-orange-500",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    badgeBorder: "border-orange-200",
    badgeText: "text-orange-700",
    period: "Mar - May 2024",
    location: "ENSI",
    github: "",
    demo: ""
  },
  {
    title: "Smart City Big Data",
    subtitle: "Real-time Pipeline",
    category: "Academic Project",
    description: "Distributed data pipeline for IoT vehicle tracking. Configured Kafka for multi-sensor ingestion and Spark Streaming for processing.",
    technologies: ["Kafka", "Spark", "Cassandra", "Docker"],
    icon: Database,
    bgAccent: "bg-cyan-500",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
    badgeBorder: "border-cyan-200",
    badgeText: "text-cyan-700",
    period: "2023",
    location: "ENSI",
    github: "",
    demo: ""
  },
  {
    title: "Azure DevOps Pipeline",
    subtitle: "End-to-End CI/CD",
    category: "Personal Project",
    description: "Full implementation of Azure DevOps CI/CD pipeline. Multi-stage pipeline, Docker containerization, and automated deployment.",
    technologies: ["Azure DevOps", "Docker", "YAML"],
    icon: GitBranch,
    bgAccent: "bg-blue-700",
    iconColor: "text-blue-700",
    iconBg: "bg-blue-50",
    badgeBorder: "border-blue-200",
    badgeText: "text-blue-800",
    period: "Jan - Feb 2025",
    location: "Personal",
    github: "",
    demo: ""
  },
  {
    title: "GitLab CI/CD",
    subtitle: "Merge Request Workflow",
    category: "Personal Project",
    description: "Complete GitLab CI/CD pipeline with branch management. Differentiated jobs, conditional deployment, and security checks.",
    technologies: ["GitLab CI", "Shell", "Docker"],
    icon: Server,
    bgAccent: "bg-red-700",
    iconColor: "text-red-700",
    iconBg: "bg-red-50",
    badgeBorder: "border-red-200",
    badgeText: "text-red-800",
    period: "Dec 24 - Jan 25",
    location: "Personal",
    github: "",
    demo: ""
  }
];

function UnavailablePopup({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: "code" | "demo" }) {
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Info className="h-6 w-6 text-amber-600" />
                </div>
                <button
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {type === "code" ? "Source Code Unavailable" : "Demo Unavailable"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {type === "code" 
                  ? "The source code for this project is not publicly available. This may be due to company confidentiality or the project being in development."
                  : "A live demo for this project is not currently available. The project may have been completed for a client or is hosted on a private server."
                }
              </p>
              <button
                onClick={onClose}
                className="mt-6 w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Got it
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

  const handleCodeClick = (github: string) => {
    if (github) {
      window.open(github, '_blank', 'noopener,noreferrer');
    } else {
      setPopup({ isOpen: true, type: "code" });
    }
  };

  const handleDemoClick = (demo: string) => {
    if (demo) {
      window.open(demo, '_blank', 'noopener,noreferrer');
    } else {
      setPopup({ isOpen: true, type: "demo" });
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      <UnavailablePopup 
        isOpen={popup.isOpen} 
        onClose={() => setPopup({ ...popup, isOpen: false })} 
        type={popup.type} 
      />

      {/* Header */}
      <div className="space-y-2">
        <p className="text-gray-600 leading-relaxed">
          A collection of my projects spanning blockchain, IoT, full-stack development, and DevOps automation.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
            {projects.length} Projects
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-xs font-medium text-emerald-700">
            Blockchain
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-700">
            IoT
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-xs font-medium text-purple-700">
            Full-Stack
          </span>
          <span className="px-3 py-1 rounded-full bg-orange-100 text-xs font-medium text-orange-700">
            DevOps
          </span>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-6">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
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
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-500">{project.subtitle}</p>
                      </div>
                      <span className={`self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-white ${project.badgeBorder} ${project.badgeText}`}>
                        {project.category}
                      </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed">{project.description}</p>

                    <div className="flex items-center gap-6 text-xs text-gray-400 pt-2 border-t border-gray-50 mt-4">
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

                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-md bg-gray-50 text-gray-600 border border-gray-200 text-xs font-medium"
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
                          ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300" 
                          : "bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      <Github className="h-4 w-4" />
                      Code
                      {!project.github && <Info className="h-3 w-3 ml-1 opacity-50" />}
                    </button>
                    <button 
                      onClick={() => handleDemoClick(project.demo)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md ${
                        project.demo 
                          ? "bg-gray-900 text-white hover:bg-gray-800" 
                          : "bg-gray-300 text-gray-500 hover:bg-gray-400"
                      }`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
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
