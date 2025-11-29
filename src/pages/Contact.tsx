import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, MapPin, Linkedin, Github, CheckCircle, ExternalLink, Download, Loader2, AlertCircle, Copy, Check } from "lucide-react";
import cvEnglish from "@assets/cv/cv_en.pdf";
import cvFrench from "@assets/cv/cv_fr.pdf";

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

  // ✅ Use environment variable for API key
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if API key is configured
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("seif.benali@ensi-uma.tn");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
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

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText("+21655845694");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = "+21655845694";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-center text-white shadow-lg">
        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Mail className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold">Let's Work Together</h3>
        <p className="mt-2 text-sm text-white/80">
          I'm currently available for freelance work and full-time positions. Let's build something amazing!
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="https://linkedin.com/in/seif-ben-ali"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
        >
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Linkedin className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-400">LinkedIn</p>
            <p className="text-sm font-semibold text-gray-900 truncate">Connect</p>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-blue-500" />
        </a>
        
        <a
          href="https://github.com/SeifG-13"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
        >
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-400">GitHub</p>
            <p className="text-sm font-semibold text-gray-900 truncate">Follow</p>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-gray-700" />
        </a>
      </div>

      {/* Contact Info */}
      <div className="space-y-3">
        <button 
          onClick={copyEmail}
          className="w-full flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group text-left"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            copiedEmail 
              ? "bg-green-500 text-white" 
              : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
          }`}>
            {copiedEmail ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400">
              {copiedEmail ? "Copied!" : "Email (Click to copy)"}
            </p>
            <p className="text-sm font-semibold text-gray-900">seif.benali@ensi-uma.tn</p>
          </div>
          <div className={`transition-colors ${copiedEmail ? "text-green-500" : "text-gray-300 group-hover:text-blue-500"}`}>
            {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </div>
        </button>
        
        <button 
          onClick={copyPhone}
          className="w-full flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all group text-left"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            copiedPhone 
              ? "bg-green-500 text-white" 
              : "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white"
          }`}>
            {copiedPhone ? <Check className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400">
              {copiedPhone ? "Copied!" : "Phone (Click to copy)"}
            </p>
            <p className="text-sm font-semibold text-gray-900">(+216) 55 845 694</p>
          </div>
          <div className={`transition-colors ${copiedPhone ? "text-green-500" : "text-gray-300 group-hover:text-green-500"}`}>
            {copiedPhone ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </div>
        </button>

        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400">Location</p>
            <p className="text-sm font-semibold text-gray-900">Kebili, Tunisia 🇹🇳</p>
          </div>
        </div>
      </div>

      {/* Download CV */}
      <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
        <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
          <Download className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-semibold text-gray-900 mb-1">Download my CV</h4>
        <p className="text-xs text-gray-500 mb-4">Get the full details of my experience and skills</p>
        <div className="flex gap-2 justify-center">
          <a href={cvEnglish} download="Seif_BEN_ALI_CV_EN.pdf">
            <Button variant="outline" size="sm" className="rounded-lg text-xs hover:bg-blue-50">
              🇬🇧 English
            </Button>
          </a>
          <a href={cvFrench} download="Seif_BEN_ALI_CV_FR.pdf">
            <Button variant="outline" size="sm" className="rounded-lg text-xs hover:bg-blue-50">
              🇫🇷 Français
            </Button>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Send a Message</h3>
        
        {status === "success" ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3" />
            <h4 className="text-lg font-semibold text-green-800">Message Sent!</h4>
            <p className="text-sm text-green-600 mt-1">
              Thank you! I'll get back to you as soon as possible.
            </p>
            <button
              onClick={resetForm}
              className="mt-4 px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : status === "error" ? (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-3" />
            <h4 className="text-lg font-semibold text-red-800">Oops!</h4>
            <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            <button
              onClick={resetForm}
              className="mt-4 px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input 
              placeholder="Your Name" 
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-colors" 
              value={formState.name}
              onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
              required
              disabled={status === "loading"}
            />
            <Input 
              placeholder="Email Address" 
              type="email" 
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-colors" 
              value={formState.email}
              onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
              required
              disabled={status === "loading"}
            />
            <Textarea 
              placeholder="Tell me about your project or opportunity..." 
              className="min-h-[140px] resize-none rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-colors" 
              value={formState.message}
              onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
              required
              disabled={status === "loading"}
            />
            <Button 
              type="submit"
              disabled={status === "loading"}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center justify-center gap-2 py-4">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        <span className="text-sm font-medium text-gray-600">
          Currently <span className="text-green-600 font-semibold">available</span> for new opportunities
        </span>
      </div>
    </div>
  );
}