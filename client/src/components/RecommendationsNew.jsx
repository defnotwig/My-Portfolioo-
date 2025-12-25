import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

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

// Fallback data in case API fails
const fallbackTestimonials = [
  {
    text: "Gabriel is a good student and software developer who shows professionalism and dedication in whatever he does. His software projects during his academic years are up to standard and is being used by our department for some of its operations. Gabriel also demonstrated social awareness and leadership skills through his involvement as an officer in the CCC IT Society.",
    name: "Jasper Garcia, MIT",
    role: "Professor, Former Adviser of CCC ITS, City College of Calamba",
  },
  {
    text: "Gabriel has shown remarkable growth from his freshman year in Introduction to Programming to now leading the development of the K-WISE PC Builder Kiosk. His foundational logic and problem-solving skills have evolved impressively. As their Research Adviser, I've witnessed how he guides his team through systematic development and rigorous mock defenses.",
    name: "Regina Almonte, PhD",
    role: "Research Adviser & Professor, City College of Calamba",
  },
  {
    text: "Gabriel demonstrated exceptional technical competence during our Capstone Defense panels. His ability to articulate system architecture and handle complex questions shows his deep understanding of software development. He's dependable and consistently delivers quality work for dashboards and automation systems.",
    name: "Arlou Fernando, MIT",
    role: "Dean, DCI & Lead Capstone Panel, City College of Calamba",
  },
  {
    text: "Working with Gabriel on the K-WISE PC Builder Kiosk has been an incredible experience. As a full-stack developer, he seamlessly connected my UI/UX designs with the backend, guided our workflow, and ensured smooth deployment. His technical leadership and dedication made our capstone project a success.",
    name: "Kent Cyrem Patasin",
    role: "Former CCC ITS President & UI/UX Designer, City College of Calamba",
  },
  {
    text: "Gabriel's expertise in backend development and system integration was crucial for our capstone project. He patiently guided me through the development workflow and helped connect my frontend work with the backend seamlessly. His mentorship accelerated my growth as a developer.",
    name: "Jake Mesina",
    role: "Frontend Developer & Colleague, City College of Calamba",
  },
];

export default function Recommendations() {
  const sectionRef = useRef(null);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    // Fetch recommendations from API
    const fetchRecommendations = async () => {
      try {
        const response = await api.get("/recommendations");
        if (response.data && response.data.length > 0) {
          const mapped = response.data.map((rec) => ({
            text: rec.quote,
            name: rec.author,
            role: rec.role,
          }));
          setTestimonials(mapped);
        }
      } catch (error) {
        console.warn("Using fallback recommendations:", error.message);
      }
    };

    fetchRecommendations();
  }, []);

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
            <TestimonialsColumn testimonials={testimonials.slice(0, 2).concat(testimonials.slice(3))} duration={22} className="flex-1" />
            <TestimonialsColumn
              testimonials={[testimonials[2], testimonials[0], testimonials[4], testimonials[1], testimonials[3]].filter(Boolean)}
              duration={18}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={[testimonials[1], testimonials[3], testimonials[0], testimonials[4], testimonials[2]].filter(Boolean)}
              duration={26}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
