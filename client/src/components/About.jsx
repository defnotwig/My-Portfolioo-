import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const icons = ["🎓", "🧠", "⚙️", "🚀"];

// Experience descriptions for hover display
const experienceDescriptions = {
  "Membership & Election Committee Head": "Leading campus-wide student initiatives and election systems for the IT community.",
  "Project Lead": "Designed and deployed an AI-powered self-service PC builder kiosk system.",
  "Quality Assurance — Failed Deliveries": "Led end-to-end quality assurance for failed deliveries and parcel audits.",
  "Freelance Software Developer": "Delivering bespoke web platforms and APIs for MSMEs and campus partners.",
  "BS Information Technology": "Focusing on systems development, AI experimentation, and tech advocacy.",
};

const About = memo(function About({ about, experience }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  if (!about) return null;

  return (
    <section id="about" className="section-container py-16">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">About</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-8 md:p-10 space-y-5 shadow-lg dark:shadow-2xl"
          >
            {about.paragraphs?.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-foreground/90 dark:text-white/90">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Experience column */}
        {/* Experience Section - Timeline ascending (oldest at bottom, newest at top) */}
        <div id="experience">
          <h2 className="text-2xl font-bold mb-6 text-foreground"> Experience</h2>
          <div className="relative border-l-2 border-gray-300 dark:border-gray-700 pl-8 flex flex-col-reverse">
            {experience?.map((role, index, arr) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative mb-8 last:mb-0 group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Dot with hover effect - First item after flex-col-reverse (newest at top) gets solid fill */}
                <span
                  className={`absolute -left-[42px] top-1 h-5 w-5 rounded-full border-4 transition-all duration-300 ${
                    index === arr.length - 1
                      ? "bg-black dark:bg-white border-black dark:border-white"
                      : hoveredIndex === index 
                        ? "bg-gray-800 dark:bg-gray-200 border-gray-800 dark:border-gray-200 shadow-lg shadow-gray-500/30"
                        : "bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600"
                  } ${hoveredIndex === index ? "scale-125" : ""}`}
                />
                
                {/* Content with hover background shade */}
                <div 
                  className={`flex flex-col gap-2 p-3 -ml-3 rounded-xl transition-all duration-300 ${
                    hoveredIndex === index 
                      ? "bg-gradient-to-r from-gray-200/80 to-gray-100/60 dark:from-gray-700/50 dark:to-gray-800/40" 
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className={`font-semibold text-lg transition-colors duration-300 ${
                        hoveredIndex === index ? "text-blue-600 dark:text-blue-400" : "text-foreground"
                      }`}>{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.organization}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {role.timeframe}
                    </span>
                  </div>
                  
                  {/* Description that shows on hover */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredIndex === index ? "auto" : 0, 
                      opacity: hoveredIndex === index ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {experienceDescriptions[role.title] || role.description || ""}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;


// Remove the old Experience component structure below


