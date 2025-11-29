import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, MapPin, Linkedin, Github, CheckCircle, ExternalLink, Download, Loader2, AlertCircle, Copy, Check } from "lucide-react";
import cvEnglish from "@assets/cv/cv_en.pdf";
import cvFrench from "@assets/cv/cv_fr.pdf";
import { useSettings } from "@/context/SettingsContext"; // Import Context

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const { language, isRTL } = useSettings(); // Use Global Settings

  // ✅ Use environment variable for API key
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  // --- LOCALIZED CONTENT ---
  const t = {
    en: {
      header: "Let's Work Together",
      subHeader: "I'm currently available for freelance work and full-time positions. Let's build something amazing!",
      linkedin: "Connect",
      github: "Follow",
      copy: "Click to copy",
      copied: "Copied!",
      locationTitle: "Location",
      location: "Kebili, Tunisia 🇹🇳",
      cvTitle: "Download my CV",
      cvSub: "Get the full details of my experience and skills",
      sendMessage: "Send a Message",
      placeholders: {
        name: "Your Name",
        email: "Email Address",
        message: "Tell me about your project or opportunity..."
      },
      btnSend: "Send Message",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successMsg: "Thank you! I'll get back to you as soon as possible.",
      btnNew: "Send Another Message",
      errorTitle: "Oops!",
      btnRetry: "Try Again",
      available: "Currently",
      availableState: "available",
      availableFor: "for new opportunities"
    },
    fr: {
      header: "Travaillons Ensemble",
      subHeader: "Je suis actuellement disponible pour des missions freelance et des postes à temps plein. Créons quelque chose d'incroyable !",
      linkedin: "Se connecter",
      github: "Suivre",
      copy: "Cliquez pour copier",
      copied: "Copié !",
      locationTitle: "Localisation",
      location: "Kébili, Tunisie 🇹🇳",
      cvTitle: "Télécharger mon CV",
      cvSub: "Obtenez tous les détails de mon expérience et de mes compétences",
      sendMessage: "Envoyer un message",
      placeholders: {
        name: "Votre Nom",
        email: "Adresse Email",
        message: "Parlez-moi de votre projet ou opportunité..."
      },
      btnSend: "Envoyer",
      sending: "Envoi...",
      successTitle: "Message Envoyé !",
      successMsg: "Merci ! Je vous répondrai dès que possible.",
      btnNew: "Envoyer un autre",
      errorTitle: "Oups !",
      btnRetry: "Réessayer",
      available: "Actuellement",
      availableState: "disponible",
      availableFor: "pour de nouvelles opportunités"
    },
    ar: {
      header: "لنعمل معاً",
      subHeader: "أنا متاح حالياً للعمل الحر والوظائف بدوام كامل. دعنا نبني شيئاً مذهلاً!",
      linkedin: "تواصل",
      github: "تابعني",
      copy: "انقر للنسخ",
      copied: "تم النسخ!",
      locationTitle: "الموقع",
      location: "قبلي، تونس 🇹🇳",
      cvTitle: "تحميل السيرة الذاتية",
      cvSub: "احصل على التفاصيل الكاملة لخبرتي ومهاراتي",
      sendMessage: "إرسال رسالة",
      placeholders: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "حدثني عن مشروعك أو الفرصة المتاحة..."
      },
      btnSend: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      successTitle: "تم الإرسال!",
      successMsg: "شكراً لك! سأرد عليك في أقرب وقت ممكن.",
      btnNew: "إرسال رسالة أخرى",
      errorTitle: "عفواً!",
      btnRetry: "حاول مرة أخرى",
      available: "حالياً",
      availableState: "متاح",
      availableFor: "لفرص عمل جديدة"
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setErrorMessage("Contact form is not configured. Please email me directly.");
      return;
    }
    
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          from_name: "Portfolio Contact Form",
          subject: `New message from ${formState.name} - Portfolio`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Error sending message");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send. Please try again or email me directly.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if(type === 'email') setCopiedEmail(true); else setCopiedPhone(true);
      setTimeout(() => { if(type === 'email') setCopiedEmail(false); else setCopiedPhone(false); }, 2000);
    } catch (err) {
       // Fallback logic kept simple for brevity
       const textArea = document.createElement("textarea");
       textArea.value = text;
       document.body.appendChild(textArea);
       textArea.select();
       document.execCommand("copy");
       document.body.removeChild(textArea);
       if(type === 'email') setCopiedEmail(true); else setCopiedPhone(true);
       setTimeout(() => { if(type === 'email') setCopiedEmail(false); else setCopiedPhone(false); }, 2000);
    }
  };

  return (
    <div className="space-y-8 pb-20" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-center text-white shadow-lg">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Mail className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold">{t.header}</h3>
        <p className="mt-2 text-sm text-white/80">{t.subHeader}</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="https://linkedin.com/in/seif-ben-ali"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/50 transition-all group"
        >
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Linkedin className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0 text-start">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">LinkedIn</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{t.linkedin}</p>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500" />
        </a>
        
        <a
          href="https://github.com/SeifG-13"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500 transition-all group"
        >
          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:bg-gray-900 group-hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0 text-start">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">GitHub</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{t.github}</p>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-white" />
        </a>
      </div>

      {/* Contact Info */}
      <div className="space-y-3">
        <button 
          onClick={() => copyToClipboard("seif.benali@ensi-uma.tn", 'email')}
          className="w-full flex items-center gap-4 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/50 transition-all group text-start"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            copiedEmail 
              ? "bg-green-500 text-white" 
              : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
          }`}>
            {copiedEmail ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
              {copiedEmail ? t.copied : `Email (${t.copy})`}
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">seif.benali@ensi-uma.tn</p>
          </div>
          <div className={`transition-colors ${copiedEmail ? "text-green-500" : "text-gray-300 dark:text-gray-600 group-hover:text-blue-500"}`}>
            {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </div>
        </button>
        
        <button 
          onClick={() => copyToClipboard("+21655845694", 'phone')}
          className="w-full flex items-center gap-4 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-500/50 transition-all group text-start"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            copiedPhone 
              ? "bg-green-500 text-white" 
              : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white"
          }`}>
            {copiedPhone ? <Check className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
              {copiedPhone ? t.copied : `Phone (${t.copy})`}
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">(+216) 55 845 694</p>
          </div>
          <div className={`transition-colors ${copiedPhone ? "text-green-500" : "text-gray-300 dark:text-gray-600 group-hover:text-green-500"}`}>
            {copiedPhone ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </div>
        </button>

        <div className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm text-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">{t.locationTitle}</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.location}</p>
          </div>
        </div>
      </div>

      {/* Download CV */}
      <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 text-center">
        <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-300">
          <Download className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{t.cvTitle}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t.cvSub}</p>
        <div className="flex gap-2 justify-center">
          <a href={cvEnglish} download="Seif_BEN_ALI_CV_EN.pdf">
            <Button variant="outline" size="sm" className="rounded-lg text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:bg-transparent dark:text-white dark:border-white/20">
              🇬🇧 English
            </Button>
          </a>
          <a href={cvFrench} download="Seif_BEN_ALI_CV_FR.pdf">
            <Button variant="outline" size="sm" className="rounded-lg text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:bg-transparent dark:text-white dark:border-white/20">
              🇫🇷 Français
            </Button>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t.sendMessage}</h3>
        
        {status === "success" ? (
          <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 p-6 text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 dark:text-green-400 mb-3" />
            <h4 className="text-lg font-semibold text-green-800 dark:text-green-300">{t.successTitle}</h4>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {t.successMsg}
            </p>
            <button
              onClick={resetForm}
              className="mt-4 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
            >
              {t.btnNew}
            </button>
          </div>
        ) : status === "error" ? (
          <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 p-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 dark:text-red-400 mb-3" />
            <h4 className="text-lg font-semibold text-red-800 dark:text-red-300">{t.errorTitle}</h4>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errorMessage}</p>
            <button
              onClick={resetForm}
              className="mt-4 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-300 text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
            >
              {t.btnRetry}
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input 
              placeholder={t.placeholders.name} 
              className="h-12 rounded-xl border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 dark:text-white focus:bg-white dark:focus:bg-white/10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              value={formState.name}
              onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
              required
              disabled={status === "loading"}
            />
            <Input 
              placeholder={t.placeholders.email}
              type="email" 
              className="h-12 rounded-xl border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 dark:text-white focus:bg-white dark:focus:bg-white/10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 text-start" 
              value={formState.email}
              onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
              required
              disabled={status === "loading"}
            />
            <Textarea 
              placeholder={t.placeholders.message}
              className="min-h-[140px] resize-none rounded-xl border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 dark:text-white focus:bg-white dark:focus:bg-white/10 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              value={formState.message}
              onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
              required
              disabled={status === "loading"}
            />
            <Button 
              type="submit"
              disabled={status === "loading"}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-70 text-white"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.sending}
                </>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {t.btnSend}
                  <Send className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              )}
            </Button>
          </form>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center justify-center gap-2 py-4">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {t.available} <span className="text-green-600 dark:text-green-400 font-semibold">{t.availableState}</span> {t.availableFor}
        </span>
      </div>
    </div>
  );
}