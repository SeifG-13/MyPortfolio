import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, GraduationCap, Briefcase, Award, Code2, Server, Cloud, Database, Cpu, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@assets/images/profile.png";

const skills = [
  { category: "Backend", items: ["ASP.NET Core", "Node.js", "Go (Gin)", "REST APIs"], icon: Server, color: "blue" },
  { category: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS", "Flutter"], icon: Code2, color: "purple" },
  { category: "Cloud & DevOps", items: ["Azure (AZ-900)", "Docker", "GitLab CI/CD", "Kubernetes", "Terraform"], icon: Cloud, color: "cyan" },
  { category: "Data & DB", items: ["PostgreSQL", "MongoDB", "Hadoop", "SQL Server", "Spark", "Kafka"], icon: Database, color: "green" },
  { category: "Blockchain & IoT", items: ["Hyperledger Fabric", "IPFS", "Arduino", "ESP32", "MQTT", "Node-RED"], icon: Cpu, color: "orange" },
];

const experience = [
  { 
    role: "Final Year Project - AgriTrace", 
    company: "NOVEL-TI", 
    location: "Sfax, Tunisia",
    period: "Feb - Jun 2025",
    description: "Blockchain-based food traceability solution using Hyperledger Fabric, Go smart contracts, IPFS, and React/TypeScript interface.",
    type: "internship"
  },
  { 
    role: "Development Internship", 
    company: "Get Wireless", 
    location: "Tunis, Tunisia",
    period: "Jun - Jul 2024",
    description: "Smart home management app with real-time IoT integration using Flutter, Dart, Arduino, and Firebase.",
    type: "internship"
  },
  { 
    role: "Web Development Internship", 
    company: "AURES", 
    location: "Kebili, Tunisia",
    period: "Jul - Aug 2023",
    description: "Full-stack e-commerce platform with PERN Stack (PostgreSQL, Express.js, React, Node.js).",
    type: "internship"
  }
];

const education = [
  {
    degree: "Engineering Degree in Computer Science",
    school: "ENSI - National School of Computer Science",
    period: "2022 - 2025",
    specialization: "Embedded Systems and Connected Networks (IoT)",
    honors: "Honors"
  },
  {
    degree: "Preparatory Classes",
    school: "IPEIM",
    period: "2020 - 2022",
    specialization: "Mathematics and Physics",
    honors: "Honors"
  }
];

export function About() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("seif.benali@ensi-uma.tn");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      // Fallback for older browsers
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

  return (
    <div className="space-y-8 pb-20">
      {/* Header Profile */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-xl border-4 border-white">
          <img 
            src={profileImage} 
            alt="Seif BEN ALI" 
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-gray-900">Seif BEN ALI</h3>
          <p className="text-base font-medium text-primary">Software & DevOps Engineer</p>
          <p className="text-sm text-gray-500">Kebili, Tunisia 🇹🇳</p>
        </div>
      </div>

      {/* Bio */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 border border-blue-100">
        <p className="text-base leading-relaxed text-gray-700">
          Computer Engineering graduate from <span className="font-semibold text-primary">ENSI</span>, specialized in distributed systems, blockchain technologies, and IoT. 
          Experienced in building scalable backend solutions, implementing CI/CD pipelines, and deploying containerized applications on cloud platforms.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center border border-blue-100">
          <h4 className="text-2xl font-bold text-primary">3+</h4>
          <p className="text-xs font-medium text-blue-600/80">Years Exp.</p>
        </div>
        <div className="rounded-2xl bg-green-50 p-4 text-center border border-green-100">
          <h4 className="text-2xl font-bold text-green-600">10+</h4>
          <p className="text-xs font-medium text-green-600/80">Projects</p>
        </div>
        <div className="rounded-2xl bg-purple-50 p-4 text-center border border-purple-100">
          <h4 className="text-2xl font-bold text-purple-600">9+</h4>
          <p className="text-xs font-medium text-purple-600/80">Certification</p>
        </div>
      </div>

      {/* Azure Certification */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">
            <Award className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white/80 uppercase tracking-wide">Microsoft Certified</p>
            <h4 className="text-lg font-bold">Azure Fundamentals (AZ-900)</h4>
          </div>
          <Cloud className="h-8 w-8 text-white/60" />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          Technical Skills
        </h3>
        <div className="space-y-3">
          {skills.map((skillGroup, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-8 w-8 rounded-lg bg-${skillGroup.color}-100 flex items-center justify-center`}>
                  <skillGroup.icon className={`h-4 w-4 text-${skillGroup.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-900">{skillGroup.category}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, j) => (
                  <span 
                    key={j} 
                    className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
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
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Experience
        </h3>
        <div className="space-y-4">
          {experience.map((job, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{job.role}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${
                      job.type === 'project' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary">{job.company}</p>
                  <p className="text-xs text-gray-400">{job.location}</p>
                </div>
                <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{job.period}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education
        </h3>
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-sm text-primary">{edu.school}</p>
                </div>
                <span className="text-xs font-medium text-gray-400">{edu.period}</span>
              </div>
              <p className="text-xs text-gray-500">{edu.specialization}</p>
              {edu.honors && (
                <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-medium">
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
        <h3 className="text-xl font-bold text-gray-900">Languages</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 p-4 text-center border border-gray-100">
            <span className="text-2xl mb-2 block">🇹🇳</span>
            <p className="text-sm font-semibold text-gray-900">Arabic</p>
            <p className="text-xs text-gray-500">Native</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 text-center border border-gray-100">
            <span className="text-2xl mb-2 block">🇫🇷</span>
            <p className="text-sm font-semibold text-gray-900">French</p>
            <p className="text-xs text-gray-500">Conversational</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 text-center border border-gray-100">
            <span className="text-2xl mb-2 block">🇬🇧</span>
            <p className="text-sm font-semibold text-gray-900">English</p>
            <p className="text-xs text-gray-500">Conversational</p>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="flex justify-center gap-4 pt-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
          onClick={() => window.open('https://github.com/SeifG-13', '_blank')}
        >
          <Github className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
          onClick={() => window.open('https://linkedin.com/in/seif-ben-ali', '_blank')}
        >
          <Linkedin className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full h-12 w-12 border-gray-200 transition-all ${
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