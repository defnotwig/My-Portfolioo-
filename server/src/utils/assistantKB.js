// Expanded rule-based knowledge base and canned responses.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const KB = {
  greeting: ["hi", "hello", "hey", "hiya", "yo"],
  contact: ["contact", "email", "phone", "github", "linkedin", "social", "how to reach"],
  education: ["school", "college", "education", "degree", "bs", "bachelor", "study"],
  projects: ["project", "projects", "k-wise", "k-wise pc", "qr attendance", "pc build", "build kiosk", "qr attendance tracker"],
  skills: ["tech", "tech stack", "skills", "frontend", "backend", "react", "node", "javascript", "css", "html"],
  experience: ["experience", "work", "role", "position", "freelance", "qa", "developer"],
  personal_info: ["age", "old", "gender", "sex", "pronoun", "married"],
  availability: ["available", "hire", "hiring", "freelance", "open to work", "availability"],
  resume: ["resume", "cv", "curriculum", "download resume", "portfolio pdf"],
  certifications: ["certification", "certifications", "huawei", "google", "oracle", "testdome"],
  location: ["where", "location", "city", "calamba", "philippines", "timezone"],
  repo: ["github", "repo", "repository", "source code"],
  achievements: ["achievement", "awards", "results", "roi", "satisfaction"],
  project_details: ["k-wise details", "k-wise stats", "qr details", "pc build details"],
  thanks: ["thanks", "thank you", "thx"],
  unknown: []
};

function containsAny(text, arr) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return arr.some((s) => lower.includes(s));
}

// Load editable FAQ file (if present) so non-devs can update Q/A without code changes.
let faqList = [];
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const faqPath = path.join(__dirname, "../data/kb_faq.json");
  if (fs.existsSync(faqPath)) {
    const raw = fs.readFileSync(faqPath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) faqList = parsed;
  }
} catch (err) {
  console.error("[assistantKB] failed to load kb_faq.json:", err?.message || err);
}

export function findFAQAnswer(message) {
  if (!message || !message.trim()) return null;
  const m = message.toLowerCase();
  for (const entry of faqList) {
    const keys = entry.keywords || [];
    for (const k of keys) {
      if (m.includes(k.toLowerCase())) return entry.answer || null;
    }
  }
  return null;
}

export function classify(message) {
  if (!message || !message.trim()) return { intent: "empty", confidence: 1 };
  const m = message.trim().toLowerCase();

  if (/^\s*(hi|hello|hey|hiya|yo)\b/.test(m)) return { intent: "greeting", confidence: 0.99 };
  if (containsAny(m, KB.personal_info)) return { intent: "personal_info", confidence: 0.98 };
  if (containsAny(m, KB.contact)) return { intent: "contact", confidence: 0.95 };
  if (containsAny(m, KB.education)) return { intent: "education", confidence: 0.95 };
  if (containsAny(m, KB.projects)) return { intent: "projects", confidence: 0.94 };
  if (containsAny(m, KB.project_details)) return { intent: "project_details", confidence: 0.94 };
  if (containsAny(m, KB.skills)) return { intent: "skills", confidence: 0.93 };
  if (containsAny(m, KB.experience)) return { intent: "experience", confidence: 0.93 };
  if (containsAny(m, KB.availability)) return { intent: "availability", confidence: 0.92 };
  if (containsAny(m, KB.resume)) return { intent: "resume", confidence: 0.9 };
  if (containsAny(m, KB.certifications)) return { intent: "certifications", confidence: 0.9 };
  if (containsAny(m, KB.location)) return { intent: "location", confidence: 0.9 };
  if (containsAny(m, KB.repo)) return { intent: "repo", confidence: 0.9 };
  if (containsAny(m, KB.achievements)) return { intent: "achievements", confidence: 0.9 };
  if (containsAny(m, KB.thanks)) return { intent: "thanks", confidence: 0.9 };

  return { intent: "unknown", confidence: 0.5 };
}

export function answerForIntent(intent) {
  switch (intent) {
    case "greeting":
      return "Hello! I'm Gabriel's AI concierge — ask me about his projects, skills, education, or how to contact him.";
    case "contact":
      return (
        "Contact Gabriel: GitHub — https://github.com/defnotwig, LinkedIn — https://www.linkedin.com/in/glrrivera/, Email — ludwigrivera13@gmail.com, Phone — 09942372275."
      );
    case "education":
      return "Gabriel is pursuing a BS in Information Technology at the City College of Calamba (2022–Present).";
    case "projects":
      return (
        "Highlighted projects: K-WISE PC Builder Kiosk (campus kiosk with AI-driven builds), QR Attendance Tracker (C# WinForms), PC Build Optimizer (AI-guided). Ask for a specific project to get more details."
      );
    case "project_details":
      return (
        "K-WISE PC Builder Kiosk: multi-terminal campus kiosk with analytics-ready admin dashboard; notable stats reported include ~99.87% build pass, ~93.14% rule agreement, sub-2s AI responses, 3.80/4.0 satisfaction and ~1062% ROI. QR Attendance Tracker: C# / WinForms, QR-based logging/export."
      );
    case "skills":
      return (
        "Tech highlights: Frontend — JavaScript, React.js, HTML, CSS; Backend & DB — Node.js, Express.js, MySQL/Postgres/MongoDB; Tools — VSCode, Git/GitHub; AI & Systems — LLMs, prompt engineering, Ollama DeepSeek."
      );
    case "experience":
      return (
        "Experience highlights: Membership & Election Committee Head (CCC ITS, 2024–2025); Project Lead — K-WISE PC Builder Kiosk (2025); Developer — QR Attendance Tracker (2025); QA — Shopee Philippines (Apr–Oct 2022); Freelance Developer (2023–Present)."
      );
    case "personal_info":
      return (
        "Personal details such as age or gender are not included in Gabriel's professional portfolio. I can help with skills, projects, education, or contact info."
      );
    case "availability":
      return (
        "Availability for work or freelance is not explicitly listed in the portfolio. For inquiries, please reach out via the contact methods (GitHub/LinkedIn/email) and Gabriel will respond if available."
      );
    case "resume":
      return (
        "A downloadable resume isn't provided directly on the portfolio. You can find Gabriel's public work on GitHub (https://github.com/defnotwig) and LinkedIn (https://www.linkedin.com/in/glrrivera/); contact him for a formal resume."
      );
    case "certifications":
      return (
        "Certifications mentioned: Huawei Developer Expert, Generative AI Leader (Google), Generative AI Professional (Oracle), Software Engineering (TestDome)."
      );
    case "location":
      return "Gabriel is based in Calamba, Philippines. For timezone-specific scheduling please contact him via LinkedIn or email to confirm.";
    case "repo":
      return "Gabriel's public code can be found at https://github.com/defnotwig — check the repositories for project examples and code samples.";
    case "achievements":
      return (
        "Notable outcomes: K-WISE reported strong build pass and satisfaction metrics, and project-level ROI and payback were highlighted in project summaries. Ask which metric you want more detail about."
      );
    case "thanks":
      return "You're welcome — glad to help!";
    case "empty":
      return "Please type a message and I'll route it properly.";
    default:
      return null;
  }
}

export default { classify, answerForIntent, findFAQAnswer };
