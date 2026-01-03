import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Mail, Linkedin, Github, ChevronDown, Moon, Sun } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// iOS-style verified badge component - positioned directly after name with no gap
const VerifiedBadge = () => (
  <svg 
    className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ml-1 inline-block align-middle" 
    viewBox="0 0 24 24" 
    fill="none"
    aria-label="Verified"
    style={{ marginLeft: '2px', verticalAlign: 'text-bottom' }}
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
// Renders as a fixed centered modal on ALL devices for consistent UX
const AchievementPopup = ({ achievement, carouselIndex, setCarouselIndex, isMobile, isTablet, onClose }) => {
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

  // Determine sizing based on device type
  const isSmallDevice = isMobile || isTablet;
  
  // Get responsive popup width
  const getPopupWidth = () => {
    if (isMobile) return 'min(calc(100vw - 32px), 340px)';
    if (isTablet) return 'min(calc(100vw - 48px), 400px)';
    return imageOrientation === 'portrait' ? 'min(380px, 45vw)' : 'min(480px, 50vw)';
  };

  // Get responsive max height
  const getMaxHeight = () => {
    if (isMobile) return '75vh';
    if (isTablet) return '70vh';
    return '70vh';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-[10002] flex items-center justify-center p-4"
      onClick={e => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      {/* Semi-transparent backdrop - NO blur for clear visibility */}
      <div
        className="absolute inset-0 bg-black/50 -z-10"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      />
      
      {/* Popup content container - centered and responsive */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="rounded-2xl overflow-hidden shadow-2xl relative bg-white dark:bg-gray-900"
        style={{
          width: getPopupWidth(),
          maxHeight: getMaxHeight(),
        }}
        onClick={e => e.stopPropagation()}
      >
      {/* Close button - Always visible at top right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-30"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Carousel with Liquid Glass Effect on image area only */}
      <div 
        className="relative overflow-hidden"
        style={{
          // Dynamic sizing: landscape = wider, portrait = taller
          aspectRatio: imageOrientation === 'portrait' ? '9/14' : '16/10',
          maxHeight: isMobile ? '45vh' : (isTablet ? '50vh' : '45vh'),
          background: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(20,20,20,0.98) 100%)',
        }}
      >
        {/* Liquid glass refraction overlay on image area - Apple style */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,182,193,0.06) 0%, rgba(173,216,230,0.06) 25%, rgba(255,218,185,0.06) 50%, rgba(221,160,221,0.06) 75%, rgba(152,251,152,0.06) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && !imageFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={localIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
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
                idx === localIndex ? 'bg-white w-5 shadow-lg' : 'bg-white/50 w-2 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Description - Solid background for readability */}
      <div className={`bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50 ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
          isMobile ? 'text-xs' : (isTablet ? 'text-sm' : 'text-sm')
        }`}>
          {achievement.description}
        </p>
      </div>
      </motion.div>
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
  const [isTablet, setIsTablet] = useState(false);
  const [profileTapped, setProfileTapped] = useState(false);
  const profileRef = useRef(null);

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
      
      // Detect device type: mobile (<768px), tablet (768-1279px), desktop (>=1280px)
      const checkDevice = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        setIsTablet(width >= 768 && width < 1280);
      };
      checkDevice();
      window.addEventListener('resize', checkDevice);
      
      return () => {
        window.removeEventListener('resize', checkDevice);
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

  // Handle profile tap for mobile/tablet with visual feedback
  const handleProfileInteraction = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // For mobile and tablet, toggle on tap
    if (isMobile || isTablet) {
      setProfileTapped(true);
      setIsHovering(prev => !prev);
      setTimeout(() => setProfileTapped(false), 200);
    }
  }, [isMobile, isTablet]);

  // Determine if touch device (mobile or tablet)
  const isTouchDevice = isMobile || isTablet;

  return (
    <section className="section-container py-8 sm:py-12" id="hero">
      <div className="mx-auto max-w-3xl">
        {/* Profile Picture with hover/tap effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mb-4 sm:mb-6"
        >
          <div 
            ref={profileRef}
            className={`relative cursor-pointer group transition-transform duration-200 select-none ${
              profileTapped ? 'scale-95' : 'scale-100'
            } ${isMobile ? 'h-20 w-20' : (isTablet ? 'h-24 w-24' : 'h-32 w-32')}`}
            onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
            onMouseLeave={() => !isTouchDevice && setIsHovering(false)}
            onClick={handleProfileInteraction}
            onTouchStart={(e) => {
              // Prevent ghost clicks
              e.preventDefault();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleProfileInteraction(e);
            }}
            role="button"
            tabIndex={0}
            aria-label={isTouchDevice ? "Tap to see alternate photo" : "Hover to see alternate photo"}
            onKeyDown={(e) => e.key === 'Enter' && handleProfileInteraction(e)}
            style={{ 
              touchAction: 'manipulation', 
              WebkitTapHighlightColor: 'transparent',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
          >
            {/* Tap indicator for mobile/tablet - always visible */}
            {isTouchDevice && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap z-20 shadow-lg pointer-events-none"
              >
                Tap me!
              </motion.div>
            )}
            
            {/* Light mode - switches between profile.jpg and hover image */}
            <Avatar 
              className={`h-full w-full border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                theme === 'dark' ? 'opacity-0' : (isHovering ? 'opacity-0' : 'opacity-100')
              }`}
            >
              <AvatarImage src="/images/profile.jpg" alt={about.name} draggable={false} />
              <AvatarFallback className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            <Avatar 
              className={`h-full w-full border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                theme === 'dark' ? 'opacity-0' : (isHovering ? 'opacity-100' : 'opacity-0')
              }`}
            >
              <AvatarImage src="/images/me formal hover.png" alt={about.name} draggable={false} />
              <AvatarFallback className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            
            {/* Dark mode - switches between black formal and black hover image */}
            <Avatar 
              className={`h-full w-full border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                theme === 'dark' ? (isHovering ? 'opacity-0' : 'opacity-100') : 'opacity-0'
              }`}
            >
              <AvatarImage src="/images/me formal black.png" alt={about.name} draggable={false} />
              <AvatarFallback className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
            <Avatar 
              className={`h-full w-full border-4 border-white dark:border-gray-800 liquid-glass-strong shadow-xl ring-2 ring-blue-500/15 absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                theme === 'dark' ? (isHovering ? 'opacity-100' : 'opacity-0') : 'opacity-0'
              }`}
            >
              <AvatarImage src="/images/me formal black hover.png" alt={about.name} draggable={false} />
              <AvatarFallback className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">GLR</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Name and Verified Badge + Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-1 sm:mb-2"
        >
          <h1 className={`font-bold text-foreground flex items-center flex-wrap ${
            isMobile ? 'text-xl' : (isTablet ? 'text-2xl' : 'text-3xl')
          }`}>
            <span className="mr-0">{about.name}</span><VerifiedBadge />
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-full liquid-glass-btn hover:scale-110 active:scale-95 transition-all flex-shrink-0 ml-2"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            )}
          </button>
        </motion.div>

        {/* Location with iOS-style pin */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xs sm:text-sm text-muted-foreground mb-2 flex items-center"
        >
          <LocationPin />
          {about.location}
        </motion.p>

        {/* Roles and Achievements Dropdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-6 ${
            isMobile ? '' : 'sm:flex-row sm:items-center sm:justify-between'
          }`}
        >
          <p className={`font-medium text-foreground/85 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Software Engineer | BSIT Student
          </p>
          <div className="relative">
            <button
              onClick={() => setAchievementsOpen(!achievementsOpen)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 liquid-glass-btn hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/20 dark:border-white/10 ${
                isMobile ? 'text-xs w-full justify-between' : 'text-sm'
              }`}
            >
              <span className="text-foreground font-medium truncate">{achievements[0].split(' ').slice(0, 4).join(' ')}...</span>
              <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${achievementsOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
            {achievementsOpen && (
              <>
                {/* Backdrop for closing - only needed on touch devices */}
                {(isMobile || isTablet) && typeof document !== 'undefined' && createPortal(
                  <div 
                    className="fixed inset-0 z-[9999]" 
                    onClick={() => {
                      setAchievementsOpen(false);
                      setHoveredAchievement(null);
                    }}
                  />,
                  document.body
                )}
                {/* Dropdown menu - rendered via portal on mobile/tablet for proper positioning */}
                {(isMobile || isTablet) && typeof document !== 'undefined' ? createPortal(
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`fixed left-3 right-3 sm:left-4 sm:right-4 liquid-glass-strong rounded-xl sm:rounded-2xl p-3 sm:p-4 z-[10000] max-h-[55vh] overflow-y-auto shadow-2xl ${
                      isMobile ? 'top-20' : 'top-24'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="font-semibold mb-2 sm:mb-3 text-foreground text-xs sm:text-sm">Achievements & Awards</h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {achievementsData.map((achievement, idx) => (
                        <li 
                          key={idx} 
                          className={`flex items-start gap-2 text-foreground cursor-pointer hover:bg-blue-50/50 dark:hover:bg-white/10 rounded-lg px-2 py-1.5 sm:py-2 transition-all duration-200 active:bg-blue-100/50 dark:active:bg-white/20 ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}
                          onClick={() => {
                            setHoveredAchievement(hoveredAchievement === idx ? null : idx);
                            setCarouselIndex(0);
                          }}
                        >
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                          <span className="leading-snug">{achievement.title}</span>
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
                    className="absolute top-full mt-2 liquid-glass-strong rounded-2xl p-4 z-[10000] max-h-[50vh] overflow-y-auto shadow-2xl right-0 w-80"
                    onMouseLeave={() => {
                      // Close dropdown when mouse leaves on desktop
                      setAchievementsOpen(false);
                      setHoveredAchievement(null);
                    }}
                  >
                    <h3 className="font-semibold mb-3 text-foreground text-sm">Achievements & Awards</h3>
                    <ul className="space-y-2">
                      {achievementsData.map((achievement, idx) => (
                        <li 
                          key={idx} 
                          className="text-sm flex items-start gap-2 text-foreground cursor-pointer hover:bg-blue-50/50 dark:hover:bg-white/10 rounded-lg px-2 py-2 transition-all duration-200 relative group"
                          onMouseEnter={() => {
                            setHoveredAchievement(idx);
                            setCarouselIndex(0);
                          }}
                          onMouseLeave={() => setHoveredAchievement(null)}
                        >
                          <span className="text-blue-500 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-125">•</span>
                          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{achievement.title}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </>
            )}
            </AnimatePresence>
            
            {/* Achievement Popup - Rendered via Portal for ALL devices */}
            {hoveredAchievement !== null && typeof document !== 'undefined' && createPortal(
              <AnimatePresence>
                <AchievementPopup 
                  achievement={achievementsData[hoveredAchievement]}
                  carouselIndex={carouselIndex}
                  setCarouselIndex={setCarouselIndex}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  onClose={() => setHoveredAchievement(null)}
                />
              </AnimatePresence>,
              document.body
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`flex flex-wrap gap-2 sm:gap-3 ${isMobile ? 'justify-center' : ''}`}
        >
          <Button
            className={`bg-foreground dark:bg-white hover:bg-foreground/90 dark:hover:bg-gray-50 text-background dark:text-black rounded-full hover:scale-105 active:scale-95 transition-all font-medium ${
              isMobile ? 'px-3 py-2 text-xs' : 'px-5 py-2.5 text-sm'
            }`}
            asChild
          >
            <a href="mailto:ludwigrivera13@gmail.com">
              <Mail className={`mr-1.5 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
              Send Email
            </a>
          </Button>
          <Button
            variant="outline"
            className={`liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full hover:scale-105 active:scale-95 transition-all font-medium ${
              isMobile ? 'px-3 py-2 text-xs' : 'px-5 py-2.5 text-sm'
            }`}
            asChild
          >
            <a href="https://www.linkedin.com/in/glrrivera/" target="_blank" rel="noopener noreferrer">
              <Linkedin className={`mr-1.5 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
              LinkedIn
            </a>
          </Button>
          <Button
            variant="outline"
            className={`liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full hover:scale-105 active:scale-95 transition-all font-medium ${
              isMobile ? 'px-3 py-2 text-xs' : 'px-5 py-2.5 text-sm'
            }`}
            asChild
          >
            <a href="https://github.com/defnotwig" target="_blank" rel="noopener noreferrer">
              <Github className={`mr-1.5 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            className={`liquid-glass-btn border border-white/20 dark:border-white/10 text-foreground dark:text-white rounded-full hover:scale-105 active:scale-95 transition-all font-medium ${
              isMobile ? 'px-3 py-2 text-xs' : 'px-5 py-2.5 text-sm'
            }`}
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

