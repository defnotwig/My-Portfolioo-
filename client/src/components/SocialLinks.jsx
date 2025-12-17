import { Github, Linkedin, Mail, Facebook, Phone } from "lucide-react";
import { motion } from "framer-motion";

// Social Links Data
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/defnotwig",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/glrrivera/",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ludwig.rivera.1/",
    icon: Facebook,
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ludwigrivera13@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    href: "tel:09942372275",
    icon: Phone,
  },
];

// Single Container Component with All Social Links
export default function SocialLinks() {
  return (
    <section id="contact" className="section-container py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold mb-8 text-foreground">Connect</h2>

        {/* Single Glassmorphism Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass-strong p-8 md:p-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="flex flex-col items-center gap-4 p-8 cursor-pointer group"
                  aria-label={social.label}
                >
                  <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-5 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <Icon className="h-8 w-8 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-medium text-foreground/90 dark:text-white/90 group-hover:text-blue-500 transition-colors">
                    {social.label}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

