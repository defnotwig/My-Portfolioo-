import { memo } from "react";
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
    url: "Attendance-and-Payroll-Management-System.vercel.app",
    link: "https://employee-frontend-eight-rust.vercel.app/",
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

const Projects = memo(function Projects() {
  return (
    <section id="projects" className="section-container py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Recent Projects</h2>
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
              whileHover={{ y: -6, scale: 1.02 }}
              className="group glass-card p-6 transition-all cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-3 text-foreground group-hover:text-blue-500 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              <span className="inline-block text-xs px-3 py-1.5 rounded-full liquid-glass-btn text-foreground">
                {project.url}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default Projects;

