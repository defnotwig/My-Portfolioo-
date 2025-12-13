import { Github, Linkedin, Mail, Facebook, Phone } from "lucide-react";

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
    // Opens a new Gmail compose window addressed to Gabriel
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ludwigrivera13@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    href: "tel:09942372275",
    icon: Phone,
  },
];

export default function SocialLinks() {
  return (
    <section id="contact" className="section-container py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-8">Social Links</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="glass-card border-2 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center gap-3 text-center group"
            >
              <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg group-hover:scale-110 transition">
                <social.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-semibold">{social.label}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

