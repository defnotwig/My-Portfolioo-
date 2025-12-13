import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Mail, Linkedin, Github, ChevronDown, Moon, Sun } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Hero({ about }) {
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

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
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mb-6"
        >
          <Avatar className="h-32 w-32 border-4 border-white shadow-xl dark:border-gray-700">
            <AvatarImage src="/images/profile.jpg" alt={about.name} />
            <AvatarFallback className="text-2xl font-bold">GLR</AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name and Dark Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-2"
        >
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{about.name}</h1>
            <CheckCircle2 className="h-6 w-6 text-blue-500 fill-blue-500" />
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-sm text-muted-foreground mb-2"
        >
          📍 {about.location}
        </motion.p>

        {/* Roles and Achievements Dropdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-sm font-medium">
            Software Engineer | BSIT Student
          </p>
          <div className="relative">
            <button
              onClick={() => setAchievementsOpen(!achievementsOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Ship or Be Shipped 2025 Hackathon Participant
              <ChevronDown className={`h-4 w-4 transition-transform ${achievementsOpen ? 'rotate-180' : ''}`} />
            </button>
            {achievementsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">
                <h3 className="font-semibold mb-3">Other Achievements</h3>
                <ul className="space-y-2">
                  {achievements.slice(1).map((achievement, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
            variant="default"
            className="rounded-full"
            asChild
          >
            <a href="mailto:ludwigrivera13@gmail.com">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </a>
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            asChild
          >
            <a href="https://www.linkedin.com/in/glrrivera/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            asChild
          >
            <a href="https://github.com/defnotwig" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
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

