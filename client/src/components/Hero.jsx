import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, ChevronDown, Moon, Sun } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// iOS-style verified badge component
const VerifiedBadge = () => (
  <svg 
    className="h-6 w-6 flex-shrink-0" 
    viewBox="0 0 24 24" 
    fill="none"
    aria-label="Verified"
  >
    <circle cx="12" cy="12" r="10" fill="#3B82F6" />
    <path 
      d="M8 12l2.5 2.5L16 9" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// iOS-style location pin
const LocationPin = () => (
  <span className="inline-flex items-center" role="img" aria-label="Location">
    <svg className="h-4 w-4 mr-1.5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </span>
);

export default function Hero({ about }) {
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("glr-theme") || "light";
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.localStorage.setItem("glr-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!about) return null;

  const achievements = [
    "Ship or Be Shipped 2025 Hackathon Participant",
    "Techno Expo Excellence in Innovation Award",
    "Best in Capstone Project Award 2025",
    "Top 1 Performing Student 3rd Year 2025",
    "Top 4 Performing Student 2nd Year 2024"
  ];

  return (
    <section className="section-container py-12" id="hero">
      <div className="mx-auto max-w-3xl">
        {/* Profile Picture with hover effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mb-6 group"
        >
          <div className="relative h-32 w-32">
            {/* Light mode default */}
            <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 dark:opacity-0">
              <AvatarImage src="/images/profile.jpg" alt={about.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            {/* Light mode hover */}
            <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 dark:opacity-0 dark:group-hover:opacity-0">
              <AvatarImage src="/images/me formal hover.png" alt={about.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            {/* Dark mode default */}
            <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 opacity-0 dark:opacity-100 dark:group-hover:opacity-0">
              <AvatarImage src="/images/me formal black.png" alt={about.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            {/* Dark mode hover */}
            <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 opacity-0 dark:group-hover:opacity-100">
              <AvatarImage src="/images/me formal black hover.png" alt={about.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Name and Verified Badge + Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-2"
        >
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">{about.name}</h1>
            <VerifiedBadge />
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full liquid-glass-btn hover:scale-110 transition-all"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </motion.div>

        {/* Location with iOS-style pin */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-sm text-muted-foreground mb-2 flex items-center"
        >
          <LocationPin />
          {about.location}
        </motion.p>

        {/* Roles and Achievements Dropdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6"
        >
          <p className="text-sm font-medium text-foreground/85">
            Software Engineer | BSIT Student
          </p>
          <div className="relative">
            <button
              onClick={() => setAchievementsOpen(!achievementsOpen)}
              className="flex items-center gap-2 px-4 py-2.5 liquid-glass-btn text-sm hover:scale-[1.02] transition-all border border-white/20 dark:border-white/10"
            >
              <span className="text-foreground font-medium">{achievements[0]}</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${achievementsOpen ? 'rotate-180' : ''}`} />
            </button>
            {achievementsOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-2 w-80 liquid-glass-strong rounded-2xl p-5 z-50"
              >
                <h3 className="font-semibold mb-3 text-foreground text-sm">Achievements & Awards</h3>
                <ul className="space-y-2.5">
                  {achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2.5 text-foreground">
                      <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <Button
            className="bg-foreground dark:bg-white hover:bg-foreground/90 dark:hover:bg-gray-50 text-background dark:text-black rounded-full px-5 py-2.5 hover:scale-105 transition-all font-medium"
            asChild
          >
            <a href="mailto:ludwigrivera13@gmail.com">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </a>
          </Button>
          <Button
            variant="outline"
            className="liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full px-5 py-2.5 hover:scale-105 transition-all font-medium"
            asChild
          >
            <a href="https://www.linkedin.com/in/glrrivera/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button
            variant="outline"
            className="liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full px-5 py-2.5 hover:scale-105 transition-all font-medium"
            asChild
          >
            <a href="https://github.com/defnotwig" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            className="liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full px-5 py-2.5 hover:scale-105 transition-all font-medium"
            asChild
          >
            <a href="/CV_Rivera_Gabriel_Ludwig_R..pdf" download>
              Download CV
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

