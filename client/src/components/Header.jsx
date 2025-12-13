import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Recommendations", href: "#recommendations" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="section-container flex items-center justify-between py-4">
        <button
          onClick={() => handleNav("#hero")}
          className="text-sm font-bold tracking-[0.2em] text-foreground hover:text-blue-600 transition-colors"
        >
          GLR
        </button>
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleNav(item.href)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <Button
          variant="default"
          onClick={() => handleNav("#contact")}
          className="rounded-full"
        >
          Schedule a Call
        </Button>
      </div>
    </header>
  );
}

