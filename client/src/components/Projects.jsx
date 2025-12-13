import { motion } from "framer-motion";

const projects = [
  {
    name: "K-WISE PC Builder Kiosk",
    description: "Self-service Kiosk PC Build with AI-Enhanced with 3,200+ Rules + DeepSeek R1 Model",
    url: "github.com/defnotwig/KWise-Final",
    link: "https://github.com/defnotwig/KWise-Final",
  },
  {
    name: "Attendance and Payroll Management System",
    description: "Full-stack solution for streamlined attendance tracking and payroll processing",
    url: "github.com/defnotwig/Attendance-and-Payroll",
    link: "https://github.com/defnotwig/Attendance-and-Payroll-Management-System",
  },
  {
    name: "Real-Time FX Fee Transparency Widget",
    description: "AI-powered FX Fee Widget",
    url: "github.com/defnotwig/FX-Widget",
    link: "https://github.com/defnotwig/Real-Time-FX---Fee-Transparency-Widget",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  return (
    <section id="projects" className="section-container py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground transition">
            View All →
          </button>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.a
              key={project.name}
              variants={cardVariants}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="group rounded-xl border bg-white dark:bg-gray-800 p-6 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-lg mb-2 group-hover:underline">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <span className="inline-block text-xs px-3 py-1.5 rounded-full border text-muted-foreground">
                {project.url}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

