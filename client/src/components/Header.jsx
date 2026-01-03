import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Recommendations", href: "#recommendations" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100);

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Only hide/show after scrolling past 50px to avoid flickering at top
        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            // Scrolling down - partially hide navbar (keep bottom visible)
            setIsVisible(false);
          } else if (lastScrollY.current - currentScrollY > 5) {
            // Scrolling up - show navbar fully
            setIsVisible(true);
          }
        } else {
          // Always show navbar when near top
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      }
    };

    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(controlNavbar);
        ticking.current = true;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", requestTick, { passive: true });
      return () => {
        window.removeEventListener("scroll", requestTick);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const rect = el.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const elementAbsoluteTop = rect.top + currentScrollY;
      const navbarHeight = 100;
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0 pointer-events-none"
        } ${hasLoaded ? "" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={{
          transition: hasLoaded ? "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        {/* Main Navigation */}
        <div className="w-[90vw] max-w-xs md:max-w-4xl mx-auto">
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full px-4 py-3 md:px-6 md:py-2 shadow-lg dark:shadow-2xl">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={() => handleNav("#hero")}
                className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <span className="text-lg md:text-xl font-bold tracking-[0.2em] text-foreground">GLR</span>
                </div>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className="text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <button
                  className="relative bg-foreground dark:bg-white hover:bg-foreground/90 dark:hover:bg-gray-50 text-background dark:text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                  onClick={() => handleNav("#contact")}
                >
                  Get In Touch
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-foreground dark:text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden relative ${!isOpen ? 'pointer-events-none' : ''}`}>
          {/* Backdrop overlay */}
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
              isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          {/* Menu container */}
          <div
            className={`mt-2 w-[90vw] max-w-xs mx-auto transition-all duration-500 ease-out transform-gpu ${
              isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className={`text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/5 rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${
                      isOpen ? "animate-mobile-menu-item" : ""
                    }`}
                    style={{
                      animationDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <button
                  className={`relative bg-foreground dark:bg-white hover:bg-foreground/90 dark:hover:bg-gray-50 text-background dark:text-black font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer transform ${
                    isOpen ? "animate-mobile-menu-item" : ""
                  }`}
                  style={{
                    animationDelay: isOpen ? `${navItems.length * 80 + 150}ms` : "0ms",
                  }}
                  onClick={() => handleNav("#contact")}
                >
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

