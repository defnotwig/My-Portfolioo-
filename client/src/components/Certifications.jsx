import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    link: "https://www.credly.com/badges/7baadbce-e7c7-4b9e-ad53-8452c7d1ab79/",
  },
  {
    title: "Backend Engineer Learning Path",
    issuer: "Datadog",
    link: "https://www.credly.com/badges/98e7c24a-e409-4d37-ad37-c5015c9be03d/",
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

export default function Certifications() {
  return (
    <section id="certifications" className="section-container py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-8">Certifications</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {certifications.map((cert) => (
            <motion.a
              key={cert.title}
              variants={cardVariants}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="group glass-card border-2 p-6 rounded-xl hover:shadow-lg transition-all flex items-start justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 group-hover:underline">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

