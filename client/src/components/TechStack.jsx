import { motion } from "framer-motion";

const techStack = {
  Frontend: ["JavaScript", "React.js", "HTML", "CSS"],
  Backend: ["Node.js", "Express.js", "C#"],
  Database: ["MySQL", "PostgreSQL", "MongoDB"],
  Tools: ["VSCode", "Git", "GitHub"],
  "AI Integration": ["Ollama DeepSeek R1", "LLMs", "Prompt Engineering", "Machine Learning"],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function TechStack() {
  return (
    <section id="tech" className="section-container py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold"> Tech Stack</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground transition">
            View All →
          </button>
        </div>

        {/* Stack Sections */}
        <div className="space-y-8">
          {Object.entries(techStack).map(([category, items]) => (
            <motion.div
              key={category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-sm text-muted-foreground">{category}</h3>

              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={itemVariants}
                    className="px-4 py-2 text-sm rounded-full border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

