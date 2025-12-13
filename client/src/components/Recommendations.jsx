import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Recommendations({ recommendations }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!recommendations?.length) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [recommendations?.length]);

  if (!recommendations?.length) return null;

  return (
    <section id="recommendations" className="section-container py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-8">Recommendations</h2>

        {/* Carousel */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="glass-card border-2 p-8 rounded-xl">
                <p className="text-lg text-muted-foreground italic leading-relaxed mb-8">
                  "{recommendations[currentIndex].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-blue-500/20">
                    <AvatarImage 
                      src={recommendations[currentIndex].image} 
                      alt={recommendations[currentIndex].author} 
                      loading="lazy" 
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                      {recommendations[currentIndex].author?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{recommendations[currentIndex].author}</p>
                    <p className="text-sm text-muted-foreground">{recommendations[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? "w-8 bg-blue-600" 
                  : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to recommendation ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

