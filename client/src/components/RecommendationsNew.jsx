import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TestimonialCard = ({ text, name, role }) => {
  return (
    <div
      className="glass-card p-8 md:p-10 max-w-xs w-full mx-auto"
    >
      <div className="text-foreground text-sm md:text-base leading-relaxed mb-6">
        "{text}"
      </div>
      <div className="mt-5">
        <div className="font-semibold tracking-tight text-foreground">{name}</div>
        <div className="text-sm text-muted-foreground mt-1">{role}</div>
      </div>
    </div>
  );
};

const TestimonialsColumn = ({ testimonials, duration = 15, className = "" }) => {
  return (
    <div className={`relative overflow-hidden h-[600px] md:h-[700px] ${className}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex flex-col gap-6">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={`${arrayIndex}-${i}`}
                text={testimonial.text}
                name={testimonial.name}
                role={testimonial.role}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Recommendations() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up");
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Original 3 recommendations - single source of truth
  const testimonials = [
    {
      text: "Gabriel is one of those students who quietly ships solid work. His projects are clean, reliable, and easy to maintain.",
      name: "Jasper Garcia",
      role: "Professor, City College of Calamba",
    },
    {
      text: "He handled our student org systems with a good balance of leadership and discipline. Processes became smoother and easier to track.",
      name: "Regina Almonte",
      role: "Research Adviser, City College of Calamba",
    },
    {
      text: "Gabriel is dependable and quick to respond. When we need dashboards or automations updated, he gets them done without fuss.",
      name: "Arlou Fernando",
      role: "Dean, DCI, City College of Calamba",
    },
  ];

  return (
    <section id="recommendations" ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(currentColor 1px, transparent 1px),
              linear-gradient(90deg, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="fade-in-element opacity-0 translate-y-8 inline-flex items-center gap-3 text-muted-foreground text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-border"></div>
            Recommendations
            <div className="w-8 h-px bg-border"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 tracking-tight">
            The people I've <span className="font-semibold italic gradient-text">worked with</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover what colleagues, professors, and clients say about my output
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="fade-in-element opacity-0 translate-y-8 relative flex justify-center items-center min-h-[600px] md:min-h-[700px] overflow-hidden"
        >
          <div
            className="flex gap-6 md:gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials} duration={22} className="flex-1" />
            <TestimonialsColumn
              testimonials={[testimonials[2], testimonials[0], testimonials[1]]}
              duration={18}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={[testimonials[1], testimonials[2], testimonials[0]]}
              duration={26}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
