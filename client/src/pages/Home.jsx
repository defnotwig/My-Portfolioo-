import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Recommendations from "@/components/Recommendations";
import Certifications from "@/components/Certifications";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { usePortfolioData } from "@/hooks/usePortfolioData";

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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background transition-colors duration-500">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.25),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.15),_transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 dark:opacity-20" />
      <Header />
      {loading && (
        <div className="section-container py-32">
          <div className="animate-pulse space-y-6">
            <div className="h-12 w-2/3 rounded-full bg-muted" />
            <div className="h-4 w-1/3 rounded-full bg-muted" />
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="h-32 rounded-3xl bg-muted" />
              ))}
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="section-container py-10">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600">
            {error}
          </div>
        </div>
      )}
      {!loading && !error && (
        <main className="relative z-10 space-y-24 pb-24">
          <Hero about={about} />
          <About about={about} experience={experience} />
          <TechStack />
          <Projects />
          <Recommendations recommendations={recommendations} />
          <Certifications />
          <SocialLinks />
        </main>
      )}
      <Footer />
      <ChatWidget />
    </div>
  );
}

