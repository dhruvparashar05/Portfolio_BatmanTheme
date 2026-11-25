import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaTrophy, 
  FaChartLine, 
  FaFire, 
  FaCheckCircle, 
  FaCalendarCheck, 
  FaSmile, 
  FaMeh, 
  FaFrown 
} from 'react-icons/fa';

// Deterministic random number generator for consistent mock data
const seededRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed;
  return () => {
    s = (s * a) % m;
    return s / m;
  };
};

// Animated Counter Component for Count-up effect
const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const isPercent = typeof value === 'string' && value.includes('%');
    const isComma = typeof value === 'string' && value.includes(',');
    const numericValue = parseFloat(
      typeof value === 'string' ? value.replace(/[^0-9.]/g, '') : value
    );
    
    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }
    
    const end = numericValue;
    const startTime = performance.now();
    
    const updateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      const easeProgress = progress * (2 - progress);
      const current = start + easeProgress * (end - start);
      
      if (isPercent) {
        setCount(current.toFixed(1) + '%');
      } else if (isComma) {
        setCount(Math.floor(current).toLocaleString());
      } else {
        setCount(Math.floor(current));
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [value, duration, isInView]);
  
  return <span ref={ref}>{count}</span>;
};

const CodingJourney = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const heatmapRef = useRef(null);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const monthsData = useMemo(() => {
    const today = new Date();
    const months = [];
    const rand = seededRandom(1337); // Seed for reproducible mock data
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
      const firstOfMonth = new Date(currentYear, monthIdx, 1);
      const lastOfMonth = new Date(currentYear, monthIdx + 1, 0);
      const daysInMonth = lastOfMonth.getDate();
      
      // MON = 0, TUE = 1, ..., SUN = 6
      const firstDayOfWeek = (firstOfMonth.getDay() + 6) % 7;
      
      const days = [];
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(currentYear, monthIdx, d);
        const isFuture = date > today;
        
        let count = 0;
        let easy = 0;
        let medium = 0;
        let hard = 0;
        let level = 0;
        
        if (!isFuture) {
          // Create realistic streaks:
          // Max streak: active in a 45-day block in April-May (month index 3 and 4)
          // Current streak: active for the last 24 days from today
          const daysFromEnd = Math.floor((today - date) / (1000 * 60 * 60 * 24));
          const isMaxStreakRange = (date.getMonth() === 3 && date.getDate() >= 1) || (date.getMonth() === 4 && date.getDate() <= 15);
          const isCurrentStreakRange = daysFromEnd >= 0 && daysFromEnd < 24;
          
          let isActive = false;
          if (isMaxStreakRange || isCurrentStreakRange) {
            isActive = true;
          } else {
            isActive = rand() < 0.38;
          }
          
          if (isActive) {
            const r = rand();
            if (r < 0.5) count = Math.floor(rand() * 2) + 1; // 1-2 solved
            else if (r < 0.8) count = Math.floor(rand() * 2) + 3; // 3-4 solved
            else if (r < 0.95) count = Math.floor(rand() * 2) + 5; // 5-6 solved
            else count = Math.floor(rand() * 3) + 7; // 7-9 solved
            
            let temp = count;
            hard = Math.floor(rand() * Math.min(temp, 2));
            temp -= hard;
            medium = Math.floor(rand() * Math.min(temp + 1, temp));
            temp -= medium;
            easy = temp;
            
            if (count === 0) level = 0;
            else if (count <= 2) level = 1;
            else if (count <= 4) level = 2;
            else if (count <= 6) level = 3;
            else level = 4;
          }
        }
        
        days.push({
          date,
          count,
          easy,
          medium,
          hard,
          level,
          isFuture
        });
      }
      
      const cells = [];
      // 1. Padding at start
      for (let i = 0; i < firstDayOfWeek; i++) {
        cells.push({ isPlaceholder: true });
      }
      // 2. Actual days
      days.forEach(day => {
        cells.push({ ...day, isPlaceholder: false });
      });
      // 3. Padding at end to reach 42
      while (cells.length < 42) {
        cells.push({ isPlaceholder: true });
      }
      
      months.push({
        name: monthNames[monthIdx],
        offset: firstDayOfWeek,
        days,
        cells
      });
    }
    
    return months;
  }, [currentYear]);

  const daysData = useMemo(() => {
    return monthsData.flatMap(m => m.days);
  }, [monthsData]);

  // Compute consistency metrics
  const calculatedStats = useMemo(() => {
    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;
    let totalActiveDays = 0;
    
    let maxStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const pastDays = daysData.filter(d => !d.isFuture && d.date <= today);
    
    pastDays.forEach((day) => {
      totalSolved += day.count;
      easySolved += day.easy;
      mediumSolved += day.medium;
      hardSolved += day.hard;
      
      if (day.count > 0) {
        totalActiveDays++;
        tempStreak++;
        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    });
    
    let currStreak = 0;
    const checkIdx = pastDays.length - 1;
    
    if (checkIdx >= 0) {
      let lastActiveIdx = checkIdx;
      // If today is inactive, check if yesterday was active to preserve streak
      if (pastDays[checkIdx].count === 0 && checkIdx > 0 && pastDays[checkIdx - 1].count > 0) {
        lastActiveIdx = checkIdx - 1;
      }
      
      if (pastDays[lastActiveIdx].count > 0) {
        for (let i = lastActiveIdx; i >= 0; i--) {
          if (pastDays[i].count > 0) {
            currStreak++;
          } else {
            break;
          }
        }
      }
    }
    
    return {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalActiveDays,
      maxStreak,
      currentStreak: currStreak,
      acceptanceRate: '74.2%',
      contestRating: '1,842'
    };
  }, [daysData]);

  // Handle Tooltip Positioning
  const handleMouseEnter = (day, event) => {
    if (day.isFuture) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const heatmapRect = heatmapRef.current.getBoundingClientRect();
    
    setTooltipPos({
      x: rect.left - heatmapRect.left + rect.width / 2,
      y: rect.top - heatmapRect.top - 12
    });
    setHoveredDay(day);
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  // Cursor spotlight effect handler
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Stats Card Config
  const statsConfig = [
    { key: 'totalSolved', label: 'Problems Solved', icon: FaTrophy, color: 'text-bat-gold', glowColor: 'rgba(212,175,55,0.2)' },
    { key: 'contestRating', label: 'Contest Rating', icon: FaChartLine, color: 'text-indigo-400', glowColor: 'rgba(129,140,248,0.2)' },
    { key: 'currentStreak', label: 'Current Streak', icon: FaFire, color: 'text-orange-500', glowColor: 'rgba(249,115,22,0.2)', pulse: true },
    { key: 'maxStreak', label: 'Max Streak', icon: FaFire, color: 'text-amber-500', glowColor: 'rgba(245,158,11,0.2)' },
    { key: 'acceptanceRate', label: 'Acceptance Rate', icon: FaCheckCircle, color: 'text-emerald-400', glowColor: 'rgba(52,211,153,0.2)' },
    { key: 'totalActiveDays', label: 'Total Active Days', icon: FaCalendarCheck, color: 'text-sky-400', glowColor: 'rgba(56,189,248,0.2)' },
    { key: 'easySolved', label: 'Easy Solved', icon: FaSmile, color: 'text-emerald-500', glowColor: 'rgba(16,185,129,0.1)' },
    { key: 'mediumSolved', label: 'Medium Solved', icon: FaMeh, color: 'text-amber-500', glowColor: 'rgba(245,158,11,0.1)' },
    { key: 'hardSolved', label: 'Hard Solved', icon: FaFrown, color: 'text-rose-500', glowColor: 'rgba(239,68,68,0.1)' },
  ];

  // Achievement Badges Config
  const badges = [
    { emoji: '🔥', title: '30 Day Streak', desc: 'Consistency pays off', aura: 'rgba(249,115,22,0.35)' },
    { emoji: '⚡', title: 'Daily Coder', desc: 'Code every day', aura: 'rgba(247,211,84,0.35)' },
    { emoji: '🏆', title: '100 Problems', desc: 'Milestone reached', aura: 'rgba(212,175,55,0.35)' },
    { emoji: '💎', title: 'Consistency King', desc: 'Unstoppable drive', aura: 'rgba(56,189,248,0.35)' },
    { isBat: true, emoji: '', title: 'Gotham Solver', desc: 'Defeating the hard tasks', aura: 'rgba(212,175,55,0.6)' },
  ];

  // Motion variants for fade-up transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="coding-journey" className="relative py-24 px-4 bg-bat-black-bg overflow-hidden">
      
      {/* Gotham skyline silhouette background */}
      <div className="absolute bottom-0 inset-x-0 h-48 opacity-10 pointer-events-none z-0 overflow-hidden select-none">
        <svg viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover object-bottom">
          <path d="M0,200 L0,150 L20,150 L20,120 L40,120 L40,180 L50,180 L50,90 L70,90 L70,200 L80,200 L80,100 L95,100 L95,60 L110,60 L110,200 L120,200 L120,140 L140,140 L140,200 L160,200 L160,80 L180,80 L180,50 L200,50 L200,200 L210,200 L210,130 L230,130 L230,200 L250,200 L250,110 L270,110 L270,200 M270,200 L270,90 L290,90 L290,60 L310,60 L310,200 L320,200 L320,160 L340,160 L340,200 L360,200 L360,120 L380,120 L380,200 L400,200 L400,40 L420,40 L420,20 L425,20 L425,200 L440,200 L440,100 L460,100 L460,200 L480,200 L480,140 L500,140 L500,200 M500,200 L500,70 L520,70 L520,200 L540,200 L540,110 L560,110 L560,200 L580,200 L580,130 L600,130 L600,200 L620,200 L620,50 L640,50 L640,20 L645,20 L645,200 L660,200 L660,100 L680,100 L680,200 L700,200 L700,150 L720,150 L720,200 M720,200 L720,80 L740,80 L740,50 L760,50 L760,200 L770,200 L770,120 L790,120 L790,200 L810,200 L810,90 L830,90 L830,200 L850,200 L850,140 L870,140 L870,200 L890,200 L890,60 L910,60 L910,200 M910,200 L910,130 L930,130 L930,200 L950,200 L950,100 L970,100 L970,200 L990,200 L990,150 L1010,150 L1010,200 L1030,200 L1030,80 L1050,80 L1050,40 L1055,40 L1055,200 L1070,200 L1070,110 L1090,110 L1090,200 L1110,200 L1110,140 L1130,140 L1130,200 L1150,200 L1150,90 L1170,90 L1170,200 L1200,200" stroke="#1c1c1c" strokeWidth="2.5" fill="#0A0A0A" />
        </svg>
      </div>

      {/* Bat Signal Spotlight Searchlight Beam */}
      <div className="absolute bottom-0 right-[15%] w-[320px] h-[360px] pointer-events-none z-0 select-none overflow-hidden origin-bottom">
        <motion.div
          className="w-full h-full origin-bottom"
          style={{
            background: 'conic-gradient(from 165deg at 50% 100%, transparent 0deg, rgba(247, 211, 84, 0.08) 12deg, rgba(247, 211, 84, 0.08) 22deg, transparent 32deg)',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)'
          }}
          animate={{
            rotate: [-12, 12, -12],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        {/* Glowing Bat Logo in spotlight */}
        <motion.div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-20 h-auto pointer-events-none filter blur-[0.6px]"
          animate={{
            rotate: [-12, 12, -12],
            opacity: [0.25, 0.55, 0.25],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <img src="/batman-logo.png" alt="" className="w-full h-auto object-contain opacity-50" />
        </motion.div>
      </div>

      {/* Floating Ambient Sparks */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-bat-gold/20"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.15, 0.55, 0.15]
            }}
            transition={{
              duration: Math.random() * 5 + 7,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Coding <span className="text-bat-gold glow-text-gold">Journey</span>
          </motion.h2>
          <div className="h-[2px] w-16 bg-bat-gold mx-auto mt-4 mb-4" />
          <motion.p
            className="text-white/60 text-sm md:text-base max-w-xl mx-auto italic font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "Consistency compounds. Every solved problem is another step toward mastery."
          </motion.p>
        </div>

        {/* Dashboard Main Container */}
        <motion.div
          ref={containerRef}
          className="glass-card p-6 md:p-8 relative group/dashboard shadow-lg hover:shadow-spotlight transition-all duration-500"
          onMouseMove={handleMouseMove}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Spotlight & Background effects wrapper */}
          <div className="absolute inset-0 rounded-[12px] overflow-hidden pointer-events-none z-0">
            {/* Spotlight overlay effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/dashboard:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
              style={{
                background: 'radial-gradient(650px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(247, 211, 84, 0.04), transparent 80%)'
              }}
            />
          </div>

          {/* Main Layout Container */}
          <div className="flex flex-col gap-10 relative z-20">
            
            {/* TOP PORTION: Submission Heatmap */}
            <div className="flex flex-col gap-4 w-full">
              {/* Heatmap Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white border-l-2 border-bat-gold pl-3">
                  Submission Heatmap
                </h3>
                <span className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest bg-white/[0.03] px-2.5 py-1 rounded border border-white/5">
                  12-Month Log
                </span>
              </div>

              {/* Heatmap Card */}
              <div className="glass-card p-3 md:p-6 bg-black/25 relative border-white/5 hover:border-white/10 w-full overflow-visible">
                
                {/* Main calendar layout with relative container for global tooltip */}
                <div ref={heatmapRef} className="w-full relative select-none">
                  
                  {/* Top Row: Month Labels */}
                  <div className="flex items-center w-full mb-1.5 md:mb-2">
                    {/* Spacer matching the width of the weekday labels column */}
                    <div className="w-6 md:w-8 lg:w-10 shrink-0" />
                    {/* Month Labels Grid */}
                    <div className="grid grid-cols-12 gap-0.5 md:gap-1 lg:gap-2 flex-1">
                      {monthsData.map((month) => (
                        <div key={month.name} className="text-[6px] md:text-[8px] lg:text-[10px] text-white/50 font-bold uppercase text-center truncate">
                          {month.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Weekday Labels + Month Grids */}
                  <div className="flex items-stretch w-full">
                    {/* Weekday Labels Column */}
                    <div className="w-6 md:w-8 lg:w-10 shrink-0 grid grid-rows-7 gap-[1px] md:gap-[2px] py-[3px] md:py-[5px] text-[6px] md:text-[8px] lg:text-[10px] text-white/30 font-bold uppercase select-none pr-1 md:pr-2">
                      <span className="flex items-center justify-end">MON</span>
                      <span className="flex items-center justify-end">TUE</span>
                      <span className="flex items-center justify-end">WED</span>
                      <span className="flex items-center justify-end">THU</span>
                      <span className="flex items-center justify-end">FRI</span>
                      <span className="flex items-center justify-end">SAT</span>
                      <span className="flex items-center justify-end">SUN</span>
                    </div>

                    {/* Month Grids Container */}
                    <div className="grid grid-cols-12 gap-0.5 md:gap-1 lg:gap-2 flex-1">
                      {monthsData.map((month) => (
                        <div key={month.name} className="grid grid-cols-6 grid-rows-7 gap-[0.5px] md:gap-[1px] bg-black/20 p-[2px] md:p-1 rounded-sm border border-white/5">
                          {month.cells.map((cell, idx) => {
                            if (cell.isPlaceholder) {
                              return (
                                <div key={`placeholder-${idx}`} className="w-full aspect-square opacity-0 pointer-events-none" />
                              );
                            }
                            
                            let levelClass = "bg-white/[0.03] border border-white/[0.02]";
                            let glowStyle = {};
                            
                            if (cell.level === 1) {
                              levelClass = "bg-bat-gold/20 border border-bat-gold/10 hover:bg-bat-gold/30";
                            } else if (cell.level === 2) {
                              levelClass = "bg-bat-gold/45 border border-bat-gold/20 hover:bg-bat-gold/55";
                              glowStyle = { boxShadow: "0 0 4px rgba(212, 175, 55, 0.15)" };
                            } else if (cell.level === 3) {
                              levelClass = "bg-bat-gold/75 border border-bat-gold/30 hover:bg-bat-gold/85";
                              glowStyle = { boxShadow: "0 0 8px rgba(212, 175, 55, 0.35)" };
                            } else if (cell.level === 4) {
                              levelClass = "bg-bat-yellow border border-bat-gold hover:bg-bat-yellow/95";
                              glowStyle = { boxShadow: "0 0 12px rgba(247, 211, 84, 0.55)" };
                            }
                            
                            return (
                              <motion.div
                                key={idx}
                                className={`w-full aspect-square rounded-[1px] md:rounded-[2px] transition-colors duration-150 cursor-pointer ${levelClass}`}
                                style={glowStyle}
                                whileHover={{ scale: 1.3, zIndex: 10 }}
                                onMouseEnter={(e) => handleMouseEnter(cell, e)}
                                onMouseLeave={handleMouseLeave}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ 
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 20,
                                  delay: (Math.floor(idx / 7) * 0.005) + ((idx % 7) * 0.002)
                                }}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Heatmap Tooltip Element */}
                  {hoveredDay && (
                    <div
                      className="absolute pointer-events-none z-50 bg-bat-black-card/95 border border-bat-gold/40 text-white rounded-lg p-2.5 shadow-yellow-glow backdrop-blur-md text-xs transition-all duration-150 transform -translate-x-1/2 -translate-y-full flex flex-col gap-1 w-44"
                      style={{
                        left: `${tooltipPos.x}px`,
                        top: `${tooltipPos.y}px`
                      }}
                    >
                      <div className="font-extrabold text-[10px] text-bat-gold uppercase tracking-wider">
                        {hoveredDay.date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                      <div className="font-semibold text-white text-[11px] leading-tight">
                        Solved {hoveredDay.count} Problem{hoveredDay.count !== 1 ? 's' : ''}
                      </div>
                      {hoveredDay.count > 0 && (
                        <div className="grid grid-cols-3 gap-1 mt-1 text-[9px] text-white/70 border-t border-white/10 pt-1 text-center">
                          <div>
                            <span className="text-emerald-400 block font-black">Easy</span>
                            <span>{hoveredDay.easy}</span>
                          </div>
                          <div>
                            <span className="text-amber-400 block font-black font-sans">Med</span>
                            <span>{hoveredDay.medium}</span>
                          </div>
                          <div>
                            <span className="text-rose-400 block font-black">Hard</span>
                            <span>{hoveredDay.hard}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Heatmap Footer Legend & Note */}
                <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-4 border-t border-white/5 gap-3">
                  {/* Legend */}
                  <div className="flex items-center gap-1.5 text-[9px] text-white/40 uppercase tracking-widest font-extrabold select-none">
                    <span>Less</span>
                    <span className="w-2.5 h-2.5 rounded-[1.5px] bg-white/[0.03] border border-white/[0.02]" />
                    <span className="w-2.5 h-2.5 rounded-[1.5px] bg-bat-gold/20 border border-bat-gold/10" />
                    <span className="w-2.5 h-2.5 rounded-[1.5px] bg-bat-gold/45 border border-bat-gold/20" />
                    <span className="w-2.5 h-2.5 rounded-[1.5px] bg-bat-gold/75 border border-bat-gold/30" />
                    <span className="w-2.5 h-2.5 rounded-[1.5px] bg-bat-yellow border border-bat-gold" />
                    <span>More</span>
                  </div>

                  {/* Aesthetic quote */}
                  <div className="text-[9px] md:text-[10px] text-white/30 italic text-center md:text-right font-light tracking-wide">
                    "Consistency is what turns good developers into great engineers."
                  </div>
                </div>

              </div>

            </div>

            {/* BOTTOM PORTION: Dashboard & Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              
              {/* Analytics Dashboard Grid */}
              <div className="lg:col-span-8 flex flex-col gap-6 w-full">
                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white border-l-2 border-bat-gold pl-3">
                    Analytics Dashboard
                  </h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {statsConfig.map((stat, idx) => {
                    const Icon = stat.icon;
                    const val = calculatedStats[stat.key];
                    
                    return (
                      <motion.div
                        key={idx}
                        className="glass-card p-3 md:p-4 flex flex-col relative overflow-hidden group/card bg-black/35 hover:bg-black/50 hover:border-bat-gold/20"
                        variants={itemVariants}
                        whileHover={{ y: -3, scale: 1.02, boxShadow: stat.glowColor ? `0 0 15px ${stat.glowColor}` : undefined }}
                      >
                        {/* Icon container */}
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color} ${stat.pulse ? 'animate-pulse' : ''}`} />
                        </div>
                        
                        {/* Value with count-up animation */}
                        <div className="text-base md:text-xl font-black text-white leading-tight">
                          <AnimatedCounter value={val} />
                        </div>
                        
                        {/* Label */}
                        <div className="text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-wider mt-1 truncate">
                          {stat.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Achievements Badges */}
              <div className="lg:col-span-4 flex flex-col gap-6 w-full h-full">
                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white border-l-2 border-bat-gold pl-3">
                    Unlocked Achievements
                  </h3>
                </div>

                <div className="glass-card p-5 md:p-6 bg-black/35 hover:bg-black/50 hover:border-bat-gold/20 flex items-center justify-center flex-1 min-h-[160px] md:min-h-0">
                  <div className="grid grid-cols-5 gap-2 md:gap-3 w-full justify-items-center">
                    {badges.map((badge, idx) => (
                      <motion.div
                        key={idx}
                        className="flex flex-col items-center group/badge relative"
                        variants={itemVariants}
                      >
                        {/* Badge Icon Circular Box */}
                        <motion.div
                          className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-bat-black-card border border-white/10 flex items-center justify-center text-lg md:text-xl relative transition-all duration-300 group-hover/badge:border-bat-gold/50 cursor-help"
                          style={{
                            boxShadow: `0 0 5px rgba(255, 255, 255, 0.02)`
                          }}
                          whileHover={{ 
                            scale: 1.15,
                            boxShadow: `0 0 15px ${badge.aura}`
                          }}
                        >
                          {badge.isBat ? (
                            <img
                              src="/batman-logo.png"
                              alt="Batman Logo"
                              className="w-8 md:w-10 h-auto object-contain filter drop-shadow-[0_0_4px_rgba(212,175,55,0.5)]"
                            />
                          ) : (
                            <span>{badge.emoji}</span>
                          )}
                          
                          {/* Hover Description Tooltip */}
                          <div className="absolute opacity-0 pointer-events-none group-hover/badge:opacity-100 transition-opacity duration-300 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-bat-black-card border border-white/15 rounded px-2 py-1 text-center w-24 shadow-lg z-30">
                            <p className="text-[9px] font-black text-bat-gold uppercase tracking-wider">{badge.title}</p>
                            <p className="text-[8px] text-white/70 leading-none mt-0.5">{badge.desc}</p>
                          </div>
                        </motion.div>
                        
                        {/* Name Label */}
                        <span className="block text-[8px] md:text-[9px] text-white/50 font-bold uppercase tracking-wider text-center mt-2 group-hover/badge:text-bat-gold transition-colors duration-200 leading-tight max-w-full px-0.5 break-words">
                          {badge.title.split(' ')[0]} {badge.title.split(' ')[1] || ''}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default CodingJourney;
