import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const icons = ["🎓", "🧠", "⚙️", "🚀"];

export default function About({ about, experience }) {
  if (!about) return null;

  return (
    <section id="about" className="section-container py-16">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">About</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 space-y-4"
          >
            {about.paragraphs?.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-foreground">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Experience column */}
        {/* Experience Section */}
        <div id="experience">
          <h2 className="text-2xl font-bold mb-6"> Experience</h2>
          <div className="relative border-l-2 border-gray-300 dark:border-gray-700 pl-8">
            {experience?.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative mb-8 last:mb-0"
              >
                {/* Dot */}
                <span
                  className={`absolute -left-[42px] top-1 h-5 w-5 rounded-full border-4 ${
                    index === 0
                      ? "bg-black dark:bg-white border-black dark:border-white"
                      : "bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600"
                  }`}
                />
                
                {/* Content */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.organization}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {role.timeframe}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// Remove the old Experience component structure below


