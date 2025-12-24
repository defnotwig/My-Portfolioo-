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
    href: "mailto:ludwigrivera13@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    href: "tel:+639942372275",
    icon: Phone,
  },
];

// Single Container Component with All Social Links
export default function SocialLinks() {
  return (
    <section id="contact" className="section-container py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold mb-8 text-foreground">Connect</h2>

        {/* Single Glassmorphism Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass-strong p-6 md:p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
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
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="social-link-card flex flex-col items-center justify-center gap-4 p-6 md:p-8 cursor-pointer group rounded-2xl liquid-glass transition-all duration-300 hover:shadow-xl min-h-[140px] md:min-h-[160px]"
                  aria-label={social.label}
                >
                  <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-4 md:p-5 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 md:h-8 md:w-8 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-medium text-foreground/90 dark:text-white/90 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
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

