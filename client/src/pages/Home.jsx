import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { usePortfolioData } from "@/hooks/usePortfolioData";

// Lazy load below-the-fold components
const TechStack = lazy(() => import("@/components/TechStack"));
const Projects = lazy(() => import("@/components/Projects"));
const Recommendations = lazy(() => import("@/components/RecommendationsNew"));
const Certifications = lazy(() => import("@/components/Certifications"));
const SocialLinks = lazy(() => import("@/components/SocialLinks"));

export default function Home() {
  const {
    about,
    experience,
    projects,
    certifications,
    recommendations,
    loading,
    error,
  } = usePortfolioData();

  // Auto-hide scrollbar when not scrolling
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      document.documentElement.classList.add('is-scrolling');
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling');
      }, 1000); // Hide scrollbar 1 second after scrolling stops
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background transition-colors duration-500">
      {/* Apple-Inspired Liquid Glass Background */}
      {/* Light Mode: Soft off-white with subtle gradients */}
      {/* Dark Mode: Deep black with subtle blue accents */}
      <div className="pointer-events-none fixed inset-0 bg-[#FAF9F6] dark:bg-[#0a0a0a]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.06),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(6,182,212,0.04),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08),_transparent_40%),radial-gradient(ellipse_at_bottom_left,_rgba(6,182,212,0.06),_transparent_50%)]" />
      
      {/* Grid Background Pattern - Applied to Entire Page */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05]">
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
      
      <Header />
      
      {loading && (
        <div className="section-container py-32 pt-40">
          <div className="animate-pulse space-y-6">
            <div className="h-12 w-2/3 rounded-full liquid-glass" />
            <div className="h-4 w-1/3 rounded-full liquid-glass" />
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="h-32 rounded-3xl liquid-glass" />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="section-container py-10 pt-40">
          <div className="liquid-glass rounded-3xl p-6 text-red-500">
            {error}
          </div>
        </div>
      )}
      
      {!loading && !error && (
        <main className="relative z-10 space-y-24 pb-24 pt-32">
          <Hero about={about} />
          <About about={about} experience={experience} />
          <Suspense fallback={<div className="section-container py-16"><div className="h-32 rounded-3xl liquid-glass animate-pulse" /></div>}>
            <TechStack />
          </Suspense>
          <Suspense fallback={<div className="section-container py-16"><div className="h-32 rounded-3xl liquid-glass animate-pulse" /></div>}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div className="section-container py-16"><div className="h-32 rounded-3xl liquid-glass animate-pulse" /></div>}>
            <Recommendations />
          </Suspense>
          <Suspense fallback={<div className="section-container py-16"><div className="h-32 rounded-3xl liquid-glass animate-pulse" /></div>}>
            <Certifications />
          </Suspense>
          <Suspense fallback={<div className="section-container py-16"><div className="h-32 rounded-3xl liquid-glass animate-pulse" /></div>}>
            <SocialLinks />
          </Suspense>
        </main>
      )}
      
      <Footer />
      <ChatWidget />
    </div>
  );
}

