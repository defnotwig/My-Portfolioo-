import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Mail, Linkedin, Github, ChevronDown, Moon, Sun } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// iOS-style verified badge component
const VerifiedBadge = () => (
  <svg 
    className="h-6 w-6 flex-shrink-0" 
    viewBox="0 0 24 24" 
    fill="none"
    aria-label="Verified"
  >
    <circle cx="12" cy="12" r="10" fill="#3B82F6" />
    <path 
      d="M8 12l2.5 2.5L16 9" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// iOS-style location pin
const LocationPin = () => (
  <span className="inline-flex items-center" role="img" aria-label="Location">
    <svg className="h-4 w-4 mr-1.5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </span>
);

// Achievement Popup with Carousel and Liquid Glass Effect - Full-size images
// Renders as a fixed modal-like popup to ensure visibility on all devices
const AchievementPopup = ({ achievement, carouselIndex, setCarouselIndex, isMobile, onClose }) => {
  const [localIndex, setLocalIndex] = useState(carouselIndex);
  const [imageOrientation, setImageOrientation] = useState('landscape'); // 'landscape' or 'portrait'
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  
  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLocalIndex(prev => (prev + 1) % achievement.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [achievement.images.length]);

  // Sync with parent
  useEffect(() => {
    setCarouselIndex(localIndex);
  }, [localIndex, setCarouselIndex]);

  // Reset image state when index changes
  useEffect(() => {
    setImageLoaded(false);
    setImageFailed(false);
  }, [localIndex]);

  // Detect image orientation on load
  const handleImageLoad = (e) => {
    const img = e.target;
    setImageLoaded(true);
    if (img.naturalWidth > img.naturalHeight) {
      setImageOrientation('landscape');
    } else {
      setImageOrientation('portrait');
    }
  };

  const handleImageError = (e) => {
    setImageFailed(true);
    // Use profile.jpg as fallback since placeholder doesn't exist
    e.target.src = '/images/profile.jpg';
  };

  // For mobile and tablet (< 1280px), always use fixed centered modal
  // For desktop, position to the LEFT of the dropdown to prevent overflow
  const isSmallScreen = isMobile;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: isSmallScreen ? 20 : 0, x: isSmallScreen ? 0 : 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: isSmallScreen ? 20 : 0, x: isSmallScreen ? 0 : 20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`${
        isSmallScreen 
          ? 'fixed inset-0 z-[10002] flex items-center justify-center p-4' 
          : 'fixed left-4 top-1/2 -translate-y-1/2 z-[10002]'
      } `}
      onClick={e => {
        e.stopPropagation();
        if (isSmallScreen && e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      {/* Backdrop overlay for all screen sizes when popup is shown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${isSmallScreen ? 'absolute inset-0' : 'fixed inset-0'} bg-black/50 backdrop-blur-sm -z-10`}
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      />
      
      {/* Popup content container */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl relative"
        style={{
          width: isSmallScreen ? 'min(calc(100vw - 32px), 500px)' : (imageOrientation === 'portrait' ? 'min(320px, 40vw)' : 'min(420px, 45vw)'),
          maxHeight: isSmallScreen ? '80vh' : '70vh',
        }}
        onClick={e => e.stopPropagation()}
      >
      {/* Carousel with Liquid Glass Effect on image area only */}
      <div 
        className="relative overflow-hidden"
        style={{
          // Dynamic sizing: landscape = wider, portrait = taller - NO extra padding
          aspectRatio: imageOrientation === 'portrait' ? '9/16' : '16/9',
          maxHeight: imageOrientation === 'portrait' ? '55vh' : '35vh',
          background: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(20,20,20,0.98) 100%)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        }}
      >
        {/* Liquid glass refraction overlay on image area - Apple style */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,182,193,0.08) 0%, rgba(173,216,230,0.08) 25%, rgba(255,218,185,0.08) 50%, rgba(221,160,221,0.08) 75%, rgba(152,251,152,0.08) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.05)',
          }}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && !imageFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={localIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img 
              src={achievement.images[localIndex]} 
              alt={`${achievement.title} - Image ${localIndex + 1}`}
              className="w-full h-full object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Carousel Indicators - Centered at bottom of image */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {achievement.images.map((_, idx) => (
            <button 
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setLocalIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
                idx === localIndex ? 'bg-white w-6 shadow-lg' : 'bg-white/50 w-2 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Description - Solid background for readability */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50 relative">
        {/* Close button - Always visible for better UX */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pr-8">
          {achievement.description}
        </p>
      </div>
      </div>
    </motion.div>
  );
};

export default function Hero({ about }) {
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredAchievement, setHoveredAchievement] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showTapHint, setShowTapHint] = useState(true);
  const [profileTapped, setProfileTapped] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("glr-theme") || "light";
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      // Detect if mobile/tablet - include all tablets up to 1280px
      // This covers: phones, iPad Mini, iPad, iPad Air, iPad Pro, and most tablets
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1280);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      // Hide tap hint after 5 seconds
      const tapHintTimer = setTimeout(() => {
        setShowTapHint(false);
      }, 5000);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
        clearTimeout(tapHintTimer);
      };
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.localStorage.setItem("glr-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!about) return null;

  // Achievement data with images and descriptions
  const achievementsData = [
    {
      title: "Ship or Be Shipped 2025 Hackathon Participant",
      description: "Participated in the intensive Ship or Be Shipped 2025 Hackathon, developing innovative solutions under time pressure and collaborating with developers worldwide.",
      images: ["/images/achievements/hackathon-1.jpg", "/images/achievements/hackathon-2.jpg", "/images/achievements/hackathon-3.jpg"]
    },
    {
      title: "Techno Expo Excellence in Innovation Award",
      description: "Recognized for outstanding innovation at the Techno Expo, showcasing cutting-edge technology solutions and creative problem-solving approaches.",
      images: ["/images/achievements/techno-expo-1.jpg", "/images/achievements/techno-expo-2.jpg", "/images/achievements/techno-expo-3.jpg"]
    },
    {
      title: "Best in Capstone Project Award 2025",
      description: "Awarded Best in Capstone Project for the K-WISE PC Builder Kiosk, demonstrating excellence in system design, AI integration, and practical implementation.",
      images: ["/images/achievements/capstone-1.jpg", "/images/achievements/capstone-2.png", "/images/achievements/capstone-3.jpg"]
    },
    {
      title: "Top 1 Performing Student 3rd Year 2025",
      description: "Achieved the highest academic standing among 3rd year IT students, maintaining excellence in both theoretical knowledge and practical skills.",
      images: ["/images/achievements/top1-3rd-1.jpg", "/images/achievements/top1-3rd-2.jpg"]
    },
    {
      title: "Top 4 Performing Student 2nd Year 2024",
      description: "Ranked among the top 4 performing students in the 2nd year cohort, demonstrating consistent academic excellence and leadership.",
      images: ["/images/achievements/top4-2nd-1.png"]
    }
  ];

  const achievements = achievementsData.map(a => a.title);

  // Handle profile tap for mobile with visual feedback
  const handleProfileInteraction = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isMobile) {
      setProfileTapped(true);
      setIsHovering(!isHovering);
      setShowTapHint(false);
      // Reset tap visual feedback after animation
      setTimeout(() => setProfileTapped(false), 200);
    }
  }, [isMobile, isHovering]);

  return (
    <section className="section-container py-12" id="hero">
      <div className="mx-auto max-w-3xl">
        {/* Profile Picture with hover/tap effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mb-6"
        >
          <div 
            className={`relative h-32 w-32 cursor-pointer group transition-transform duration-200 ${profileTapped ? 'scale-95' : 'scale-100'}`}
            onMouseEnter={() => !isMobile && setIsHovering(true)}
            onMouseLeave={() => !isMobile && setIsHovering(false)}
            onClick={handleProfileInteraction}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleProfileInteraction(e);
            }}
            role="button"
            tabIndex={0}
            aria-label={isMobile ? "Tap to see alternate photo" : "Hover to see alternate photo"}
            onKeyDown={(e) => e.key === 'Enter' && handleProfileInteraction(e)}
            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
          >
            {/* Tap indicator for mobile - shows on first load */}
            {isMobile && showTapHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap z-20 shadow-lg"
              >
                Tap me!
              </motion.div>
            )}
            
            {/* Light mode - switches between profile.jpg and hover image */}
            <Avatar 
              className={`h-32 w-32 border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-0 pointer-events-none' : (isHovering ? 'opacity-0' : 'opacity-100')
              }`}
            >
              <AvatarImage src="/images/profile.jpg" alt={about.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            <Avatar 
              className={`h-32 w-32 border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-0 pointer-events-none' : (isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none')
              }`}
            >
              <AvatarImage src="/images/me formal hover.png" alt={about.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            
            {/* Dark mode - switches between black formal and black hover image */}
            <Avatar 
              className={`h-32 w-32 border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 ${
                theme === 'dark' ? (isHovering ? 'opacity-0 pointer-events-none' : 'opacity-100') : 'opacity-0 pointer-events-none'
              }`}
            >
              <AvatarImage src="/images/me formal black.png" alt={about.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            <Avatar 
              className={`h-32 w-32 border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 ${
                theme === 'dark' ? (isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none') : 'opacity-0 pointer-events-none'
              }`}
            >
              <AvatarImage src="/images/me formal black hover.png" alt={about.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Name and Verified Badge + Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-2"
        >
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">{about.name}</h1>
            <VerifiedBadge />
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full liquid-glass-btn hover:scale-110 transition-all"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </motion.div>

        {/* Location with iOS-style pin */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-sm text-muted-foreground mb-2 flex items-center"
        >
          <LocationPin />
          {about.location}
        </motion.p>

        {/* Roles and Achievements Dropdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6"
        >
          <p className="text-sm font-medium text-foreground/85">
            Software Engineer | BSIT Student
          </p>
          <div className="relative">
            <button
              onClick={() => setAchievementsOpen(!achievementsOpen)}
              className="flex items-center gap-2 px-4 py-2.5 liquid-glass-btn text-sm hover:scale-[1.02] transition-all border border-white/20 dark:border-white/10"
            >
              <span className="text-foreground font-medium">{achievements[0]}</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${achievementsOpen ? 'rotate-180' : ''}`} />
            </button>
            {achievementsOpen && (
              <>
                {/* Mobile backdrop */}
                {isMobile && typeof document !== 'undefined' && createPortal(
                  <div 
                    className="fixed inset-0 z-[10000]" 
                    onClick={() => setAchievementsOpen(false)}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      setAchievementsOpen(false);
                    }}
                  />,
                  document.body
                )}
                {/* Dropdown - rendered via portal on mobile for proper z-index */}
                {isMobile && typeof document !== 'undefined' ? createPortal(
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="fixed top-24 left-4 right-4 liquid-glass-strong rounded-2xl p-5 z-[10001] max-h-[60vh] overflow-y-auto shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="font-semibold mb-3 text-foreground text-sm">Achievements & Awards</h3>
                    <ul className="space-y-2.5">
                      {achievementsData.map((achievement, idx) => (
                        <li 
                          key={idx} 
                          className="text-sm flex items-start gap-2.5 text-foreground cursor-pointer hover:bg-blue-50/50 dark:hover:bg-white/10 rounded-lg px-2 py-2 transition-all duration-200 relative group"
                          onClick={() => {
                            setHoveredAchievement(hoveredAchievement === idx ? null : idx);
                            setCarouselIndex(0);
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation();
                            setHoveredAchievement(hoveredAchievement === idx ? null : idx);
                            setCarouselIndex(0);
                          }}
                        >
                          <span className="text-blue-500 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-125">•</span>
                          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{achievement.title}</span>
                          
                          {/* Liquid Glass Popup - Rendered via Portal for proper z-index stacking */}
                          {hoveredAchievement === idx && createPortal(
                            <AnimatePresence>
                              <AchievementPopup 
                                achievement={achievement}
                                carouselIndex={carouselIndex}
                                setCarouselIndex={setCarouselIndex}
                                isMobile={isMobile}
                                onClose={() => setHoveredAchievement(null)}
                              />
                            </AnimatePresence>,
                            document.body
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>,
                  document.body
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 liquid-glass-strong rounded-2xl p-5 z-[10001] max-h-[60vh] overflow-y-auto shadow-2xl right-0 w-80"
                  >
                    <h3 className="font-semibold mb-3 text-foreground text-sm">Achievements & Awards</h3>
                    <ul className="space-y-2.5">
                      {achievementsData.map((achievement, idx) => (
                        <li 
                          key={idx} 
                          className="text-sm flex items-start gap-2.5 text-foreground cursor-pointer hover:bg-blue-50/50 dark:hover:bg-white/10 rounded-lg px-2 py-2 transition-all duration-200 relative group"
                          onMouseEnter={() => {
                            setHoveredAchievement(idx);
                            setCarouselIndex(0);
                          }}
                          onMouseLeave={() => setHoveredAchievement(null)}
                        >
                          <span className="text-blue-500 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-125">•</span>
                          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{achievement.title}</span>
                          
                          {/* Liquid Glass Popup - Rendered via Portal for proper z-index stacking */}
                          {hoveredAchievement === idx && typeof document !== 'undefined' && createPortal(
                            <AnimatePresence>
                              <AchievementPopup 
                                achievement={achievement}
                                carouselIndex={carouselIndex}
                                setCarouselIndex={setCarouselIndex}
                                isMobile={isMobile}
                                onClose={() => setHoveredAchievement(null)}
                              />
                            </AnimatePresence>,
                            document.body
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <Button
            className="bg-foreground dark:bg-white hover:bg-foreground/90 dark:hover:bg-gray-50 text-background dark:text-black rounded-full px-5 py-2.5 hover:scale-105 transition-all font-medium"
            asChild
          >
            <a href="mailto:ludwigrivera13@gmail.com">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </a>
          </Button>
          <Button
            variant="outline"
            className="liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full px-5 py-2.5 hover:scale-105 transition-all font-medium"
            asChild
          >
            <a href="https://www.linkedin.com/in/glrrivera/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button
            variant="outline"
            className="liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full px-5 py-2.5 hover:scale-105 transition-all font-medium"
            asChild
          >
            <a href="https://github.com/defnotwig" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            className="liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full px-5 py-2.5 hover:scale-105 transition-all font-medium"
            asChild
          >
            <a href="/CV_Rivera_Gabriel_Ludwig_R..pdf" download>
              Download CV
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

