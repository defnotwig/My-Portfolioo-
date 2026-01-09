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

// Single Container Component with All Social Links - Simplified without nested boxes
export default function SocialLinks() {
  return (
    <section id="contact" className="section-container py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold mb-8 text-foreground">Connect</h2>

        {/* Single Glassmorphism Container - No nested boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass-strong p-8 md:p-10"
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') || social.href.startsWith('tel:') ? '_self' : '_blank'}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  aria-label={social.label}
                >
                  {/* Circle icon only - no box wrapper */}
                  <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-4 md:p-5 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-medium text-foreground/80 dark:text-white/80 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
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


